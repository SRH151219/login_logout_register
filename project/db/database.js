//连接数据库

const mongoose = require("mongoose");

//数据库地址
const url = "mongodb://127.0.0.1/myStore";
//连接数据库
mongoose.connect(url);
//导出数据库
module.exports = mongoose;