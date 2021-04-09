const express = require("express")
const router = express.Router()
const request = require("request")
const qs = require("querystring")

//根据token请求用户信息
router.get("/", async (req, res) => {
  let params = req.query;
  // console.log("https://graph.qq.com/user/get_user_info"+"?"+qs.stringify(params));
  try{
    request.get(
      "https://graph.qq.com/user/get_user_info"+"?"+qs.stringify(params),
      (e,r,body)=>{
        if (e){
          return res.send({
            code: 1,
            msg: "request error",
            data: {}
          })
        }
        let data = JSON.parse(body)
        if (data.ret !== 0){
          return res.send({
            code: 2,
            msg: "params error",
            data: body
          })
        }
        return res.send({
          code: 0,
          msg: "request success",
          data: JSON.parse(body)
        })
      }
    )

  }catch (e) {
    return res.send({
      code: 4,
      data: {}
    })
  }
})

module.exports = router;









