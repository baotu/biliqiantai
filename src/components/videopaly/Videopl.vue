<template>
  <div class="videopl">
    <div class="common">
      <div class="common-head">
        <span class="result">{{pagetotal}}</span>
        <span>评论</span>
      </div>
      <div class="commit">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部评论" name="all">
            <div class="comment-send">
              <div class="user-face">
                <img :src="islogio.imgurl" alt>
              </div>
              <div class="textarea-container">
                <el-input
                  type="textarea"
                  :rows="5"
                  :placeholder="islogio.placeholders"
                  :title="islogio.placeholders"
                  resize="none"
                  v-model.trim="topinput"
                  :disabled="islogio.disshow"
                ></el-input>
                <el-button type="primary" :disabled="islogio.disshow" @click="subreply('top')">发表评论</el-button>
              </div>
            </div>
            <!-- 如果 评论为空则隐藏 -->
            <template v-if="replyList.length">
              <div class="comment-list">
                <template v-for="(item, index) in replyList">
                  <Videocomment
                    :todo="item"
                    :ftodo="reply"
                    @handtodo="countAdd"
                    :noborder=" index==0 ? true : false"
                    :key="item.commentid"
                  ></Videocomment>
                </template>
              </div>
              <div class="bottom-page paging-box-big">
                <div class="block">
                  <el-pagination
                    :current-page="currentPage"
                    :page-size="5"
                    layout="total, prev, pager, next, jumper"
                    :total="pagetotal"
                    @current-change="pageGo"
                    @prev-click="prevGo"
                    @next-click="nextGo"
                  ></el-pagination>
                </div>
              </div>
              <div class="comment-send">
                <div class="user-face">
                  <img :src="islogio.imgurl" alt>
                </div>
                <div class="textarea-container">
                  <el-input
                    type="textarea"
                    :rows="5"
                    :placeholder="islogio.placeholders"
                    :title="islogio.placeholders"
                    resize="none"
                    v-model.trim="bottominput"
                    :disabled="islogio.disshow"
                  ></el-input>
                  <el-button
                    type="primary"
                    :disabled="islogio.disshow"
                    @click="subreply('bottom')"
                  >发表评论</el-button>
                </div>
              </div>
            </template>
          </el-tab-pane>
          <el-tab-pane label="按热度排序" name="hot">
            <div class="comment-send">
              <div class="user-face">
                <img :src="islogio.imgurl" alt>
              </div>
              <div class="textarea-container">
                <el-input
                  type="textarea"
                  :rows="5"
                  :placeholder="islogio.placeholders"
                  :title="islogio.placeholders"
                  resize="none"
                  v-model.trim="topinput"
                  :disabled="islogio.disshow"
                ></el-input>
                <el-button type="primary" :disabled="islogio.disshow" @click="subreply('top')">发表评论</el-button>
              </div>
            </div>
            <!-- 如果 评论为空则隐藏 -->
            <template v-if="hotpl.length">
              <div class="comment-list">
                <template v-for="(item, index) in hotpl">
                  <Videocomment
                    :todo="item"
                    :ftodo="reply"
                    @handtodo="countAdd"
                    :noborder=" index==0 ? true : false"
                    :key="item.commentid"
                  ></Videocomment>
                </template>
              </div>
              <div class="bottom-page paging-box-big">
                <div class="block">
                  <el-pagination
                    :current-page="currentPage"
                    :page-size="5"
                    layout="total, prev, pager, next, jumper"
                    :total="hottotal"
                    @current-change="hotpageGo"
                    @prev-click="hotprevGo"
                    @next-click="hotnextGo"
                  ></el-pagination>
                </div>
              </div>
              <div class="comment-send">
                <div class="user-face">
                  <img :src="islogio.imgurl" alt>
                </div>
                <div class="textarea-container">
                  <el-input
                    type="textarea"
                    :rows="5"
                    :placeholder="islogio.placeholders"
                    :title="islogio.placeholders"
                    resize="none"
                    v-model.trim="bottominput"
                    :disabled="islogio.disshow"
                  ></el-input>
                  <el-button
                    type="primary"
                    :disabled="islogio.disshow"
                    @click="subreply('bottom')"
                  >发表评论</el-button>
                </div>
              </div>
            </template>
          </el-tab-pane>
        </el-tabs>
        <!-- <template>
          <div class="no-repeat">
            <p>还没有人评论噢.赶快占个楼...</p>
          </div>
        </template>-->
      </div>
    </div>
  </div>
