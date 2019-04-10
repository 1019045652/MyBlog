<template>
  <a-layout id="components-layout-demo-custom-trigger" :style="{ height: '100vh'}">
    <!-- 侧边栏rong -->
    <a-affix :offsetTop="0">
      <a-layout-header
        :style="{ position: 'fixed', zIndex: 1, width: '100%' }"
        style="-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none; user-select:none;background: #fff; padding: 0;"
      >
        <span
          @click="toHeadPage()"
          style="cursor:pointer;font-size:22px;font-weight:800;margin-left:40px;color:white;"
        >
          <a-icon type="dingding"/>LoveLife
          <a-icon type="dingding" style="transform: rotateY(180deg);"/>
        </span>

        <!-- 展开收起按钮 -->
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
          style="font-size:20px;color:white;"
        />
        <!-- 登陆后的操作 -->
        <span v-show="!loginBtn" style="color:white;line-height:40px;">欢迎你！{{nowUser}}</span>
        <div class="headMenu">
          <ul>
            <li v-show="!loginBtn" @click="logout()">
              <a-icon type="api" theme="filled"/>注销
            </li>
            <li>
              <a-icon type="smile" theme="filled"/>关于我
            </li>
            <li @click="showLogin" v-show="loginBtn">
              <a-icon type="bell" theme="filled"/>登录
            </li>
          </ul>
        </div>
      </a-layout-header>
    </a-affix>
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
      theme="light"
      :class="{'main-menu-sider':!collapsed}"
      style="background: #3a3f51; padding:0 ;border:1px solid #e0dfdf ;border:0px;z-index:1000;margin-top:50px;"
      collapsedWidth="50"
    >
      <!-- 侧边栏关闭时的样子： -->
      <div v-show="collapsed">
        <div>
          <a-tooltip placement="left">
            <template slot="title">
              <span>首页</span>
            </template>
            <div
              @click="toHeadPage()"
              style="height:50px;cursor:pointer;"
              class="menu animated fadeInRight"
            >
              <a-icon
                type="home"
                style="font-size:17px;cursor:pointer;color:white;margin-left:15px;margin-top:20px;"
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
            style="font-size:17px;cursor:pointer;color:white;margin-left:15px;margin-top:20px;"
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
            style="font-size:17px;cursor:pointer;color:white;margin-left:15px;margin-top:20px;"
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
            style="font-size:17px;cursor:pointer;color:white;margin-left:15px;margin-top:20px;"
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
            <div style="color:white;border-bottom:1px solid gray;padding-bottom:5px;">
              <a-icon
                type="align-left"
                @click="toHeadPage()"
                style="font-size:13px;margin-left:10px;"
              />
              <span style="margin-left:0px;margin-bottom:10px;font-size:13px;">文章分类</span>
            </div>
            <li
              v-for="(articleType,index) in articleTypeList"
              :key="index"
            >{{articleType.articleTypeName}}</li>
          </ul>
          <!-- 第二个菜单 -->
          <ul class="smallMenu2" style="padding-top:5px;">
            <!-- 标题 -->
            <div style="color:white;border-bottom:1px solid gray;padding-bottom:5px;">
              <a-icon
                type="file-text"
                @click="toHeadPage()"
                style="font-size:13px;margin-left:10px;"
              />
              <span style="margin-left:0px;margin-bottom:10px;font-size:13px;">我的操作</span>
            </div>
            <li @click="toWriteArticle()">写博客</li>
          </ul>
          <!-- 第三个菜单 -->
          <ul class="smallMenu3" style="padding-top:5px;">
            <!-- 标题 -->
            <div style="color:white;border-bottom:1px solid gray;padding-bottom:5px;">
              <a-icon type="form" @click="toHeadPage()" style="font-size:13px;margin-left:10px;"/>
              <span style="margin-left:0px;margin-bottom:10px;font-size:13px;">网站页面</span>
            </div>
            <li>经验</li>
          </ul>
        </div>
      </div>
      <!-- 侧边栏展开时的样子： -->
      <div v-show="!collapsed">
        <!-- 侧边头像组件 -->
        <!-- 首页按钮 -->

        <div style="text-align:center;margin-top:30px;" class="animated pulse">
          <a-avatar v-if="userImage" class="xwcms" :size="100" :src="userImage"/>
          <br>
          <span style="color:#DDDDDD;font-weight:800;">
            {{this.nowUser}}
            <span v-show="loginBtn">请先登录</span>
            <a-icon type="caret-down" style="color:#808080;"/>
          </span>
        </div>
        <!--头像组件和菜单组件的分割线 -->
        <br>
        <div style="height:0.1px;width:100%;background:Gray;"></div>
        <br>
        <span style="color:#969696;font-size:13px;margin-left:5px;">导航菜单</span>
        <!-- 侧边菜单组件 -->
        <a-collapse style="border:0px;padding:0px;position:relative;">
          <a-collapse-panel id="hover" key="1" :style="menuStyle" :showArrow="false">
            <template slot="header">
              <a-icon type="align-left" :style="iconStyle"/>
              <span style="color:#CCCCCC">文章分类</span>
            </template>
            <!-- 遍历出来的文章类型 -->
            <li
              class="menu-side"
              v-for="(articleType,index) in articleTypeList"
              :key="index"
              @click="toArticleList(articleType.articleTypeId)"
            >{{articleType.articleTypeName}}</li>
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
              <span style="color:#CCCCCC">管理员</span>
            </template>
            <p class="menu-side" @click="toForwardList()">文章管理</p>
            <p class="menu-side">用户管理</p>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </a-layout-sider>

    <a-layout id="qwe">
      <!-- 登录框 -->
      <!-- 登录页面 -->
      <a-modal title="请登录" v-model="visible" :footer="null" width="400px">
        <a-form id="components-form-demo-normal-login" class="login-form">
          <a-form-item>
            <a-input v-model="userName" placeholder="用户名">
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
            </a-input>
            <span>请输入用户名</span>
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

      <!-- 头部栏 -->

      <a-layout-content>
        <!-- routerView -->
        <transition name="slide-fade">
          <router-view id="ad"></router-view>
        </transition>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import axios from "axios";
