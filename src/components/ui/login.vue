<template>
  <div style="width:100%;min-height:100vh;background:lightgray;">
    <div style="width:30%;margin:0 auto;padding-top:100px;">
      <div class="formContainer" style>
        <h1 style="margin-left:102px;color:gray;">欢迎登录</h1>
        <a-form id="components-form-demo-normal-login" class="login-form">
          <a-form-item>
            <a-input v-model="userName" placeholder="用户名">
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input v-model="userPassword" type="password" placeholder="密码">
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-checkbox v-model="remember">记住密码</a-checkbox>
            <a class="login-form-forgot" href>忘记密码？</a>
            <a-button type="primary" class="login-form-button" @click.native="login()">登录</a-button>
            <a href="javaScript:;" @click="toRegist()">没有账号？去注册>></a>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userName: "",
      userPassword: "",
      remember: false
    }
  },
  mounted() {
    this.getCookie();
  },
  methods: {
    showLogin() {
      this.$router.push("/login");
    },
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; ");
        //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割

          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.userName = arr2[1];
          } else if (arr2[0] == "userPwd") {
            this.userPassword = arr2[1];
          }
        }
        this.remember = true;
      }
    },
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    toRegist() {
      this.$router.push("/blogRegist/regist");
      this.visible = false;
    },
    login() {
      axios
        .post("http://localhost:8081/loginUser", {
          userName: this.userName,
          userPassword: this.userPassword
        })
        .then(res => {
          if (res.data.code === 200) {
            // 是否记住密码（操作cookie）
            if (this.remember === true) {
              this.setCookie(this.userName, this.userPassword, 7);
            } else {
              this.clearCookie();
            }
            this.$message.success(res.data.message, 1);
            this.loginBtn = false;
            this.$router.push("/blogArticle/articleList");
            // 将服务端返回的数据渲染到页面
            this.userImage = res.data.result.userImage;
            // 在session中存入userId(如果有用户id说明是登录状态，减轻session压力)
            sessionStorage.setItem("userId", res.data.result.id);
            this.nowUser = res.data.result.userName;
            // location.reload();
            
          } else {
            this.$message.error("登陆失败！");
            this.clearCookie();
          }
        });
    }
  }
};
</script>

<style>
.formContainer {
  width: 80%;
  margin: 0 auto;
  height: 80%;
  background-color: rgba(255, 255, 255, 0.397);
  padding: 20px;
  border-radius: 5px;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 50px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: hsl(0, 0%, 84%);
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
