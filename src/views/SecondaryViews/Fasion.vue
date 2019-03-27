<template>
  <div id="main">
    <div class="page-width clearfix">
      <TagList :typeid="typeid" @handTag="toggleLabel"></TagList>
      <Table :typeid="typeid" :tagname="tagname"></Table>
    </div>
  </div>
</template>

<script>
import TagList from "@/components/SecondaryViems/Tag";
import Table from "@/components/SecondaryViems/Table";

export default {
  name: "fasion",
  components: {
    TagList,
    Table
  },
  data() {
    return {
      typeid: 11,
      tagname: "全部标签"
    };
  },
  methods: {
    // 捕获标签切换
    toggleLabel(tag) {
      // console.log(tag);
      this.tagname = tag;
    }
  },
};
</script>

<style scoped>
</style>