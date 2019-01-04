var express = require('express');
var router = express.Router();
//导入controller层
var controller = require("../controller/users.js")

router.post("/register",controller.register);
router.post("/login",controller.login);
router.get("/isLogin",controller.isLogin);
router.get("/logout",controller.logout);
module.exports = router;
