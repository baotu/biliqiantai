<template>
  <div id="error-page">
    <HeaderNav></HeaderNav>
    <Errorbody>
      <div class="error-panel" slot="pl">
        <img src="//static.hdslb.com/error/very_sorry.png">
        <div>
          <div class="left-panel">
            <a href="/" class="rollback-btn">返回首页</a>
          </div>
          <div class="right-panel">
            <b>错误号:</b> 404
            <br>
            <b>用户IP:</b>
            {{upip}}
            <br>
            <b>当前城市:</b>
            {{upcity}}
            <br>
            <b>请求地址:</b>
            {{upurl}}
            <br>
          </div>
        </div>
      </div>
    </Errorbody>
  </div>
</template>
<script>
import HeaderNav from "@/components/header/HeaderNav1";
import Errorbody from "@/components/error/Errorbody";

export default {
  name: "error",
  components: {
    HeaderNav,
    Errorbody
  },
  data() {
    return {
      upip: "",
      upurl: "",
      upcity: ""
    };
  },
  mounted() {
    this.upip = returnCitySN["cip"];
    this.upurl = location.href;
    this.upcity = returnCitySN["cname"];
  }
};
</script>

<style scoped lang="scss">
.rollback-btn {
  display: inline-block;
  line-height: 40px;
  vertical-align: middle;
  text-align: center;
  background: #00a1d6;
  color: #fff;
  border-radius: 4px;
  float: right;
  font-size: 16px;
  transition: 0.2s;
  cursor: pointer;
}
.left-panel {
  height: 150px;
  width: 404px;
  display: inline-block;
  position: absolute;
  .rollback-btn {
    height: 40px;
    width: 140px;
    margin: 25px 40px 0 0;
  }
}
.right-panel {
  display: inline-block;
  width: 100%;
  margin-left: 404px;
  padding-left: 26px;
  margin-top: 16px;
  color: #99a2aa;
  border-left: 1px #ccd0d7 dashed;
  text-align: left;
  font-size: 17px;
}
</style>