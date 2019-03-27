<template>
  <div id="playvideo">
    <HeaderNav></HeaderNav>
    <div class="play">
      <div id="content">
        <div class="left">
          <div class="title">
            <h2>{{video.title}}</h2>
            <span>{{video.xyvideotype.typename}}</span>>>
            <span style="margin-left:10px;">{{video.time}}</span>
            <p>
              {{video.click}}播放 50 弹幕
              <span>未经作者授权，禁止转载</span>
            </p>
          </div>
          <div class="video" id="videodan">
            <!-- <video
              width="100%"
              height="550"
              preload="auto"
              :poster="video.picture"
              :src="video.videourl"
              controls
            ></video>-->
            <div id="danmup"></div>
            <!-- <div class="sendbar">
              <div class="video_info">
                <p>
                  <span>60</span>
                  人正在看,
                  <span>255</span>
                  条实时弹幕
                </p>
              </div>
            </div>-->
          </div>
          <div class="video-toolbar">
            <div class="ops">
              <span :title="'点赞数'+video.clickup" @click="videolike" class="like">
                <i class="iconfont icon-dianzan" :class="videoUp.like?'ups':''"></i>
                {{video.clickup}}
              </span>
              <span title="投硬币枚数6359" class="coin">
                <i class="iconfont icon-Bbi" :class="videoUp.coin?'ups':''"></i>
                6359
              </span>
              <span :title="'收藏人数'+video.commendcount" @click="videocoll" class="collect">
                <i class="iconfont icon-shoucang" :class="videoUp.collect?'ups':''"></i>
                {{video.commendcount}}
              </span>
              <span title="分享" class="share">
                <i class="iconfont icon-fenxiang"></i>分享
                <div class="share-box">
                  <div class="share-pos">
                    <div class="box-a">
                      <div class="share-address">
                        <p class="t">将视频贴到博客或论坛</p>
                        <ul>
                          <li>
                            <span class="name">视频地址</span>
                            <input
                              id="link0"
                              type="text"
                              :title="thisurl"
                              v-model="thisurl"
                              disabled
                            >
                            <span class="btn" @click="copyurl">复制</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
            </div>
          </div>
          <div class="text">
            <div class="info">{{video.videonote}}</div>
            <div class="tag">
              <ul class="clearfix">
                <li class="tags" v-for="(item, index) in tags" :key="index">
                  <a href="#">{{item}}</a>
                </li>
              </ul>
            </div>
          </div>
          <Videopl></Videopl>
        </div>
        <div class="right">
          <div class="u-upinfo">
            <div class="u-face">
              <a href="#" @click.prevent="getup(video.userid)">
                <img :src="video.xyuserinfo.userphoto">
              </a>
            </div>
            <div class="u-info">
              <div class="name" style="line-height:20px;height:20px;">
                <a href="#" @click.prevent="getup(video.userid)" class="username">{{video.xyuser.username}}</a>
                <a href="#" class="message">
                  <i class="van-icon-videodetails_messag"></i>发消息
                </a>
              </div>
              <div class="desc" :title="video.xyuserinfo.usershow">{{video.xyuserinfo.usershow}}</div>
            </div>
            <a class="bi-btn b-gz" @click="follow" :class="video.followstatus?'followed':''">
              <span class="gz">
                <template v-if="video.followstatus">
                  <i class="van-icon-general_addto_s"></i>已关注
                </template>
                <template v-else>
                  <i class="van-icon-general_addto_s"></i>关注
                </template>
              </span>
            </a>
          </div>

          <div class="reco_list">
            <div class="rec-title">相关视频推荐</div>
            <div class="rec-list">
              <div class="video-page-card" v-for="item in recommendedvideo" :key="item.videoid">
                <div class="card-box">
                  <div class="pic-box">
                    <div class="pic">
                      <a href="#" @click.prevent="govideo(item.videoid)">
                        <img v-lazy="item.picture">
                      </a>
                      <span class="mask-video"></span>
                      <span class="duration">{{item.timelong}}</span>
                    </div>
                  </div>
                  <div class="info">
                    <a
                      href="#"
                      @click.prevent="govideo(item.videoid)"
                      class="title"
                      :title="item.title"
                    >{{item.title}}</a>
                    <div class="count up">
                      <a href="#" @click.prevent="getup(item.userid)" >{{item.xyuser.username}}</a>
                    </div>
                    <div class="count">{{item.click}}播放 · {{item.clickup}}点赞</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store.js";
