<template>
  <div class="header-c">
    <div class="header-c">
      <div class="page-width">
        <a href="#" id="header_logo" :style="{backgroundImage:logoUrl}"></a>
        <p id="header_title"></p>
        <div id="search" class="clearfix">
          <div class="search-rank">排行榜</div>
          <div class="search-box">
            <input
              type="text"
              @click="show"
              @focus="show"
              @keyup.enter="searchVideo(searchinput)"
              @input="getkeyword(searchinput)"
              class="text"
              placeholder="bili哔哩 <> _ <>"
              v-model.trim="searchinput"
            >
            <a href="#" slot="suffix" @click.prevent="searchVideo(searchinput)" class="btn">
              <i></i>
            </a>
            <div class="search-history">
              <div v-show="autoplshow">
                <div class="title">关键词</div>
                <div class="list">
                  <a
                    href="#"
                    v-for="item in keywordlist"
                    :key="item.videoid"
                    v-html="keywords(item.videoname,searchinput)"
                    @click.prevent="searchVideo(item.videoname)"
                  ></a>
                </div>
              </div>
              <div v-show="!autoplshow">
                <div class="title">历史搜索</div>
                <div class="list" v-show="!searchlist.length" style="padding:20px">
                  <span>你还没有搜索噢</span>
                </div>
                <!--  -->
                <div class="list" v-show="searchlist.length">
                  <div v-for="item in resolveArr" :key="item.id" style="position: relative;">
                    <a href="#" @click.prevent="searchVideo(item.title)">{{item.title}}</a>
                    <i @click.prevent="removersearch(item,$event)"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="header-title">哔哩哔哩 (゜-゜)つロ 干杯~</div>
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
  name: "HeadContent",
  props: ["logoUrl"],
  data() {
    return {
      vLogourl: this.logoUrl,
      searchinput: "",
      searchlist: todoStorage.fetch(),
      keywordlist: [],
      autoplshow: false
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
    resolveArr(){
      let newarr = this.searchlist.slice(-5);
      return newarr.reverse();
    }
  },
  methods: {
    //过滤关键字 高亮
    keywords: function(value, key) {
      if (!this.searchinput.length) {
        $("#search")
          .find(".search-history")
          .hide();
        return;
      }
      var key = this.searchinput;
      var reg = new RegExp("(" + key + ")", "g");
      var newstr = value.replace(
        reg,
        "<font style='color: #f25d8e;'>$1</font>"
      );
      return newstr;
    },
    show() {
      var $search_history = $("#search").find(".search-history");
      $search_history.show();
    },
    panelShow() {
      const serar_txt = document.querySelector("#search .text");
      var search_history = document.querySelector("#search .search-history");
      var $search_history = $("#search").find(".search-history");
      $(document).click(function(e) {
        e.preventDefault();
        if (
          !serar_txt.contains(e.target) &&
          !search_history.contains(e.target)
        ) {
          $search_history.hide();
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
      this.searchinput = title;
      this.autoplshow = false;
      const { href } = this.$router.resolve({
        name: "searchall",
        query: { keyword: title }
      });
      this.axios
        .get("xyrank/insertData.do", { params: { rankname: title } })
        .then(rs => {
          window.open(href, "_blank");
        });
    },
    removersearch(todo, e) {
      this.searchlist.splice(this.searchlist.indexOf(todo), 1);
    },
    getkeyword(value) {
      //非空验证
      if (!value.length) {
        this.keywordlist = [];
        this.autoplshow = false;
        return;
      }
      this.axios
        .get("xyvideo/findByLikeInIndex.do", { params: { videoname: value } })
        .then(rs => {
          if (!rs.data.xyuser.length) {
            $("#search")
              .find(".search-history")
              .hide();
            return;
          }
          this.autoplshow = true;
          $("#search")
            .find(".search-history")
            .show();
          this.keywordlist = [...rs.data.xyuser];
        });
    }
  },
  mounted() {
    this.panelShow();
  }
};
</script>

<style scoped lang="scss">
/deep/ #search {
  .el-input__inner {
    width: 220px;
    padding: 0 36px 0 12px;
    height: 32px;
    line-height: 32px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.88);
  }
}
.search-history {
  height: auto;
  padding-bottom: 10px;
}
.search-history .list i {
  top: 0px;
}
</style>