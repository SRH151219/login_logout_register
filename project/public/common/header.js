function Header(container) {
    this.container = container;
    this.init();
    //每当页面刷新时，就会自动调用判断是否登录的方法
    this.isLogin();
    this.getLogout();

}
Header.template = `

<nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <a class="navbar-brand" href="#">我的小铺</a>
                <ul class="nav navbar-nav navbar-right">
                <li ><a href="http://localhost:3000/index.html">首页</a></li>
                <li ><a href="http://localhost:3000/html/list.html"">列表页</a></li>
          </ul>
            </div>
           
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                <form class="navbar-form navbar-left">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Search">
                    </div>
                    <button type="submit" class="btn btn-default">搜索</button>
                </form>

                <ul class="nav navbar-nav navbar-right noLogin">
                    <li data-toggle="modal" data-target="#login_model"><a href="##">登录</a></li>
                    <li data-toggle="modal" data-target="#register_model"><a href="##">注册</a></li>
                </ul>

                <ul class="nav navbar-nav navbar-right doLogin hide">
                    <li><a href="##"></a></li>
                    <li class="logout"><a href="##">退出</a></li>
                </ul>

            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
`;

// Header.prototype.init = function () {
//     this.createDom();
// }

// Header.prototype.createDom = function () {
//     this.dom = $("<div></div>");
//     this.dom.append(Header.template);
//     this.container.append(this.dom);
// }
$.extend(Header.prototype,{
    init:function () {
        this.createDom();
    },
    createDom:function () {
        this.dom = $("<div></div>");
        this.dom.append(Header.template);
        this.container.append(this.dom);
    },

    //判断是否已经登录
    isLogin(){
        //发送ajax请求，不需要传送任何值
        $.ajax({
            type:"get",
            url:"/api/isLogin",
            success:$.proxy(this.isLoginSuccess,this)
        })
    },
    //发送ajax请求成功后，接收后端的返回值
    isLoginSuccess:function(data){
        //当用户为登录状态时
        if(data.status){
            //使登录注册标签隐藏
            this.dom.find(".noLogin").addClass("hide");
            //使用户，退出标签显示
            this.dom.find(".doLogin").removeClass("hide").children().eq(0).children(0).text("user:" + data.userId);
        }
    },

    //点击退出
    getLogout(){
        //获取退出按钮
        var logoutBtn = this.dom.find(".logout");
        //点击退出按钮，触发函数
        logoutBtn.on("click",$.proxy(this.handleLogout,this));
    },
    //点击退出按钮触发的函数
    handleLogout:function(){
        //发送ajax请求，不需要传送任何的值
        $.ajax({
            type:"get",
            url:"/api/logout",
            success:$.proxy(this.logoutSuccess,this)
        })
    },
    //发送ajax请求成功后，接收后端的返回值
    logoutSuccess:function(data){
        if(data.status){
            //使得登录，注册 标签显示
            this.dom.find(".noLogin").removeClass("hide");
            //使用户，退出标签隐藏
            this.dom.find(".doLogin").addClass("hide").children().eq(0).children(0).text("");
        }
    }
    
})