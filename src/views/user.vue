<template>
  <div class="user">
    <HeaderNav/>
    <div id="content1">
      <div class="h">
        <div class="head">
          <div class="uname">
            <div class="u-img">
              <el-upload
                class="avatar-uploader"
                v-show="!userid"
                action="http://111.230.247.223/SameBWeb/xyuserinfo/updateHead.do"
                :show-file-list="false"
                name="userphoto"
                :with-credentials="true"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <div class="changehead">更换头像</div>
                <img v-if="imageUrl" v-lazy="imageUrl" class="avatar">
              </el-upload>

              <img v-if="imageUrl" v-lazy="imageUrl" v-show="userid" class="avatar">
            </div>
            <div class="u-name">
              <h3>{{user.username}}</h3>
              <input class="inp" v-show="!userid" v-model="inp" @change="editShow">
              <p v-show="userid">{{inp}}</p>
            </div>
          </div>
          <div class="gz" v-show="userid">
            <span @click="guanzhu" class="atten">关注</span>
            <span>发消息</span>
          </div>
        </div>
        <div class="nav">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <!-- 导航栏变水平 -->
            <!-- 回调方法 -->
            <el-menu-item index="1">
              <router-link :to="{name:'homepage',query:{userid:userid}}">主页</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link :to="{name:'contribute',query:{userid:userid}}">视频</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link :to="{name:'channel',query:{userid:userid}}">相簿</router-link>
            </el-menu-item>
            <el-menu-item index="4">
              <router-link :to="{name:'faVideo',query:{userid:userid}}">收藏夹</router-link>
            </el-menu-item>
            <!-- <el-menu-item index="5">
							<router-link :to="{name:'subscribe',query:{userid:userid}}">订阅</router-link>
						</el-menu-item>
						<el-menu-item index="trends">动态</el-menu-item>
            <el-menu-item index="7">设置</el-menu-item>-->
            <div class="search">
              <input placeholder="搜索视频">
              <span></span>
            </div>
            <div class="guanzhu">
              <div>
                <router-link :to="{name:'fans',query:{userid:userid}}">好友数
                  <br>
                  {{coll}}
                </router-link>
              </div>
              <!-- 							<div>
								<router-link :to="{name:'fans',query:{userid:userid}}">粉丝数<br>{{fans}}</router-link>
              </div>-->
            </div>
          </el-menu>
        </div>
      </div>
      <div class="cnt">
        <div class="view">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!-- <contribute :userid="userid" :user="user"></contribute>
    <channel :userid="userid" :user="user"></channel>-->
  </div>
</template>
<script src="http://at.alicdn.com/t/font_1059547_6hk9wqh3er6.js" type="text/javascript" charset="utf-8"></script>
<script src="http://www.jq22.com/jquery/jquery-1.10.2.js"></script>
<script src="js/script.js"></script>


