/*
* 联系我模块对应的表格数据
*
* */
const crypto = require("crypto")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

let userSchema = new Schema({
  //注册时间
  regTime: {type: Number, default: Date.now}
  //用户openId
  ,openId: String
  //省份
  ,province: String
  //城市信息
  ,city: String
  //用户头像
  ,photo: String
  //性别
  ,gender: String
  //昵称
  ,nickname: String
  //出生年份
  ,year: String
})

module.exports = mongoose.model("user", userSchema)
