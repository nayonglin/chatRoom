/**
 * Created by nayonglin on 17/2/24.
 */


     //express_demo.js 文件
    var express = require('express');
    var app = express();
    var http = require('http').createServer(app);
    var io = require('socket.io').listen(http);

        app.use(express.static('public'));

        //请求首页返回index.html
        app.get('/', function (req, res) {
            res.sendFile( __dirname + "/index.html" );
        });

        //开启http服务器,监听8080端口
        var server = http.listen(8080, function () {
             console.log("server start");
        });

        var j = 0;  //1客服在线，0客服不在线


       //分配客服和客户命名空间
        var service = io.of('/service');
        var custom = io.of('/custom');

        //监听客服端链接
        service.on('connection', function(client){
          console.log('a service connected');

            //监听客服发来的信息
            client.on('message_service', function (msg) {
                custom.to(msg.destination_id).emit("new_message", msg);  //把客服发来的数据转发给对应id客户
            });

           //监听客服断开链接
           client.on('disconnect', function () {
            console.log('a service leave');
           });
        });


        //监听客户链接
         custom.on('connection', function(client){
          console.log('a user connected');

          //判断客服在不在线，不在线则输入框不能选取
          isOnline();
          if(j == 0) {
            custom.to(client.id).emit('isOnline', false);
          } else {
            custom.to(client.id).emit('isOnline', true);
          }

        //监听客户发来的信息
        client.on('message_custom', function (msg) {
            msg.id = client.id;                //socketId存入msg对象一起转发给客服
            service.emit('new_message', msg);  //把信息转发给客服
        });

        //监听客户断开连接
        client.on('disconnect', function(){
           console.log('a user leave');
         });
     });




//判断当前客服在不在线
function isOnline() {

    io.of('/service').clients(function(error, clients){
        if (error) throw error;
        j = clients.length;     //客服分组长度为0，证明没有客服在线
    });
}