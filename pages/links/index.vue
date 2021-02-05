<template>
<div id="links">
  <article class="title"></article>
  <article class="linkList"></article>
</div>
</template>

<script>
export default {
  name: "index"
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

    h2 {
      margin-bottom: 15px;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 24px;
      border-left: 5px solid rgb(115, 184, 153);
      text-indent: 10px;
    }
  }
}
</style>














