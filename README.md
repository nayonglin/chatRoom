# chatRoom
网站在线客服（基于socket.io和node）

很多网站都会用到在线客服这个功能，该插件基于node和socket.io制作，使用他您可以完成多对一即时聊天，即客服一个端(chatServer.html)，多个用户可以和唯一客户端聊天,当然如果你登录两个客服端，他们都能同时收到客户发来的信息，程序运行需要node，并且安装index.js需要的对应模块(express, socket.io)，不会的就自行度娘啦<br/><br/>

程序工作原理： <br/>
  每个客户都有自己的socketId，客服被分在同一个命名空间（service分组），客户发信息，服务器转发给server分组中所有成员(所有客服)，并记录好发来信息的客户sockeId，客服回复信息到指定客户就是通过socketId来完成。具体细节看代码注释。

下面是使用截图： <br/>

通过node运行index.js,启动本地服务器监听8080端口，通过浏览器进入页面（127.0.0.1:8080），插件被我定位在浏览器右下方，点击展开: <br/>
![Image text](https://raw.github.com/nayonglin/chatRoom/master/img-folder/1.png) <br/>

客服端没人登陆，显示客服不在线，无法点击输入框 <br/>
![Image text](https://raw.github.com/nayonglin/chatRoom/master/img-folder/2.png) <br/>

通过浏览器进入页面(127.0.0.1:8080/chatServer.html),登陆客服端，我没有做登陆验证，只要知道该页面地址就可进入 <br/>
![Image text](https://raw.github.com/nayonglin/chatRoom/master/img-folder/3.png) <br/>

此时刷新客户端页面(127.0.0.1:8080),显示客服在线，可以发送信息啦 <br/>
![Image text](https://raw.github.com/nayonglin/chatRoom/master/img-folder/5.png) <br/>

客服端收到信息，聊天框左上方select多出一个选项，选择那串很长的东西(其实是socketId)，发现刚刚接受到刚刚客户端发送来的信息，可以直接回复 <br>
![Image text](https://raw.github.com/nayonglin/chatRoom/master/img-folder/6.png) <br/>
![Image text](https://raw.github.com/nayonglin/chatRoom/master/img-folder/7.png) <br/>

浏览器重新打开(127.0.0.1:8080),代表又有一个客户登陆，同样发送信息给客服。 <br/>
![Image text](https://raw.github.com/nayonglin/chatRoom/master/img-folder/8.png) <br/>

客服收到新用户的信息，select又多了一个选项，选择对应选项，回复信息给新客户 <br/>
![Image text](https://raw.github.com/nayonglin/chatRoom/master/img-folder/9.png) <br/>
![Image text](https://raw.github.com/nayonglin/chatRoom/master/img-folder/10.png) <br/>


<br/><br/>
目前还没实现图片和表情的发送。
