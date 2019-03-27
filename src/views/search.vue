<template>
  <div id="Homesearch">
      <HeaderNav></HeaderNav>
      <router-view></router-view>
      <Footers></Footers>
  </div>
</template>

<script>
import HeaderNav from "@/components/header/HeaderNav1";
import Footers from "@/components/footer/index";

export default {
  name: "search",
  components:{
      Footers,HeaderNav
  }
};
</script>

<style scoped lang="scss">

</style>