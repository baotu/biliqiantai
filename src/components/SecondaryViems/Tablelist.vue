<template>
  <div class="vd-list-cnt">
    <div style="clear:both"></div>
    <ul class="vd-list" :class="mod">
      <template v-for="(item, index) in todo">
        <li :key="item.videoid">
          <div class="l-item">
            <div class="l">
              <div class="spread-module">
                <a href="#" @click.prevent="govideo(item.videoid)">
                  <div class="pic">
                    <div class="lazy-img">
                      <img
                        v-lazy="item.picture"
                        alt
                      >
                    </div>
                    <div class="mask-video"></div>
                    <span class="dur">{{item.timelong}}</span>
                  </div>
                </a>
              </div>
            </div>
            <div class="r">
              <a href="#" @click.prevent="govideo(item.videoid)" :title="item.title" class="title">{{item.title}}</a>
              <div class="v-desc">
               {{item.videonote}}
              </div>
              <div class="v-info">
                <span class="v-info-i">
                  <i title="观看" class="b-icon b-icon-v-play"></i>
                  <span>{{item.click}}</span>
                </span>
                <span class="v-info-i">
                  <i title="弹幕" class="b-icon b-icon-v-dm"></i>
                  <span>{{index+1}}</span>
                </span>
                <span class="v-info-i">
                  <i title="收藏" class="b-icon b-icon-v-fav"></i>
                  <span>{{item.commendcount}}</span>
                </span>
              </div>
              <div class="up-info">
                <a href="#" @click.prevent="getup(item.userid)" class="v-author" :title="item.xyuser.username">{{item.xyuser.username}}</a>
                <span title="日期" class="v-date">{{item.time}}</span>
              </div>
            </div>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: "tablelists",
  props: ["mod","tlist"],
  data() {
    return {
    }
  },
  computed: {
    todo(){
      return this.tlist;
    }
  },
  methods: {
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
    //用户个人空间跳转
    getup(abId) {
      const { href } = this.$router.resolve({
        name: "homepage",
        query: { userid: abId }
      });
      window.open(href, "_blank");
    },
  },
  mounted() {
    //console.log(this.todo);
  },
};
</script>