import HeaderNav from "@/components/header/HeaderNav1";
import Videopl from "@/components/videopaly/Videopl";
export default {
  store,
  name: "videoPaly",
  components: {
    HeaderNav,
    Videopl
  },
  data() {
    return {
      video: {
        xyvideotype: {},
        xyuserinfo: {},
        xyuser: {}
      },
      recommendedvideo: [],
      videoUp: {
        like: false,
        coin: false,
        collect: false
      }
    };
  },
  computed: {
    tags() {
      const list = this.video.label;
      return list ? list.split("|") : null;
    },
    user() {
      return store.state.user;
    },
    thisurl() {
      return location.href;
    }
  },
  watch: {
    $route(to, from) {
      this.getVideo();
      this.$router.go(0);
    }
  },
  methods: {
    getVideo() {
      const vId = this.$route.query.vdId;
      // console.log(vId);
      this.axios
        .get("xyvideo/findById.do", {
          params: {
            videoid: vId
          }
        })
        .then(rs => {
          if (JSON.stringify(rs.data) == "{}") {
            this.$router.push({ name: "playerror" });
          }
          this.video = rs.data.xyuser;
          // $("#videodan").html('<div id="danmup"></div>');
          $("#danmup").DanmuPlayer({
            src: this.video.videourl,
            imgsrc: this.video.picture,
            height: "500px", //区域的高度
            width: "900px", //区域的宽度,
            axios: this.axios,
            videoid: this.video.videoid,
            urlToGetDanmu: "xydanmu/findByVideoid.do",
            urlToPostDanmu: "xydanmu/insertByVideoid.do",
            userid: this.user.userid
          });
          this.getRecommendedvideo();
          this.diffislike();
          this.diffiscoll();
          this.diffisfollow();
        });
    },
    getRecommendedvideo() {
      this.axios
        .get("xyvideo/findTypeRandForTwenty.do", {
          params: { typeid: this.video.typeid, label: this.tags[0] }
        })
        .then(rs => {
          this.recommendedvideo = rs.data.xyuser;
        });
    },
    //复制分享
    copyurl() {
      var oInput = document.createElement("input");
      oInput.value = this.thisurl;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      this.$message({
        message: "复制成功快去分享吧",
        type: "success"
      });
    },
    //视频点赞事件
    videolike() {
      if (JSON.stringify(this.user) === "{}") {
        alert("请先登录");
        return;
      } else {
        const vId = this.$route.query.vdId;
        this.axios
          .get("xyvideoup/updateAddUpById.do", { params: { videoid: vId } })
          .then(rs => {
            if (rs.data.xyuser == 0) {
              // console.log("点赞成功");
              this.videoUp.like = true;
              this.video.clickup++;
            } else if (rs.data.xyuser == 1) {
              // console.log("取消点赞成功");
              this.videoUp.like = false;
              this.video.clickup--;
            }
          });
      }
    },
    //视频收藏事件
    videocoll() {
      if (JSON.stringify(this.user) === "{}") {
        alert("请先登录");
        return;
      } else {
        const vId = this.$route.query.vdId;
        this.axios
          .get("xycollection/updateAddUpById.do", { params: { videoid: vId } })
          .then(rs => {
            if (rs.data.xyuser == 0) {
              // console.log("收藏成功");
              this.videoUp.collect = true;
              this.video.commendcount++;
            } else if (rs.data.xyuser == 1) {
              // console.log("取消收藏成功");
              this.videoUp.collect = false;
              this.video.commendcount--;
            }
          });
      }
    },
    //判断当前视频是否点赞
    diffislike() {
      if (JSON.stringify(this.user) === "{}") return;
      const vId = this.$route.query.vdId;
      this.axios
        .get("xyvideoup/findCouByUseridAndVideoId.do", {
          params: { videoid: vId }
        })
        .then(rs => {
          rs.data.xyuser == 1
            ? (this.videoUp.like = true)
            : (this.videoUp.like = false);
        });
    },
    //判断当前视频是否被收藏
    diffiscoll() {
      if (JSON.stringify(this.user) === "{}") return;
      const vId = this.$route.query.vdId;
      this.axios
        .get("xycollection/findCouByUseridAndVideoId.do", {
          params: { videoid: vId }
        })
        .then(rs => {
          rs.data.xyuser == 1
            ? (this.videoUp.collect = true)
            : (this.videoUp.collect = false);
        });
    },
    //判断当前视频UP主是否被关注
    diffisfollow() {
      if (JSON.stringify(this.user) === "{}") return;
      this.axios
        .get("xyfriend/findByFriend.do", {
          params: { userfriend: this.video.userid }
        })
        .then(rs => {
          if (rs.data.xyuser == 0) {
            this.$set(this.video, "followstatus", false);
          } else {
            this.$set(this.video, "followstatus", true);
          }
        });
    },
    govideo(vdId) {
      this.axios
        .get("xyvideo/addclick.do", { params: { videoid: vdId } })
        .then(rs => {
          this.$router.push({
            name: "play",
            query: { vdId: vdId }
          });
        });
    },
    follow() {
      if (JSON.stringify(this.user) === "{}")
        return this.$message({
          message: "请先登录",
          type: "warning"
        });
      this.axios
        .get("xyfriend/updateAddUpById.do", { params: { userfriend: this.video.userid } })
        .then(rs => {
          if (rs.data.xyuser == 0) {
            this.$set(this.video, "followstatus", true);
            this.$message({
              message: "关注成功",
              type: "success"
            });
          } else if (rs.data.xyuser == 1) {
            this.$set(this.video, "followstatus", false);
            this.$message({
              message: "取消关注成功",
              type: "success"
            });
          }
        });
    },
    //用户个人空间跳转
    getup(abId) {
      const { href } = this.$router.resolve({
        name: "homepage",
        query: { userid: abId }
      });
      window.open(href, "_blank");
    },
  },
  created() {},
  beforeMount() {},
  mounted() {
    this.getVideo();
  },
  beforeRouteEnter(to, from, next) {
    var let1 = Number(to.query.vdId);
    if (to.query.vdId == undefined) next({ name: "playerror" });
    if (isNaN(let1)) {
      next({ name: "playerror" });
    } else {
      axios
        .get("xyvideo/findById.do", {
          params: {
            videoid: to.query.vdId
          }
        })
        .then(rs => {
          if (JSON.stringify(rs.data) == "{}") {
            next({ name: "playerror" });
          } else {
            next();
          }
        });
    }
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // $("#danmup").DanmuPlayer
    // $('#danmup').danmu('danmuPause');

    // $('#danmup')

    next();
  }
};
</script>

