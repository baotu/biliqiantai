<template>
  <div class="error-body">
    <div class="error-container">
      <slot name="pl"></slot>
      <div class="error split"></div>
      <div class="error-manga">
        <div class="img-box">
          <img :src="downpic">
        </div>
        <a href="#up" @click.prevent="switchpic" class="big-btn verybig" style>换一张</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "errorbody",
  data() {
    return {
      pic: [
        "http://cdn.hwzhj.top/img/error/49m73k2r1x.png",
        "http://cdn.hwzhj.top/img/error/n6oxk2onql.png",
        "http://cdn.hwzhj.top/img/error/r9v5j96lk4.png",
        "http://cdn.hwzhj.top/img/error/z440ww0xox.png",
        "http://cdn.hwzhj.top/img/error/z4prl744z3.png",
        "http://cdn.hwzhj.top/img/error/596ox53lzp.png",
        "http://cdn.hwzhj.top/img/error/122k3zlm7j.png",
        "http://cdn.hwzhj.top/img/error/499njjrv79.png",
        "http://cdn.hwzhj.top/img/error/4973p51n10.png",
        "http://cdn.hwzhj.top/img/error/697wr522nn.png",
        "http://cdn.hwzhj.top/img/error/n6xkqmlkr0.png",
        "http://cdn.hwzhj.top/img/error/m66kmm8w78.png",
        "http://cdn.hwzhj.top/img/error/q0r1q51434.png",
        "http://cdn.hwzhj.top/img/error/m66kmm08q8.png"
      ],
      downpic: ""
    };
  },
  methods: {
    switchpic() {
      let index = parseInt(Math.random() * 14);
      this.downpic = this.pic[index];
    }
  },
  mounted() {
    this.switchpic();
  }
};
</script>

<style scoped lang="scss">
.error-body {
  background: #f4f5f7;
  padding: 30px;
  .error-container {
    width: 980px;
    margin: 0 auto;
    background: #fff;
    border-radius: 10px;
    .big-btn {
      display: inline-block;
      line-height: 40px;
      vertical-align: middle;
      text-align: center;
      background: #00a1d6;
      color: #fff;
      border-radius: 2px;
      font-size: 16px;
      transition: 0.2s;
      cursor: pointer;
      &.go-home {
        width: 100px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        margin-top: 14px;
        display: block;
      }
      &.verybig {
        margin-top: 30px;
        padding: 2px 50px;
      }
    }
    .error-panel {
      padding: 40px 0;
      background-position: 50%;
      background-repeat: no-repeat;
      position: relative;
      overflow: hidden;
      text-align: center;
      .error-msg {
        overflow: hidden;
        text-align: left;
        display: inline-block;
        vertical-align: middle;
        .error-img {
          width: 160px;
          height: 100px;
          margin-right: 20px;
          display: inline-block;
          vertical-align: middle;
        }
        .error-prompt {
          padding: 13px 0;
          display: inline-block;
          vertical-align: middle;
          .error-text {
            font-size: 26px;
            color: #212121;
            line-height: 26px;
            font-weight: bolder;
          }
          .msg-text {
            max-width: 350px;
            font-family: MicrosoftYaHei;
            font-size: 14px;
            color: #99a2aa;
            line-height: 21px;
            margin-top: 6px;
          }
        }
      }
    }
    .error {
      &.split {
        background: url(//s1.hdslb.com/bfs/static/jinkela/video/asserts/have_rest.png)
          50% no-repeat;
      }
      width: 100%;
      height: 40px;
    }
    .error-manga {
      position: relative;
      text-align: center;
      padding: 30px;
      img {
        width: 100%;
      }
      .img-box {
        width: 698px;
        margin: 0 auto;
      }
    }
  }
}
</style>