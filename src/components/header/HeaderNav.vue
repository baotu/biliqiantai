<template>
  <div id="page_top">
    <div class="bg-wrap">
      <div class="bg" :style="{backgroundImage:topbg}"></div>
      <div class="mask"></div>
    </div>
    <div class="header-top">
      <div class="page-width clearfix">
        <div class="header-top__nav">
          <ul>
            <li class="item item-home">
              <router-link :to="{name:'indexBody'}">主站</router-link>
            </li>
            <li class="item">
              <a href="#">画友</a>
            </li>
            <li class="item">
              <a href="#">游戏中心</a>
              <div class="game-center header-hover">
                <div class="c clearfix">
                  <div class="fl">
                    <div class="imgbox">
                      <a href="#">
                        <img src="images/cont/game-center__img1.jpg" alt="#">
                        <span>命运-冠位指定（Fate/GO）</span>
                      </a>
                    </div>
                    <div class="game-img">
                      <a href="#">
                        <img src="images/cont/game_img1.png" alt="#">
                        <span>刀剑乱舞</span>
                      </a>
                      <a href="#">
                        <img src="images/cont/game_img2.png" alt="#">
                        <span>刀剑乱舞</span>
                      </a>
                      <a href="#">
                        <img src="images/cont/game_img3.jpg" alt="#">
                        <span>刀剑乱舞</span>
                      </a>
                    </div>
                  </div>
                  <div class="fr">
                    <div class="game-list">
                      <div class="title">
                        <i></i>
                        <a href="#">游戏论坛</a>
                      </div>
                      <div class="all">
                        <a href="#">仙剑奇侠传幻璃镜</a>
                        <a href="#">魔法禁书目录</a>
                        <a href="#">萌王EX</a>
                        <a href="#">妖精的衣橱</a>
                        <a href="#">神代梦华谭</a>
                        <a href="#">碧蓝航线</a>
                        <a href="#">光明大陆</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="gameImg"></div>
              </div>
            </li>
            <li class="item">
              <a href="#">直播</a>
              <div class="live-box header-hover">
                <div class="live-box__c">
                  <div class="fl">
                    <div class="title">热门直播:</div>
                    <div class="cont">
                      <a href="#">
                        <img src="images/cont/live-box__img1.jpg" alt="#">
                        <i>LIVE</i>
                        <p>热爱电竞の三三</p>
                      </a>
                      <a href="#">
                        <img src="images/cont/live-box__img2.jpg" alt="#">
                        <i>LIVE</i>
                        <p>大角虫漫画</p>
                      </a>
                      <a href="#">
                        <img src="images/cont/live-box__img3.jpg" alt="#">
                        <i>LIVE</i>
                        <p>木本青</p>
                      </a>
                      <a href="#">
                        <img src="images/cont/live-box__img4.gif" alt="#">
                        <i>LIVE</i>
                        <p>一只小鹿噜噜噜</p>
                      </a>
                      <a href="#">
                        <img src="images/cont/live-box__img5.jpg" alt="#">
                        <i>LIVE</i>
                        <p>污叶妹屮</p>
                      </a>
                      <a href="#">
                        <img src="images/cont/live-box__img6.jpg" alt="#">
                        <i>LIVE</i>
                        <p>污污_永远的魔法师_</p>
                      </a>
                    </div>
                  </div>
                  <div class="fl">
                    <div class="title">热门直播:</div>
                  </div>
                </div>
              </div>
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
                      <router-link :to="{name:'homepage'}">个人中心</router-link>
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
  props: ["topbg"],
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
                duration: 2000
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
  width: 50px;
  line-height: 40px;
  text-align: center;
}

.user-box li > a {
  color: #fff;
}
</style>