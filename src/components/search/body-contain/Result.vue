<template>
  <div class="result-wrap clearfix">
    <ul v-if="searchtype==1" class="video-contain clearfix">
      <li
        class="video matrix"
        @click="govideo(item.videoid)"
        v-for="item in vvideolist"
        :key="item.videoid"
      >
        <a href="#" :title="item.title" class="img-anchor">
          <div class="img">
            <div class="lazy-img">
              <img v-lazy="item.picture">
            </div>
            <span class="so-imgTag_rb">{{item.timelong}}</span>
          </div>
        </a>
        <div class="info">
          <div class="headline clearfix">
            <a :title="item.title" href="#" class="title">{{item.title}}</a>
          </div>
          <div class="tags">
            <span title="观看" class="so-icon watch-num">
              <i class="icon-playtime"></i>
              {{item.click}}
            </span>
            <span title="上传时间" class="so-icon time">
              <i class="icon-date"></i>
              {{item.time|datas}}
            </span>
            <span title="up主" class="so-icon">
              <i class="icon-uper"></i>
              <a href="#" @click.prevent="getup(item.userid)" class="up-name">{{item.xyuser.username}}</a>
            </span>
          </div>
        </div>
      </li>
    </ul>
    <ul v-if="searchtype==2" class="user-list">
      <li class="up-item" v-for="(item, index) in vvideolist" :key="item.userid">
        <div class="up-face">
          <a href="#" @click.prevent="getup(item.userid)" class="face-img">
            <img v-lazy="item.xyuserinfo.userphoto">
          </a>
        </div>
        <div class="info-wrap">
          <div class="headline">
            <a href="#" @click.prevent="getup(item.userid)" :title="item.username" class="title">{{item.username}}</a>
            <i class="lv" :class="levon(item.gradeid)"></i>
            <button
              class="attention-btn followed"
              @click="follow(item.userid,index)"
              v-if="item.followstatus"
            >已关注</button>
            <button class="attention-btn" @click="follow(item.userid,index)" v-else>关注</button>
          </div>
          <div class="up-info clearfix">
            <span>性别:{{item.xyuserinfo.sex}}</span>
            <span>粉丝:{{item.usefulgold}}</span>
          </div>
          <div class="desc" :title="item.xyuserinfo.usershow">{{item.xyuserinfo.usershow}}</div>
        </div>
      </li>
    </ul>
    <ul v-if="searchtype==3" class="photo-list clearfix">
      <li class="photo" v-for="item in vvideolist" :key="item.albumid">
        <a href="#" @click.prevent="getPic(item.albumid)" :title="item.albumname">
          <div class="img">
            <img v-lazy="item.photo">
            <span class="so-imgTag_rb">{{item.photocount}}P</span>
          </div>
        </a>
        <div class="info">
          <div class="headline clearfix">
            <a @click.prevent="getPic(item.albumid)" :title="item.albumname" href="#" class="title">{{item.albumname}}</a>
          </div>
          <div class="tags">
            <div title="up主" class="so-icon up">
              <i class="icon-uper"></i>
              <a href="#" @click.prevent="getup(item.userid)"  class="up-name">{{item.xyuser.username}}</a>
            </div>
            <div title="浏览数" class="so-icon watch-num">
              <i class="icon-view"></i>
              {{item.watch}}
            </div>
            <div title="收藏数" class="so-icon fav">
              <i class="icon-fav"></i>
              {{item.collectioncount}}
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="pager">
      <el-pagination
        @current-change="pagechange"
        :current-page="page"
        background
        :page-size="20"
        layout="prev, pager, next"
        :total="vtotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import store from "@/store.js";

