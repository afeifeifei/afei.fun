<template>
<div id="AppNav">
  <div class="main">
    <!--左侧logo-->
    <div class="logo">
      <a href="/">afei.fun</a>
    </div>
    <!--中间导航-->
    <div class="nav">
      <ul>
        <li class="index">
          <nuxt-link :to="{name:'index'}">首页</nuxt-link>
        </li>
        <li class="articles">
          <nuxt-link :to="{name:'article'}">文章</nuxt-link>
        </li>
        <li class="message">
          <nuxt-link :to="{name:'message'}">留言</nuxt-link>
        </li>
        <li class="daily">
          <nuxt-link :to="{name:'daily'}">生活</nuxt-link>
        </li>
        <li class="links">
          <nuxt-link :to="{name:'links'}">友链</nuxt-link>
        </li>
        <li class="about">
          <nuxt-link :to="{name:'about'}">关于</nuxt-link>
        </li>
      </ul>
    </div>
    <!--右侧登陆-->
    <div class="login">
      <el-button type="success" size="small">登陆</el-button><el-button type="primary" size="small">注册</el-button>

    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "AppNav",
  data(){
    return {
      showLoginBox: false,
      showRegisterBox: false
    }
  }
}
</script>

<style lang="less" scoped>
@height: 50px;
#AppNav{
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
  height: @height;
  background-color: #fff;
  box-shadow: 0 0 2px #ccc;

  //主内容
  .main{
    display: flex;
    box-sizing: border-box;
    padding: 0 15px;
    max-width: 1300px;
    height: @height;
    margin: 0 auto;
    justify-content: space-between;

    //logo
    .logo{
      width: 130px;
      height: @height;
      line-height: 42px;
      font-size: 26px;
      letter-spacing: 5px;
      font-family: "Pacifico","serif";
      a{
        display: block;
        color: rgba(0, 0, 0, 0.7);
      }
    }

    //nav
    .nav{
      @width: 78px;
      min-width: @width*6;
      ul{
        display: flex;
        height: 100%;
        li{
          height: 100%;
          a{
            display: block;
            height: 100% - 2px;
            border-bottom: 2px solid transparent;
            padding: 0 25px;

            color: #777;
            line-height: @height - 2px;
            font-weight: bolder;

            transition: all .3s;
            &:hover{
              color: #00b7ff;
            }
            &.nuxt-link-exact-active{
              color: #00b7ff;
              border-color: #00b7ff;
            }
          }
        }
      }
    }

    //login
    .login{
      min-width: 123px;
      line-height: @height;
      /*background-color: pink;*/
    }
  }
}
</style>














