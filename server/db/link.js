/*
* 联系我模块对应的表格数据
*
* */
const mongoose = require("mongoose")
const Schema = mongoose.Schema

let linkSchema = new Schema({
  name: String
  ,url: String
  ,logo: String
  ,des: String
})

module.exports = mongoose.model("link", linkSchema)
