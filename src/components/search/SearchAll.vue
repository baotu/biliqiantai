<template>
  <div class="page-width">
    <div class="head-contain">
      <div class="search-wrap">
        <div id="search-wrapAll">
          <div class="logo-input clearfix">
            <router-link :to="{name:'search'}" class="search-logo"></router-link>
            <div class="search-block">
              <div class="input-wrap">
                <input
                  type="text"
                  id="search-keyword"
                  @click.native="showSearch"
                  @focus="showSearch"
                  @keyup.enter="searchVideo(input)"
                  @input="getkeyword(input)"
                  v-model.trim="input"
                  maxlength="100"
                  autocomplete="off"
                >
              </div>
              <div class="search-button" @click="searchVideo(input)">
                <i class="icon-search-white"></i>
                <span class="search-text">搜索</span>
              </div>
            </div>
            <div class="suggest-wrap" v-show="autoplshow">
              <!-- 热门搜索列表 -->
              <div class="hotword-wrap" v-show="!keywordshow">
                <ul class="vertical" v-show="!searchlist.length">
                  <li class="title">
                    <span>热搜榜</span>
                  </li>
                  <li v-for="(item, index) in keywordTop.slice(0,10)" :key="item.rankid">
                    <a href="#" @click.prevent="searchVideo(item.rankname)" class="vt-text">
                      <span class="rank">{{index+1}}</span>
                      {{item.rankname}}
                    </a>
                  </li>
                </ul>
                <ul class="horizontal" v-if="searchlist.length">
                  <li v-for="item in keywordTop.slice(0,8)" :key="item.rankid">
                    <a
                      href="#"
                      @click.prevent="searchVideo(item.rankname)"
                      class="hz-text"
                    >{{item.rankname}}</a>
                  </li>
                </ul>
              </div>
              <!-- 关键字列表 -->
              <ul class="keyword-wrap" v-show="keywordshow">
                <li v-for="item in inputkeyword" :key="item.videoid">
                  <a
                    class="vt-text keyword"
                    @click.prevent="searchVideo(item.videoname)"
                    v-html="keywords(item.videoname,input)"
                  ></a>
                </li>
              </ul>
              <!-- 历史纪录列表 -->
              <ul class="history-wrap" v-show="searchlist.length&&!keywordshow">
                <li class="title">
                  <span>搜索历史</span>
                </li>
                <li class="history-li" v-for="item in resolveArr" :key="item.id">
                  <a href="#" @click.prevent="searchVideo(item.title)">{{item.title}}</a>
                  <i class="clear" @click="removersearch(item,$event)"></i>
                </li>
                <li class="clearall">
                  <a href="#" @click.prevent="removerall">清空搜索历史</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-wrap">
        <ul class="wrap clearfix">
          <li
            class="sub"
            :class="searchpath =='searchall'?'active':''"
            @click="tosearch('searchall')"
          >
            综合
            <span class="num" style="display:;"></span>
          </li>
          <li
            class="sub"
            :class="searchpath =='searchvideo'?'active':''"
            @click="tosearch('searchvideo')"
          >视频
            <!-- <span class="num">99+</span> -->
          </li>
          <li
            class="sub"
            :class="searchpath =='searchuser'?'active':''"
            @click="tosearch('searchuser')"
          >用户
            <!-- <span class="num">99+</span> -->
          </li>
          <li
            class="sub"
            :class="searchpath =='searchphoto'?'active':''"
            @click="tosearch('searchphoto')"
          >相簿
            <!-- <span class="num">99+</span> -->
          </li>
        </ul>
        <div class="hover-bar" :style="{left:hoverbaroff}"></div>
      </div>
    </div>

    <div class="body-contain">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(localStorage.getItem("search") || "[]");
    todos.forEach(function(todo, index) {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save: function(todo) {
    localStorage.setItem("search", JSON.stringify(todo));
  }
};
export default {
  name: "searchall",
  data() {
    return {
      hoverbaroff: "",
      input: "",
      autoplshow: false,
      keywordshow: false,
      searchlist: todoStorage.fetch(),
      inputkeyword: [],
      keywordTop: []
    };
  },
  watch: {
    searchlist: {
      handler: function(todos) {
        todoStorage.save(todos);
      },
      deep: true
    }
  },
  computed: {
    searchpath() {
      return this.$route.name;
    },
    resolveArr() {
      let newarr = this.searchlist.slice(-5);
      return newarr.reverse();
    }
  },
  methods: {
    hoverbar() {
      let pathname = this.$route.name;
      if (pathname == "searchall") this.hoverbaroff = "0px";
      if (pathname == "searchvideo") this.hoverbaroff = "114px";
      if (pathname == "searchuser") this.hoverbaroff = "228px";
      if (pathname == "searchphoto") this.hoverbaroff = "342px";
    },
    //过滤关键字 高亮
    keywords: function(value, key) {
      if (!this.input.length) {
        this.keywordshow = false;
        return;
      }
      var key = this.input;
      var reg = new RegExp("(" + key + ")", "g");
      var newstr = value.replace(
        reg,
        "<font style='color: #f25d8e;'>$1</font>"
      );
      return newstr;
    },
    barYun() {
      var Vuethis = this;
      $(".nav-wrap li")
        .mouseleave(function(e) {
          $(".nav-wrap .hover-bar").css({ left: Vuethis.hoverbaroff });
        })
        .mouseenter(function(e) {
          $(".nav-wrap .hover-bar").css({ left: $(this).position().left });
        })
        .click(function(e) {
          Vuethis.hoverbaroff = $(this).position().left;
          // //console.log($(this).position().left);
          $(".nav-wrap .hover-bar").css({ left: Vuethis.hoverbaroff });
        });
    },
    //搜索类型切换
    tosearch(name) {
      //console.log(name);
      if (this.input.length) {
        this.$router.push({ name: name, query: { keyword: this.input } });
      } else {
        this.$router.push({ name: name });
      }
    },
    //显示 搜索历史
    showSearch() {
      this.autoplshow = true;
    },
    //隐藏 搜索历史
    hideSearch() {
      const Vuethis = this;
      const serar_txt = document.querySelector("#search-wrapAll");
      $(document).click(function(e) {
        e.preventDefault();
        if (!serar_txt.contains(e.target)) {
          Vuethis.autoplshow = false;
        }
      });
    },
    //保存搜索历史 并查询
    searchVideo(val) {
      var title = val;
      if (!title) return;
      //去除相同的对象
      let arr = this.searchlist;
      arr.push({
        id: todoStorage.uid + 1,
        title: title
      });
      var obj = {};
      arr = arr.reduce(function(item, next) {
        obj[next.title] ? "" : (obj[next.title] = true && item.push(next));
        return item;
      }, []);
      this.searchlist = [...arr];
      this.input = title;
      this.autoplshow = false;
      var routername = this.$route.name;

      this.axios
        .get("xyrank/insertData.do", { params: { rankname: title } })
        .then(rs => {
          this.$router.push({ name: routername, query: { keyword: title } });
        });
    },
    //移除搜索历史
    removersearch(todo, e) {
      this.searchlist.splice(this.searchlist.indexOf(todo), 1);
    },
    //删除所有搜索历史
    removerall() {
      this.searchlist.splice(0);
    },
    getkeyword(value) {
      //非空验证
      if (!value.length) {
        this.keywordshow = false;
        this.inputkeyword = [];
        return;
      }
      this.axios
        .get("xyvideo/findByLikeInIndex.do", { params: { videoname: value } })
        .then(rs => {
          if (!rs.data.xyuser.length) {
            this.autoplshow = false;
            return;
          }
          this.keywordshow = true;
          this.autoplshow = true;
          this.inputkeyword = [...rs.data.xyuser];
        });
    },
    getkeywordTop() {
      this.axios
        .get("xyrank/findByClick.do", { params: { count: 20 } })
        .then(rs => {
          this.keywordTop = rs.data.xyuser;
        });
    }
  },
  mounted() {
    this.barYun();
    this.hideSearch();
    const keyword = this.$route.query.keyword;
    if (keyword != undefined) {
      this.input = keyword;
    }
    this.getkeywordTop();
    this.hoverbar();
  }
};
</script>

<style scoped lang="scss">
.head-contain {
  padding-top: 40px;
  .search-wrap {
    height: 44px;
    margin: 0 auto;
    position: relative;
    width: 587px;
    .search-logo {
      background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
      background-position: -261px -72px;
      width: 131px;
      height: 35px;
      float: left;
      margin-top: 7px;
    }
    .search-block {
      width: 430px;
      float: left;
      margin-left: 26px;
      .input-wrap {
        position: relative;
        background: #fff;
        border-radius: 4px;
        float: left;
        width: 330px;
        margin-right: 10px;
        input {
          height: 18px;
          box-shadow: none;
          padding: 11px 15px;
          background: transparent;
          width: 296px;
          border: 2px solid #ccd0d7;
          border-radius: 4px;
          color: #222;
        }
      }
      .search-button {
        cursor: pointer;
        float: left;
        color: #fff;
        background: #00a1d6;
        font-size: 16px;
        letter-spacing: 2px;
        line-height: 42px;
        text-align: center;
        width: 90px;
        border-radius: 4px;
        .icon-search-white {
          background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
          background-position: -148px -327px;
          width: 18px;
          vertical-align: middle;
          margin-top: -2px;
          height: 19px;
          display: inline-block;
        }
        .search-text {
          margin-left: 7px;
        }
      }
    }
    .suggest-wrap {
      top: 42px;
      left: 158px;
      width: 327px;
      border: 1px solid #e5e9ef;
      position: absolute;
      border-radius: 4px;
      text-align: center;
      padding: 10px 0;
      color: #222;
      background: #fff;
      z-index: 100;
      overflow: hidden;
      margin-top: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
      .title {
        border-top: 1px solid #e5e9ef;
        height: 10px;
        line-height: 10px;
        margin: 0 20px;
        span {
          display: inline-block;
          font-size: 12px;
          color: #99a2aa;
          padding: 0 10px;
          text-align: center;
          background: #fff;
          position: relative;
          top: -6px;
        }
      }
      .vertical {
        margin-top: 10px;
        li {
          &:nth-child(2) .rank {
            color: #e84242;
          }
          &:nth-child(3) .rank {
            color: #ff6a22;
          }
          &:nth-child(4) .rank {
            color: #e39423;
          }
          .rank {
            margin-right: 10px;
            color: #b8c0cc;
          }
          .vt-text {
            height: 32px;
            display: block;
            line-height: 32px;
            font-size: 14px;
            position: relative;
            text-align: left;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            cursor: pointer;
            color: #222;
            padding: 0 20px;
            margin: 0 0 4px;
            &:hover {
              background-color: #e5e9ef;
            }
          }
        }
      }
      .horizontal {
        padding: 0 20px;
        max-height: 84px;
        overflow: hidden;
        .hz-text {
          border-radius: 4px;
          margin-right: 15px;
          margin-bottom: 10px;
          border: 1px solid #e5e9ef;
          color: #222;
          height: 18px;
          padding: 7px 8px;
          float: left;
          text-align: center;
          font-size: 14px;
          &:hover {
            border-color: #00a1d6;
            color: #00a1d6;
          }
        }
      }
      .history-wrap {
        margin-top: 20px;
        position: relative;
        padding-bottom: 20px;
        .history-li {
          position: relative;
          margin: 0;
          &:hover {
            background-color: #e5e9ef;
          }
          a {
            height: 32px;
            display: block;
            line-height: 32px;
            font-size: 14px;
            position: relative;
            text-align: left;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            cursor: pointer;
            color: #222;
            padding: 0 20px;
            margin: 0 0 4px;
          }
          .clear {
            position: absolute;
            right: 20px;
            top: 10px;
            background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
            background-position: -485px -41px;
            width: 12px;
            height: 12px;
            cursor: pointer;
          }
        }
        .clearall {
          position: absolute;
          bottom: 0;
          right: 20px;
          font-size: 12px;
          color: #00a1d6;
          a {
            outline: 0;
            color: #00a1d6;
            text-decoration: none;
            cursor: pointer;
          }
        }
      }
      .vt-text {
        height: 32px;
        display: block;
        line-height: 32px;
        font-size: 14px;
        position: relative;
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
        color: #222;
        padding: 0 20px;
        margin: 0 0 4px;
      }
      .keyword-wrap {
        li {
          &:hover {
            background-color: #e5e9ef;
          }
          .keyword {
            padding: 0 20px;
            color: #222;
          }
        }
      }
    }
  }
  .nav-wrap {
    border-bottom: 1px solid #ccd0d7;
    height: 54px;
    padding: 0 0 1px;
    margin: 18px auto 0;
    position: relative;
    .wrap {
      height: 100%;
      position: relative;
      & > .sub.active,
      & > .sub:hover {
        color: #00a1d6;
      }
      .sub {
        float: left;
        line-height: 54px;
        text-align: center;
        cursor: pointer;
        width: 39px;
        font-size: 16px;
        padding: 0 75px 0 0;
        span {
          position: absolute;
          margin-left: 6px;
          font-size: 12px;
          color: #6d757a;
        }
      }
    }
    .hover-bar {
      position: absolute;
      height: 2px;
      background-color: #00a1d6;
      width: 39px;
      bottom: -1px;
      transition: left 0.2s;
    }
  }
}
</style>