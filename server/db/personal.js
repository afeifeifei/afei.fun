/*
* 个人信息数据
* */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let personalSchema = new Schema({
  //个人信息
  info: [
    //key-信息名称   value-信息内容
    {key: String, value: String}
  ]
  //技能
  , skills: [
    //key-技能名称   value-掌握百分比（0-100整数）
    {key: String, value: Number}
  ]
});

let personal = mongoose.model("personal", personalSchema);

personal.findOne({})
  .then(async data => {
    if (data) return;
    await personal.create({
      info: [
        {key: "NICKNAME", value: "阿飞"},
        {key: "ADDRESS", value: "湖南省长沙市岳麓区"},
        {key: "EMAIL", value: "53498870@qq.com"},
        {key: "GITHUB", value: "https://github.com/afeifeifei"},
      ],
      skills: [
        {key: "HTML5 & CSS3", value: 90},
        {key: "Javascript", value: 85},
        {key: "NodeJs", value: 80},
        {key: "Vue & React & 小程序", value: 70},
        {key: "Flutter", value: 60},
        {key: "Electron", value: 50}
      ]
    });
  })
  .catch(() => {
  });

module.exports = personal;
