<template>
  <div class="filter-wrap">
    <ul class="filter-type clearfix order">
      <li class="filter-item" :class="order == 0? 'active':''">
        <a href="#" @click.prevent="toggleorder(0)">综合排序</a>
      </li>
      <li class="filter-item" :class="order == 1? 'active':''">
        <a href="#" @click.prevent="toggleorder(1)">最多点击</a>
      </li>
      <li class="filter-item" :class="order == 2? 'active':''">
        <a href="#" @click.prevent="toggleorder(2)">最新发布</a>
      </li>
      <li class="filter-item" :class="order == 3? 'active':''">
        <a href="#" @click.prevent="toggleorder(3)">最多点赞</a>
      </li>
    </ul>
    <ul class="filter-type clearfix duration">
      <li class="filter-item" :class="duration == 0? 'active':''">
        <a href="#" @click.prevent="toggleduration(0)">全部时长</a>
      </li>
      <li class="filter-item" :class="duration == 1? 'active':''">
        <a href="#" @click.prevent="toggleduration(1)">10分钟以下</a>
      </li>
      <li class="filter-item" :class="duration == 2? 'active':''">
        <a href="#" @click.prevent="toggleduration(2)">10-30分钟</a>
      </li>
      <li class="filter-item" :class="duration == 3? 'active':''">
        <a href="#" @click.prevent="toggleduration(3)">60分钟以上</a>
      </li>
    </ul>
    <ul class="filter-type clearfix tids_1">
      <li class="filter-item" :class="tids == 0? 'active':''">
        <a href="#" @click.prevent="toggletids(0)">全部分区</a>
      </li>
      <li
        class="filter-item"
        v-for="item in typelist"
        :key="item.typeid"
        :class="tids == item.typeid? 'active':''"
      >
        <a href="#" @click.prevent="toggletids(item.typeid)">{{item.typename}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "searchfiter",
  data() {
    return {
      typelist: [],
      order: 0,
      duration: 0,
      tids: 0
    };
  },
  methods: {
    toggleorder(val) {
      this.order = val;
      this.$emit("orderswitch", val);
    },
    toggleduration(val) {
      this.duration = val;
      this.$emit("durationswitch", val);
    },
    toggletids(val) {
      this.tids = val;
      this.$emit("tidsswitch", val);
    },
    gettype() {
      this.axios.get("xyvideotype/findAll.do").then(rs => {
        this.typelist = rs.data.xyvideotype;
      });
    }
  },
  mounted() {
    this.gettype();
  }
};
</script>

<style scoped lang="scss">
.filter-wrap {
  height: auto;
  padding: 20px 0 10px;
  position: relative;
  border-bottom: 1px solid #e5e9ef;
  display: table;
  width: 100%;
  .filter-type {
    margin-bottom: 10px;
    .filter-item {
      float: left;
      padding-left: 8px;
      padding-right: 8px;
      border-radius: 4px;
      margin-right: 15px;
      &.active {
        &:hover a {
          color: #fff;
        }
        background-color: #00a1d6;
        a {
          color: #fff;
        }
      }
      &:hover a {
        color: #00a1d6;
      }
      a {
        color: #222;
        font-size: 12px;
        line-height: 20px;
      }
    }
  }
}
</style>