const express = require('express')
const router = express.Router()
const linkDB = require("../../db/link")

router.get("/getAll", async (req, res) => {
  //返回所有友链
  try{
    let data = await linkDB.find({})
    return res.send({
      code: 0,
      msg: "获取成功",
      data
    })
  }catch (e) {
    return res.send({
      code: 4,
      msg: "服务器错误，请稍后再试",
      data: []
    })
  }
})

module.exports = router;









