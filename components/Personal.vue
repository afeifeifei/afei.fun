<template>
  <div id="Personal">
    <section class="info">
      <div class="img"></div>
      <div class="name">
        <p>AFEI</p>
        <p>WEB Developer</p>
      </div>
    </section>
    <section class="contact">
      <a class="iconfont icon-github" target="_blank" href="https://github.com/afeifeifei"></a>
      <a class="iconfont icon-twitter" target="_blank" title="我关注的全是不可描述，不给你们看"></a>
      <a class="iconfont icon-tubiaozhizuo-" target="_blank" href="https://weibo.com/u/6524414862"></a>
      <el-popover
        placement="top-start"
        width="150"
        trigger="click"
      >
        <img src="~static/img/contact/weixin.png" width="150" alt="微信二维码">
        <a class="iconfont icon-weixin" slot="reference"></a>
      </el-popover>
      <a class="iconfont icon-QQ" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=53498870&site=qq&menu=yes"></a>
    </section>
    <section class="download">
      <a href="https://github.com/afeifeifei/afei.fun" target="_blank">DOWNLOAD CV</a>
    </section>
  </div>
</template>

<script>
export default {
  name: "Personal"
}
</script>

<style scoped lang="less">
#Personal {
  width: 100%;
  background-color: #bfe2e6;
  box-shadow: 0 0 4px #ddd;

  > .info {
    display: flex;
    box-sizing: border-box;
    padding: 20px 20px 0;
    width: 100%;
    overflow: hidden;
    justify-content: center;

    > .img {
      width: 60px;
      height: 60px;
      margin-right: 20px;
      border-radius: 50%;
      background: url("~static/img/afei.png") no-repeat center center/cover;
      border: 2px solid #f3f8f2;
    }

    > .name {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 60px;

      p:nth-child(1) {
        font-family: "Microsoft YaHei", "sans-serif";
        font-size: 20px;
        font-weight: bolder;
        letter-spacing: 5px;
      }

      p:nth-child(2) {
        font-family: "Quicksand", "sans-serif";
        color: #555;
        font-weight: bold;
        letter-spacing: 3px;
        font-size: 12px;
      }
    }
  }

  > .contact {
    box-sizing: border-box;
    padding: 0 20px 20px;
    display: flex;
    justify-content: space-between;
    margin-top: 22px;

    a {
      display: block;
      margin: 0 10px;
      font-size: 20px;
      color: #525252;
      transition: color 0.3s;
      cursor: pointer;
    }
  }

  > .download {
    box-sizing: border-box;
    width: 100%;
    padding: 20px 0;
    background-color: #fff;

    a {
      display: block;
      width: 65%;
      height: 40px;
      border-radius: 23px;
      margin: 0 auto;
      box-shadow: 0 0 0 #888;
      font-family: "Quicksand", "sans-serif";
      font-size: 14px;
      text-align: center;
      line-height: 40px;
      font-weight: 700;
      color: #000;
      letter-spacing: 1px;
      background-color: #bfe2e6;
      transition: box-shadow 0.3s;

      &:hover {
        box-shadow: 0 2px 10px #888;
      }
    }
  }
}
</style>
