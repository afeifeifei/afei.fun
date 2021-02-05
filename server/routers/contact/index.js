let express = require("express");
let contactDB = require("../../db/contact");

let router = express.Router();

router.post("/post",(req,res)=>{
  let {name,email,message} = req.body;

  //数据存在验证
  if (!name || !email || !message){
    res.send({
      code: 1,
      msg: "表格信息不完整",
      data: {}
    });
    return;
  }

  //存储到contact表
  contactDB.create(req.body)
    .then(()=>{
      res.send({
        code : 0,
        msg : "提交成功",
        data : {}
      })
    })
    .catch(()=>{
      res.send({
        code:4,msg:"服务器错误~",data:{}
      })
    })

});

module.exports = router;
