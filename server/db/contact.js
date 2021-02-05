/*
* 联系我模块对应的表格数据
*
* */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let contactSchema = new Schema({
  //称呼
  name : {type: String, required: true}
  //邮箱
  ,email : {type: String, required: true}
  //主题
  ,subject : String
  //留言消息
  ,message : {type: String, required: true}
});


module.exports = mongoose.model("contact",contactSchema);
