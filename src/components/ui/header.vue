<template>
  <a-layout id="components-layout-demo-custom-trigger" :style="{ height: '100vh'}">
    <!-- 侧边栏rong -->
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
      theme="light"
      style="background: #242424; padding:0 ;border:1px solid #e0dfdf ;border:0px;z-index:1000;"
      collapsedWidth="50"
    >
      <!-- 侧边栏关闭时的样子： -->
      <div v-show="collapsed">
        <div>
          <a-tooltip placement="left">
            <template slot="title">
              <span>首页</span>
            </template>
            <div style="height:50px;" class="menu animated fadeInRight">
              <a-icon
                type="home"
                @click="toHeadPage()"
                style="font-size:20px;cursor:pointer;color:lightgray;margin-left:15px;margin-top:20px;"
              />
            </div>
          </a-tooltip>
        </div>
        <!-- 网站页面 -->
        <div
          @mouseenter="showMenu(1)"
          @mouseleave="hideMenu(1)"
          style="height:50px;"
          class="menu animated fadeInRight side-menu1"
        >
          <a-icon
            type="align-left"
            @click="toHeadPage()"
            style="font-size:20px;cursor:pointer;color:lightgray;margin-left:15px;margin-top:20px;"
          />
        </div>
        <!-- 我的操作 -->
        <div
          @mouseenter="showMenu(2)"
          @mouseleave="hideMenu(2)"
          style="height:50px;"
          class="menu animated fadeInRight side-menu2"
        >
          <a-icon
            type="file-text"
            @click="toHeadPage()"
            style="font-size:20px;cursor:pointer;color:lightgray;margin-left:15px;margin-top:20px;"
          />
        </div>
        <!-- 待开发 -->
        <div
          @mouseenter="showMenu(3)"
          @mouseleave="hideMenu(3)"
          style="height:50px;"
          class="menu animated fadeInRight side-menu1z"
        >
          <a-icon
            type="form"
            @click="toHeadPage()"
            style="font-size:20px;cursor:pointer;color:lightgray;margin-left:15px;margin-top:20px;"
          />
        </div>
        <!-- 菜单页面 -->
        <div
          @mouseenter="showMenu1"
          @mouseleave="hideMenu1"
          class="smallMenu"
          style="width:200px;background:pink;margin-left:50px;margin-top:-150px; z-index:1000000;"
        >
          <!-- 第一个菜单 -->
          <ul class="smallMenu1" style="padding-top:5px;">
            <!-- 标题 -->
            <div style="color:white;border-bottom:1px solid gray;padding-bottom:5px;"><a-icon
            type="align-left"
            @click="toHeadPage()"
            style="font-size:13px;margin-left:10px;"
          /><span style="margin-left:0px;margin-bottom:10px;font-size:13px;">文章分类</span>
          </div>
            <li>java</li>
            <li>vue.js</li>
            <li>html</li>
          </ul>
          <!-- 第二个菜单 -->
          <ul class="smallMenu2" style="padding-top:5px;">
            <!-- 标题 -->
            <div style="color:white;border-bottom:1px solid gray;padding-bottom:5px;"><a-icon
            type="file-text"
            @click="toHeadPage()"
            style="font-size:13px;margin-left:10px;"
          /><span style="margin-left:0px;margin-bottom:10px;font-size:13px;">我的操作</span>
          </div>
            <li @click="toWriteArticle()">写博客</li>
          </ul>
          <!-- 第三个菜单 -->
         <ul class="smallMenu3" style="padding-top:5px;">
            <!-- 标题 -->
            <div style="color:white;border-bottom:1px solid gray;padding-bottom:5px;"><a-icon
            type="form"
            @click="toHeadPage()"
            style="font-size:13px;margin-left:10px;"
          /><span style="margin-left:0px;margin-bottom:10px;font-size:13px;">网站页面</span>
          </div>
            <li>经验</li>
          </ul>
        </div>
      </div>
      <!-- 侧边栏展开时的样子： -->
      <div v-show="!collapsed">
        <!-- 侧边头像组件 -->
        <!-- 首页按钮 -->
        <div style="color:white;margin-left:20px;margin-top:20px;">
          <a-icon type="home" style="font-size:20px;cursor:pointer;" @click="toHeadPage()"/>
          <span @click="toHeadPage()" style="cursor:pointer;">首页</span>
        </div>
        <div style="text-align:center;margin-top:30px;" class="animated pulse">
          <a-avatar :size="80" src="http://seopic.699pic.com/photo/50018/1470.jpg_wh1200.jpg"/>
          <br>
          <span style="color:#DDDDDD;font-weight:800;">大庇天下寒士
            <a-icon type="caret-down" style="color:#808080;"/>
          </span>
        </div>
        <!--头像组件和菜单组件的分割线 -->
        <br>
        <div style="height:1px;width:100%;background:#171717;"></div>
        <br>
        <span style="color:#969696;font-size:13px;margin-left:5px;">导航菜单</span>
        <!-- 侧边菜单组件 -->
        <a-collapse style="border:0px;padding:0px;position:relative;">
          <a-collapse-panel id="hover" key="1" :style="menuStyle" :showArrow="false">
            <template slot="header">
              <a-icon type="align-left" :style="iconStyle"/>
              <span style="color:#CCCCCC">文章分类</span>
            </template>
            <p class="menu-side">java</p>
            <p class="menu-side">vue.js</p>
          </a-collapse-panel>

          <a-collapse-panel key="2" :style="menuStyle" :showArrow="false">
            <template slot="header">
              <a-icon type="file-text" :style="iconStyle"/>
              <span style="color:#CCCCCC">网站页面</span>
            </template>
            <p class="menu-side">经验</p>
          </a-collapse-panel>

          <a-collapse-panel key="3" :style="menuStyle" :showArrow="false">
            <template slot="header">
              <a-icon type="highlight" :style="iconStyle"/>
              <span style="color:#CCCCCC">我的操作</span>
            </template>
            <p class="menu-side" @click="toWriteArticle()">写博客</p>
          </a-collapse-panel>

          <a-collapse-panel key="4" :style="menuStyle" :showArrow="false">
            <template slot="header">
              <a-icon type="loading" :style="iconStyle"/>
              <span style="color:#CCCCCC">待开发</span>
            </template>
            <p class="menu-side">经验</p>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </a-layout-sider>
    <a-layout>
      <!-- 登录框 -->
      <!-- 登录页面 -->
      <a-modal title="请登录" v-model="visible" :footer="null" width="400px">
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
      </a-modal>
      <!-- header栏 -->
      <a-layout-header style="background: #fff; padding: 0">
        <!-- 展开收起按钮 -->
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
          style="font-size:23px;"
        />
        <a-button style @click.native="showLogin">登录</a-button>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', background: 'rgb(238, 238, 238)', minHeight: '240px',overflow: 'initial' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import axios from "axios";
