<!--suppress ALL -->
<template>
<div id="links">
  <article class="title">
    <h2>友情链接</h2>
    <p style="margin-bottom: 5px">请在<nuxt-link :to="{name:'message'}">留言区</nuxt-link>申请友链，本站友链信息：</p>
    <p>名称：阿飞飞&gt;.&lt;</p>
    <p>主页：<span class="code">http://afei.fun</span></p>
    <p>图标：<span class="code">http://afei.fun/logo.png</span></p>
    <p>描述：一名没脱发的前端工程师😆</p>
  </article>
  <article class="linkList">
    <ul>
      <li v-for="item in linkData">
        <svg
          width="100%" height="100%"
          viewBox="0 0 800 400"
          preserveAspectRatio="none"
        >
          <path
            d="M 799.5 399.5 V 0.5 H 0.5 V 399.5 H 799.5"
            fill="none"
            stroke-dasharray="2400"
            stroke-dashoffset="2400"
          ></path>
        </svg>
        <a :href="item.url" target="_blank">
          <div class="top">
            <p
              class="logo"
              :style="{
              backgroundImage: `url(${item.logo})`
            }"
            ></p>
            <p class="name">{{item.name}}</p>
          </div>
          <p class="des">{{item.des}}</p>
        </a>
      </li>
    </ul>
  </article>
</div>
</template>

<script>
export default {
  name: "index",
  async asyncData({$axios}) {
    //获取所有友链数据
    let linkData = (await $axios.get("/link/getAll")).data.data;
    if (linkData.length === 0){
      linkData = new Array(11).fill({
        name: "阿飞飞>.<",
        url: "http://afei.fun",
        logo: "/logo.png",
        des: "一名没脱发的前端工程师😆"
      })
    }
    return {
      linkData
    }
  },
  data(){
    return {
    }
  }
}
</script>

<style scoped lang="less">
#links{
  article {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: "Quicksand", sans-serif;

    &.title{
      user-select: text;
    }

    &.linkList{
      padding: 25px 12.5px;
      ul{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li{
          position: relative;
          box-sizing: border-box;
          flex: 1;
          min-width: 260px;
          margin: 0 7.5px 15px;
          padding: 5px;
          background-color: rgba(27, 31, 35, 0.05);
          path{
            transition: 1s;
            stroke: #0123fd;
          }
          &:hover{
            path{
              stroke-dashoffset: 0;
              stroke: #0123fd;
            }
          }
          svg{
            position: absolute;
            top: 0;
            left: 0;
          }
          a{
            position: relative;
            z-index: 2;
            display: block;
            width: 100%;
            height: 100%;
            p{
              text-indent: 0;
              &.logo{
                overflow: hidden;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: center/cover;
              }
              &.name{
                flex: 1;
                font-size: 14px;
                height: 50px;
                margin-left: 15px;
                line-height: 50px;
                color: #409eff;
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
              }
              &.des{
                font-size: 12px;
                height: 60px;
                word-break: break-all;
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
            }
            div.top{
              display: flex;
            }
          }


        }
      }
    }

    h2{
      margin-bottom: 15px;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 24px;
      border-left: 5px solid rgb(115, 184, 153);
      text-indent: 10px;
    }
    p{
      text-indent: 2em;
      color: #444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;

      span.code{
        color: #bd4147;
        background-color: rgba(27,31,35,.05);
        font-weight: bold;
      }
      a{
        color: #409eff;
        &:hover{
          color: #66b1ff;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>














