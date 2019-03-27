<template>
  <div class="searchindex">
    <div class="page-width">
      <div class="home-form">
        <div class="home-logo"></div>
        <div class="home-input clearfix" id="autoplact">
          <div style="margin-top: 15px;">
            <el-input
              placeholder="搜索你想要的内容..."
              @click.native="showSearch"
              @focus="showSearch"
              @keyup.enter.native="searchVideo(input)"
              @input="getkeyword(input)"
              v-model.trim="input"
              class="input-with-select"
            >
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="综合" value="1"></el-option>
                <el-option label="视频" value="2"></el-option>
                <el-option label="用户" value="3"></el-option>
                <el-option label="相簿" value="4"></el-option>
              </el-select>
              <el-button slot="append" @click="searchVideo(input)">搜索</el-button>
            </el-input>
          </div>
          <div class="suggest-wrap" v-show="autoplshow">
            <!-- 热搜列表 -->
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
              <ul class="horizontal" v-show="searchlist.length">
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
            <!--搜索历史列表 -->
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
        <div class="home-suggest clearfix">
          <div class="hot-search">
            <div class="title">
              <i class="title-icon hot"></i>
              热门搜索
              <span class="subtitle">Daily Hot</span>
            </div>
            <ul class="hotlist">
              <li
                class="item"
                @click="searchVideo(item.rankname)"
                v-for="(item,index) in keywordTop.slice(0,10)"
                :key="item.rankid"
              >
                <span class="num" :class="index<3 ?'special':''">{{index+1}}</span>
                <span class="word">{{item.rankname}}</span>
              </li>
            </ul>
            <ul class="hotlist">
              <li
                class="item"
                @click="searchVideo(item.rankname)"
                v-for="(item,index) in keywordTop.slice(10)"
                :key="item.rankid"
              >
                <span class="num">{{index+11}}</span>
                <span class="word">{{item.rankname}}</span>
              </li>
            </ul>
          </div>
          <div class="history">
            <div class="title">
              <i class="title-icon hot"></i>
              搜索历史
              <span class="delete-history" @click="removerall">
                <i class="icon-garbage"></i>
                清空
              </span>
              <span class="subtitle">History</span>
            </div>
            <ul class="list" v-show="searchlist.length">
              <li class="item" v-for="item in searchlist" :key="item.id">
                <a href="#" @click.prevent="searchVideo(item.title)">{{item.title}}</a>
              </li>
            </ul>
            <div class="no-history" v-show="!searchlist.length">
              <span>没有历史纪录</span>
            </div>
          </div>
        </div>
      </div>
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
  name: "searchindex",
  data() {
    return {
      input: "",
      select: "1",
      autoplshow: false,
      searchlist: todoStorage.fetch(),
      keywordshow: false,
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
  computed:{
    // 获取最近5个历史纪录
    resolveArr(){
      let newarr = this.searchlist.slice(-5);
      return newarr.reverse();
    }
  },
  methods: {
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
    showSearch() {
      this.autoplshow = true;
    },
    hideSearch() {
      const Vuethis = this;
      const serar_txt = document.querySelector("#autoplact");
      $(document).click(function(e) {
        e.preventDefault();
        if (!serar_txt.contains(e.target)) {
          Vuethis.autoplshow = false;
        }
      });
    },
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
      this.axios
        .get("xyrank/insertData.do", { params: { rankname: title } })
        .then(rs => {
          this.$router.push({ name: "searchall", query: { keyword: title } });
        });
    },
    removersearch(todo, e) {
      this.searchlist.splice(this.searchlist.indexOf(todo), 1);
    },
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
    this.hideSearch();
    this.getkeywordTop();
  }
};
</script>

<style scoped lang="scss">
.searchindex {
  .home-form {
    .home-logo {
      text-align: center;
      margin: 40px auto 20px;
      width: 284px;
      height: 68px;
      background: transparent
        url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/search_index_logo_v2.4.png)
        no-repeat 50%;
    }
    /deep/.home-input {
      width: 632px;
      margin: 0 auto 15px;
      position: relative;
      .el-select {
        width: 100px;
        .el-input__inner {
          border: 1px solid #ccd0d7;
          background: #fff;
          border-radius: 4px 0 0 4px;
        }
      }
      .el-input__inner::placeholder{
        color: #757575;
      }
      .el-input-group__append {
        text-align: center;
        font-size: 16px;
        font-weight: bolder;
        background-color: #00a1d6;
        color: #fff;
        border: 1px solid #008cd2;
        width: 78px;
        border-radius: 0 4px 4px 0;
      }
      .suggest-wrap {
        top: 42px;
        left: 115px;
        width: 393px;
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
    .home-suggest {
      width: 980px;
      padding-top: 81px;
      margin-top: 30px;
      margin-bottom: 45px;
      background: transparent
        url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/search_2233_bg.png)
        no-repeat top;
      .hot-search {
        float: left;
        width: 390px;
        height: 340px;
        padding: 20px 10px 20px 20px;
        margin-right: 10px;
        margin-left: 155px;
        border: 1px solid #ddd;
      }
      .history {
        float: left;
        width: 175px;
        height: 340px;
        padding: 20px;
        border: 1px solid #ddd;
        .list {
          .item {
            width: 150px;
            border-bottom: 1px dotted #eee;
            padding-bottom: 5px;
            padding-left: 10px;
            margin-bottom: 5px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            cursor: pointer;
            a {
              color: #222;
            }
          }
        }
      }
      .title {
        position: relative;
        font-size: 20px;
        margin-left: 23px;
        .title-icon {
          position: absolute;
          display: inline-block;
          right: 100%;
          width: 34px;
          height: 28px;
          background: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/search_title_icon.png)
            no-repeat;
          &.hot {
            background-position: -1px -1px;
          }
        }
        .subtitle {
          font-size: 12px;
          color: #aaa;
          display: block;
          margin-bottom: 20px;
        }
        .delete-history {
          font-size: 12px;
          color: #aaa;
          margin-left: 22px;
          cursor: pointer;
          vertical-align: middle;
          &:hover {
            color: #00a1d6;
          }
          &:hover .icon-garbage {
            background-position: -10px -150px;
          }
          .icon-garbage {
            background: transparent
              url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/search_icon.png)
              no-repeat 0 -150px;
            width: 10px;
            height: 12px;
            margin-bottom: 3px;
            margin-right: 2px;
            vertical-align: middle;
            display: inline-block;
          }
        }
      }
      .hotlist {
        width: 160px;
        float: left;
        margin-right: 35px;
        .item {
          width: 160px;
          border-bottom: 1px dotted #eee;
          line-height: 17px;
          padding-bottom: 5px;
          margin-bottom: 5px;
          float: left;
          cursor: pointer;
        }
        .num {
          display: inline-block;
          vertical-align: middle;
          width: 16px;
          color: #fff;
          line-height: 16px;
          font-family: Arial;
          background-color: #aaa;
          margin-right: 8px;
          text-align: center;
          &.special {
            background-color: #f489ad;
          }
        }
      }
    }
  }
}
</style>