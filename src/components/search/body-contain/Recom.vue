<template>
  <div class="recom-wrap">
    <div class="no-result recom none"></div>
  </div>
</template>

<script>
export default {
  name: "searchrecom"
};
</script>

<style scoped lang="scss">
.recom-wrap {
  width: 980px;
  margin: 0 auto 50px;
  .no-result {
    &.none {
      display: block;
    }
    width: 978px;
    height: auto;
    background: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/no-data.png)
      no-repeat 50% 50%;
    background-color: #fff;
    height: 240px;
    line-height: 240px;
    text-align: center;
    margin-top: 20px;
    display: none;
  }
}
</style>