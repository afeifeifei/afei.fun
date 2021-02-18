const express = require("express")
const app = express()
const path = require("path")

//连接数据库
require("./middleware/mongoose")

//跨域
app.all('*', (req, res, next) => {
  let host = (req.headers.referer+"").replace(/\/$/,"");
  if (host === "http://www.afei.fun" || host === "http://afei.fun"){
    res.header("Access-Control-Allow-Origin", host);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
  }
  next();
});

//中间件
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//静态资源
app.use(express.static(path.join(__dirname,"./public")))

//监听路由
app.use("/", require('./routers/index'))

//导出
module.exports = {path: "/", handler: app}





