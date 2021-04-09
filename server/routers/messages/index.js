const express = require("express")
const messageDB = require("../../db/message")

const router = express.Router()

//评论提交
router.post("/", async (req, res) => {
  let {_id, content} = req.body

  //检测数据
  if (!_id || !content) {
    return res.send({
      code: 1,
      msg: "提交参数错误"
    })
  }

  //存储到数据库
  try {
    await messageDB.create({
      content,
      user: _id
    })
    return res.send({
      code: 0,
      msg: "留言成功"
    })
  } catch (e) {
    console.log(e);
    return res.send({
      code: 4,
      msg: "服务器错误，请稍后再试"
    })
  }

})

//评论获取
router.get("/", async (req, res) => {
  try {
    let data = await
      messageDB
        .find({}, {}, {sort: {time: -1}})
        .populate("user",{nickname:1,photo:1,admin:1})
        .populate("children.user",{nickname:1,photo:1,admin:1})
        .populate("children.reply",{nickname:1,photo:1,admin:1})
    return res.send({
      code: 0,
      msg: "请求成功",
      data
    })
  } catch (e) {
    console.log(e);
    return res.send({
      code: 4,
      msg: "服务器错误",
      data: []
    })
  }
})

//点赞
router.post("/likes", async (req, res) => {
  let {item} = req.body;

  try {
    delete item.replyUser
    delete item.replyText
    delete item.isShowReply

    await messageDB.updateOne({_id: item._id}, item)
    return res.send({
      code: 0,
      msg: "更新成功"
    })
  } catch (e) {
    console.log(e);
    return res.send({
      code: 4,
      msg: "服务器错误，请稍后再试"
    })
  }


})

//回复
router.post("/reply", async (req, res) => {
  let {messageId, replyId, userId, content} = req.body

  if (!messageId || !replyId || !userId || !content) {
    return res.send({
      code: 1,
      msg: "参数错误"
    })
  }

  try {
    await messageDB.updateOne({_id: messageId}, {
      $push: {
        children: {
          content,
          user: userId,
          reply: replyId
        }
      }
    })

    return res.send({
      code: 0,
      msg: "回复成功"
    })

  } catch (e) {
    return res.send({
      code: 4,
      msg: "服务器错误，请稍后再试"
    })
  }

})


module.exports = router;