export default {
  store,
  name: "searchresult",
  props: ["searchtype", "videolist", "total"],
  data() {
    return {
      page: 1
    };
  },
  filters: {
    datas(val) {
      return val.substring(0, 10);
    }
  },
  computed: {
    vtotal() {
      return this.total;
    },
    vvideolist() {
      return this.videolist;
    }
  },
  methods: {
    pagechange(index) {
      this.page = index;
      this.$emit("pagechange", index);
    },
    govideo(vdId) {
      const { href } = this.$router.resolve({
        name: "play",
        query: { vdId: vdId }
      });
      this.axios
        .get("xyvideo/addclick.do", { params: { videoid: vdId } })
        .then(rs => {
          window.open(href, "_blank");
        });
    },
    levon(userid) {
      return `icon-lv${userid}`;
    },
    follow(id, index) {
      if (JSON.stringify(store.state.user) === "{}")
        return this.$message({
          message: "请先登录",
          type: "warning"
        });

      this.axios
        .get("xyfriend/updateAddUpById.do", { params: { userfriend: id } })
        .then(rs => {
          //console.log(rs);
          if (rs.data.xyuser == 0) {
            this.$set(this.vvideolist[index], "followstatus", true);
            this.$message({
              message: "关注成功",
              type: "success"
            });
          } else if (rs.data.xyuser == 1) {
            this.$set(this.vvideolist[index], "followstatus", false);
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
    //相簿跳转
    getPic(albumId) {
      const { href } = this.$router.resolve({
        name: "photoDetail",
        query: { albumId: albumId }
      });
      window.open(href, "_blank");
    }
  }
};
</script>

<style scoped lang="scss">
.lv {
  background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
  width: 28px;
  height: 16px;
  display: inline-block;
  line-height: 16px;
  vertical-align: middle;
  &.icon-lv7 {
    background-position: -319px -536px;
  }
  &.icon-lv6 {
    background-position: -377px -490px;
  }
  &.icon-lv5 {
    background-position: -261px -536px;
  }
  &.icon-lv4 {
    background-position: -319px -536px;
  }
  &.icon-lv3 {
    background-position: -365px -438px;
  }
  &.icon-lv2 {
    background-position: -148px -139px;
  }
  &.icon-lv1 {
    background-position: -148px -185px;
  }
}
.so-icon {
  display: inline-block;
  font-size: 12px;
  height: 12px;
  vertical-align: text-top;
  line-height: 12px;
  padding-left: 16px;
  position: relative;
  color: #99a2aa;
  i {
    position: absolute;
    left: 0;
    top: 0;
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
    width: 11px;
    height: 11px;
    display: inline-block;
    &.icon-playtime {
      background-position: -485px -543px;
    }
    &.icon-date {
      background-position: -442px -165px;
    }
    &.icon-uper {
      background-position: -442px -83px;
    }
  }
}
.result-wrap {
  padding-bottom: 10px;
  .video-contain {
    position: relative;
    .video.matrix:nth-child(5n) {
      margin-right: 0;
    }
    .video.matrix {
      height: 208px;
      width: 168px;
      border: 1px solid #e5e9ef;
      border-radius: 4px;
      float: left;
      margin-right: 32px;
      margin-top: 20px;
      position: relative;
      a {
        outline: 0;
        color: #00a1d6;
        text-decoration: none;
        cursor: pointer;
      }
      .img {
        height: 100px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-radius: 4px;
        position: relative;
        overflow: hidden;
      }
      .lazy-img {
        background: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/img_loading.png)
          50% no-repeat;
        width: 100%;
        height: 100%;
        display: inline-block;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .so-imgTag_rb {
        position: absolute;
        right: 0;
        bottom: 0;
        line-height: 18px;
        padding: 0 5px;
        color: #fff;
        background-color: #333;
        background-color: rgba(0, 0, 0, 0.5);
        border-top-left-radius: 4px;
      }
      .info {
        padding: 8px 10px 0;
        .so-icon {
          margin-right: 8px;
          margin-bottom: 12px;
          float: left;
          &.watch-num {
            width: 41px;
            overflow: inherit;
          }
          &.time {
            margin-right: 0;
            width: 67px;
          }
          .up-name {
            display: inline-block;
            max-width: 132px;
            height: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #99a2aa;
            cursor: pointer;
          }
        }
      }
      .headline {
        margin-bottom: 12px;
        height: 40px;
        overflow: hidden;
      }
      .title {
        font-size: 12px;
        line-height: 20px;
        color: #222;
      }
      .keyword {
        color: #f25d8e;
      }
    }
  }
  .user-list {
    .up-item {
      position: relative;
      padding: 20px 0 20px 102px;
      border-bottom: 1px solid #e5e9ef;
      z-index: 1;
      .up-face {
        position: absolute;
        width: 90px;
        height: 90px;
        left: 0;
        top: 20px;
        .face-img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
      .info-wrap {
        .headline {
          margin-bottom: 12px;
          .title {
            display: inline-block;
            line-height: 12px;
            vertical-align: middle;
            font-size: 16px;
            color: #222;
            margin-right: 14px;
            font-weight: 700;
          }
          .lv {
            margin-right: 12px;
          }
          .attention-btn {
            width: 64px;
            height: 24px;
            text-align: center;
            background: #00a1d6;
            color: #fff;
            line-height: 24px;
            border-radius: 4px;
            cursor: pointer;
            display: inline-block;
            vertical-align: middle;
            &.followed {
              background: #e5e9ef;
              color: #6d757a;
            }
          }
        }
        .up-info {
          margin-bottom: 10px;
          & > span {
            float: left;
            margin-right: 15px;
            font-size: 12px;
            line-height: 12px;
            color: #6d757a;
          }
        }
        .desc {
          margin-bottom: 14px;
          width: 750px;
          font-size: 12px;
          color: #6d757a;
          line-height: 16px;
        }
      }
    }
  }
  .photo-list {
    .so-imgTag_rb {
      position: absolute;
      right: 0;
      bottom: 0;
      line-height: 18px;
      padding: 0 5px;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 4px 0 0 0;
    }
    .so-icon {
      line-height: 16px;
      padding-left: 18px;
      margin-right: 8px;
      &.up {
        display: block;
        max-width: 132px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 8px;
        padding-left: 20px;
        height: auto;
        .icon-uper {
          top: 2px;
          left: 3px;
        }
      }
      &.watch-num {
        white-space: nowrap;
        margin-bottom: 0;
        width: 41px;
        overflow: inherit;
        padding-left: 20px;
        .icon-view {
          margin-right: 3px;
        }
      }
      &.fav {
        white-space: nowrap;
        margin-bottom: 0;
        .icon-fav {
          top: 2px;
          margin-right: 3px;
        }
      }
      i {
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
        width: 11px;
        height: 11px;
        &.icon-uper {
          background-position: -442px -83px;
        }
        &.icon-view {
          background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/article.png);
          width: 16px;
          height: 16px;
          background-position: -30px -30px;
        }
        &.icon-fav {
          background-position: -442px -42px;
        }
      }
      & > a {
        color: #99a2aa;
        cursor: pointer;
      }
    }
    .photo:nth-child(5n) {
      margin-right: 0;
    }
    .photo {
      height: 256px;
      width: 168px;
      border: 1px solid #e5e9ef;
      border-radius: 4px;
      float: left;
      margin-right: 32px;
      margin-top: 20px;
      .img {
        height: 168px;
        border-radius: 4px 4px 0 0;
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        font-size: 12px;
        color: #222;
        width: 150px;
        line-height: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
      }
      .info {
        padding: 9px 10px 0;
        .headline {
          margin-bottom: 12px;
          height: 16px;
        }
      }
    }
  }
  .pager {
    width: 924px;
    margin-left: auto;
    margin-right: auto;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background: #fff;
    padding: 30px 27px 35px;
    text-align: center;
  }
}
</style>