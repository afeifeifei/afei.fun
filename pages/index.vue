<!--suppress CssUnknownTarget -->
<template>
  <div id="Home">
    <!--HELLO！-->
    <article class="hello">
      <h1>阿飞的个人博客</h1>
      <!--小标题-->
      <h2>HELLO!</h2>
      <!--介绍-->
      <p class="des">你好！欢迎来到我的博客！我是一名<span>有点肾虚的</span>WEB前端攻城狮，热衷于研究JavaScript、NodeJs、Vue、React、WebGL、Flutter、Electron……这是我的主页！我会在这里发表一些<span>不成熟的</span>技术文章，记录一些<span>沙雕的</span>日常。博客目前使用的是Vue
        + Nuxt + Element + Node + Express + MongoDB搭建的，如果对源码感兴趣的话可以<a href="https://github.com/afeifeifei/afei.fun"
                                                                      target="_blank">点击这里</a>。欢迎提出宝贵的建议哦！</p>
      <!--个人信息-->
      <div class="info">
        <div class="info-child info-left">
          <h3>personal information</h3>
          <ul v-if="personalData.info">
            <li v-for="item in personalData.info">
              <p class="dt">{{item.key}}</p>
              <p class="dd">
                <span v-if="!/^http/.test(item.value)">{{item.value}}</span>
                <a v-else :href="item.value" target="_blank">{{item.value}}</a>
              </p>
            </li>
          </ul>
        </div>
        <div class="info-child info-right">
          <h3>skills</h3>
          <ul v-if="personalData.skills">
            <li v-for="item in personalData.skills">
              <p class="lang">
                <span>{{item.key}}</span>
                <span>{{item.value + '%'}}</span>
              </p>
              <p class="level">
                <span :style="{
                  width : item.value+'%'
                }"></span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </article>

    <!--热门文章推荐-->
    <article class="article">
      <h2>ARTICLE</h2>
      <p class="des">热门文章推荐。
        <nuxt-link to="/article">更多文章</nuxt-link>
        请访问文章页>.<
      </p>
      <div class="info">
        <ul>
          <li>
            <div class="img" style="background-image: url(/defaultImage/1.jpg)"></div>
            <div class="cover">
              <a href="">
                <p>Tag: HTML</p>
                <p>View More</p>
              </a>
            </div>
            <p class="title">标题标题</p>
          </li>
          <li>
            <div class="img" style="background-image: url(/defaultImage/2.jpg)"></div>
            <div class="cover">
              <a href="">
                <p>Tag: HTML</p>
                <p>View More</p>
              </a>
            </div>
            <p class="title">标题标题</p>
          </li>
          <li>
            <div class="img" style="background-image: url(/defaultImage/3.jpg)"></div>
            <div class="cover">
              <a href="">
                <p>Tag: HTML</p>
                <p>View More</p>
              </a>
            </div>
            <p class="title">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</p>
          </li>
        </ul>
      </div>
    </article>

    <!--工作经历-->
    <article class="work">
      <h2>WORK EXPERIENCE</h2>
      <ul v-if="experienceData.length">
        <li v-for="item in experienceData">
          <div class="left">
            <p class="time">{{item.duration}}</p>
          </div>
          <div class="right">
            <h3>{{item.job}}</h3>
            <p class="img" v-if="item.img"><img :src='item.img' alt="" width="auto" height="30"></p>
            <p class="company">{{item.company}}</p>
            <p class="content">{{item.content}}</p>
          </div>
        </li>
      </ul>
    </article>

    <!--联系我-->
    <article id="contact" class="contact">
      <h2>CONTACT ME</h2>
      <p class="des">有任何问题请联系我吧，收到消息后会给您回复邮件的哦♪(^∇^*)</p>
      <div class="info">
        <el-form
          label-position="top"
          :model="contactForm"
          ref="contactForm"
          :rules="contactFormRules"
        >
          <el-form-item label="Your Name" prop="name">
            <el-input
              v-model="contactForm.name"
              placeholder="请输入您的称呼"
            ></el-input>
          </el-form-item>
          <el-form-item label="Your Email" prop="email">
            <el-input
              v-model="contactForm.email"
              placeholder="请输入您的邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="Subject" prop="subject">
            <el-input
              v-model="contactForm.subject"
              placeholder="请输入主题"
            ></el-input>
          </el-form-item>
          <el-form-item label="Your Message" prop="message">
            <el-input
              type="textarea"
              :autosize="{ minRows: 5}"
              placeholder="请输入消息内容"
              v-model="contactForm.message">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onContactSubmit">Send</el-button>
          </el-form-item>
        </el-form>
      </div>
    </article>
  </div>
