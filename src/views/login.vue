<template>
  <div class="login_front">
    <Headnav></Headnav>
    <!-- 网站大图标 -->
    <div class="logo">
      <div>
        <img src="http://cdn.hwzhj.top/rl_top.35edfde.png">
      </div>
    </div>
    <!-- 登录页面 "登录" 区域 -->
    <div class="page-width">
      <div class="exple">
        <span class="line"></span>
        <span class="txt">登录</span>
        <span class="line"></span>
      </div>
      <div class="xian">
        <div class="login_left">
          <img src="images/img/erweima.png">
        </div>
        <div class="shu"></div>
        <!-- <input type="text" value="" placeholder="你的手机号/邮箱" style="border: 1px solid; border-radius:5px; width:160px; height: 40px; width: 310px; margin-top: 27px;" /><br>
        <input type="text" value="" placeholder="密码" style="border: 1px solid; border-radius:5px;width:160px; height: 40px; width: 310px; margin-top: 27px;" />-->
        <div class="login-right">
          <div class="logo-box">
            <div class="login" style>
              <div class="bxs-row" style="text-align:center;">
                <img id="logo" src="images/img/logo.jpg" style="width:72px;">
                <span class="tips" style="color:red;">忍住不哭来段口技</span>
              </div>
              <div class="bxs-row">
                <input type="text" class="username" placeholder="用户名" value>
                <p class="err err-username"></p>
              </div>
              <div class="bxs-row">
                <input type="password" class="password" placeholder="密码">
                <p class="err err-password"></p>
              </div>
              <div class="bxs-row">
                <input type="submit" class="submit btn" @click="abc()" value="登录">
              </div>
              <router-link :to="{name:'register'}">还没有账号?赶紧点击此处去注册吧</router-link>
            </div>
            <div class="verBox">
              <div id="imgVer" style="display:inline-block;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<script>
import { imgVer } from "../../public/js/img_ver.js";
import Headnav from "@/components/header/HeaderNav1";
import Footer from "@/components/footer/index";
export default {
  name: "login_front",
  data() {
    return {
      sta: ""
    };
  },
  components: {
    Headnav,
    Footer
  },
  mounted() {
	
    const vuethis = this;
    imgVer({
      el: '$("#imgVer")',
      width: "260",
      height: "116",
      img: [
        "images/img/ver.png",
        "images/img/ver-1.png",
        "images/img/ver-2.png",
        "images/img/ver-3.png"
      ],
      success: function() {
        //判断登录
        vuethis.axios
          .get("xyuser/findLogin.do", {
            params: {
              username: $(".username").val(),
              password: $(".password").val()
            }
          })
          .then(rs => {
						// console.log(rs.data.zt);
            if (rs.data.zt == "无账号") {
             //alert('执行登录函数');
              $(".login").css({
                left: "0",
                opacity: "1"
              });
              $(".verBox").css({
                left: "404px",
                opacity: "0"
              });
              $(".tips").html("你是不是不知道账号密码！？？？");
              $("#logo").attr("src", "images/img/login-err.png");
            } else  if(rs.data.zt == "冻结"){
            	  $(".login").css({
                left: "0",
                opacity: "1"
              });
              $(".verBox").css({
                left: "404px",
                opacity: "0"
              });
              $(".tips").html("账号为啥被冻结了你心里没点B数吗！？？？");
              $("#logo").attr("src", "images/img/login-err.png");
            } else {
              vuethis.$message({
                message: "登录成功！",
								type: "success",
								duration:1000
              });
              vuethis.$router.push("/");
            }
          });
      },
      error: function() {
        //alert('错误什么都不执行')
      }
    });
  },
  methods: {
    abc() {
      if ($(".username").val() == "") {
        // $(".err-username").html('杂种！！你用户名呢！？？？');
        $(".tips").html("杂种！！你用户名呢！？？？");
        $("#logo").attr("src", "images/img/null-username.jpg");
      } else if ($(".password").val() == "") {
        // $(".err-password").html('畜生！！你密码呢！？？？');
        $(".tips").html("畜生！！你密码呢！？？？");
        $("#logo").attr("src", "images/img/null-password.jpg");
      } else {
        $(".login").css({
          left: "-404px",
          opacity: "0"
        });
        $(".verBox").css({
          left: "0",
          opacity: "1"
        });
      }
    }
  }
};
</script>
<style scoped>
@import "../../public/css/style.css";
.logo {
  background-color: rgb(0, 160, 216);
  height: 86px;
}

.logo div {
  margin: 0 auto;
  width: 980px;
}
.logo div img {
  margin-top: -6px;
}
.exple {
  margin-top: 25px;
  height: 50px;
  line-height: 60px;
  text-align: center;
}

.line {
  display: inline-block;
  width: 450px;
  border-top: 1px solid #ccc;
  margin-bottom: 5px;
  height: 0.5px;
  background: black;
}

.exple .txt {
  color: #686868;
  vertical-align: middle;
  font-size: 35px;
}

.shu {
  height: 392px;
  width: 1px;
  background: #ccc;
  margin: 0 auto;
  float: none;
  display: inline-block;
}

.xian {
  margin-top: 40px;
  padding-bottom: 40px;
}

.login_left {
  height: 390px;
  width: 490px;
  float: left;
}

.login-right {
  display: inline-block;
  height: 380px;
  width: 429px;
  top: 0px;
  right: 300px;
}

.bxs-row {
  margin-bottom: 12px;
}

.logo-box {
  width: 404px;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  height: 390px;
}

.login {
  position: absolute;
  width: 335px;
  left: 0;
  top: 0;
  padding: 42px 42px 36px;
  transition: all 0.8s;
}

.username,
.password,
.btn {
  height: 44px;
  width: 100%;
  padding: 0 10px;
  border: 1px solid #9da3a6;
  background: #fff;
  text-overflow: ellipsis;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -khtml-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  color: #000;
  font-size: 1em;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 400;
  direction: ltr;
  font-size: 13px;
}

.submit {
  background-color: #0070ba;
  color: #fff;
  border: 1px solid #0070ba;
}

.submit:hover {
  background-color: #005ea6;
}

.verBox {
  position: absolute;
  width: 100%;
  text-align: center;
  left: 404px;
  top: 0;
  opacity: 0;
  transition: all 0.8s;
  padding-top: 55px;
}

.err {
  margin: 12px 0 0;
  line-height: 12px;
  height: 12px;
  font-size: 12px;
  color: red;
}
</style>