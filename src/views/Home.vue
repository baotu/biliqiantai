<template>
  <div class="home">
    <Index :headerBgs="homeBgs"/>
    <HomeNav/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Index from "@/components/header/index";
import HomeNav from "@/components/nav/index";
import Footer from "@/components/footer/index";

import store from "@/store.js";

export default {
  store,
  name: "home",
  data() {
    return {
      headerBg: [
        {
          name: "indexBody",
          bgtop:
            'url("http://cdn.hwzhj.top/img/header/indexbg.png")',
          bgcenter:
            'url("http://cdn.hwzhj.top/img/header/indexbg.png")',
          bglogo:
            'url("http://cdn.hwzhj.top/img/header/indexlogo.png")'
        },
        {
          name: "animation",
          bgtop:
            'url("http://cdn.hwzhj.top/img/header/dhbg.png")',
          bgcenter:
            'url("http://cdn.hwzhj.top/img/header/dhbg.png")',
          bglogo:
            'url("http://cdn.hwzhj.top/img/header/dhlogo.png")'
        },
        {
          name: "bangumi",
          bgtop:
            'url("http://cdn.hwzhj.top/img/header/indexbg.png")',
          bgcenter:
            'url("http://cdn.hwzhj.top/img/header/indexbg.png")',
          bglogo:
            'url("http://cdn.hwzhj.top/img/header/indexlogo.png")'
        },
        {
          name: "china",
          bgtop:
            'url("http://cdn.hwzhj.top/img/header/donghuabg.png")',
          bgcenter:
            'url("http://cdn.hwzhj.top/img/header/donghuabg.png")',
          bglogo:
            'url("http://cdn.hwzhj.top/img/header/donghualogo.png")'
        },
        {
          name: "music",
          bgtop:
            'url("http://cdn.hwzhj.top/img/header/indexbg.png")',
          bgcenter:
            'url("http://cdn.hwzhj.top/img/header/indexbg.png")',
          bglogo:
            'url("http://cdn.hwzhj.top/img/header/indexlogo.png")'
        },
        {
          name: "dance",
          bgtop:
            'url("http://cdn.hwzhj.top/img/header/indexbg.png")',
          bgcenter:
            'url("http://cdn.hwzhj.top/img/header/indexbg.png")',
          bglogo:
            'url("http://cdn.hwzhj.top/img/header/indexlogo.png")'
        },
        {
          name: "game",
          bgtop:
            'url("http://cdn.hwzhj.top/img/header/gamebg.png")',
          bgcenter:
            'url("http://cdn.hwzhj.top/img/header/gamebg.png")',
          bglogo:
            'url("http://cdn.hwzhj.top/img/header/gamelogo.png")'
        },
        {
          name: "technology",
          bgtop:
            'url("http://cdn.hwzhj.top/img/header/kejibg.png")',
          bgcenter:
            'url("http://cdn.hwzhj.top/img/header/kejibg.png")',
          bglogo:
            'url("http://cdn.hwzhj.top/img/header/kejilogo.png")'
        },
        {
          name: "movie",
          bgtop:
            'url("http://cdn.hwzhj.top/img/header/moviebg.png")',
          bgcenter:
            'url("http://cdn.hwzhj.top/img/header/moviebg.png")',
          bglogo:
            'url("http://cdn.hwzhj.top/img/header/movielogo.png")'
        },
        {
          name: "life",
          bgtop:
            'url("http://cdn.hwzhj.top/img/header/lifebg.png")',
          bgcenter:
            'url("http://cdn.hwzhj.top/img/header/lifebg.png")',
          bglogo:
            'url("http://cdn.hwzhj.top/img/header/lifelogo.png")'
        },
        {
          name: "guichu",
          bgtop:
            'url("http://cdn.hwzhj.top/img/header/indexbg.png")',
          bgcenter:
            'url("http://cdn.hwzhj.top/img/header/indexbg.png")',
          bglogo:
            'url("http://cdn.hwzhj.top/img/header/indexlogo.png")'
        },
        {
          name: "fasion",
          bgtop:
            'url("http://cdn.hwzhj.top/img/header/fasionbg.png")',
          bgcenter:
            'url("http://cdn.hwzhj.top/img/header/fasionbg.png")',
          bglogo:
            'url("http://cdn.hwzhj.top/img/header/fasionlogo.png")'
        },
        {
          name: "yule",
          bgtop:
            'url("http://cdn.hwzhj.top/img/header/lifebg.png")',
          bgcenter:
            'url("http://cdn.hwzhj.top/img/header/lifebg.png")',
          bglogo:
            'url("http://cdn.hwzhj.top/img/header/lifelogo.png")'
        }
      ],
      homeBgs: {}
    };
  },
  components: {
    Index,
    HomeNav,
    Footer
  },
  methods: {
    bgSwitch(to) {
      $.each(this.headerBg, (i, v) => {
        if (to.name == this.headerBg[i].name) {
          this.homeBgs = this.headerBg[i];
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next( vm => {
      vm.bgSwitch(to);
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.bgSwitch(to);
    next();
  }
};
</script>

<style scoped>
</style>
