/**
 * Created by nayonglin on 17/4/7.
 */



$(function () {

    //和服务器简历socket.io链接
    var socket = io('http://127.0.0.1:8080/service');  //服务器的地址，这里我用的本机ip，service是分组
    var IDS = []; //该数组保存正在聊天的客户id

    //监听服务器转发的客户消息
    socket.on("new_message", function (msg) {
      var length = IDS.length;

      for(var i = 0; i <= length; i++) {
          var id = msg.id.replace('/custom#', '');

          //新消息的用户id聊天框已经有了
          if(id == IDS[i]) {
               var $chat = $('#' + id);   //获取对应id聊天框
               var $message = $chat.find('#message0').clone();
               $message.attr('id', '');
               $message.find('.message_time').text(msg.time);
               $message.find('.service_message_contain').text(msg.message);
               $chat.append($message).append("<div style='clear:both'></div>");
               $chat.scrollTop($chat[0].scrollHeight);  //滚动条置底
               break;
          }

          //新消息的用户id聊天框还没有，动态生成
          if(i == length){
              var $pause =  $('#chat_message').clone();    //克隆大聊天框
              var $message_pause = $pause.find("#message0").clone();   //克隆聊天框内客户发来的消息

              $pause.attr('id', id);        //客户socketId做为大聊天框id
              $message_pause.attr('id', '');
              $message_pause.find('.message_time').text(msg.time);     //插入信息发送时间
              $message_pause.find('.service_message_contain').text(msg.message); //插入消息内容
              $pause.css('display', 'none');
              $pause.append($message_pause).append("<div style='clear:both'></div>");
              $('#chat_top').after($pause);
              $('#choose_chat').append("<option value=" + id + ">" + id + "</option>");  //聊天框选择增加新选项
              IDS.push(id);
              $pause.scrollTop($pause[0].scrollHeight);  //滚动条置底
          }
      }
    });

    //点击发送按钮，发送信息给在线客服
    $("#send").bind("click", function () {
        var $this = $(this);

        //如果输入框不为空
        if ($this.prev().val() != "") {
            var choosed = $("#choose_chat option:selected").val();
            var destination_id = "/custom#" + choosed;     //要发送到的客户端id
            console.log(destination_id);
            var message = $this.prev().val();
            var $pause = $("#message1").clone();
            var time = new Date().toLocaleTimeString();  //获得发送时间
            var $chat_pause = $("#" + choosed);   //获得聊天信息框准备插入新数据

            //把数据通过socket.io发送给后台
            socket.emit('message_service', {'message': message,
                                            'time': time,
                                            'destination_id': destination_id});

            $this.prev().val("");         //点发送，清空输入框
            $pause.find(".custom_message_contain").text(message);
            $pause.css("display", "block");
            $pause.attr("id", "");
            $pause.find(".message_time").text(time);

            $chat_pause.append($pause).append("<div style='clear:both'></div>");
            $chat_pause.scrollTop($chat_pause[0].scrollHeight);  //滚动条置底
        }
        $('#chat_input').focus();
    });

    //聊天框选择绑定
    $('#choose_chat').change(function () {
        var choosed =  $("#choose_chat option:selected").val();
        var unChoosed =  $("#choose_chat option").not(':selected');

        //把未选中的全部隐藏
        unChoosed.each(function () {
           var val = $(this).val();
            $('#' + val).hide();
        });

        $('#' + choosed).show();
    });

});
