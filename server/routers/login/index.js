const express = require('express')
const router = express.Router()
const userDB = require("../../db/user")

router.post("/", async (req, res) => {
  let data = req.body;

  //整理数据
  let params = {
    openId: data.openId,
    city: data.city,
    photo: data.figureurl_qq_2 ||
      data.figureurl_qq_1 ||
      data.figureurl_qq ||
      data.figureurl_2 ||
      data.figureurl_1 ||
      data.figureurl,
    gender: data.gender,
    nickname: data.nickname,
    province: data.province,
    year: data.year
  };

  //参数检测
  if (!params.openId){
    return res.send({
      code: 5,
      msg: "参数错误",
      data: {}
    })
  }

  try{
    //根据openId查找用户是否已经注册
    let doc = await userDB.findOne({openId: params.openId})

    if (doc){
      //已存在 -- 更新信息
      await userDB.updateOne({openId: params.openId},params)
    }else{
      //不存在 -- 注册用户
      await userDB.create(params)
    }
    return res.send({
      code: 0,
      msg: "登录成功",
      data: params
    })
  }catch (e) {
    console.log(e);
    return res.send({
      code: 4,
      msg: "服务器错误",
      data: {}
    })
  }

})

module.exports = router;









