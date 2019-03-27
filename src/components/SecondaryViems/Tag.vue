<template>
  <div class="tag-list-warp">
    <div class="title clearfix">
      <span class="icon"></span>
      <span class="name">热门标签</span>
      <span class="small">点击即可查看本区标签的相关内容</span>
    </div>
    <div class="tag-list-wrp">
      <ul class="tag-list">
        <!-- 判断是否 thistag 是否与当前标签相同-->
        <li class="tag-item" :class="thistag == '全部标签' ? 'on' : ''">
          <a href="#" @click.prevent="tagToggog('全部标签')" class="tag-a">全部标签</a>
        </li>
        <template v-for="(item, index) in tags">
          <li class="tag-item" :key="index" :class="thistag == item ? 'on' : ''">
            <a href="#" @click.prevent="tagToggog(item)" class="tag-a">{{item}}</a>
          </li>
        </template>
      </ul>
    </div>
    <div class="tag-more">
      <div class="b-toggle-btn" @click="alltag">
        <span v-if="!isall">全部</span>
        <span v-else>收起</span>
        <i
          class="b-icon b-icon-toggle-down"
          :class=" isall ? 'b-icon-toggle-up': 'b-icon-toggle-down' "
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "taglist",
  props: ["typeid"],
  data() {
    return {
      isall: false,
      tags: [],
      thistag: "全部标签"
    };
  },
  methods: {
    alltag() {
      if (this.isall) {
        $(".tag-list-wrp").css({ maxHeight: 68 });
        this.isall = false;
      } else {
        $(".tag-list-wrp").css({ maxHeight: $(".tag-list").height() });
        this.isall = true;
      }
    },
    tagconcat() {
      this.axios
        .get("xyvideo/findAllByTypeIdTime.do", {
          params: { typeid: this.typeid, label: "" }
        })
        .then(rs => {
          let newArrs = [];
          rs.data.xyuser.forEach(item => {
            let arr = item.label.split("|");
            //合并数组
            newArrs = [...newArrs, ...arr];
          });
          //数组去重
          let set = new Set(newArrs);
          //对象转数组
          let btarrs = Array.from(set);
          this.tags = [...btarrs];
        });
    },
    // 捕获标签切换 并向 父组件传递
    tagToggog(tag) {
      this.thistag = tag;
      this.$emit("handTag", tag);
    }
  },
  mounted() {
    this.tagconcat();
  }
};
</script>

<style scoped lang="scss">
.tag-list-warp {
  padding-bottom: 40px;
  .title {
    padding: 10px 0 20px;
    .icon {
      background: url("../../../public/images/page_icons.png") -83px -1492px
        no-repeat;
      width: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
    }
    .name {
      font-size: 18px;
      line-height: 24px;
      color: #222;
      vertical-align: middle;
    }
    .small {
      color: #99a2aa;
      margin-left: 20px;
      margin-bottom: 2px;
      display: inline-block;
      vertical-align: bottom;
    }
  }
  .tag-list-wrp {
    overflow: hidden;
    transition: max-height 0.5s;
    max-height: 68px;
    position: relative;
    .tag-list {
      overflow: hidden;
      margin-right: -10px;
      li {
        &.tag-item {
          display: inline-block;
          /* float: left; */
          position: relative;
          border: 1px solid #e5e9ef;
          border-radius: 12px;
          background-color: #fff;
          height: 22px;
          margin: 5px 10px 5px 0;
          cursor: pointer;
          &:hover {
            border-color: #00a1d6 !important;
            transition: all 0.2s ease-in;
          }
        }
        &.on {
          background-color: #00a1d6 !important;
          color: #fff !important;
          border-color: #00a1d6 !important;
          .tag-a {
            color: #fff;
            &:hover {
              color: #fff;
            }
          }
        }
        .tag-a {
          display: block;
          line-height: 22px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          color: #222;
          padding: 0 10px;
          &:hover {
            color: #00a1d6 !important;
          }
        }
      }
    }
  }
  .tag-more {
    height: 18px;
    margin-top: 15px;
    background: url(//s1.hdslb.com/bfs/static/jinkela/subchannel/asserts/toggle-base.png)
      center -480px no-repeat;
    position: relative;
    .b-toggle-btn {
      background: url(//s1.hdslb.com/bfs/static/jinkela/subchannel/asserts/toggle-base.png) -653px -79px
        no-repeat;
      width: 94px;
      height: 30px;
      line-height: 22px;
      display: block;
      cursor: pointer;
      text-align: center;
      position: absolute;
      top: -8px;
      left: 50%;
      margin-left: -47px;
      color: #6d757a;
      i {
        width: 12px;
        height: 10px;
        display: inline-block;
        margin-left: 5px;
        margin-top: 7px;
        vertical-align: top;
        &.b-icon-toggle-down {
          background: url(//static.hdslb.com/images/base/icons.png) -474px -732px
            no-repeat;
        }
        &.b-icon-toggle-up {
          background: url(//static.hdslb.com/images/base/icons.png) -474px -797px
            no-repeat;
        }
      }
      &:hover {
        color: #00a1d6;
      }
      &:hover i.b-icon-toggle-down {
        background-position: -538px -732px;
      }
      &:hover i.b-icon-toggle-up {
        background-position: -538px -797px;
      }
    }
  }
}
</style>