</template>

<script>
  export default {
    name: "index",
    async asyncData({$axios}) {

      //个人信息
      let personalData = {};
      try {
        personalData = (await $axios.get("/personal/get")).data.data
      } catch (e) {
      }

      //工作经历
      let experienceData = [];
      try {
        experienceData = (await $axios.get("/experience/get")).data.data
      } catch (e) {
      }

      return {
        personalData,
        experienceData
      }
    },
    data() {
      return {
        contactForm:{
          name : ""
          ,email : ""
          ,subject : ""
          ,message : ""
        }
        ,contactFormRules:{
          name: {required: true, type: 'string', trigger: "blur"},
          email: {required: true, type: 'email', trigger: "blur"},
          subject: {type: 'string', trigger: "blur"},
          message: {required: true, type: 'string', trigger: "blur"}
        }
      }
    },
    methods:{

      //联系方式提交
      onContactSubmit(){
        this.$refs["contactForm"].validate(valid=>{
          if (!valid)return;

          this.$axios
            .post("/contact/post",this.contactForm)
            .then(({data})=>{
              if (data.code){
                this.$message.error(data.msg);
              }else{
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs["contactForm"].resetFields();
              }
            })
            .catch(e=>{
              this.$message.error("连接服务器失败，请稍后重试");
            })
        });

      }
    }
  }
</script>

