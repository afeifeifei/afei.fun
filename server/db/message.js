/*
* 联系我模块对应的表格数据
*
* */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let messageSchema = new Schema({
  //评论内容
  content: String,
  //提交时间
  time: {type: Number, default: Date.now},
  //用户关联
  user: {type: Schema.Types.ObjectId, ref: "user"},
  //点赞数
  likes: [
    {type: Schema.Types.ObjectId}
  ],
  //子评论
  children: [
    {
      content: String,
      time: {type: Number, default: Date.now},
      user: {type: Schema.Types.ObjectId, ref: "user"},
      reply: {type: Schema.Types.ObjectId, ref: "user"},
      likes: [{type: Schema.Types.ObjectId}]
    }
  ]
});


module.exports = mongoose.model("message", messageSchema);
