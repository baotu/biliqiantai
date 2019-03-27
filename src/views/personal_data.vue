<template>
  <div>
    <Headnav></Headnav>
    <!-- 网站大图标 -->
    <div class="logo">
      <div>
        <img src="http://cdn.hwzhj.top/rl_top.35edfde.png">
      </div>
    </div>
    <div class="personaldata">
      <el-tabs type="border-card" tab-position="left">
        <el-tab-pane label="首页">
          <div style="font-size: 20px; margin: 20px; ">首页</div>
          <hr width="95%">
          <div>
            <div class="uname">
              <div class="u-img">
                <el-upload
                  class="avatar-uploader"
                  action="http://111.230.247.223/SameBWeb/xyuserinfo/updateHead.do"
                  :show-file-list="false"
                  name="userphoto"
                  :with-credentials="true"
                  :on-success="handleAvatarSuccess"
                >
                  <!-- :before-upload="beforeAvatarUpload" -->
                  <div class="changehead">更换头像</div>
                  <img :src="imageUrl" class="avatar">
                </el-upload>
              </div>
              <div class="u-name">
                <div class="b_name">{{ruleForm.name}}</div>
                <div class="vip_type">{{viptype}}</div>
                <span class="integral"></span>
                <span>{{totalintegral}}</span>&nbsp;
                <span class="gold"></span>
                <span>{{usefulgold}}</span>
                <h3></h3>
                <font size="4px">LV&nbsp;{{lv}}&nbsp;</font>
                <progress
                  :max="the_experience"
                  :value="experience"
                  style="height: 20px; width: 200px;"
                ></progress>
                &nbsp;{{experience}}/{{the_experience}}
                <!-- 	<router-link :to="{name:'fans'}"  class="label_v">修改资料</router-link> -->
                <router-link :to="{name:'homepage'}" class="label_v">个人空间</router-link>
              </div>
            </div>

            <hr width="95%">
            <div style="font-size: 20px; margin: 20px;">每日奖励</div>
            <div style=" width: 90%; margin: 0 auto; ">
              <div class="reward">
                <div style class="day_login"></div>
                <div class="blue_font">每日登录</div>
              </div>
              <div class="reward">
                <div class="blue_img">
                  <span class="blue_q">
                    <font size="5" color="#FFFFFF">10</font>
                    <font color="#FFFFFF">EXP</font>
                  </span>
                </div>
                <div class="blue_font">发布视频</div>
              </div>
              <div class="reward">
                <div class="blue_img">
                  <span class="blue_q">
                    <font size="5" color="#FFFFFF">50</font>
                    <font color="#FFFFFF">EXP</font>
                  </span>
                </div>
                <div class="blue_font">每日投币</div>
              </div>
              <div class="reward">
                <div class="blue_img">
                  <span class="blue_q">
                    <font size="5" color="#FFFFFF">100</font>
                    <font color="#FFFFFF">EXP</font>
                  </span>
                </div>
                <div class="blue_font">每日分享视频</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的信息">
          <div>
            <div style="font-size: 20px; margin: 20px; ">我的信息</div>
            <hr width="95%">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name" class="iinp" disabled></el-input>
                <span style="margin-left: 40px;color:#C9C9C9 ;">注:用户名不可以更改</span>
              </el-form-item>
              <el-form-item label="出生年月" required>
                <el-col :span="11">
                  <el-form-item prop="date1">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="ruleForm.date1"
                      style="width: 93%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="ruleForm.gender">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="邮箱" prop="mail">
                <el-input v-model="ruleForm.mail" class="iinp" disabled></el-input>
                <span style="margin-left: 40px;color:#C9C9C9 ;">注:邮箱一旦绑定就无法更改</span>
              </el-form-item>
              <el-form-item label="电话" prop="phone">
                <el-input v-model="ruleForm.phone" class="iinp"></el-input>
              </el-form-item>

              <el-form-item label="QQ" prop="qq">
                <el-input v-model="ruleForm.qq" class="iinp"></el-input>
              </el-form-item>
              <el-form-item label="微信" prop="msn">
                <el-input v-model="ruleForm.msn" class="iinp"></el-input>
              </el-form-item>
              <el-form-item label="家庭月收入" prop="monthincoming">
                <el-input v-model="ruleForm.monthincoming" class="iinp"></el-input>
              </el-form-item>
              <el-form-item label="职业" prop="work">
                <el-input v-model="ruleForm.work" class="iinp"></el-input>
              </el-form-item>
              <el-form-item label="所在城市">
                <el-select v-model="value1" placeholder="请选择">
                  <el-option
                    v-for="item in cs"
                    :key="item.value1"
                    :label="item.label"
                    :value="item.value1"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学历">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in xl"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="个性签名" prop="personalized">
                <el-input type="textarea" v-model="ruleForm.personalized" rows="8" class="iinp"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitFormzl('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="会员金币" class>
          <div style="font-size: 20px; margin: 20px;">会员金币</div>
          <hr width="95%">
          <el-tabs v-model="activeName1">
            <el-tab-pane label="首页" name="first">
              <div class="Integral_page">
                <span style="display: block; text-align: center; margin-top: 35px;">
                  <font size="6">会员金币余额</font> &nbsp;
                  <font size="5" color="#00A1D6">{{usefulgold}}</font>
                </span>
              </div>
            </el-tab-pane>
            <el-tab-pane label="金币记录" name="second">此功能暂未开放</el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <!-- 	<el-tab-pane label="我的头像">
					<div style="font-size: 20px; margin: 20px; "> 我的头像</div>
					<hr width="95%">
					<div>
						<div class="head_portrait">
							<img :src="imageUrl" >
						</div>
						<div style="text-align: center;">
							<el-button type="primary" plain>上传头像</el-button>
						</div>
					</div>
        </el-tab-pane>-->
        <el-tab-pane label="我的记录">
          <div>
            <div style="font-size: 20px; margin: 20px; ">我的记录</div>
            <hr width="95%">
            <el-tabs v-model="activeName">
              <el-tab-pane label="转账记录" name="first">
                <div>
                  <el-table :data="transfer" height="250" border style="width: 100%">
                    <el-table-column prop="xyuser[1].username" label="收账人" width="180"></el-table-column>
                    <el-table-column prop="money" label="金额"></el-table-column>
                    <!-- <el-table-column prop="transtype" label="转账类型">
                    </el-table-column>-->
                    <el-table-column prop="remark" label="备注"></el-table-column>
                    <el-table-column prop="time" label="操作时间"></el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
              <!-- 		<el-tab-pane label="登录记录" name="fourth">此功能暂未开放</el-tab-pane>
							<el-tab-pane label="金币记录" name="third">此功能暂未开放</el-tab-pane>
              <el-tab-pane label="评论记录" name="second">此功能暂未开放</el-tab-pane>-->
            </el-tabs>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码">
          <div>
            <div style="font-size: 20px; margin: 20px; ">修改密码</div>
            <hr width="95%">
            <el-form
              :model="ruleForm2"
              status-icon
              :rules="rules2"
              ref="ruleForm2"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="旧密码" prop="old">
                <el-input type="password" v-model="ruleForm2.old" autocomplete="off" class="iinp"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" class="iinp"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  type="password"
                  v-model="ruleForm2.checkPass"
                  autocomplete="off"
                  class="iinp"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitFormpass('ruleForm2')">修改</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Headnav from "@/components/header/HeaderNav1";
import Footer from "@/components/footer/index";
import store from "@/store.js";
export default {
  store,
  components: {
    Headnav,
    Footer
  },
  data() {
    var validateold = (rule, value, callback) => {
      //获得用户名
      var sta = "";
      this.axios.get("xyuser/findSession.do").then(rs => {
        this.username = rs.data.xyuser.username;
      });
      this.axios
        .get("xyuser/findLogin.do", {
          params: {
            username: this.username,
            password: value
          }
        })
        .then(rs => {
          // console.log(rs.data.zt);
          sta = rs.data.zt;
        });
      if (value === "") {
        callback(new Error("旧密码不能为空"));
      }
      setTimeout(() => {
        if (sta == "无账号") {
          callback(new Error("旧密码错误!!"));
        } else if (sta == "登陆成功") {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      viptype: "",
      experience: "",
      the_experience: "",
      lv: "",
      transfer: [],
      totalintegral: "",
      usefulgold: "",
      userid: "",
      cs: [
        {
          value1: "上海",
          label: "上海"
        },
        {
          value1: "北京",
          label: "北京"
        },
        {
          value1: "永州",
          label: "永州"
        },
        {
          value1: "长沙",
          label: "长沙"
        }
      ],
      xl: [
        {
          value: "博士",
          label: "博士"
        },
        {
          value: "研究生",
          label: "研究生"
        },
        {
          value: "本科",
          label: "本科"
        },
        {
          value: "大专",
          label: "大专"
        },
        {
          value: "高中及以下",
          label: "高中及以下"
        }
      ],
      value1: "",
      value: "",
      username: "",
      activeName1: "first",
      activeName: "first",
      user: "",
      imageUrl: "",
      ruleForm2: {
        old: "",
        pass: "",
        checkPass: ""
      },
      ruleForm: {
        name: "",
        date1: "",
        gender: "",
        personalized: "",
        qq: "",
        msn: "",
        monthincoming: "",
        phone: "",
        work: ""
        // mail:""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur"
          },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur"
          }
        ],
        gender: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change"
          }
        ]
      },
      rules2: {
        pass: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ],
        old: [
          {
            validator: validateold,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitFormpass(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .get("xyuser/updatePasswordByUserId.do", {
              params: {
                password: this.ruleForm2.checkPass
              }
            })
            .then(rs => {
              this.axios.get("xyuser/desSession.do").then(rs => {
                this.$message({
                  type: "success",
                  message: "修改密碼成功請重新登錄!",
                  duration: 2000
                });
                store.commit("setuser", {});
                this.$router.push({
                  name: "login"
                });
              });
            });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    submitFormzl(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const form = this.ruleForm;
          // console.log(form.date1);
          this.axios
            .post("xyuserinfo/updateByUserIdFront.do", {
              userid: this.userid,
              username: form.name,
              birthday: this.format(form.date1),
              monthincoming: form.monthincoming,
              msn: form.msn,
              phone: form.phone,
              qq: form.qq,
              sex: form.gender,
              usershow: form.personalized,
              work: form.work,
              city: this.value1,
              schooling: this.value
            })
            .then(rs => {
              this.$notify({
                title: "成功",
                message: "修改资料成功",
                type: "success"
              });
            });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$notify({
        title: "成功",
        message: "部分功能将会再下次登录生效",
        type: "success"
      });
    },
    format(Date) {
      // date 转 string
      var Y = Date.getFullYear();
      var M = Date.getMonth() + 1;
      M = M < 10 ? "0" + M : M; // 不够两位补充0
      var D = Date.getDate();
      D = D < 10 ? "0" + D : D;
      return Y + "-" + M + "-" + D;
    },
    toDate(dateString) {
      //string 转 date
      var DATE_REGEXP = new RegExp(
        "(\\d{4})-(\\d{2})-(\\d{2})([T\\s](\\d{2}):(\\d{2}):(\\d{2})(\\.(\\d{3}))?)?.*"
      );
      if (DATE_REGEXP.test(dateString)) {
        var timestamp = dateString.replace(DATE_REGEXP, function(
          $all,
          $year,
          $month,
          $day,
          $part1,
          $hour,
          $minute,
          $second,
          $part2,
          $milliscond
        ) {
          var date = new Date(
            $year,
            $month - 1,
            $day,
            $hour || "00",
            $minute || "00",
            $second || "00",
            $milliscond || "00"
          );
          return date.getTime();
        });
        var date = new Date();
        date.setTime(timestamp);
        return date;
      }
      return null;
    }
  },
  mounted() {
    this.user = store.state.user;
    this.imageUrl = this.user.xyuserinfo.userphoto;
    this.axios.get("xyuser/findSession.do").then(rs => {
      this.userid = rs.data.xyuser.userid;
      //查询用户信息
      this.axios
        .get("xyuser/findUserinfoById.do", {
          params: {
            userid: rs.data.xyuser.userid
          }
        })
        .then(rs => {
          const da = rs.data.xyuser;
          // console.log(da.xyuserinfo.userphoto);
          const t = this.ruleForm;
          t.name = da.username;
          t.gender = da.xyuserinfo.sex;
          t.date1 = this.toDate(da.xyuserinfo.birthday);
          t.personalized = da.xyuserinfo.usershow;
          t.msn = da.xyuserinfo.msn;
          t.qq = da.xyuserinfo.qq;
          t.phone = da.xyuserinfo.phone;
          t.monthincoming = da.xyuserinfo.monthincoming;
          t.work = da.xyuserinfo.work;
          t.mail = da.useremail;
          this.value1 = da.xyuserinfo.city;
          this.value = da.xyuserinfo.schooling;
          this.totalintegral = da.totalintegral;
          this.usefulgold = da.usefulgold;
          //等级
          // console.log("积分值" + this.totalintegral);
          var lv = 0;
          var al = parseInt(this.totalintegral);
          if (al <= 100) {
            this.viptype = "小白";
            this.experience = al - 0;
            this.the_experience = 100;
            this.lv = 1;
          } else if (al <= 400) {
            this.viptype = "普通会员";
            this.experience = al - 100;
            this.the_experience = 300;
            this.lv = 2;
          } else if (al <= 1200) {
            this.viptype = "中级会员";
            this.experience = al - 400;
            this.the_experience = 800;
            this.lv = 3;
          } else if (al <= 2700) {
            this.viptype = "高级会员";
            this.experience = al - 1200;
            this.the_experience = 1500;
            this.lv = 4;
          } else if (al <= 5700) {
            this.viptype = "钻石会员";
            this.experience = al - 2700;
            this.the_experience = 3000;
            this.lv = 5;
          } else if (al <= 999999) {
            this.viptype = "至尊会员";
            this.experience = al - 3000;
            this.the_experience = 999999;
            this.lv = 6;
          } else {
            this.lv = 6;
            this.viptype = "至尊会员";
            this.the_experience = 999999;
            this.experience = al - 3600;
          }
        });
      ////////
      //查询用户转账记录
      this.axios
        .get("xytransfer/findByUserId.do", {
          params: {
            userid: rs.data.xyuser.userid
          }
        })
        .then(rs => {
          this.transfer = rs.data.xyuser;
        });
    });
  }
};
</script>
<style scoped>
.head_portrait {
  width: 200px;
  height: 200px;
  margin: 30px auto;
  border: 2px solid rgb(229, 228, 252);
  line-height: 200px;
  font-weight: bold;
  font-size: 24px;
  background: #ffffff;
  border-radius: 50%;
  overflow: hidden;
}

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

.personaldata {
  width: 60%;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
}

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

.uname {
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
  color: #000000;
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
  color: #000000;
  box-sizing: border-box;
  font-size: 12px;
}

.u-name .inp:hover {
  background-color: rgba(224, 243, 249, 0.2);
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

.u-img {
  border-radius: 32px;
  position: relative;
  display: inline-block;
  border: none;
}

.u-img img {
  width: 60px;
  height: 60px;
  border: 2px solid #999;
  border-radius: 32px;
}

.iinp {
  width: 42%;
}

.reward {
  width: 24%;
  height: 186px;
  display: inline-block;
}

.blue_q {
  display: block;
  text-align: center;
  margin-top: 20px;
}

.blue_font {
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
}

.blue_img {
  width: 72px;
  height: 72px;
  border: 1px solid #ffffff;
  background: url(../../public/images/icons_m_2.57e5263.png) no-repeat -252px -636px;
  margin: 0 auto;
}

.Integral_page {
  background: url(../../public/images/score.2ea6462.png) no-repeat center;
  height: 145px;
  border: 1px solid #ffffff;
}

.integral {
  width: 20px;
  height: 20px;
  background: yellow;
  background: url(../../public/images/icons_m_2.57e5263.png) no-repeat -150px -534px;
  display: inline-block;
  vertical-align: middle;
}

.gold {
  width: 20px;
  height: 20px;
  background: yellow;
  background: url(../../public/images/icons_m_2.57e5263.png) no-repeat -150px -471px;
  display: inline-block;
  vertical-align: middle;
}

.b_name {
  display: inline-block;
  font-size: 18px;
  vertical-align: middle;
  font-weight: 700;
  margin-right: 5px;
}

.vip_type {
  display: inline-block;
  border: 1px solid #99a2aa;
  border-radius: 4px;
  color: #99a2aa;
  margin: 0 8px;
  padding: 2px 4px;
}

.label_v {
  display: inline-block;
  border: 1px solid;
  text-align: center;
  border-radius: 4px;
  margin: 0 20px;
  padding: 2px 4px;
}

.day_login {
  width: 72px;
  height: 72px;
  background: url(../../public/images/icons_m_2.57e5263.png) no-repeat -252px -508px;
  margin: 0 auto;
}
</style>
