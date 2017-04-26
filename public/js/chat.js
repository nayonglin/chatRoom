/**
 * Created by nayonglin on 17/3/31.
 */



$(function () {

    //和服务器简历socket.io链接
    var socket = io('http://127.0.0.1:8080/custom'); //服务器的地址，这里我用的本机ip，custom是分组

    //进页面判断msg真假值，检测客服在不在线
    socket.on("isOnline", function (msg) {
        //msg = true为在线
        if(msg == false) {
           $('#isOnline').text("客服当前不在线");
           $('#chat_input').attr('disabled', 'disabled');
        }
    });


    //监听服务器转发的客服消息
    socket.on("new_message", function (msg) {
        var $chat = $('#chat_message');   //获取聊天框
        var $message = $chat.find('#message0').clone();
        $message.attr('id', '');
        $message.find('.message_time').text(msg.time);
        $message.find('.service_message_contain').text(msg.message);
        $chat.append($message).append("<div style='clear:both'></div>"); //清除浮动用的div
        $chat.scrollTop($chat[0].scrollHeight);  //滚动条置底
    });


    //点击发送按钮，发送信息给在线客服
    $("#send").bind("click", function () {
        var $this = $(this);

        //如果输入框不为空
        if ($this.prev().val() != "") {
            var message = $this.prev().val();
            var $pause = $("#message1").clone();
            var time = new Date().toLocaleTimeString();  //获得发送时间
            var $chat_pause = $("#chat_message");   //获得聊天信息框准备插入新数据

            //把数据通过socket.io发送给后台
            socket.emit('message_custom', {'message': message,
                                           'time': time});

            $this.prev().val("");         //点发送，清空输入框
            $pause.find(".custom_message_contain").text(message);
            $pause.css("display", "block");
            $pause.attr("id", "");
            $pause.find(".message_time").text(time);

            $chat_pause.append($pause);
            $chat_pause.scrollTop($chat_pause[0].scrollHeight);  //滚动条置底
            $('#chat_input').focus();
        }
    });

});
