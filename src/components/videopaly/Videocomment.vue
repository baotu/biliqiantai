<template>
  <div class="list-item">
    <div class="user-face">
      <a href="#">
        <img :src="vtodo.xyuserinfo.userphoto" alt>
      </a>
      <!-- <div class="hot-follow">
        <el-button type="primary">关注</el-button>
      </div> -->
    </div>
    <div class="con" :class="{'no-border':noborder}">
      <div class="user">
        <!-- <span class="stick">UP</span> -->
        <a href="#" class="name">{{vtodo.xyuser.username}}</a>
        <a href="#">
          <i class="level" :class="levon"></i>
        </a>
      </div>
      <p class="text">
        <!-- <span class="stick">置顶</span> -->
        {{vtodo.commentcontain}}
      </p>
      <div class="info">
        <!-- <span class="floor">#1</span> -->
        <span class="time">{{vtodo.time}}</span>
        <span class="like" @click="like">
          <i :class="likeOrhaldstats"></i>
          <span>{{vtodo.commentup}}</span>
        </span>
        <span class="hate" @click="hate">
          <i :class="likeOrhaldstats"></i>
          <span>{{vtodo.commentdown}}</span>
        </span>
        <span class="reply" @click="reply">回复</span>
        <span class="reply" @click="morereply">
          <template v-if="!isshow">查看回复</template>
          <template v-if="isshow">收起回复</template>
        </span>
      </div>
      <div class="reply-box" v-show="isshow">
        <template v-for="(item, index) in response">
          <Videoreply :replylist="item" :levon="levon" :key="index"></Videoreply>
        </template>
        <el-pagination
          small
          layout="prev, pager, next"
          :total="replycount"
          :page-size="5"
          :current-page="replyindex"
          @current-change="pageGo"
          @prev-click="prevGo"
          @next-click="nextGo"
          v-if="replycount!=0"
        ></el-pagination>
      </div>
      <div class="comment-send" v-show=" vtodo === vftodo && rps ">
        <div class="user-face">
          <img :src="islogio.imgurl" alt>
        </div>
        <div class="textarea-container">
          <el-input
            type="textarea"
            :rows="2"
            :placeholder="islogio.placeholders"
            :title="islogio.placeholders"
            resize="none"
            :disabled="islogio.disshow"
            v-model.trim="input"
          ></el-input>
          <el-button type="primary" :disabled="islogio.disshow" @click="commitreply">发表评论</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Videoreply from "./Videoreply";
import store from "@/store.js";
export default {
  store,
  name: "videocomments",
  props: ["noborder", "todo", "ftodo"],
  components: {
    Videoreply
  },
  methods: {
    // 发表回复 按钮
    reply() {
      this.rps ? (this.rps = false) : (this.rps = true);
      this.$emit("handtodo", this.vtodo);
    },
    // 查看更多回复
    morereply() {
      if (!this.isshow) {
        this.isshow = true;
        if (this.response.length) return;
        this.queryResponse(this.replyindex);
      } else {
        this.isshow = false;
      }
      // this.isshow ? (this.isshow = false) : (this.isshow = true);
    },
    //点赞
    like() {
      if (JSON.stringify(store.state.user) == "{}") return;
      this.likeOrhate("xyvideocomment/updateAddUpById.do", "like");
    },
    //踩
    hate() {
      if (JSON.stringify(store.state.user) == "{}") return;
      this.likeOrhate("xyvideocomment/updateAddDownById.do", "hate");
    },
    // 点赞与踩的计算方法
    likeOrhate(url, type) {
      const viId = this.$route.query.vdId;
      this.axios
        .get(url, {
          params: { videocommentid: this.vtodo.commentid, videoid: viId }
        })
        .then(rs => {
          if (type === "like") {
            if (rs.data.xyuser == 0) {
              if (this.vtodo.clickupstatus != undefined)
                this.vtodo.commentdown--;
              this.vtodo.commentup++;
              this.$set(this.vtodo, "clickupstatus", true);
            } else if (rs.data.xyuser == 1) {
              this.vtodo.commentup--;
              this.$delete(this.vtodo, "clickupstatus");
            }
          } else {
            if (rs.data.xyuser == 0) {
              if (this.vtodo.clickupstatus != undefined) this.vtodo.commentup--;
              this.vtodo.commentdown++;
              this.$set(this.vtodo, "clickupstatus", false);
            } else if (rs.data.xyuser == 1) {
              this.vtodo.commentdown--;
              this.$delete(this.vtodo, "clickupstatus");
            }
          }
        });
    },
    //查询 回复
    queryResponse(index) {
      const commid = this.vtodo.commentid;
      this.axios
        .get("xyvideoreply/findPageByCommentid.do", {
          params: { commentid: commid, page: index }
        })
        .then(rs => {
          this.response = rs.data.xyuser;
          this.replycount = rs.data.count;
        });
    },
    commitreply() {
      if (!this.input.length) return;
      const commid = this.vtodo.commentid;
      this.axios
        .get("xyvideoreply/insertByUserId.do", {
          params: { commentid: commid, vrcontent: this.input }
        })
        .then(rs => {
          if (rs.data.xyuser === 1) {
            this.$notify({
              title: "成功",
              message: "回复成功",
              type: "success",
              onClose: () => {
                this.input = "";
                this.queryResponse(this.replyindex);
              },
              duration: 1000
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: "回复失败",
              duration: 1000
            });
          }
        });
    },
    pageGo(index) {
      this.replyindex = index;
      this.queryResponse(index);
    },
    nextGo(index) {
      this.replyindex = index;
      this.queryResponse(index);
    },
    prevGo(index) {
      this.replyindex = index;
      this.queryResponse(index);
    },
    islogioto() {
      if (JSON.stringify(store.state.user) == "{}") {
        this.islogio = {
          disshow: true,
          placeholders: "请先登录后发表评论 (・ω・)",
          imgurl: "http://cdn.hwzhj.top/img/default.gif"
        };
      } else {
        this.islogio = {
          disshow: false,
          placeholders: "请输入内容",
          imgurl: store.state.user.xyuserinfo.userphoto
        };
      }
    }
  },
  computed: {
    vtodo() {
      return this.todo;
    },
    vftodo() {
      return this.ftodo;
    },
    levon() {
      return `i${this.vtodo.xyuser.gradeid}`;
    },
    likeOrhaldstats() {
      if (this.vtodo.clickupstatus != undefined) {
        return this.vtodo.clickupstatus ? "cur" : "cus";
      }
      return "";
    }
  },
  data() {
    return {
      input: "",
      rps: false,
      isshow: false,
      response: [],
      replycount: 0,
      replyindex: 1,
      islogio: {}
    };
  },
  created() {
    // this.queryResponse();
  },
  mounted() {
    this.islogioto();
  }
};
</script>

