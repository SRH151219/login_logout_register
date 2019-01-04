function Register(container){
    this.container = container;
    this.init();
}

Register.template = `
<div class="modal fade" tabindex="-1" id="register_model">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <!-- X按钮 -->
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>

        <form>
            <div class="form-group">
                <label for="text2">用户名</label>
                <input class="register_uname" type="text " class="form-control" id="text2" placeholder="用户名">
            </div>

            <div class="form-group">
                <label for="password2">密码</label>
                <input class="register_pwd" type="password" class="form-control" id="password2" placeholder="Password">
            </div>

        </form>

        <div class="modal-footer">
            <button id="register_btn">注册</button>
        </div>
    </div><!-- /.modal-content -->
</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
`

// Register.prototype.init = function(){
//     this.createDom();
// }

// Register.prototype.createDom = function(){
//     this.dom = $("<div></div>");
//     this.dom.append(Register.template);
//     this.container.append(this.dom);
// }
$.extend(Register.prototype,{
    init: function(){
        this.createDom();
    },
    createDom:function(){
        this.dom = $("<div></div>");
        this.dom.append(Register.template);
        this.container.append(this.dom);
        //注意
        this.getBtn();
    },
    getBtn:function(){
        var register_btn = this.dom.find("#register_btn");
        register_btn.on("click",$.proxy(this.handleRegisterBtn,this));
    },
    handleRegisterBtn(){
        // console.log(1); 
        // alert("1");
        var username = this.dom.find("#text2").val();
        var password = this.dom.find("#password2").val();
        console.log(username,password);
        //将数据传到后端
        $.ajax({
            type:"post",
            url:"/api/register",
            data:{
                username:username,
                password:password
            },
            success:$.proxy(this.registerSuccess,this)
        })
    },
    registerSuccess:function(data){
        console.log(data);

    }

})