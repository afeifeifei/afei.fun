

module.exports = (req, res, next) => {
  let host = (req.headers.referer+"").replace(/\/$/,"");
  if (host === "http://www.afei.fun" || host === "http://afei.fun"){
    res.header("Access-Control-Allow-Origin", host);
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
  }
  next();
}







