
const session = require("express-session")
const MongoStore = require("connect-mongo").default

module.exports = session({
  //秘钥字符串，服务端生成session的签名，可随意写
  secret: "fly",
  //给前端设置cookie相关的设置，一般配置maxAge即可
  cookie: {maxAge:30*24*60*60*1000},
  //向服务发送请求后，是否重置cookie时间，建议true
  rolling: true,
  //是否强制重新保存session，即使它没有发生变化，建议false
  resave: false,
  //是否在session还未初始化时就存储，有利于前后鉴权，建议true
  saveUninitialized: true,
  //服务端session数据存储到数据库
  store: MongoStore.create({
    mongoUrl: "mongodb://localhost:27017/blog"
  })
})










