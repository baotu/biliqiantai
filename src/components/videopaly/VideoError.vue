<template>
  <div class="video-error">
    <HeaderNav></HeaderNav>
    <Errorbody>
      <div class="error-panel" slot="pl">
        <div class="error-msg">
          <div class="error-img">
            <img
              src="//s1.hdslb.com/bfs/static/jinkela/video/asserts/no_video.png"
              width="160"
              height="100"
            >
          </div>
          <div class="error-prompt">
            <div class="error-text">啊叻？视频不见了？</div>
            <div class="msg-text"></div>
            <a href="/" class="big-btn go-home">返回首页</a>
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
  name: "videoError",
  components: {
    HeaderNav,
    Errorbody
  }
};
</script>

<style scoped>
</style>