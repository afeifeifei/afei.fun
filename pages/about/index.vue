<template>
<div id="about">
  <!--关于我-->
  <article class="me">
    <h2>ABOUT ME</h2>
    <p>帅气这个形容词，大概就是为我而创造的吧😏</p>
    <p>谢谢你这么好看还这么关注我鸭！我叫阿飞，你可以亲切的叫我阿飞飞！或者宝贝、老公…</p>
    <p>有必要强调一下！我还没有脱发！大概是写的代码还不够多...</p>
  </article>
  <!--关于本站-->
  <article class="site">
    <h2>ABOUT SITE</h2>
    <p>前&nbsp;&nbsp;端：<span class="code">Vue + Element</span></p>
    <p>后&nbsp;&nbsp;端：<span class="code">Node + Nuxt + Express + Mongodb</span></p>
    <p style="border-bottom: 1px dotted #aaa">服务器：<a href="https://www.aliyun.com/1111/new?userCode=xqfx5ty6" target="_blank">阿里云ECS</a></p>
    <p>这个博客我在2014年就开始构思了，终于在2021年上线了！我真棒！😂</p>
    <p>这不能怪我...真的...每当我好不容易挤点时间写好代码准备上线时，总有前端技术在这个时间点做大的更新...ES2015、Node、Vue、Nuxt...我也很绝望啊，每次都是推翻重写，裂开...</p>

  </article>
  <!--关于版权-->
  <article class="copyright">
    <h2>ABOUT COPYRIGHT</h2>
    <p>源码开源：<a href="https://github.com/afeifeifei/afei.fun" target="_blank">阿飞飞的github</a></p>
    <p>在注明出处的前提下，本站文章允许非商业用途的转载。</p>
  </article>
  <!--其他说明-->
  <article class="other">
    <h2>OTHER</h2>
    <p>我是一名前端开发者，也是一名前端技术讲师（2014年开始在线授课），如果有合作相关事宜的话，可以通过 <a href="/#contact">contact me</a> 联系我。或者可以在👈左侧边栏找到我的联系方式哦。</p>
  </article>
</div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped lang="less">
#about{
  article{
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: "Quicksand", sans-serif;

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














