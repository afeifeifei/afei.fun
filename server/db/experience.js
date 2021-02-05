const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let experienceSchema = new Schema({
  //工作时间区间
  duration : {type:String, required:true}
  //岗位名称
  ,job : {type:String, required:true}
  //主要技能图标
  ,img : {type:String, default:"/defaultImage"}
  //公司名称
  ,company : {type:String, required: true}
  //职务内容
  ,content : {type:String, required:true}
});

let experience = mongoose.model("experience",experienceSchema);

experience.findOne({})
  .then(data=>{
    if (!data){
      experience.create({
        duration : "2010 - 2014"
        ,job : "FULL STACK DEVELOPER/Operator"
        ,img : '/defaultImage/technology/wordpress.png'
        ,company : "YuanFei E-commerce Ltd"
        ,content : "Developed, managed, operated and promoted an Internet business.Handled customer support issues.Planned and managed business finances."
      });
      experience.create({
        duration : "2014 - 2015"
        ,job : "WEB DEVELOPER/assistant"
        ,img : '/defaultImage/technology/jquery.png'
        ,company : "TanZhou EDU"
        ,content : "Worked as an assistant of online teacher.Operate and maintain for the existing websites.And answer the question of students."
      });
      experience.create({
        duration : "2015 - 2020"
        ,job : "WEB DEVELOPER/ONLINE TEACHER"
        ,img : '/defaultImage/technology/vue.jpg'
        ,company : "TanZhou EDU"
        ,content : "Responsible for the development of independent official website of some subjects of the company.And also as an online teacher of WEB.Technology consists of HTML5, CSS3, JavaScript, Nodejs, vue, Canvas, Design pattern & Algorithm。"
      });
      experience.create({
        duration : "2020 - "
        ,job : "WEB DEVELOPER/ONLINE TEACHER"
        ,img : '/defaultImage/technology/vue.jpg'
        ,company : "Zzt EDU"
        ,content : "Responsible for the development of independent official website of some subjects of the company.And also as an online teacher of WEB.Technology consists of HTML5, CSS3, JavaScript, Nodejs, vue, Canvas, Design pattern & Algorithm。"
      });
    }
  })
  .catch(()=>{});

module.exports = experience;
