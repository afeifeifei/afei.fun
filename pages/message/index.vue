<template>
  <div id="message">
    <article class="title">
      <h2>留言板</h2>
      <p class="tip">请文明发言，禁止广告。不然拉黑了嗷\(^o^)/~</p>
      <el-input
        ref="textarea"
        type="textarea"
        autofocus
        v-model="value"
        maxlength="100"
        show-word-limit
      ></el-input>
      <div class="btn">
        <i class="iconfont icon-biaoqing" @click.stop="handleShowEmoji"></i>
        <el-button size="mini" type="primary" @click="handleSubmit">发表</el-button>
        <div v-show="ifShowEmoji" class="emoji" @click.stop>
          <ul>
            <li
              v-for="(item,index) in emoji"
              @click="handleEmojiClick(index)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </article>
    <article class="message">
      <ul>
        <li class="first" v-for="(item,index) in messageList">
          <div class="left">
            <img :src="item.user.photo" alt="">
            <span v-if="item.user.admin" class="admin" title="管理员"></span>
          </div>
          <div class="right">
            <p class="name">{{ item.user.nickname }} <span>{{ item.time | fmtTime }}</span></p>
            <pre class="content">{{ item.content }}</pre>
            <div class="like-reply">
              <i
                class="like iconfont icon-xinaixin"
                @click="handleLikesClick(item,item)"
                :class="{
                  liked: item.likes.indexOf(userInfo._id) !== -1
                }"
              ></i>
              <span class="like-num">{{ item.likes.length }}</span>
              <i
                class="reply iconfont icon-huifu"
                @click="handleReplyClick(index,item,item)"
              ></i>
              <el-popconfirm
                v-if="userInfo.admin"
                title="确认删除？"
                @confirm="handleDelete(item)"
              >
                <i
                  class="delete iconfont icon-tubiaozhizuo-1"
                  slot="reference"
                ></i>
              </el-popconfirm>
            </div>
            <div class="second" v-for="(childItem,childIndex) in item.children">
              <div class="left">
                <img :src="childItem.user.photo" alt="">
                <span v-if="childItem.user.admin" class="admin" title="管理员"></span>
              </div>
              <div class="right">
                <p class="name">{{ childItem.user.nickname }} <span>{{ childItem.time | fmtTime }}</span></p>
                <p class="content">
                  <span>@{{ childItem.reply.nickname }}</span>
                  {{ childItem.content }}
                </p>
                <div class="like-reply">
                  <i
                    class="like iconfont icon-xinaixin"
                    @click="handleLikesClick(childItem, item)"
                    :class="{
                      liked: childItem.likes.indexOf(userInfo._id) !== -1
                    }"
                  ></i>
                  <span class="like-num">{{ childItem.likes.length }}</span>
                  <i
                    class="reply iconfont icon-huifu"
                    @click="handleReplyClick(index,childItem,item)"
                  ></i>
                  <el-popconfirm
                    v-if="userInfo.admin"
                    title="确认删除？"
                    @confirm="handleDelete(item,childIndex)"
                  >
                    <i
                      class="delete iconfont icon-tubiaozhizuo-1"
                      slot="reference"
                    ></i>
                  </el-popconfirm>
                </div>
              </div>
            </div>
            <div
              class="reply-textarea slideUp"
              :ref="'reply'+index"
            >
              <el-input
                :ref="'reply_textarea_'+index"
                type="text"
                size="mini"
                v-model="item.replyText"
                maxlength="100"
                show-word-limit
                :placeholder="'@'+item.replyUser.nickname"
              ></el-input>
              <el-button
                type="primary"
                size="mini"
                @click="handleReplySubmit(item)"
              >提交
              </el-button>
            </div>
          </div>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex"

