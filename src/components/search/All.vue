<template>
  <div class="all-contain">
    <div class="page-wrap" v-show="!errorshow">
      <SearchFilter
        @orderswitch="orderswitch"
        @durationswitch="durationswitch"
        @tidsswitch="tidsswitch"
      ></SearchFilter>
      <Result
        @pagechange="pagechange"
        :videolist="videolist"
        :total="total"
        :searchtype="1"
        v-if="videolist.length"
      ></Result>
      <Recom v-else></Recom>
    </div>
    <div class="error-wrap" v-show="errorshow">
      <p class="txt">出错了</p>
    </div>
  </div>
</template>

<script>
import SearchFilter from "./body-contain/Filter";
import Result from "./body-contain/Result";
import Recom from "./body-contain/Recom";
export default {
  name: "sAll",
  components: {
    SearchFilter,
    Result,
    Recom
  },
  data() {
    return {
      Search: {
        click: 0,
        timelong: 0,
        typeid: 0,
        videoname: "",
        userid: 1
      },
      videolist: [],
      total: 0,
      errorshow: false
    };
  },
  watch: {
    $route(to, from) {
      const keyword = to.query.keyword;
      if (keyword != undefined) {
        this.errorshow = false;
      }
      this.Search.videoname = keyword;
      this.getvideo(this.Search);
    }
  },
  methods: {
    orderswitch(val) {
      // //console.log(val);
      this.Search.click = val;
      this.getvideo(this.Search);
    },
    durationswitch(val) {
      // //console.log(val);
      this.Search.timelong = val;
      this.getvideo(this.Search);
    },
    tidsswitch(val) {
      // //console.log(val);
      this.Search.typeid = val;
      this.getvideo(this.Search);
    },
    pagechange(index) {
      // //console.log(index);
      this.Search.userid = index;
      this.getvideo(this.Search);
    },
    getvideo(Search) {
      this.axios.post("xyvideo/findIfBySearch.do", Search).then(rs => {
        this.videolist = rs.data.xyuser;
        this.total = rs.data.count;
      });
    }
  },
  mounted() {
    const keyword = this.$route.query.keyword;
    if (keyword === undefined) {
      this.errorshow = true;
      return;
    }
    this.Search.videoname = keyword;
    this.getvideo(this.Search);
  }
};
</script>

<style scoped lang="scss">
.error-wrap {
  width: 100%;
  margin-top: 20px;
  height: 440px;
  border: 1px solid #e5e9ef;
  background: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/no_more.png)
    50% 100% no-repeat;
  background-color: #fff;
  line-height: 440px;
  text-align: center;
  height: inherit;
  color: #777;
  position: relative;
  .txt {
    font-size: 25px;
  }
}
</style>