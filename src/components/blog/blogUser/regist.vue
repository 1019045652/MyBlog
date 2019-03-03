<template>
    <div style=" width:100%;background:rgb(238, 238, 238);">
  <div style="background:rgb(238, 238, 238);padding:20px 100px 100px 100px;">
    <div style="text-align:center;font-size:30px; margin-bottom:40px;">欢迎注册</div>
    <a-form>
      <a-form-item label="用户名" :labelCol="formItemLayout.labelCol">
        <a-input placeholder="请输入用户名" v-model="userName" style="width:300px;"/>
      </a-form-item>
      <a-form-item label="密码" :labelCol="formItemLayout.labelCol">
        <a-input placeholder="请输入密码" v-model="userPassword" style="width:300px;"/>
      </a-form-item>
      <a-form-item label="确认密码" :labelCol="formItemLayout.labelCol">
        <a-input placeholder="请确认密码" v-model="checkPassword" style="width:300px;"/>
      </a-form-item>
      <a-form-item label="性别" :labelCol="formItemLayout.labelCol">
        <a-radio-group v-model="userSex" defaultValue="男" buttonStyle="solid">
          <a-radio-button value="男">男</a-radio-button>
          <a-radio-button value="女">女</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="联系方式"  :labelCol="formItemLayout.labelCol">
        <a-input v-model="userPhone" placeholder="请输入联系方式" style="width:300px;"/>
      </a-form-item>

      <a-form-item label="生日" :labelCol="formItemLayout.labelCol">
        <a-date-picker v-model="userBirth" @change="onChange" placeholder="选择您的生日"/>
      </a-form-item>
      <a-form-item label="住址"  :labelCol="formItemLayout.labelCol">
        <a-input v-model="userAddress" placeholder="请输入住址" style="width:300px;"/>
      </a-form-item>
      <a-form-item :labelCol="formItemLayout.labelCol">
        <a-button style="margin-left:300px;width:100px;">取消</a-button>
        <a-button type="primary" style="margin-left:20px;width:100px;" @click="regist">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
  </div>
</template>

<script>
import axios from "axios";
const formItemLayout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 8 }
};
export default {
  data() {
    return {
      formItemLayout,
      userName: "",
      userPassword: "",
      userPhone: "",
      userAddress: "",
      checkPassword: "",
      userBirth:"",
      userSex:"男"
    };
  },
  methods: {
    //   注册
    regist() {
      axios
        .post("http://localhost:8081/registerUser", {
          userName: this.userName,
          userPassword: this.userPassword,
          userSex:this.userSex,
          userAddress:this.userAddress,
          userPhone:this.userPhone,
          userBirth:this.userBirth
        })
        .then(res => {
          if (res.data.code === 200) {
              this.$message.success("注册成功！")
          }else{
              this.$message.error(res.data.message)
              console.log(this.userSex)
          }
        });
    },
    onChange(e) {}
  }
};
</script>

<style>
.ant-layout-content{
    background: rgb(238, 238, 238);
}
</style>