<style scoped lang="less">

  #Home {
    font-family: "Quicksand","Microsoft YaHei",sans-serif;

    > article {
      box-sizing: border-box;
      width: 100%;
      margin-bottom: 15px;
      box-shadow: 0 0 4px #ddd;
      padding: 25px 20px 35px;
      background-color: #fff;

      h1{
        width: 0;
        height: 0;
        overflow: hidden;
      }
      h2 {
        margin-bottom: 15px;
        font-size: 30px;
        letter-spacing: 3px;
      }

      > p.des {
        padding-bottom: 20px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
        text-indent: 2em;
        color: #444;
        font-size: 14px;
        letter-spacing: 4px;
        line-height: 30px;

        span {
          font-style: italic;
          color: #777777;
          text-decoration: line-through;
        }

        a {
          text-decoration: underline;
          color: #aaa;
        }
      }

      &.hello {
        div.info {
          display: flex;
          justify-content: space-between;
          width: 100%;

          .info-child {
            width: 47%;

            h3 {
              margin-bottom: 30px;
              font-weight: 400;
              font-size: 22px;
              color: #666;
            }

            &.info-left {
              display: flex;
              flex-direction: column;

              ul {
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                flex: 1;

                li {
                  display: flex;
                  word-wrap: break-word;

                  p.dt {
                    width: 40%;
                    font-weight: 700;
                  }

                  p.dd {
                    width: 60%;

                    a {
                      color: #616da1;
                      text-decoration: underline;
                    }
                  }
                }
              }
            }

            &.info-right {
              ul li {
                margin-bottom: 15px;

                &:last-child {
                  margin-bottom: 0;
                }

                p.lang {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 5px;
                  font-weight: 700;
                  letter-spacing: 2px;

                  span:nth-child(1) {
                    font-size: 14px;
                  }

                  span:nth-child(2) {
                    font-size: 12px;
                    color: #999;
                  }
                }

                p.level {
                  width: 100%;
                  height: 5px;
                  background-color: #ececec;

                  span {
                    display: block;
                    height: 5px;
                    background-color: #bfe2e6;
                  }
                }
              }
            }
          }
        }
      }

      &.article {
        .info {
          ul {
            position: relative;

            li {
              overflow: hidden;
              position: relative;
              box-sizing: border-box;
              width: 50%;

              div.img {
                padding-top: 60%;
                background: none no-repeat center center/cover;
              }

              div.cover {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 2;
                width: 100%;
                height: 100%;

                a {
                  display: block;
                  width: 100%;
                  height: 100%;
                  background-color: rgba(0, 0, 0, 0.5);
                  opacity: 0;
                  transition: opacity 0.3s;

                  p {
                    position: absolute;
                    font-weight: 700;
                    transition: 0.3s;
                  }

                  p:nth-child(1) {
                    top: 20%;
                    width: 100%;
                    text-align: center;
                    color: #fff;
                    font-size: 22px;
                    text-transform: uppercase;
                  }

                  p:nth-child(2) {
                    left: 50%;
                    bottom: 20%;
                    width: 30%;
                    height: 32px;
                    border-radius: 16px;
                    text-align: center;
                    line-height: 32px;
                    transform: translateX(-50%);
                    color: #000;
                    background-color: #bfe2e6;
                  }
                }
              }

              p.title {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 30px;
                background-color: rgba(0, 0, 0, 0.1);


                font-weight: 700;
                line-height: 30px;
                color: #fff;
                text-align: center;

                transition: bottom 0.3s;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }

              &:hover {
                div.cover {
                  a {
                    opacity: 1;

                    p:nth-child(1) {
                      top: 32%;
                    }

                    p:nth-child(2) {
                      bottom: 32%;
                    }
                  }
                }

                p.title {
                  bottom: -30px;
                }
              }


            }

            li:nth-child(1) {
              padding-bottom: 2px;
            }

            li:nth-child(2) {
              position: absolute;
              top: 0;
              right: 0;
              padding-left: 2px;
              height: 100%;

              div.img {
                height: 100%;
                padding-top: 0;
              }
            }

            li:nth-child(3) {

            }
          }
        }
      }

      &.work {
        ul {
          margin-top: 40px;

          li {
            display: flex;

            div.left {
              width: 200px;

              p.time {
                position: relative;
                left: 10px;
                top: -15px;
                width: 160px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-weight: bold;
                background-color: #bfe2e6;

                &::after {
                  position: absolute;
                  top: 0;
                  right: -30px;
                  content: "";
                  width: 0;
                  height: 0;
                  border: 15px solid transparent;
                  border-left-color: #bfe2e6;
                }
              }
            }


            &:last-child{
              div.right{
                border-color: transparent;
              }
            }
            div.right {
              box-sizing: border-box;
              flex: 1;
              padding-left: 20px;
              padding-right: 40px;
              padding-bottom: 40px;
              border-left: 2px solid #bfe2e6;

              h3 {
                position: relative;
                margin-bottom: 20px;
                margin-top: -10px;
                line-height: 25px;
                font-size: 20px;
                text-transform: uppercase;

                &::after {
                  position: absolute;
                  left: -23px;
                  top: 8px;
                  content: "";
                  width: 4px;
                  height: 4px;
                  background-color: #000000;
                }
              }

              p.img {
                margin-bottom: 20px;
              }

              p.company {
                color: #000;
                margin-bottom: 20px;
              }

              p.content {
                color: #777;
                letter-spacing: 1px;
                font-size: 16px;
              }
            }
          }
        }
      }

      &.contact{
        div.info{
          box-sizing: border-box;
          padding: 0 15px;
          /deep/ textarea{
            font-family: "Microsoft YaHei","sans-serif";
            box-sizing: border-box;
            width: 100%;
            height: 200px;
            background-color: #f2f2f2;
            border: 1px solid transparent;
            box-shadow: 0 0 1px #aaa;
            border-radius: 2px;
            outline: 0;
            transition: box-shadow 0.3s, border 0.3s;
          }
          /deep/ input[type=text]{
            width: 100%;
            height: 40px;
            background-color: #f2f2f2;
            border: 1px solid transparent;
            box-shadow: 0 0 1px #aaa;
            border-radius: 2px;
            outline: 0;
            transition: box-shadow 0.3s, border 0.3s;
          }
          /deep/ input[type=text]:focus,/deep/ textarea:focus{
            box-shadow: 0 0 5px rgba(82, 168, 236, 0.6);
            border: 1px solid rgba(82, 168, 236, 0.6);
          }
          .el-button{
            display: block;
            width: 100px;
            height: 40px;
            margin-top: 35px;
            border: 0;
            border-radius: 20px;
            box-shadow: 0 0 0 #bbb;
            background-color: #bfe2e6;
            font-weight: 700;
            font-size: 16px;
            letter-spacing: 2px;
            font-family: "Quicksand","Microsoft YaHei","sans-serif";
            color: #000;
            outline: 0;
            cursor: pointer;
            transition: box-shadow 0.3s;
            &:hover{
              box-shadow: 0 3px 5px #bbb;
            }
          }
        }

      }
    }
  }

</style>
