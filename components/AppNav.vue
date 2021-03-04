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
        <div class="loginTrue" v-if="ifLogin">
          <el-tooltip
            class="item"
            effect="dark"
            content="点击退出登录"
            placement="bottom-start"
          >
            <img
              :src="userInfo.photo"
              @click="handleLogout"
            >
          </el-tooltip>

        </div>
        <div class="loginFalse" v-else>
          <img
            src="~static/img/qq-login.png"
            alt="QQ"
            @click="handleLogin"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapState, mapMutations} from "vuex"

export default {
  name: "AppNav",
  data(){
    return {
      ifLogin: false
    }
  },
  computed:{
    ...mapState(["userInfo"])
  },
  methods: {
    //登陆
    handleLogin() {
      window.location.href = "https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=101935222&redirect_uri=http://afei.fun/user";
    },
    //退出
    handleLogout(){
      QC.Login.signOut();
      window.localStorage.removeItem("openId")
      window.localStorage.removeItem("access_token")
      window.location.reload()
    },
    //vuex
    ...mapMutations(['login','logout']),
    //登陆检测
    async loginCheck(){
      //本地测试登陆
      if (process.env.NODE_ENV !== "production") {
      }

      //获取localStorage
      let openId = window.localStorage.getItem("openId"),
        access_token = window.localStorage.getItem("access_token");

      //没有值得表示未登录
      if (!openId || !access_token)return

      //有值则表示已登录 -- 请求用户信息
      let res = await this.$axios({
        method: "get",
        url: "/userInfo",
        params: {
          access_token
          ,openid: openId
          ,"oauth_consumer_key": 101935222
        }
      })

      //判断用户信息是否请求成功
      if (res.data.code !== 0) {
        return
      }
      let res2 = await this.$axios({
        method: "post"
        ,url: "/login"
        ,data: {
          openId,
          ...res.data.data
        }
      })

      //判断用户是否login成功
      if (res2.data.code !== 0) {
        return
      }
      this.login(res2.data.data)
      this.ifLogin = true;
    },
    //百度统计
    baidu(){
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?948862210314e43d47e594247aa9d06e";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    }
  },
  async mounted() {
    this.baidu();
    await this.loginCheck();
  }
}
</script>

<style lang="less" scoped>
@height: 50px;
#AppNav {
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
  .main {
    display: flex;
    box-sizing: border-box;
    padding: 0 15px;
    max-width: 1300px;
    height: @height;
    margin: 0 auto;
    justify-content: space-between;

    //logo
    .logo {
      width: 130px;
      height: @height;
      line-height: 42px;
      font-size: 26px;
      letter-spacing: 5px;
      font-family: "Pacifico","Microsoft YaHei", "sans-serif";

      a {
        display: block;
        color: rgba(0, 0, 0, 0.7);
      }
    }

    //nav
    .nav {
      @width: 78px;
      min-width: @width*6;

      ul {
        display: flex;
        height: 100%;

        li {
          height: 100%;

          a {
            display: block;
            height: 100% - 2px;
            border-bottom: 2px solid transparent;
            padding: 0 25px;

            color: #777;
            line-height: @height - 2px;
            font-weight: bolder;

            transition: all .3s;

            &:hover {
              color: #00b7ff;
            }

            &.nuxt-link-exact-active {
              color: #00b7ff;
              border-color: #00b7ff;
            }
          }
        }
      }
    }

    //login
    .login {
      position: relative;
      min-width: 123px;
      line-height: @height;
      /*background-color: pink;*/
      .loginTrue{
        overflow: hidden;
        position: absolute;
        right: 0;
        top: 50%;
        width: 34px;
        height: 34px;
        margin-top: -17px;
        border-radius: 50%;
        img{
          display: block;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      }

      .loginFalse {
        position: absolute;
        right: 0;
        top: 50%;
        width: 76px;
        height: 24px;
        margin-top: -12px;

        img {
          display: block;
          cursor: pointer;
        }
      }
    }
  }
}
</style>