export default {
  name: "index",
  async asyncData({$axios}) {
    //请求所有留言数据
    let messageList = []
    try {
      messageList = (await $axios.get("/messages")).data.data
    } catch (e) {
    }
    messageList.forEach(item => {
      item.replyUser = item.user
      item.replyText = ""
    })
    return {
      messageList
    }
  },
  data() {
    return {
      value: "",
      replayValue: "",
      ifShowEmoji: false,
      emoji: [
        "😃", "😁", "😂", "😊", "🙃", "🥰", "😘", "🤭", "🤔", "😏",
        "😵", "😟", "🙁", "😳", "😰", "😭", "😖", "😡", "😠", "😈",
        "🤡", "☠️", "👻", "🙈", "🙉", "❤️", "💖", "💢", "💣", "💤",
        "👋", "👍", "👌", "🤞", "🤟", "🤙", "👊", "🖕", "🤝", "🙏",
        "🙅", "🙅‍♂️", "👨‍✈️", "👩‍✈️", "👷", "👷‍♀️", "🤦", "🤦‍♂️", "👴", "🧓",
        "🐴", "🐮", "🐖", "🐑", "🐓", "🦚", "🐲", "🐳", "🐟", "🐌",
      ]
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {

    //emoji表情点击
    handleEmojiClick(index) {
      this.value += this.emoji[index]
      this.$refs.textarea.focus()
    },
    //打开emoji面板
    handleShowEmoji() {
      this.ifShowEmoji = !this.ifShowEmoji
    },

    //留言提交
    async handleSubmit() {
      let content = this.value.trim();

      //检测是否登录
      if (!this.userInfo._id) {
        return this.$message.error("请先登录")
      }

      //检测是否有内容
      if (!content) {
        return this.$message.error("请输入留言内容")
      }

      //检测是否过多换行
      if (content.match(/[\n]/g) && (content.match(/[\n]/g).length > 5)) {
        return this.$message.error("换行请不要超过5行")
      }

      //发送到后端
      try {
        let {data} = await this.$axios({
          method: "post"
          , url: "/messages"
          , data: {
            content,
            _id: this.userInfo._id
          }
        })

        //后端返回错误
        if (data.code !== 0) {
          return this.$message.error(data.msg)
        }

        //后端返回成功
        this.$message({
          type: "success",
          message: data.msg,
          duration: 1000,
          onClose() {
            window.location.reload();
          }
        })

      } catch (e) {
        this.$message.error("请求出错，请稍后再试")
      }

    },

    //点赞
    async handleLikesClick(thisItem, item) {
      let userId = this.userInfo._id

      //检测是否登陆
      if (!userId) {
        return this.$message.error("请先登录")
      }
      console.log(thisItem);
      //检测是否点过赞
      let index = thisItem.likes.indexOf(userId)
      if (index === -1) {
        //没点过赞
        thisItem.likes.push(userId);
      } else {
        //点过赞
        thisItem.likes.splice(index, 1);
      }

      //后端更新
      await this.$axios({
        method: "post",
        url: "/messages/likes",
        data: {item}
      })

    },

    //回复展开
    async handleReplyClick(index, thisItem, item) {
      //检测是否登录
      if (!this.userInfo._id) {
        return this.$message.error("请先登录")
      }
      //展开与收起

      let ref = this.$refs['reply' + index][0]
      let input = this.$refs['reply_textarea_' + index][0]

      //判断是否同一次点击
      if (item.replyUser._id === thisItem.user._id) {
        ref.classList.toggle('slideUp')
      } else {
        item.replyUser = thisItem.user
        ref.classList.remove("slideUp")
      }
      //聚焦
      !ref.classList.contains("slideUp") && input.focus();

      //其他item隐藏
      this.messageList.forEach((messageItem, messageIndex) => {
        if (messageIndex === index) return
        this.$refs['reply' + messageIndex][0].classList.add("slideUp")
      })
    },

    //回复提交
    async handleReplySubmit(item) {
      let value = item.replyText.trim()
      let userId = this.userInfo._id
      //检测是否登录
      if (!userId) {
        return this.$message.error("请先登录")
      }
      //检测内容是否存在
      if (!value) {
        return this.$message.error("请输入回复内容")
      }
      //发送请求给后端
      try {
        let {data} = await this.$axios({
          method: "post"
          , url: "/messages/reply"
          , data: {
            messageId: item._id
            , content: value
            , userId: userId
            , replyId: item.user._id
          }
        })

        if (data.code !== 0) {
          return this.$message.error("提交出错，请稍后再试")
        }

        this.$message({
          type: "success",
          duration: 1000,
          message: "提交成功",
          onClose() {
            window.location.reload()
          }
        })

      } catch (e) {
        this.$message.error("提交出错，请稍后再试")
      }
    },

    //留言&回复 删除
    async handleDelete(item,index){

      if (index === undefined){
        //删除留言
      }else{
        //删除回复
      }

    }
  },
  mounted() {
    document.addEventListener("click", () => {
      try {
        this.ifShowEmoji = false
      } catch (e) {
      }
    })
  },
  filters: {
    //将时间数字格式化
    fmtTime(time) {
      let date = new Date(time),
        YY = date.getFullYear(),
        MM = date.getMonth() + 1,
        DD = date.getDate(),
        hh = date.getHours(),
        mm = date.getMinutes(),
        ss = date.getSeconds();

      MM = (MM < 10 ? "0" : "") + MM;
      DD = (DD < 10 ? "0" : "") + DD;
      hh = (hh < 10 ? "0" : "") + hh;
      mm = (mm < 10 ? "0" : "") + mm;
      ss = (ss < 10 ? "0" : "") + ss;
      return `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`
    },
  }
}
</script>

<style scoped lang="less">
#message {
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

    &.title {
      p {
        text-indent: 2em;
        color: #444;
        font-size: 14px;
        letter-spacing: 4px;
        line-height: 30px;

        &.tip {
          margin-bottom: 20px;
        }
      }

      /deep/ .el-textarea {
        min-height: 80px;

        textarea {
          min-height: 80px !important;
          font-family: "Quicksand", "微软雅黑", sans-serif;
          color: #444;
          font-size: 14px;
          letter-spacing: 4px;
          line-height: 30px;
        }
      }

      .btn {
        position: relative;
        margin-top: 10px;

        i.iconfont {
          font-size: 20px;
          cursor: pointer;
        }

        .el-button {
          float: right;
        }

        .emoji {
          position: absolute;
          z-index: 3;
          top: 28px;
          width: 300px;
          height: 180px;
          padding: 7px;
          background-color: #fff;
          box-shadow: 0 0 5px #aaa;

          &::before {
            content: "";
            position: absolute;
            top: -10px;
            left: 5px;
            width: 0;
            height: 0;
            border: 5px solid transparent;
            border-bottom-color: #aaa;
          }

          ul {
            width: 300px;
            height: 180px;
            border-top: 1px solid #ddd;
            border-left: 1px solid #ddd;

            li {
              float: left;
              box-sizing: border-box;
              width: 30px;
              height: 30px;
              border-right: 1px solid #ddd;
              border-bottom: 1px solid #ddd;
              font-size: 20px;
              text-align: center;
              line-height: 29px;
              cursor: pointer;
            }
          }
        }
      }
    }

    &.message {
      > ul {
        > li {
          font-size: 12px;

          .iconfont {
            font-size: 14px;
          }

          &.first {
            display: flex;
            font-family: "Microsoft YaHei", "sans-serif";
            margin-bottom: 10px;
            border-bottom: 1px dashed #ddd;

            .left {
              position: relative;
              width: 40px;
              height: 40px;
              margin-right: 15px;

              img {
                overflow: hidden;
                display: block;
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }

              .admin {
                position: absolute;
                right: 0;
                bottom: 0;
                background-color: red;
                width: 16px;
                height: 16px;
                background: url("~static/img/admin.png") no-repeat center/cover;
              }
            }

            .right {
              flex: 1;

              p.name {
                font-size: 12px;
                color: #73b899;
                margin-bottom: 3px;

                span {
                  font-size: 12px;
                  color: #aaa;
                  margin-left: 10px;
                }
              }

              pre.content {
                color: #666;
                letter-spacing: 2px;
                margin-bottom: 3px;
                font-family: "Microsoft YaHei", "sans-serif";
              }

              .like-reply {
                color: #aaa;

                .like {
                  cursor: pointer;

                  &.liked {
                    color: #d40303;
                  }
                }

                .like-num {
                  display: inline-block;
                  width: 43px;
                }

                .reply {
                  position: relative;
                  top: 2px;
                  cursor: pointer;
                }

                .delete {
                  cursor: pointer;
                }
              }

              .second {
                display: flex;
                margin: 5px 0;

                p.name {
                  margin-bottom: 2px;
                }

                p.content {
                  margin-bottom: 3px;
                  color: #666;
                  font-family: "Microsoft YaHei", "sans-serif";

                  span {
                    color: #409eff;
                    margin-right: 5px;
                  }
                }
              }
            }

            .reply-textarea {
              box-sizing: border-box;
              margin: 5px 0;
              overflow: hidden;
              height: 56px;
              transition: .3s;

              /deep/ input {
                font-family: "Microsoft YaHei", "sans-serif";
                font-size: 12px;
              }

              &.slideUp {
                height: 0;
                margin: 0;
              }
            }
          }

        }
      }
    }

  }
}
</style>














