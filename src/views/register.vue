<template>
  <div class="register_front">
    <Headnav></Headnav>
    <!-- 网站大图标 -->
    <div class="logo">
      <div>
        <img src="http://cdn.hwzhj.top/rl_top.35edfde.png">
      </div>
    </div>

    <div class="exple">
      <span class="line"></span>
      <span class="txt">注册</span>
      <span class="line"></span>
    </div>

    <div style=" height:100%; border: ; ">
      <div style=" width:40%; margin: 0 auto; height:400px; margin-top: 60px;">
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="ruleForm2.username" autocomplete="off" class="in"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" class="in"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off" class="in"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="ruleForm2.email" class="in"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="layui-form-item">
              <div class="layui-input-block" style="width: 75%;">
                <el-switch prop="value3" v-model="ruleForm2.value3" active-text="我已经同意"></el-switch>
                <font color="#00A1D6">《哔哩哔哩弹幕网用户使用协议》</font> 和
                <font color="#00A1D6">《哔哩哔哩弹幕网账号中心规范》</font>
              </div>
            </div>
            <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <Footer/>
  </div>
</template>
<script>
import Headnav from "@/components/header/HeaderNav1";
import Footer from "@/components/footer/index";

export default {
  name: "register_front",
  components: {
    Headnav,
    Footer
  },
  data() {
    var checkemail = (rule, value, callback) => {
      //判断邮箱是否重复
      var st = 0;
      this.axios
        .get("xyuser/findSameEmail.do", {
          params: {
            useremail: value
          }
        })
        .then(rs => {
          st = rs.data.xyuser;
        });
      ////////////
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确的邮箱!"));
      }
      setTimeout(() => {
        if (st != 0) {
          callback(new Error("该有邮箱已被注册!"));
        } else {
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
    var uan = (rule, value, callback) => {
      //判断用户名是否存在
      var st = 0;
      this.axios("xyuser/findSameName.do", {
        params: {
          username: value
        }
      }).then(rs => {
        st = rs.data.xyuser;
      });
      ////////////
      if (value === "") {
        callback(new Error("用户名不能为空"));
      }

      setTimeout(() => {
        if (st != 0) {
          callback(new Error("用户名已存在!!"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      ruleForm2: {
        value3: false,
        pass: "",
        checkPass: "",
        email: "",
        username: ""
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
        email: [
          {
            validator: checkemail,
            trigger: "blur"
          }
        ],
        username: [
          {
            validator: uan,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (this.ruleForm2.value3 == false) {
          this.$notify({
            title: "警告",
            message: "先同意哔哩哔哩网站协议",
            type: "warning"
          });
          return;
        }
        if (valid) {
          //注册用户
          this.axios
            .post("xyuser/insertuser.do", {
              username: this.ruleForm2.username,
              password: this.ruleForm2.checkPass,
              useremail: this.ruleForm2.email
            })
            .then(rs => {
              if (rs.data.xyuser == 1) {
                this.$notify({
                  title: "成功",
                  message: "恭喜您,注册成功!正在前往登录！",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push("/login");
                }, 2000);
              } else {
                this.$notify.error({
                  title: "错误",
                  message: "由于网络原因注册失败"
                });
              }
            });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.in {
  width: 75%;
}

.logo {
  background-color: rgb(0, 160, 216);
  height: 86px;
}

.logo div {
  width: 980px;
  margin: 0 auto;
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
</style>