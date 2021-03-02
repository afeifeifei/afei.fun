<template>
  <div
    id="Side"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
    :class="{enter: addEnter}"
  >
    <!--个人信息-->
    <Personal></Personal>

    <!--滚动过程中固定-->
    <!--滚动过程中固定-->
    <div class="sticky" :class="{fixed:ifSticky}" ref="sticky">
      <!--热门文章推荐-->
      <HotArticle></HotArticle>
      <!--访客列表-->
      <Visitors></Visitors>
    </div>
  </div>
</template>

<script>
export default {
  name: "Side",
  data(){
    return {
      ifSticky: false,
      addEnter: false,
      enterTimer: null
    }
  },
  methods:{
    handleEnter(){
      clearTimeout(this.enterTimer);
      this.addEnter = true;
    },
    handleLeave(){
      clearTimeout(this.enterTimer);
      this.enterTimer = setTimeout(()=>{
        this.addEnter = false;
      },1000)
    }
  },
  mounted() {
    //滚动页面监听高度变化
    window.onscroll = (function m(){
      if ( document.documentElement.offsetHeight <= (65+290+15+this.$refs["sticky"].clientHeight+56)){
        this.ifSticky = false
        return
      }
      let scrollTop = document.documentElement.scrollTop
      this.ifSticky = scrollTop>=245
      return m.bind(this);
    }).bind(this);
  }
}
</script>

<style scoped lang="less">
#Side{
  width: 100%;
  opacity: .5;
  transition: opacity 1s;

  &.enter{
    opacity: 1;
  }

  .sticky{
    box-sizing: border-box;
    width: 270px;
    margin-top: 15px;
    &.fixed{
      position: fixed;
      top: 50px;
    }
  }
}
</style>














