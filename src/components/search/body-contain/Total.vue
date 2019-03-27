<template>
  <div class="total-wrap">
    <p class="total-text">共{{total}}条数据</p>
  </div>
</template>

<script>
export default {
  name: "searchtotal",
  props:['total'],
};
</script>

<style scoped lang="scss">
.total-wrap {
  position: relative;
  margin-top: 10px;
  .total-text {
    display: inline-block;
    line-height: 16px;
    color: #99a2aa;
  }
}
</style>