</template>

<script>
import Videocomment from "./Videocomment";
import store from "@/store.js";
export default {
  store,
  name: "videopl",
  data() {
    return {
      activeName: "all",
      topinput: "",
      bottominput: "",
      currentPage: 1,
      pagetotal: null,
      reply: null,
      replyList: [],
      replylikeOrhald: [],
      islogio: {},
      hotpl: [],
      hotPage: 1,
      hottotal: null,
    };
  },
  components: {
    Videocomment
  },
  methods: {
    handleClick(tab, event) {
      if(event.target.innerHTML=="全部评论"){
        this.getpl(this.currentPage);
      }else{
        this.gethotpl(this.hotPage);
      }
    },
    // 判断点击回复的是否为当前回复
    countAdd(todo) {
      this.reply = todo;
    },
    //分页获取评论
    getpl(index) {
      const vid = this.$route.query.vdId;
      this.axios
        .get("xyvideocomment/findPageByVideoId.do", {
          params: { videoid: vid, page: index }
        })
        .then(rs => {
          // //console.log(rs);
          this.pagetotal = rs.data.count;
          this.replyList = rs.data.xyuser;
          const user = store.state.user;
          if (JSON.stringify(user) != "{}") {
            this.axios
              .get("xyclickup/findByUseridAndVideoId.do", {
                params: { videoid: vid }
              })
              .then(rs => {
                this.replylikeOrhald = rs.data.xyuser;
                this.diffLike();
              });
          }
        });
    },
    //提交评论
    subreply(value) {
      const vid = this.$route.query.vdId;
      let commit = "";
      if (value == "top") {
        if (!this.topinput.length) return;
        commit = this.topinput;
      } else {
        if (!this.bottominput.length) return;
        commit = this.bottominput;
      }
      this.axios
        .get("xyvideocomment/insertById.do", {
          params: { videoid: vid, commentcontain: commit }
        })
        .then(rs => {
          // //console.log(rs);
          if (rs.data.xyuser === 1) {
            this.$notify({
              title: "成功",
              message: "评论成功",
              type: "success",
              onClose: () => {
                this.topinput = "";
                this.bottominput = "";
                this.getpl(this.currentPage);
              },
              duration: 1000
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: "评论失败",
              duration: 1000
            });
          }
        });
    },
    // 页数改变
    pageGo(index) {
      this.currentPage = index;
      this.getpl(index);
    },
    // 下一页
    nextGo(index) {
      this.currentPage = index;
      this.getpl(index);
    },
    // 上一页
    prevGo(index) {
      this.currentPage = index;
      this.getpl(index);
    },
    //  查询 当前用户点赞过的评论
    diffLike() {
      let index = 0;
      // diff 双重遍历  遍历当前视频下的所有回复
      // 与当前用户在当前视频下所有点赞|踩过的回复进行二次遍历
      this.replyList.forEach(item => {
        this.replylikeOrhald.forEach(element => {
          //判断 用户点赞评论id 与 当前视频下的评论id 是否相等
          if (item.commentid === element.videocommentid) {
            // 为 0 则为点赞状态  为 1 则为踩状态
            element.clickupstatus == 0
              ? this.$set(this.replyList[index], "clickupstatus", true)
              : this.$set(this.replyList[index], "clickupstatus", false);
          }
        });
        index++;
      });
    },
    //  查询 当前用户点赞过的评论
    diffLikeHot() {
      let index = 0;
      // diff 双重遍历  遍历当前视频下的所有回复
      // 与当前用户在当前视频下所有点赞|踩过的回复进行二次遍历
      this.hotpl.forEach(item => {
        this.replylikeOrhald.forEach(element => {
          //判断 用户点赞评论id 与 当前视频下的评论id 是否相等
          if (item.commentid === element.videocommentid) {
            // 为 0 则为点赞状态  为 1 则为踩状态
            element.clickupstatus == 0
              ? this.$set(this.hotpl[index], "clickupstatus", true)
              : this.$set(this.hotpl[index], "clickupstatus", false);
          }
        });
        index++;
      });
    },
    // 判断当前用户是否登录的  小验证
    islogioto() {
      if (JSON.stringify(store.state.user) == "{}") {
        this.islogio = {
          disshow: true,
          placeholders: "请先登录后发表评论 (・ω・)",
          imgurl:'http://cdn.hwzhj.top/img/default.gif'
        };
      } else {
        this.islogio = {
          disshow: false,
          placeholders: "请输入内容",
          imgurl:store.state.user.xyuserinfo.userphoto
        };
      }
    },
    //查询5条  热门评论
    gethotpl(index) {
      const vid = this.$route.query.vdId;
      this.axios
        .get("xyvideocomment/findPageByVideoIdUp.do", {
          params: {
            videoid: vid,
            page: index
          }
        })
        .then(rs => {
          this.hottotal = rs.data.count;
          this.hotpl = rs.data.xyuser;
          const user = store.state.user;
          if (JSON.stringify(user) != "{}") {
            this.axios
              .get("xyclickup/findByUseridAndVideoId.do", {
                params: { videoid: vid }
              })
              .then(rs => {
                this.replylikeOrhald = rs.data.xyuser;
                this.diffLikeHot();
              });
          }
        });
    },
    // 页数改变
    hotpageGo(index) {
      this.hotPage = index;
      this.gethotpl(index);
    },
    // 下一页
    hotnextGo(index) {
      this.hotPage = index;
      this.gethotpl(index);
    },
    // 上一页
    hotprevGo(index) {
      this.hotPage = index;
      this.gethotpl(index);
    },
  },
  mounted() {
    this.islogioto();
    this.getpl(this.currentPage);
  }
};
</script>

