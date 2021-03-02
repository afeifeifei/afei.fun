<template>
  <div id="root">
    <!--导航-->
    <AppNav></AppNav>
    <!--内容-->
    <div class="root_content">
      <!--左侧边栏-->
      <div class="r_c_left">
        <Side></Side>
      </div>
      <!--右侧内容-->
      <div class="r_c_right">
        <Nuxt></Nuxt>
      </div>
    </div>
    <!--备案号-->
    <p class="root_copy">湘ICP备19002644号</p>
    <!--漂浮猫爪-->
    <Kitty></Kitty>
  </div>
</template>
<script>
export default {
  name: "default",
  mounted() {
  }
}
</script>
<style lang="less">
//背景色与背景图
body {
  background: url("/img/bg/bg-left.png") no-repeat left 50px, url("/img/bg/bg-right.png") no-repeat calc(90% + 210px) 50px;
  background-color: #f2f2f2;
  background-attachment: fixed;
  user-select: none;
}

//滚动条样式
::-webkit-scrollbar {/*滚动条整体样式*/
  width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,167,232,.3);
}
::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 10px;
  background: #EDEDED;
}

//root样式
#root{
  .root_content{
    display: flex;
    box-sizing: border-box;
    max-width: 1300px;
    padding: 65px 15px 0;
    margin: 0 auto;
    .r_c_left{
      width: 270px;
      margin-right: 15px;
    }
    .r_c_right{
      flex: 1;
    }
  }
  p.root_copy{
    padding: 20px 0;
    font-weight: 400;
    text-align: center;
    font-size: 12px;
    letter-spacing: 2px;
  }
}
</style>
