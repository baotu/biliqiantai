<template>
  <div>
    <div class="user-wrap" v-show="!errorshow">
      <Total :total="total"></Total>
      <Result
        @pagechange="pagechange"
        :videolist="videolist"
        :total="total"
        :searchtype="3"
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
import store from "@/store.js";

import Total from "./body-contain/Total";
import Result from "./body-contain/Result";
import Recom from "./body-contain/Recom";

export default {
  store,
  name: "searchuser",
  components: {
    Total,
    Result,
    Recom
  },
  data() {
    return {
      total: 10,
      index: 1,
      videolist: [],
      errorshow: false,
      keyword: "",
    };
  },
  computed: {
    user() {
      return store.state.user;
    }
  },
  watch: {
    $route(to, from) {
      const keyword = to.query.keyword;
      if (keyword != undefined) {
        this.errorshow = false;
      }
      this.keyword = keyword;
      this.getphoto(this.keyword);
    }
  },
  methods: {
    pagechange(index) {
      this.index = index;
      //console.log(index);
    },
    getphoto(Search) {
      this.axios
        .get("xyalbum/findPageByAlbumName.do", {
          params: { albumname: Search, page: this.index }
        })
        .then(rs => {
          this.videolist = rs.data.xyuser;
          var lists = rs.data.xyusercou;
          this.videolist.forEach((item,index) => {
            this.$set(this.videolist[index], "photocount", lists[index]);
          });
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
    this.keyword = keyword;
    this.getphoto(this.keyword);

    
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