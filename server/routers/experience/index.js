const express = require("express");
const experienceDB = require("../../db/experience");

const router = express.Router();

router.get("/get", async (req, res) => {
  try {
    let data = await experienceDB.find({}, {}, {sort: {_id: -1}})
    res.send({
      code: 0,
      msg: "请求成功",
      data
    })
  }catch (e) {
    res.send({
      code: 4,
      msg: "服务器错误",
      data: []
    })
  }

});


module.exports = router;
