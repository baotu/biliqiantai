<template>
  <div id="page_top">
    <div class="header-top">
      <div class="page-width clearfix">
        <div class="header-top__nav">
          <ul>
            <li class="item">
              <router-link :to="{name:'indexBody'}">
                <img style="width: 80px;" src="images/bililogobg.png" alt>
              </router-link>
            </li>
            <li class="item item-home">
              <router-link :to="{name:'indexBody'}">主站</router-link>
            </li>
            <li class="item">
              <a href="#">画友</a>
            </li>
            <li class="item">
              <a href="#">音频</a>
            </li>
            <li class="item">
              <a href="#">游戏中心</a>
            </li>
            <li class="item">
              <a href="#">直播</a>
            </li>
            <li class="item">
              <a href="#">周边</a>
            </li>
            <li class="item">
              <a href="#">下载APP</a>
              <div class="header-app header-hover">
                <i></i>
              </div>
            </li>
          </ul>
        </div>
        <div class="header-top__user">
          <!-- 未登录 -->
          <div class="login-box" v-if="(JSON.stringify(user)=='{}')">
            <router-link :to="{name:'login'}">登录</router-link>
            <span></span>
            <router-link :to="{name:'register'}">注册</router-link>
          </div>

          <!-- 已登录 -->
          <div class="user-box" v-else>
            <ul>
              <li class="item item-user">
                <el-dropdown placement="bottom-start" @command="handleCommand">
                  <router-link :to="{name:'homepage'}">
                    <img :src="user.xyuserinfo.userphoto">
                  </router-link>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>欢迎你,{{user.username}}</el-dropdown-item>
                    <el-dropdown-item>
                      <router-link :to="{name:'personalData'}">个人中心</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <router-link :to="{name:'addVideo'}">投稿管理</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item :divided="true" command="logout">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
              <li class="item">
                <a href="#">大会员</a>
              </li>
              <li class="item">
                <router-link :to="{name:'sys'}" class="link">消息</router-link>
              </li>
              <li class="item item-home">
                <a href="#">动态</a>
                <div class="game-center header-hover"></div>
              </li>
              <li class="item item-home">
                <a href="#">稍后再看</a>
                <div class="game-center header-hover"></div>
              </li>
              <li class="item item-home">
                <a href="#">收藏夹</a>
                <div class="game-center header-hover"></div>
              </li>
              <li class="item item-home">
                <a href="#">历史</a>
                <div class="game-center header-hover"></div>
              </li>
            </ul>
          </div>
          <div class="user-post">
						<router-link :to="{name:'addVideo'}" class="link">投 稿</router-link>
						<div class="user-post__hover header-hover">
							<router-link class="post" :to="{name:'addVideo'}">视频投稿</router-link>
							<router-link class="manage" :to="{name:'addAlbum'}">相簿投稿</router-link>
							<router-link class="create" :to="{name:'addVideo'}">创作中心</router-link>
						</div>
					</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store.js";
export default {
  store,
  name: "Headnavs",
  data() {
    return {
      visible: false,
      user: {}
    };
  },
  methods: {
    getSession() {
      // if (JSON.stringify(store.state.user) === "{}") {
      //   this.axios.get("xyuser/findSession.do").then(rs => {
      //     if (!(JSON.stringify(rs.data) == "{}")) {
      //       store.commit("setuser", rs.data.xyuser);
      //       this.user = rs.data.xyuser;
      //     }
      //   });
      // } else {
        this.user = store.state.user;
      // }
    },
    handleCommand(command) {
      if (command === "logout") {
        this.$confirm("你是否要注销?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.axios.get("xyuser/desSession.do").then(rs => {
              this.$message({
                type: "success",
                message: "注销成功!",
                duration: 2000,
                onClose: () => {
                  this.$router.push({ name: "indexBody" });
                }
              });
              store.commit("setuser", {});
              this.user = {};
            });
          })
          .catch(() => {});
      }
    }
  },
  created() {
    this.getSession();
  }
};
</script>

<style scoped>
#page_top {
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px;
}

#page_top .bg {
  background: none;
}

#page_top .mask {
  background-color: #fff;
}

.header-top .item > a {
  color: #000;
}

.header-top__nav .item-home > a {
  background: url(../../../public/images/page_icons.png) no-repeat -909px -74px;
}

.page-width {
  width: 80%;
}

.item-user img {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-top: 5px;
}

.user-box {
  float: left;
}

.user-post {
  float: right;
}

.user-box,
.user-box ul,
.user-post {
  display: inline-block;
}

.user-box li {
  color: #fff;
  display: inline-block;
  padding: 0px 10px;
  line-height: 40px;
  text-align: center;
}
.header-top__user .login-box span {
  border-left: 1px solid #333;
}
.header-top__user .login-box a {
  color: #333;
}
</style>