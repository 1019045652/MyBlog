<template>
  <a-layout id="components-layout-demo-custom-trigger" :style="{ height: '100vh'}">
    <!-- 侧边栏rong -->
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
      theme="light"
      style="background: #242424; padding:0 ;border:1px solid #e0dfdf ;border:0px;"
      collapsedWidth="50"
    >
      <!-- 侧边栏关闭时的样子： -->
      <div v-show="collapsed">
        <a-tooltip placement="right"  :overlayStyle="{background:white}">
        <template slot="title" style="background:white;">
          <span>回到首页</span>
        </template>
       
        <a-icon type="home" style="font-size:20px;cursor:pointer;color:white;margin-left:15px;margin-top:20px;"/>
       
        </a-tooltip>
      </div>
      <!-- 侧边栏展开时的样子： -->
      <div v-show="!collapsed">
        <!-- 侧边头像组件 -->
          <!-- 首页按钮 -->
        <div style="color:white;margin-left:20px;margin-top:20px;">
          <a-icon type="home" style="font-size:20px;cursor:pointer;"/>
          <span @click="toHeadPage()" style="cursor:pointer;">首页</span>
        </div>
        <div style="text-align:center;margin-top:30px;">
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
        <a-collapse v-model="activeKey" style="border:0px;padding:0px;position:relative;">
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

      <!-- 面包屑栏 -->
      <a-layout-header
        style="background: #fff; padding: 0 ;border-top:1px solid white; margin-top:10px;"
      >
        <div style="padding-left:40px;">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item style="font-weight:700;">User</a-breadcrumb-item>
            <a-breadcrumb-item style="font-weight:700;">Bill</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
      </a-layout-header>
      <!-- 正文内容 -->
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '240px' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
    <!-- 登录页面 -->
    <a-modal title="请登录" v-model="visible" @ok="handleOk" :footer="null">
      <a-form :form="form" id="components-form-demo-normal-login" class="login-form">
        <a-form-item>
          <a-input v-model="username" placeholder="输入用户名">
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input type="password" v-model="password" placeholder="请输入密码">
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox>记住密码</a-checkbox>
          <a class="login-form-forgot" href>忘记密码</a>
          <a-button type="primary" htmlType="submit" class="login-form-button" @click="login">Log in</a-button>
          <a href>没有账号？去注册>></a>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      visible: false,
      username: "",
      password: "",
      // 侧边菜单的属性
      menuShow: false,
      menuStyle: "padding:0px;background: #242424;border:0px;",
      iconStyle: "margin-right:10px;margin-left:10px;color:#DDDDDD;"
    };
  },
  mounted() {
    this.$router.push("/views/articleList");
  },
  methods: {
    // 跳转首页
    toHeadPage(){
      this.$router.push('/views/articleList')
    },
    // 写文章页面
    toWriteArticle() {
      this.$router.push("/views/writeArticle");
    },
    click() {},
    showLogin() {
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
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
  background: #242424;
}
/* p标签的样式 */
.menu-side {
  display: block;
  background: #1b1b1b;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  margin: 0;
  padding-left: 50px;
  border: 0px;
  color: #cccccc;
}
.menu-side:hover {
  background: #333333;
}
/* 修改折叠面板的本来样式 */
.ant-collapse-content {
  border: 0px;
}
.ant-collapse-content > .ant-collapse-content-box {
  padding: 0px;
  border: 0px;
}
#hover {
  background: white;
}
/* 开始过渡阶段,动画出去阶段 */
.fade-enter-active,.fade-leave-active{
  transition: all 0.5s ease-out;
}
/* 进入开始 */
.fade-enter{
  transform: translateY(-500px);
  opacity: 0;
}
/* 出去终点 */
.fade-leave-active{
  transform: translateY(500px);
  opacity: 0;
}
</style>