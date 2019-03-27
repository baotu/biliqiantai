<template>
  <div class="clearfix" :id="tabTypes" js-move="true">
    <div class="pic-list fl">
      <div class="pic-list__title">
        <slot name="head"></slot>
      </div>
      <ul
        class="pic-list__wrapper clearfix"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 1)"
      >
        <template v-for="item in tablists">
          <li class="item" :key="item.videoid">
            <a href="javascript:void(0)" @click="govideo(item.videoid)" class="img-link">
              <img v-lazy="item.picture">
              <span class="mask"></span>
              <span class="time">{{item.time | datas}}</span>
            </a>
            <div class="img-info">
              <a href="#">{{item.title}}</a>
              <div class="btm">
                <div class="user">
                  <i></i>
                  {{item.xyuser.username}}
                </div>
                <div class="online">
                  <i></i>
                  {{item.click}}
                </div>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <Sliderbar :typeid="Typesid" :tabTypes="tabTypes"></Sliderbar>
  </div>
</template>

<script>
import Sliderbar from "./Sliderbar";
export default {
  name: "Hometab",
  props: ["tabTypes", "Typesid", "typecheck"],
  data() {
    return {
      tablists: [],
      vtabTypes: this.tabTypes,
      vTypesid: this.Typesid,
      loading: true
    };
  },
  computed: {
    isShow() {
      return this.typecheck;
    }
  },
  filters: {
    datas(val){
      return val.substring(0,10)
    }
  },
  methods: {
    getVideo(url, typeid) {
      this.axios
        .get(url, {
          params: {
            typeid: typeid
          }
        })
        .then(rs => {
          if (rs.status == 200) {
            this.loading = false;
          }
          this.tablists = rs.data.xyuser;
        });
    },
    govideo(vdId) {
      const { href } = this.$router.resolve({
        name: "play",
        query: { vdId: vdId }
      });
      this.axios
        .get("xyvideo/addclick.do", { params: { videoid: vdId } })
        .then(rs => {
          window.open(href, "_blank");
        });
    }
  },
  watch: {
    isShow(newV, oldV) {
      // do something
      if (newV) {
        this.getVideo("xyvideo/findByTypeTime.do", this.vTypesid);
      } else {
        this.getVideo("xyvideo/findByTypeClick.do", this.vTypesid);
      }
      //console.log(newV, oldV);
    }
  },
  components: {
    Sliderbar
  },
  mounted() {
    this.getVideo("xyvideo/findByTypeClick.do", this.vTypesid);
  }
};
</script>

<style scoped>
</style>