//导入数据库

const db = require("../db/database.js");

//定义数据类型
const User = db.model("registerUsers",{
    username:String,
    password:String
})

//增：
const addUser = (userInfo,cb)=>{
    const user = new User({
        username:userInfo.username,
        password:userInfo.password
    })
    user.save().then(()=>{
        cb();
    })
}
//查
const findUser = (userInfo,cb)=>{
    User.findOne({username:userInfo.username}).then((data)=>{
        cb(data);
    })
}
module.exports = {
    addUser,
    findUser
}
