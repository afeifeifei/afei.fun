const express = require("express")
const personalDB = require("../../db/personal")



const router = express.Router()

//获取个人信息
router.get("/get", async (req, res) => {
  try {
    let data = await personalDB.findOne({})
    res.send({
      code: 0,
      msg: "请求成功",
      data
    })
  }catch (e){
    res.send({
      code: 4,
      msg: "服务器错误",
      data: {}
    })
  }
})


module.exports = router;







