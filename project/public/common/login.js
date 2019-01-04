function Login(container){
    this.container = container;
    this.init();
}

Login.template = `


<div class="modal fade" tabindex="-1" id="login_model">
        <div id="warn">这是一个警告</div>
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <!-- X按钮 -->
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>

                <form>
                    <div class="form-group">
                        <label for="login_username">userName</label>
                        <input type="text " class="form-control" id="login_username" placeholder="userName">
                    </div>

                    <div class="form-group">
                        <label for="login_pwd">密码</label>
                        <input type="password" class="form-control" id="login_pwd" placeholder="Password">
                    </div>

                </form>

                <div class="modal-footer">
                    <button id="login_btn">登录</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

`;

// Login.prototype.init = function(){
//     this.createDom();
// }
// Login.prototype.createDom = function(){
//     this.dom = $("<div></div>");
//     this.dom.append(Login.template);
//     this.container.append(this.dom);
// }
$.extend(Login.prototype,{
    init: function(){
        this.createDom();
    },
    createDom: function(){
        this.dom = $("<div></div>");
        this.dom.append(Login.template);
        this.container.append(this.dom);
        this.loginBtn();
    },
    loginBtn:function(){
        var loginBtn = this.dom.find("#login_btn");
        loginBtn.on("click",$.proxy(this.handleLoginBtn,this));
        console.log("dd");
    },
    handleLoginBtn:function(){
        // console.log(1);
        var username = this.dom.find("#login_username").val();
        var password = this.dom.find("#login_pwd").val();
        // console.log(username,password);
        $.ajax({
            type:"post",
            url:"/api/login",
            data:{
                username,
                password
            },
            success:$.proxy(this.loginSuccess,this)
        })
    },
    loginSuccess:function(data){
        //点击登录后，
        // this.dom.find("#login_username").val("");
        // this.dom.find("#login_pwd").val("");
      
        if(data.status == 1){
            this.dom.find("#warn").html(data.info).css("display","block");
           
            //使表单隐藏
            setTimeout(()=>{
                this.dom.find("#warn").css("display","none");
                $('#login_model').modal('hide');
                 //登陆成功，使得表单中的内容都置为空
                this.dom.find("#login_username").val("");
                this.dom.find("#login_pwd").val("");
            },1000)
            //刷新页面
            location.reload();
        }else if(data.status == 2){

            this.dom.find("#warn").html(data.info).css("display","block");
            setTimeout(()=>{
                this.dom.find("#warn").css("display","none");
               
            },1000)

        }else if(data.status == 3){

            this.dom.find("#warn").html(data.info).css("display","block");
            setTimeout(()=>{
                this.dom.find("#warn").css("display","none");
               
            },1000)

        }

    }
    
})