<style lang="scss" scoped>
.list-item {
  a {
    outline: none;
    color: #00a1d6;
    text-decoration: none;
    cursor: pointer;
  }
  /deep/.user-face {
    float: left;
    margin: 15px 0 0 5px;
    position: relative;
    a {
      outline: none;
      color: #00a1d6;
      text-decoration: none;
      cursor: pointer;
      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
    }
    .hot-follow {
      text-align: center;
      position: relative;
      top: 7px;
      .el-button--primary {
        width: 48px;
        height: 24px;
        padding: 0;
        margin-top: 0px;
      }
    }
  }
  .con {
    position: relative;
    margin-left: 85px;
    padding: 22px 0 14px;
    border-top: 1px solid #e5e9ef;
    .stick {
      border: 1px solid #ff81aa;
      min-width: 30px;
      display: inline-block;
      height: 18px;
      line-height: 18px;
      text-align: center;
      font-size: 12px;
      border-radius: 3px;
      margin-right: 5px;
      vertical-align: middle;
      font-weight: 400;
      color: #fb7299;
      border-color: #fb7299;
    }
    /deep/.user {
      font-size: 12px;
      font-weight: 700;
      line-height: 18px;
      padding-bottom: 4px;
      display: block;
      word-wrap: break-word;
      a {
        outline: none;
        color: #00a1d6;
        text-decoration: none;
        cursor: pointer;
        vertical-align: middle;
        display: inline;
        &.name {
          color: #fb7299;
        }
        i {
          display: inline-block;
          width: 19px;
          height: 9px;
          vertical-align: middle;
          margin: 0 8px;
          background: url(../../../public/images/icons-comment.png) no-repeat;
          &.i7 {
            background-position: -23px -476px;
          }
          &.i6 {
            background-position: -23px -412px;
          }
          &.i5 {
            background-position: -23px -348px;
          }
          &.i4 {
            background-position: -23px -284px;
          }
          &.i3 {
            background-position: -23px -220px;
          }
          &.i2 {
            background-position: -23px -156px;
          }
          &.i1 {
            background-position: -23px -92px;
          }
        }
      }
      .text-con {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        word-break: break-all;
      }
    }
    .text {
      line-height: 20px;
      padding: 2px 0;
      font-size: 14px;
      text-shadow: none;
      overflow: hidden;
      word-wrap: break-word;
      word-break: break-word;
    }
    /deep/.info {
      color: #99a2aa;
      line-height: 26px;
      font-size: 12px;
      span {
        margin-right: 20px;
        &.like {
          margin-right: 0px;
          cursor: pointer;
          i {
            display: inline-block;
            width: 14px;
            height: 14px;
            vertical-align: text-top;
            margin-right: 5px;
            background: url(../../../public/images/icons-comment.png);
            background-position: -153px -25px;
            &.cur {
              background-position: -153px -88px;
            }
          }
        }
        &.hate {
          cursor: pointer;
          margin-right: 10px;
          i {
            display: inline-block;
            width: 14px;
            height: 14px;
            vertical-align: text-top;
            margin-right: 5px;
            background: url(../../../public/images/icons-comment.png);
            background-position: -153px -153px;
            &.cus {
              background-position: -153px -217px;
            }
          }
        }
        &.reply {
          padding: 0 5px;
          border-radius: 4px;
          margin-right: 15px;
          cursor: pointer;
          display: inline-block;
        }
        &:hover.reply {
          color: #00a1d6;
          background: #e5e9ef;
        }
      }
    }
    .comment-send {
      .textarea-container {
        /deep/.el-textarea {
          width: 75%;
        }
      }
    }
  }
  .no-border {
    border-top: none;
  }
}
</style>
