<template>
  <header id="header" style="height:170px;" :style="{backgroundImage:headerBgs.bgcenter}">
    <!-- <router-link :to="{name:'indexBody'}">主页</router-link>
    <router-link :to="{name:'about'}">关于</router-link>-->
    <HeaderNav :topbg="headerBgs.bgtop"></HeaderNav>
    <HeadContent :logoUrl="headerBgs.bglogo"></HeadContent>
  </header>
</template>

<script>
import HeaderNav from "./HeaderNav";
import HeadContent from "./HeadContent";

import store from "@/store.js";

export default {
  store,
  name: "HomesHead",
  components: {
    HeaderNav,
    HeadContent
  },
  props: ["headerBgs"],
  data() {
    return {
      headBg: this.headerBgs
    }
  },
  mounted() {
    // //console.log(this.$route.path);
  },
};
</script>

<style scoped>
</style>