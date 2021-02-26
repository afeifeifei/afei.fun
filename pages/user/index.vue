<template>
<div id="user">
  <p v-if="ifLogin">
    登录成功，请求处理中，即将跳转···
  </p>
  <p v-else>
    登录出错，<nuxt-link :to="{name:'index'}">返回首页</nuxt-link>
  </p>

</div>
</template>

<script>
export default {
  name: "index",
  data(){
    return {
      ifLogin: false
    }
  },
  methods: {

  },
  mounted() {
    if (!QC.Login.check())return;
    //登陆成功
    QC.api("get_user_info",{
      "oauth_consumer_key": 101935222
    }).onSuccess = ({data})=>{
      QC.Login.getMe(async (openId, accessToken)=>{

        //发送到后端
        let res = await this.$axios({
          method: "post"
          ,url: "/login"
          ,data: {
            openId,
            ...data
          }
        })

        //后端处理完成
        if (res.data.code !== 0){
          //登录失败
          this.ifLogin = false;
        }else{
          //登录成功
          this.ifLogin = true;
          // 存储Token
          window.localStorage.setItem("openId",openId);
          window.localStorage.setItem("access_token",accessToken);
          //跳转到之前的页面
          window.history.go(-2);
        }
      })
    }
  }
}
</script>

<style scoped>

</style>














