<template>
  <div id="sideBar">
    <div class="sideBar-list">
      <template v-for="item in Typelists.xyvideotype">
        <a href="#" :key="item.id">{{item.typename}}</a>
      </template>
      <a href="#">
        <i></i>排序
      </a>
    </div>
    <div class="sideBar-line"></div>
    <a href="#" class="sideBar-toTop" @click.prevent="backtop" id="backTop"></a>
  </div>
</template>

<script>
import { getSer } from "./script.js";
export default {
  name: "HomeSlidBar",
  data() {
    return {
      Typelists: []
    };
  },
  mounted() {
    $("#sideBar").css({ left: this.widthChanged($(window).width()) });
    this.getWindowWidth();
    this.axios
      .get("http://111.230.247.223/SameBWeb/xyvideotype/findAll.do")
      .then(result => {
        this.Typelists = result.data;
        setTimeout(getSer, 100);
      });
  },
  methods: {
    getWindowWidth() {
      //当浏览器大小变化时
      $(window).resize(() => {
        $("#sideBar").css({ left: this.widthChanged($(window).width()) });
      });
    },
    widthChanged(window) {
      return (window - $("#sideBar").width()) / 2 + $("#sideBar").width() + 480;
    },
    backtop() {
      $("html,body").animate(
        {
          scrollTop: 0
        },
        500
      );
    }
  }
};
</script>

<style scoped>
#sideBar {
  top: 232px;
}
.sideBar-list a:last-child {
  display: none;
}
</style>