<style scoped lang="scss">
.vd-list-cnt {
  clear: both;
  overflow: hidden;
  .b-icon {
    display: inline-block;
    vertical-align: middle;
    width: 12px;
    height: 12px;
    background: url(//static.hdslb.com/images/base/icons.png) no-repeat;
    &.b-icon-v-play {
      background-position: -282px -90px;
    }
    &.b-icon-v-dm {
      background-position: -282px -218px;
    }
    &.b-icon.b-icon-v-fav {
      background-position: -282px -346px;
    }
  }

  .spread-module {
    position: relative;
    width: 160px;
    height: 148px;
    font-size: 12px;
    overflow: hidden;
    a {
      text-decoration: none;
      .pic {
        position: relative;
        width: 160px;
        height: 100px;
        display: block;
        overflow: hidden;
        text-align: center;
        border-radius: 4px;
        img {
          margin: 0 auto;
          outline: 0;
        }
        .lazy-img {
          background: url(//s1.hdslb.com/bfs/static/jinkela/subchannel/asserts/img_loading.png)
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
        &:hover .mask-video,
        &:hover .dur {
          opacity: 1;
        }
        .mask-video {
          position: absolute;
          opacity: 0;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.2);
          transition: opacity 0.3s;
        }
        .dur {
          opacity: 0;
          position: absolute;
          bottom: 2px;
          left: 6px;
          color: #fff;
          height: 12px;
          line-height: 12px;
          padding: 0 5px 1px 0;
          transition: all 0.3s;
        }
      }
    }
  }
  .mod-1 li {
    padding-top: 20px;
    clear: both;
    .l {
      float: left;
      margin-right: 20px;
      .spread-module {
        height: 100px;
      }
    }
    .r {
      float: left;
      position: relative;
      /* width: 700px; */
      width: 500px;
      border-bottom: 1px solid #e5e9ef;
      padding-bottom: 20px;
      .title {
        text-overflow: ellipsis;
        height: 20px;
        line-height: 16px;
        font-size: 14px;
        white-space: nowrap;
        margin-right: 220px;
        max-height: 40px;
        display: block;
        overflow: hidden;
        color: #222;
        word-wrap: break-word;
        word-break: break-all;
      }
      .v-desc {
        color: #99a2aa;
        word-wrap: break-word;
        word-break: break-all;
        padding-top: 14px;
        margin-bottom: 14px;
        overflow: hidden;
        line-height: 20px;
        height: 40px;
        clear: both;
      }
      .v-info {
        line-height: 12px;
        .v-info-i {
          color: #99a2aa;
          float: left;
          width: 70px;
          height: 12px;
          line-height: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          i {
            vertical-align: top;
            margin-right: 5px;
          }
        }
      }
      .up-info {
        position: absolute;
        right: 0;
        top: 0;
        line-height: 12px;
        height: 16px;
        .v-author {
          display: inline-block;
          vertical-align: top;
          color: #99a2aa;
          max-width: 100px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 16px;
        }
        .v-date {
          display: inline-block;
          vertical-align: top;
          color: #b8c0cc;
          border-left: 1px solid #ddd;
          padding-left: 10px;
          margin-left: 10px;
        }
      }
    }
  }
  .mod-2 {
    margin-right: -42px;
    .spread-module {
      width: 114px;
      height: 70px;
      .pic {
        width: 114px;
        height: 70px;
      }
    }
    li {
      float: left;
      width: 50%;
      border-bottom: 1px solid #e5e9ef;
      .l-item {
        height: 133px;
        padding: 20px 20px 20px 0;
        margin-right: 20px;
        border-right: 1px solid #e5e9ef;
        .l {
          float: left;
          height: 100px;
          margin-right: 20px;
          padding-top: 0;
        }
        .r {
          float: left;
          width: 186px;
          .title {
            max-height: 40px;
            line-height: 20px;
            display: block;
            overflow: hidden;
            color: #222;
            font-size: 12px;
            word-wrap: break-word;
            word-break: break-all;
          }
          .v-desc {
            color: #99a2aa;
            word-wrap: break-word;
            word-break: break-all;
            padding-top: 14px;
            margin-bottom: 14px;
            overflow: hidden;
            line-height: 20px;
            height: 40px;
            clear: both;
          }
          .up-info .v-author,
          .v-info .v-info-i {
            width: 62px;
          }
          .v-info {
            float: right;
            .v-info-i {
              color: #99a2aa;
              float: left;
              height: 12px;
              line-height: 12px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              i {
                vertical-align: top;
                margin-right: 5px;
              }
              &:last-child {
                display: none;
              }
            }
          }
          .up-info {
            float: left;
            line-height: 12px;
            .v-author {
              display: inline-block;
              vertical-align: top;
              color: #99a2aa;
              max-width: 100px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              height: 16px;
            }
            .v-date {
              display: none;
            }
          }
        }
      }
    }
  }
  .mod-3 {
    margin-right: -20px;
    li {
      float: left;
      padding-top: 20px;
      padding-right: 20px;
      .l-item {
        height: 212px;
        width: 153px;
        border: 1px solid #e5e9ef;
        border-radius: 4px;
        overflow: hidden;
        .l {
          .spread-module {
            height: 100px;
            margin: -1px 0 6px -1px;
          }
        }
        .r {
          float: none;
          padding: 0 10px;
          .title {
            display: inline-block;
            height: 40px;
            line-height: 20px;
            overflow: hidden;
            color: #222;
            font-size: 12px;
            word-wrap: break-word;
            word-break: break-all;
          }
          .v-desc {
            display: none;
          }
          .v-info {
            line-height: 12px;
            padding-top: 12px;
            .v-info-i {
              color: #99a2aa;
              display: inline-block;
              width: 66px;
              height: 12px;
              line-height: 12px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              .v-info-i i {
                vertical-align: top;
                margin-right: 5px;
              }
              &:last-child{
                  display: none;
              }
            }
          }
          .up-info {
            margin-top: 12px;
            .v-author {
              display: inline-block;
              vertical-align: top;
              color: #99a2aa;
              max-width: 100px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              height: 16px;
            }
            .v-date{
                display: none;
            }
          }
        }
      }
    }
  }
}
</style>