function Page() {
    this.container = $("#header");
    this.init();
}
//入口函数
Page.prototype.init = function(){
    this.createHeader();
}
//创建头部
Page.prototype.createHeader= function(){
    this.header = new Header(this.container);
    this.login = new Login(this.container);
    this.register = new Register(this.container);
}

new Page();