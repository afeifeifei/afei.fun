const express = require("express")

let router = express.Router()

/*Home页面相关*/
//个人信息
router.use("/personal", require("./personal/index"))
//工作经验
router.use("/experience", require("./experience/index"))
//联系提交
router.use("/contact", require("./contact/index"))

/*登陆与注册*/
//登陆
router.use("/login", require("./login/index"))
//注册
router.use("/register", require("./register/index"))


module.exports = router;









