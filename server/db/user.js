/*
* 联系我模块对应的表格数据
*
* */
const crypto = require("crypto")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

let userSchema = new Schema({
  //用户名
  name: {type: String, required: true}
  //密码
  , pwd: {type: String, required: true}
  //注册时间
  , regTime: {type: Number, default: Date.now}
  //个性签名
  , status: {type: String, default: "很有个性，没有签名~"}
  //手机号
  , tel: {type: String}
  //邮箱
  , email: {type: String}
})

userSchema.pre("save", function (next) {
  /*密码加密*/
  let pwd = this.pwd
  this.pwd = crypto.createHash("sha256").update(pwd).digest("hex")
  next()
})

module.exports = mongoose.model("user", userSchema)