<script>
import HeaderNav from "@/components/header/HeaderNav1";
import store from "@/store.js";
import contribute from "../components/user/contribute";
import channel from "../components/user/channel";
export default {
  data() {
    return {
      activeIndex: "1",
      user: "",
      imageUrl: "",
      userid: "",
      inp: "",
      coll: 0,
      fans: 0
    };
  },
  mounted() {
    if (
      this.$route.query.userid &&
      store.state.user.userid &&
      this.$route.query.userid == store.state.user.userid
    ) {
      this.userid = "";
    } else {
      this.userid = this.$route.query.userid;
    }
    if (this.userid) {
      this.userid = this.$route.query.userid;
      this.axios
        .get("xyuser/findUserinfoById.do", {
          params: {
            userid: this.userid
          }
        })
        .then(res => {
          //console.log(res.data);
          this.user = res.data.xyuser;
          this.userid = res.data.xyuser.userid * 1;
          this.imageUrl = this.user.xyuserinfo.userphoto;
          this.inp = this.user.xyuserinfo.usershow;
          //好友数
          this.gz();
        });
      //是否已关注
      if (store.state.user.userid) {
        this.axios
          .get("xyfriend/findByFriend.do", {
            params: {
              userfriend: this.userid
            }
          })
          .then(res1 => {
            if (res1.data.xyuser == 1) {
              $(".atten").css("backgroundColor", "rgba(0,0,0,.4)");
              $(".atten").css("borderColor", "rgba(255,255,255,.6)");
              $(".atten").html("已关注");
            }
          });
      }
    } else {
      this.axios
        .get("xyuser/findUserinfoById.do", {
          params: {
            userid: store.state.user.userid
          }
        })
        .then(res => {
          //console.log(res.data.xyuser);
          this.user = res.data.xyuser;
          //好友数
          this.gz();
          store.commit("setuser", res.data.xyuser);
          this.imageUrl = this.user.xyuserinfo.userphoto;
          this.inp = this.user.xyuserinfo.usershow;
        });
    }
  },
  components: {
    HeaderNav,
    store,
    contribute,
    channel
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$notify({
        title: "成功",
        message: "部分功能将会再下次登录生效",
        type: "success"
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      this.file = file;
      // console.log(this.file);
      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG 和 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return (isJPG || isPNG) && isLt2M;
    },
    gz() {
      //关注数
      // console.log(this.user.userid);
      this.axios
        .get("xyfriend/findCouByUserid.do", {
          params: {
            userid: this.user.userid
          }
        })
        .then(res => {
          // console.log(res.data);
          this.coll = res.data.xyuser;
        });
    },
    guanzhu(e) {
      var el = e.target;
      if (!store.state.user.userid) {
        this.$message({
          type: "success",
          message: "请先登录!",
          duration: 1000
        });
      } else {
        this.axios
          .get("xyfriend/updateAddUpById.do", {
            params: {
              userfriend: this.userid
            }
          })
          .then(res => {
            //console.log(res.data.xyuser);
            if (res.data.xyuser == 0) {
              el.style.backgroundColor = "rgba(0,0,0,.4)";
              el.style.borderColor = "rgba(255,255,255,.6)";
              el.innerHTML = "已关注";
            } else {
              el.style.backgroundColor = "rgb(251,114,153)";
              el.style.borderColor = "rgba(255,255,255,1)";
              el.innerHTML = "关注";
            }
          });
      }
    },
    editShow() {
      this.axios
        .get("xyuserinfo/updateUserShowByUserId.do", {
          params: {
            usershow: this.inp,
            userid: this.user.userid
          }
        })
        .then(res => {
          // console.log(res.data);
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!store.state.user.userid && !to.query.userid) {
      next({
        name: "login"
      });
    }
    next();
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader div {
  position: absolute;
  height: 60px;
  width: 60px;
  line-height: 60px;
  display: none;
}

.avatar-uploader:hover div {
  color: #fff;
  border-radius: 32px;
  background-color: rgba(0, 0, 0, 0.2);
  display: block;
}

.avatar {
  border: 1px solid red;
  width: 60px;
  height: 60px;
  display: inline-block;
}

.user /deep/.el-menu-item {
  padding: 0;
}

.nav a {
  padding: 0px 20px;
}

#content1 {
  height: 100%;
  background-color: rgb(244, 245, 247);
}

.h {
  height: 100%;
  margin-bottom: 10px;
}

.h .head {
  position: relative;
  height: 200px;
  width: 80%;
  margin: 0 auto;
  background: url("http://cdn.hwzhj.top/userbg.jpg")
    no-repeat center center;
  background-size: cover;
}

.h .nav {
  width: 80%;
  height: 100%;
  margin: 0 auto;
}

.uname {
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.u-img,
.u-name {
  display: inline-block;
  border: none;
}

.u-name {
  vertical-align: top;
  margin-left: 20px;
  color: #fff;
}

.u-name h3 {
  margin-top: 0px;
  font-size: 24px;
  margin-bottom: 15px;
}

.u-name .inp {
  width: 400px;
  border-radius: 3px;
  border: none;
  height: 24px;
  background-color: rgba(0, 0, 0, 0);
  color: #fff;
  box-sizing: border-box;
  font-size: 12px;
}

.u-name .inp:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid #999;
}

.u-img {
  border-radius: 32px;
  position: relative;
}

.u-img img {
  width: 60px;
  height: 60px;
  border: 2px solid #999;
  border-radius: 32px;
}

.gz {
  position: absolute;
  right: 10px;
  bottom: 30px;
}

.gz span {
  font-size: 14px;
  border: 2px solid #fff;
  color: #fff;
  background-color: rgb(251, 114, 153);
  padding: 5px 15px;
  margin-right: 10px;
  border-radius: 5px;
}

.gz span:first-child:hover {
  background-color: rgb(255, 133, 173);
}

.gz span:last-child {
  border: 2px solid rgba(255, 255, 255, 0.6);
  background-color: rgba(0, 0, 0, 0.4);
}

.iconfont {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.search {
  border: 1px solid #999;
  display: inline-block;
  height: 20px;
  border-radius: 20px;
  margin-top: 15px;
  padding: 4px 10px;
  margin-left: 20px;
}

.search:hover {
  border: 1px solid skyblue;
}

.search input {
  width: 60px;
  font-size: 12px;
  color: #999;
  line-height: 22px;
  display: inline-block;
  vertical-align: top;
}

.search span {
  display: inline-block;
  height: 20px;
  width: 22px;
  background: url(../../public/images/page_icons.png) -788px -726px;
}

.guanzhu {
  display: inline-block;
  float: right;
  margin-right: 15px;
}

.guanzhu div {
  display: inline-block;
  width: 80px;
  text-align: center;
  line-height: 20px;
  margin-top: 10px;
}

.view {
  width: 80%;
  margin: 0 auto;
  height: 100%;
  margin-bottom: 20px;
}
</style>
