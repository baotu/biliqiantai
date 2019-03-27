<template>
  <div class="main-side fr">
    <div class="main-side__title">
      <div class="rank-t">
        <h3>排行</h3>
      </div>
      <div class="tab-title">
        <a href="#" :class="selectType=='all'?'cur':''" @click="switchType('all')">全部</a>
        <a href="#" :class="selectType=='hot'?'cur':''" @click="switchType('hot')">最热</a>
      </div>
    </div>
    <div class="main-side__cont">
      <div class="tab-cont">
        <ul class="tab-cont__item main-rank">
          <template v-for="(item, index) in videolist.slice(0,7)">
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
      <router-link :to="{name:tabTypes}" class="more">
        查看更多
        <i></i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SlidrBar",
  props: ["typeid","tabTypes"],
  data() {
    return {
      selectType: "all",
      videolist: []
    };
  },
  watch: {
    selectType(newval, oldval) {
      this.getvideo();
    }
  },
  methods: {
    switchType(type) {
      this.selectType = type;
    },
    getvideo() {
      let url = "";
      this.selectType === "all"
        ? (url = "xyvideo/findByTypeTime.do")
        : (url = "xyvideo/findByTypeClick.do");
      this.axios.get(url, { params: { typeid: this.typeid } }).then(rs => {
        this.videolist = rs.data.xyuser;
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
    this.getvideo();
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
</style>