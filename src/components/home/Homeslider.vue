<template>
  <div id="banner">
    <div class="page-width clearfix">
      <div class="slider fl slideBox" id="slideBox">
        <div class="slider-img">
          <div>
            <template v-for="item in slidePic">  
              <a href="javascript:void(0)" :title="item.title" @click="govideo(item.videoid)" :key="item.videoid">
                <img v-lazy="item.picture" alt="#">>
              </a>
            </template>
          </div>
        </div>
        <div class="slider-title">
          <p></p>
        </div>
        <div class="slider-btn">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <!-- <a href="#" class="slider-more">更多</a> -->
      </div>
      <div class="banner-list fr">
        <ul v-for="item in videolists" :key="item.videoid">
          <li>
            <a href="javascript:void(0)" @click="govideo(item.videoid)">
              <img v-lazy="item.picture" alt="#">
              <div class="info">
                <p class="title">{{item.title}}</p>
                <p class="author">up主：{{item.xyuser.username}}</p>
                <p class="play">播放：{{item.click}}</p>
              </div>
            </a>
          </li>
        </ul>
        <!-- <a href="#" class="btn btn-prev">昨日</a>
        <a href="#" class="btn btn-next">一周</a>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeSlider",
  data() {
    return {
      slidePic: [],
      videolists: []
    };
  },
  methods: {
    govideo(vdId) {
      const { href } = this.$router.resolve({
        name: "play",
        query: { vdId: vdId }
      });
      this.axios.get('xyvideo/addclick.do',{params:{videoid:vdId}}).then(rs =>{
        window.open(href, "_blank");
      })
    }
  },
  mounted() {
    this.axios
      .get("xyvideo/findByGreClick.do")
      .then(rs => {
        // //console.log(rs.data.xyuser);
        this.slidePic = rs.data.xyuser;
      })
      .then(() => {
        $("#slideBox").slide({
          effect: "left",
          mainCell: ".slider-img div",
          autoPlay: false,
          titCell: ".slider-btn span",
          titOnClassName: "cur",
          startFun: (i, c) => {
            $("#slideBox .slider-title p").html(this.slidePic[i].title);
          }
        });
      });
    this.axios.get("xyvideo/findByIndexClick.do").then(rs => {
      this.videolists = rs.data.xyuser;
    });
  }
};
</script>

<style scoped>
.slideBox .hd {
  overflow: hidden;
  position: absolute;
  z-index: 1;
}
.slideBox .hd ul {
  overflow: hidden;
  zoom: 1;
  float: left;
}

.slideBox .hd ul li {
  float: left;
}
</style>