<style scoped lang="scss">
.paging-box-big {
  font-size: 12px;
}
.videopl {
  margin-top: 20px;
  .common-head {
    font-size: 18px;
    line-height: 24px;
    color: #222;
    margin: 0 0 20px;
    span {
      margin-right: 10px;
    }
  }
  .commit {
    position: relative;
    .bottom-page {
      margin: 20px 0;
    }
    .no-repeat {
      padding: 25px 0;
      text-align: center;
      font-size: 16px;
      p {
        color: #303133;
        margin-right: 50px;
      }
    }
  }
  /deep/.comment-send {
    position: relative;
    margin: 10px 0;
    .user-face {
      float: left;
      margin: 7px 0 0 5px;
      position: relative;
      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
    }
    .textarea-container {
      position: relative;
      margin-left: 85px;
      margin-right: 80px;
      .el-textarea {
        margin-top: 10px;
        width: 80%;
        margin-right: 10px;
      }
    }
    .el-button--primary {
      margin-top: 43px;
      vertical-align: top;
    }
  }
  a {
    outline: none;
    color: #00a1d6;
    text-decoration: none;
    cursor: pointer;
    display: inline;
  }
  .comment-list {
    padding-top: 20px;
    .hot-line {
      text-align: center;
      border-bottom: 1px solid #e5e9ef;
      position: relative;
      margin: 20px 0 20px 85px;
      font-size: 12px;
      span {
        position: absolute;
        top: -7px;
        margin-left: -115px;
        padding: 0 20px;
        background: #fff;
        a {
          padding: 5px 6px;
          border-radius: 4px;
        }
      }
    }
    /deep/ .list-item:last-child .con {
      border-bottom: 1px solid #e5e9ef;
    }
  }
}
</style>