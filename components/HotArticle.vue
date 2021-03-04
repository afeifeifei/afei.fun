<template>
  <div id="HotArticle">
    <h4>Hot Articles</h4>
    <ul>
      <li><i>1</i><a href="" target="_blank">文章标题1文章标题1文章标题1文章标题1文章标题1</a></li>
      <li><i>2</i><a href="" target="_blank">文章标题2</a></li>
      <li><i>3</i><a href="" target="_blank">文章标题3</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "HotArticle"
  }
</script>

<style scoped lang="less">
  #HotArticle {
    box-sizing: border-box;
    width: 100%;

    font-family: "Quicksand","Microsoft YaHei","sans-serif";

    box-shadow: 0 0 4px #ddd;
    background-color: #fff;
    padding: 20px;

    > h4 {
      line-height: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e8e9e7;
      color: #383937;
      font-size: 16px;
    }

    ul {
      margin-top: 12px;

      li {
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        height: 40px;
        line-height: 40px;
        padding: 0 3px;

        i {
          display: block;
          width: 22px;
          height: 22px;
          margin-top: 9px;
          margin-right: 15px;
          border-radius: 50%;

          line-height: 16px;
          font-size: 16px;
          font-style: normal;
          color: #fff;
          text-align: center;
          font-weight: 100;
          font-family: "Pacifico","Microsoft YaHei","sans-serif";

        }

        a {
          display: block;
          flex: 1;
          color: #787977;
          font-size: 14px;
          text-decoration: none;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &:hover{
            color: #409EFF;
            text-decoration: underline;
          }
        }

        &:nth-child(1) i {
          background-color: #71a598;
        }

        &:nth-child(2) i {
          background-color: #6eb3a3;
        }

        &:nth-child(3) i {
          background-color: #93bbb2;
        }
      }
    }
  }
</style>
