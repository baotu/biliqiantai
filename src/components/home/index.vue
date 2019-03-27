<template>
  <div>
    <Homeslider></Homeslider>
    <div id="main">
      <div class="page-width">
        <!-- 动画 -->
        <template v-for="(item, index) in todolist">
          <Hometab
            :tabTypes="item.ids"
            :key="index"
            :Typesid="item.typeid"
            :typecheck="item.tabType"
          >
            <div slot="head">
              <div class="pic-list__title">
                <i class="icon" :class="item.icon"></i>
                <h2>{{item.typename}}</h2>
                <div class="tab-title">
                  <a
                    href="javascript:void(0)"
                    @click="handToggle(index,false)"
                    :class="{cur: !item.tabType}"
                  >最热视频</a>
                  <a
                    href="javascript:void(0)"
                    @click="handToggle(index,true)"
                    :class="{cur: item.tabType}"
                  >最新投稿</a>
                </div>
                <div class="more-wrap">
                  <routerLink :to="{name:item.ids}"  class="more">
                    更多
                    <i></i>
                  </routerLink>
                </div>
              </div>
            </div>
          </Hometab>
        </template>
      </div>
    </div>
    <HomesideBar></HomesideBar>
  </div>
</template>

<script>
import Homeslider from "./Homeslider";
import Hometab from "./Hometab";
import HomesideBar from "./HomesideBar";
export default {
  name: "bilibili",
  components: {
    Homeslider,
    Hometab,
    HomesideBar
  },
  data() {
    return {
      todolist: [
        {
          typeid: 1,
          typename: "动画",
          ids: "animation",
          tabType: false,
          icon: "icon-animation"
        },
        {
          typeid: 2,
          typename: "番剧",
          ids: "bangumi",
          tabType: false,
          icon: "icon-bangumi"
        },
        {
          typeid: 3,
          typename: "国创",
          ids: "china",
          tabType: false,
          icon: "icon-china"
        },
        {
          typeid: 4,
          typename: "音乐",
          ids: "music",
          tabType: false,
          icon: "icon-music"
        },
        {
          typeid: 5,
          typename: "舞蹈",
          ids: "dance",
          tabType: false,
          icon: "icon-dance"
        },
        {
          typeid: 6,
          typename: "游戏",
          ids: "game",
          tabType: false,
          icon: "icon-game"
        },
        {
          typeid: 7,
          typename: "科技",
          ids: "technology",
          tabType: false,
          icon: "icon-technology"
        },
        {
          typeid: 8,
          typename: "电影",
          ids: "movie",
          tabType: false,
          icon: "icon-movie"
        },
        {
          typeid: 9,
          typename: "生活",
          ids: "life",
          tabType: false,
          icon: "icon-life"
        },
        {
          typeid: 10,
          typename: "鬼畜",
          ids: "guichu",
          tabType: false,
          icon: "icon-guichu"
        },
        {
          typeid: 11,
          typename: "时尚",
          ids: "fasion",
          tabType: false,
          icon: "icon-fasion"
        },
        {
          typeid: 12,
          typename: "娱乐",
          ids: "yule",
          tabType: false,
          icon: "icon-yule"
        }
      ]
    };
  },
  methods: {
    handToggle(i, b) {
      this.$set(this.todolist[i], "tabType", b);
    }
  },
  beforeRouteLeave(to, from, next) {
    $(window).off('scroll');
    next();
  }
};
</script>

<style scoped>
</style>