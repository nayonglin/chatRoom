/**
 * Created by nayonglin on 17/3/12.
 */

$(function (){

    //点击在线客服div，开关在线客服聊天框
    $("#chat_logo").bind("click", function () {
           var $this = $(this);

        //如果是打开状态，则关闭
        if( $this.css('right') == '366px') {
            $this.animate({right: '0px'});
            $this.next().animate({
                right: '-365px'
            });
            $this.css('backgroundImage', 'url(images/go_left.svg)');
        } else {
            $this.animate({right: '366px'});
            $this.next().animate({
                right: '5px'
            });
            $this.css('backgroundImage', 'url(images/go_right.svg)');
        }
    });


});
