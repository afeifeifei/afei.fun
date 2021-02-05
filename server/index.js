const express = require("express")
const app = express()
const path = require("path")

//连接数据库
require("./middleware/mongoose")

//中间件
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//静态资源
app.use(express.static(path.join(__dirname,"./public")))

//监听路由
app.use("/", require('./routers/index'))

//导出
module.exports = {path: "/", handler: app}





