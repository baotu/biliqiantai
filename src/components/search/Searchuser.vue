<template>
  <div>
    <div class="user-wrap" v-show="!errorshow">
      <Total :total="total"></Total>
      <Result
        @pagechange="pagechange"
        :videolist="videolist"
        :total="total"
        :searchtype="2"
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
      keyword: ""
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
      this.getUser(this.keyword);
    }
  },
  methods: {
    pagechange(index) {
      this.index = index;
      //console.log(index);
    },
    getUser(Search) {
      this.axios
        .get("xyuser/findPageUserNameByUserName.do", {
          params: { username: Search, page: this.index }
        })
        .then(rs => {
          //console.log(rs);
          this.videolist = rs.data.xyuser;
          this.total = rs.data.count;
          this.diffisfollow();
        });
    },
    //判断当前用户是否关注
    diffisfollow() {
      if (JSON.stringify(this.user) === "{}") return;
      this.axios
        .get("xyfriend/findByUserFriends.do", {
          params: { userid: this.user.userid }
        })
        .then(rs => {
          let diffuser = rs.data.xyuser;
          //console.log(diffuser);
          let index = 0;
          // diff 双重遍历  遍历当前视频下的所有回复
          // 与当前用户在当前视频下所有点赞|踩过的回复进行二次遍历
          this.videolist.forEach(item => {
            diffuser.forEach(element => {
              //判断 用户点赞评论id 与 当前视频下的评论id 是否相等
              if (item.userid === element.userfriend) {
                // 为 0 则为点赞状态  为 1 则为踩状态
                this.$set(this.videolist[index], "followstatus", true);
              }
            });
            index++;
          });
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
    this.getUser(this.keyword);
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