import "@/assets/css/animate.css";
import api from "@/assets/api/index.js";
export default {
  data() {
    const { lang } = this.$route.params;
    return {
      articleTypeList: [],
      // 当前用户信息
      userImage: "",
      loginBtn: true,
      nowUser: "",
      isLogin: false,
      remember: false,
      collapsed: false,
      visible: false,
      userName: "",
      userPassword: "",
      // 侧边菜单的属性
      menuShow: false,
      menuStyle: "padding:0px;background: #3a3f51;border:0px;",
      iconStyle: "margin-right:10px;margin-left:10px;color:#DDDDDD;"
    };
  },
  mounted() {
    //  获取cookie信息，判断登录状态
    this.getCookie();
    if (sessionStorage.getItem("userId") != null) {
      this.loginBtn = false;
    }
    api
      .getUserById({
        id: sessionStorage.getItem("userId")
      })
      .then(res => {
        this.userImage = res.data.result.userImage;
        this.nowUser = res.data.result.userName;
      });

    // 获取文章分类列表
    api.findAllArticleType().then(res => {
      this.articleTypeList = res.data.result;
    });
  },
  methods: {
    //前往文章列表
    toArticleList(typeId){
      this.$router.push({
        path:"/blogArticle/articleList",
        query:{
          articleTypeId:typeId
        }
      })
    },
    // 前往转发列表
    toForwardList() {
      this.$router.push("/blogForward/forwardArticleList");
    },
    // 对侧边菜单收起的控制
    hideMenu1() {
      console.log("悬浮了")
      $(".smallMenu").hide();
    },
    showMenu1() {
      console.log("悬浮了")
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
    logout() {
      var _this = this;
      this.$confirm({
        title: " 确定要注销吗？",
        content: "注销后无法进行很多操作~",
        okText: "是",
        okType: "danger",
        cancelText: "否",
        onOk() {
          sessionStorage.removeItem("userId");
          _this.loginBtn = true;
          _this.nowUser = "";
          _this.userImage = "";
          _this.$message.success("注销成功！", 1);
        },
        onCancel() {}
      });
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
            this.visible = false;
            // 将服务端返回的数据渲染到页面
            this.userImage = res.data.result.userImage;
            // 在session中存入userId(如果有用户id说明是登录状态，减轻session压力)
            sessionStorage.setItem("userId", res.data.result.id);
            this.nowUser = res.data.result.userName;
            location.reload();
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
.headMenu {
  height: 50px;
  float: right;
}
.headMenu > ul {
  list-style: none;
}
.headMenu > ul > li {
  float: left;
  display: block;
  height: 50px;
  background: #7266ba;
  text-align: center;
  padding: 0 15px 0 15px;
  line-height: 50px;
  color: white;
  cursor: pointer;
}
.headMenu > ul > li:hover {
  background: #6052ad;
}
.slide-fade {
  position: absolute;
  left: 0;
  right: 0;
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(2, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  left: 0;
  right: 0;
  transform: translateX(50px);
  opacity: 0;
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
.ant-collapse {
  background: #1d1d1d;
}
/* p标签的样式 */
.menu-side {
  display: block;
  background: #272d46;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  margin: 0;
  padding-left: 50px;
  border: 0px;
  color: #cccccc;
}
.menu-side:hover {
  background: #272d46f8;
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
  animation-duration: 0.5s;
}
.menu:hover {
  background: #272d46;
}
.ant-layout {
  background: rgb(238, 238, 238);
}
.ant-layout-content {
  background-color: rgb(238, 238, 238);
  margin: 0 !important;
}
.smallMenu {
  display: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.smallMenu ul {
  background: #272d46;
  padding: 0px;
}
.smallMenu li {
  cursor: pointer;
  font-size: 15px;
  color: lightgray;
  padding-left: 30px;
  list-style: none;
  width: 100%;
  display: block;
  height: 35px;
  line-height: 35px;
}
.smallMenu li:hover {
  background: #363c57;
}
.ant-layout-header {
  background-color: #7266ba !important;
  height: 50px;
  line-height: 50px;
}
.xwcms {
  width: 220px;
  height: 220px;
  margin: 0 auto;
  background: no-repeat url(%E6%8B%9B%E5%95%86/img/arrow.gif) left top;
  -webkit-background-size: 220px 220px;
  -moz-background-size: 220px 220px;
  background-size: 220px 220px;
  -webkit-border-radius: 110px;
  border-radius: 110px;
  -webkit-transition: -webkit-transform 0.5s ease-out;
  -moz-transition: -moz-transform 0.5s ease-out;
  -o-transition: -o-transform 0.5s ease-out;
  -ms-transition: -ms-transform 0.5s ease-out;
}
.xwcms:hover {
  -webkit-transform: rotateZ(360deg);
  -moz-transform: rotateZ(360deg);
  -o-transform: rotateZ(360deg);
  -ms-transform: rotateZ(360deg);
  transform: rotateZ(360deg);
}
.main-menu-sider::-webkit-scrollbar {
  width: 0px;
}
.main-menu-sider{
  height:auto!important;
  overflow-y:scroll!important;
}

</style>