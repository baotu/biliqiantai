<template>
  <div class="mainCont clearfix">
    <div class="pic-list fl" js-tab="true">
      <div class="pic-list__title">
        <i class="icon icon-new"></i>
        <h2>最新动态</h2>
        <div class="more-wrap">
          <a href="#" @click.prevent="getRound(vtagname)" class="dynamic">
            <i></i>换一换
          </a>
        </div>
      </div>
      <ul class="pic-list__wrapper clearfix tab-cont__item tab-cont__cur">
        <li class="item" v-for="item in recommendList" :key="item.videoid">
          <a href="#" @click.prevent="govideo(item.videoid)" class="img-link" :title="item.title">
            <img v-lazy="item.picture" alt="#">
            <span class="mask"></span>
            <span class="time">{{item.time | datas}}</span>
          </a>
          <div class="img-info">
            <a href="#">{{item.title}}</a>
            <div class="btm">
              <div class="user">
                <i></i>
                {{item.xyuser.username}}
              </div>
              <div class="online">
                <i></i>
                {{item.click}}
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="videolist_box">
        <div class="vl-hd clearfix">
          <div class="left">
            <ul class="tab-list">
              <a href="javascript:void(0)" @click="toggledesc(true)">
                <li :class="desc?'on':''">投稿时间排序</li>
              </a>
              <a href="javascript:void(0)" @click="toggledesc(false)">
                <li :class="desc?'':'on'">视频热度排序</li>
              </a>
            </ul>
          </div>
          <div class="right">
            <ul class="tab-list">
              <li class="mod1" :class="{on : mods == 'mod-1'}" @click="togglemod('mod-1')"></li>
              <li class="mod2" :class="{on : mods == 'mod-2'}" @click="togglemod('mod-2')"></li>
              <li class="mod3" :class="{on : mods == 'mod-3'}" @click="togglemod('mod-3')"></li>
            </ul>
          </div>
        </div>
        <Tablelist :mod="mods" :tlist="homevideo"></Tablelist>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="12"
          layout="total, prev, pager, next, jumper"
          :total="total"
          background
        ></el-pagination>
      </div>
    </div>
    <div class="main-side fr" js-tab="true">
      <div class="main-side__title">
        <div class="rank-t">
          <h3>热门</h3>
        </div>
      </div>
      <div class="main-side__cont">
        <div class="tab-cont">
          <ul class="tab-cont__item main-rank">
            <template v-for="(item, index) in hotvideo">
              <li class="item item-one" :key="item.videoid" v-if="index==0">
                <a href="#" @click.prevent="govideo(item.videoid)" :title="item.title">
                  <i class="n1">{{index+1}}</i>
                  <img v-lazy="item.picture" alt="#">
                  <div>
                    <p class="title">{{item.title}}</p>
                    <p class="mark">播放量: {{item.click}}</p>
                  </div>
                </a>
              </li>
              <li class="item" @click.prevent="govideo(item.videoid)" :key="item.videoid" v-else>
                <a href="#" :title="item.title">
                  <i :class="index<3?'n2':''">{{index+1}}</i>
                  {{item.title}}
                </a>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tablelist from "./Tablelist";