<style scoped>
@import "../../public/css/danmuplayer.css";

a {
  color: #505050;
  text-decoration: none;
  font-size: 14px;
}

.play {
  margin-top: 20px;
  margin-bottom: 20px;
}

#content {
  width: 1400px;
  height: 100%;
  margin: 0 auto;
  padding: 0px;
}

.left {
  display: inline-block;
  width: 930px;
  height: 100%;
  vertical-align: top;
}

.right {
  display: inline-block;
  width: 320px;
  height: 800px;
  margin-left: 30px;
}
/* 标题 */
.title {
  height: 120px;
}

.title h2 {
  font-size: 18px;
  font-weight: 500;
  color: #212121;
  line-height: 26px;
  height: 26px;
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title span,
.title p {
  margin: 15px 0 0;
  font-size: 12px;
  height: 16px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 视频 */
.video {
  /* background-color: #000; */
  box-sizing: border-box;
  height: 600px;
  position: relative;
}
.video .sendbar {
  flex-shrink: 0;
  position: relative;
  height: 46px;
  display: flex;
  align-items: center;
  padding: 0 12px 0 20px;
  background: #fff;
  zoom: 1;
  box-shadow: 0 0 8px #e5e9ef;
  margin-top: 3px;
}
.video .video_info {
  position: absolute;
  left: 0;
  padding: 0 10px;
}
.video .video_root {
  position: absolute;
  right: 0;
  padding: 10px;
}
/* 视频介绍 */
.text {
  margin-top: 16px;
  position: relative;
}
.text div.info {
  white-space: pre-line;
  transition: all 0.3s;
  font-size: 12px;
  color: #212121;
  letter-spacing: 0;
  line-height: 18px;
  height: auto;
  width: 573px;
  overflow: hidden;
}
.text div.tag {
  position: relative;
  clear: both;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e9ef;
  margin-top: 16px;
}
.text div.tag ul li {
  position: relative;
  height: 22px;
  transition: all 0.3s;
  float: left;
  margin: 0 10px 8px 0;
  background: #f4f4f4;
  border-radius: 100px;
  padding: 0 12px;
  font-size: 12px;
  border: 1px solid #f4f4f4;
}
.text div.tag ul li > a {
  display: inline-block;
  color: #505050;
  line-height: 22px;
  vertical-align: middle;
  z-index: 10;
  position: relative;
  height: 22px;
  transition: all 0.3s;
}
.text div.tag ul li:hover {
  border: 1px solid #00a1d6;
}
.text div.tag ul li:hover > a {
  color: #00a1d6;
}
/* 评论 */
.pinglun {
  height: 800px;
}

/* 作者信息 */
.u-upinfo {
  height: 120px;
}

.u-face {
  display: inline-block;
  vertical-align: top;
}

.u-face img {
  width: 50px;
  height: 50px;
  border-radius: 25px;
}

.u-info {
  display: inline-block;
  margin-left: 10px;
  width: 240px;
}

.u-info .name .username {
  color: #000;
  font-size: 16px;
}

.u-info .name a {
  display: inline-block;
  padding: 3px 10px;
}

.u-info .desc {
  font-size: 12px;
  color: #999;
  padding: 15px 0px;
  white-space: nowrap;
  /* 强制不换行 */
  overflow: hidden;
  /* 超出隐藏 */
  text-overflow: ellipsis;
  /* 加... */
}

.bi-btn {
  display: inline-block;
  padding: 6px 50px;
  color: #fff;
  background-color: rgb(0, 161, 214);
  border-radius: 3px;
  margin-left: 60px;
  cursor: pointer;
}
.followed {
  color: #999;
  border: 1px solid #e7e7e7;
  background: #e7e7e7;
}
.rec-list {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
<style lang="scss" scoped>
.video-toolbar {
  line-height: 30px;
  height: 28px;
  font-size: 14px;
  color: #505050;
  border-bottom: 1px solid #e5e9f0;
  padding-bottom: 12px;
  position: relative;
  margin-top: 16px;
  .ops {
    float: left;
    height: 24px;
    & > span {
      width: 92px;
      margin-right: 8px;
      cursor: pointer;
      transition: all 0.3s;
      display: inline-block;
      white-space: nowrap;
      color: #505050;
      position: relative;
      &:hover {
        i {
          color: #00a1d6;
        }
      }
      i {
        font-size: 28px;
        vertical-align: top;
        margin-right: 6px;
        width: 28px;
        height: 28px;
        color: #757575;
        &.ups {
          color: #00a1d6;
        }
      }
    }
    .share {
      position: relative;
      height: 35px;
      width: 62px;
      &:hover {
        .share-box {
          display: block;
        }
      }
      .share-box {
        display: none;
        .share-pos {
          position: absolute;
          top: 35px;
          display: flex;
          justify-content: space-between;
          padding: 20px;
          width: 290px;
          z-index: 30;
          color: #505050;
          background: #fff;
          border: 1px solid #e5e9ef;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14);
          border-radius: 2px;
          .box-a {
            display: flex;
            align-items: center;
            .t {
              font-size: 18px;
              color: #333;
              line-height: 24px;
              text-align: left;
              margin-bottom: 20px;
            }
            li {
              line-height: 20px;
              margin-bottom: 16px;
              span {
                text-align: left;
              }
              input {
                border: 1px solid #ccd0d7;
                box-shadow: none;
                border-radius: 0;
                padding: 0 4px;
                line-height: 18px;
                height: 18px;
                margin: 0 0 0 10px;
                width: 160px;
                vertical-align: middle;
                font-size: 12px;
              }
              .name {
                display: inline-block;
                width: 62px;
                font-size: 13px;
              }
              .btn {
                display: inline-block;
                margin-left: -1px;
                line-height: 20px;
                width: 40px;
                cursor: pointer;
                background: #00a1d6;
                text-align: center;
                color: #fff;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}
.video-page-card {
  padding: 6px 0;
  .card-box {
    display: flex;
    .pic-box {
      position: relative;
      width: 141px;
      height: 80px;
      border-radius: 2px;
      background: #f4f5f7;
      .pic {
        position: relative;
        overflow: hidden;
        border-radius: 2px;
        width: 141px;
        height: 80px;
        img {
          width: 141px;
          height: 80px;
        }
        &:hover {
          .mask-video {
            opacity: 1;
          }
          .duration {
            opacity: 1;
          }
        }
        .mask-video {
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.2);
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .duration {
          opacity: 0;
          position: absolute;
          bottom: 2px;
          left: 6px;
          color: #fff;
          height: 12px;
          line-height: 12px;
          padding: 0 5px 1px 0;
          transition: all 0.3s;
          z-index: 5;
        }
      }
    }
    .info {
      margin-left: 10px;
      flex: 1;
      font-size: 0;
      .title {
        height: 36px;
        line-height: 18px;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
      }
      .count {
        display: inline-block;
        height: 16px;
        width: 100%;
        color: #999;
        font-size: 12px;
        &.up {
          width: 160px;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        a {
          color: #999;
        }
      }
    }
  }
}
</style>