import "@/assets/css/animate.css";
export default {
  data() {
    const { lang } = this.$route.params;
    return {
      remember: false,
      collapsed: false,
      visible: false,
      userName: "",
      userPassword: "",
      // 侧边菜单的属性
      menuShow: false,
      menuStyle: "padding:0px;background: #242424;border:0px;",
      iconStyle: "margin-right:10px;margin-left:10px;color:#DDDDDD;"
    };
  },
  mounted() {
    this.$router.push("/blogArticle/articleList");
  },
  methods: {
    // 对侧边菜单收起的控制
    hideMenu1() {
      $(".smallMenu").hide();
    },
    showMenu1() {
      $(".smallMenu").show();
    },
    hideMenu() {
      $(".smallMenu").hide();
    },
    showMenu(num) {
      if (num === 1) {
        $(".smallMenu").css("margin-top", "-150px");
        $(".smallMenu1").show();
        $(".smallMenu2").hide();
        $(".smallMenu3").hide();
      } else if (num === 2) {
        $(".smallMenu").css("margin-top", "-100px");
        $(".smallMenu1").hide();
        $(".smallMenu2").show();
        $(".smallMenu3").hide();
      } else if (num === 3) {
        $(".smallMenu").css("margin-top", "-50px");
        $(".smallMenu1").hide();
        $(".smallMenu2").hide();
        $(".smallMenu3").show();
      }
      $(".smallMenu").show();
    },
    // 跳转到注册页面
    toRegist() {
      this.$router.push("/blogRegist/regist");
      this.visible = false;
    },
    // 跳转首页
    toHeadPage() {
      this.$router.push("/blogArticle/articleList");
    },
    // 写文章页面
    toWriteArticle() {
      this.$router.push("/blogWrite/writeArticle");
    },
    click() {},
    showLogin() {
      this.visible = true;
    },
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
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
    login() {
      axios
        .post("http://localhost:8081/loginUser", {
          userName: this.userName,
          userPassword: this.userPassword
        })
        .then(res => {
          if (res.data.code === 200) {
            if (this.remember === true) {
              this.setCookie(this.userName, this.passWord, 7);
            } else {
              this.clearCookie();
            }
            sessionStorage.setItem("user", this.username);
            this.$message.success(res.data.message);
          } else {
            this.$message.error("登陆失败！");
          }
        });
    }
  }
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
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
.ant-collapse {
  background: #1d1d1d;
}
/* p标签的样式 */
.menu-side {
  display: block;
  background: #161616;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  margin: 0;
  padding-left: 50px;
  border: 0px;
  color: #cccccc;
}
.menu-side:hover {
  background: #000000;
}
/* 修改折叠面板的本来样式 */
.ant-collapse-content {
  border: 0px;
}
.ant-collapse-content > .ant-collapse-content-box {
  padding: 0px;
  border: 0px;
}
.animated {
  animation-duration: 0s;
}
.menu:hover {
  background: #333333;
}
.ant-layout {
  background: rgb(238, 238, 238);
}
.ant-layout-content {
  background: rgb(238, 238, 238);
}
.smallMenu {
display:none;
}
.smallMenu ul{
  background: #333333;
  padding:0px;
}
.smallMenu li{
  cursor: pointer;
  font-size:15px;
  color:lightgray;
  padding-left:30px;
  list-style: none;
  width: 100%;
  display:block;
  height:35px;
  line-height:35px;
}
.smallMenu li:hover{
    background: #161616;
}
</style>