export default {
  name: "tableViems",
  props: ["typeid", "tagname"],
  components: {
    Tablelist
  },
  data() {
    return {
      mods: "mod-1",
      desc: true,
      currentPage: 1,
      total: 0,
      recommendList: [],
      homevideo: [],
      hotvideo: []
    };
  },
  filters: {
    datas(val) {
      return val.substring(0, 10);
    }
  },
  computed: {
    vtagname() {
      return this.tagname;
    },
    url() {
      return this.desc
        ? "xyvideo/findAllPageByTypeIdTime.do"
        : "xyvideo/findAllPageByTypeIdClick.do";
    }
  },
  watch: {
    vtagname(newVal, oldVal) {
      //console.log(newVal, oldVal);
      this.getRound(newVal);
      this.getVideo(this.url, this.vtagname, this.currentPage);
    }
  },
  methods: {
    togglemod(classname) {
      this.mods = classname;
    },
    toggledesc(boolen) {
      this.desc = boolen;
      this.getVideo(this.url, this.vtagname, this.currentPage);
    },
    handleCurrentChange(index) {
      //console.log(index);
      this.currentPage = index;
      this.getVideo(this.url, this.vtagname, this.currentPage);
    },
    // 随机推荐4条视频
    getRound(tag) {
      if (tag === "全部标签") tag = "";
      this.axios
        .get("xyvideo/findTypeRandForFour.do", {
          params: { typeid: this.typeid, label: tag }
        })
        .then(rs => {
          this.recommendList = [...rs.data.xyuser];
        });
    },
    // 根据 热度 或 投稿时间 与标签分页查询
    getVideo(url, tag, index) {
      //console.log(url, tag, index);
      if (tag === "全部标签") tag = "";
      this.axios(url, {
        params: { typeid: this.typeid, label: tag, page: index }
      }).then(rs => {
        //console.log(rs);
        this.total = rs.data.count;
        this.homevideo = rs.data.xyuser;
        this.gethotVideo(tag);
      });
    },
    // 根据类型和标签查询热度最高的20条视频
    gethotVideo(tag) {
      if (tag === "全部标签") tag = "";
      this.axios("xyvideo/findAllPageByTypeIdClick.do", {
        params: { typeid: this.typeid, label: tag, page: 1 }
      }).then(rs => {
        //console.log(rs);
        this.hotvideo = rs.data.xyuser;
      });
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
    }
  },
  mounted() {
    this.getRound(this.vtagname);
    this.getVideo(this.url, this.vtagname, this.currentPage);
  }
};
</script>

<style scoped lang="scss">
.main-rank .item-one {
  height: 51px;
  .title {
    overflow: hidden;
  }
}
.mainCont {
  .pic-list {
    .pic-list__title {
      .icon-new {
        background-position: -84px -1427px;
        margin-top: 20px;
        margin-right: 10px;
        width: 24px;
        height: 24px;
      }
      h2 {
        font-size: 20px;
      }
      .more-wrap {
        .dynamic {
          width: 77px;
        }
      }
    }
    .videolist_box {
      padding-right: 20px;
      margin-bottom: 30px;
      min-width: 400px;
      .vl-hd {
        height: 47px;
        border-bottom: 1px solid #e5e9ef;
        position: relative;
        .left {
          float: left;
          .tab-list {
            display: inline-block;
            vertical-align: middle;
            a {
              display: inline;
              li {
                float: left;
                height: 48px;
                line-height: 48px;
                margin-right: 20px;
                cursor: pointer;
                color: #222;
                text-align: center;
                font-size: 14px;
                &.on {
                  color: #00a1d6;
                  height: 46px;
                  border-bottom: 2px solid #00a1d6;
                }
              }
            }
          }
        }
        .right {
          float: right;
          padding: 8px 0;
          .tab-list {
            display: inline-block;
            vertical-align: middle;
            li {
              height: 32px;
              line-height: 32px;
              padding: 0;
              background: url(//static.hdslb.com/images/base/icons.png)
                no-repeat;
              width: 34px;
              border-radius: 0;
              margin: 0;
              transition: none;
              float: left;
              cursor: pointer;
              color: #222;
              text-align: center;
              font-size: 14px;
              &.mod1 {
                background-position: -270px -847px;
                &.on {
                  background-position: -334px -847px;
                }
              }
              &.mod2 {
                background-position: -270px -911px;
                &.on {
                  background-position: -334px -911px;
                }
              }
              &.mod3 {
                background-position: -270px -975px;
                &.on {
                  background-position: -334px -975px;
                }
              }
            }
          }
        }
      }
      .el-pagination {
        margin-top: 30px;
      }
    }
  }
}
</style>