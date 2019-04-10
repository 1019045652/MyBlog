<template>
  <div style=" width:100%;background:rgb(238, 238, 238);">
    <div v-show="isRegist" style="background:rgb(238, 238, 238);padding:20px 100px 100px 100px;">
      <div style="text-align:center;font-size:30px; margin-bottom:40px;">欢迎注册</div>
      <a-form :form="form">
        <a-form-item label="用户名" :labelCol="formItemLayout.labelCol">
          <a-input
            placeholder="请输入用户名"
            style="width:300px;"
            v-decorator="[
          'userName',
          {rules: [{ required: true, message: '请输入用户名！' }]}
        ]"
          />
        </a-form-item>
        <a-form-item label="笔名" :labelCol="formItemLayout.labelCol">
          <a-input
            placeholder="请输入笔名"
            style="width:300px;"
            v-decorator="[
          'userWriteName',
          {rules: [{ required: true, message: '请输入笔名！' }]}
        ]"
          />
        </a-form-item>
        <a-form-item label="上传头像" :labelCol="formItemLayout.labelCol">
          <a-upload
            name="file"
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            action="http://localhost:8081/upload"
            @change="handleChange"
            :beforeUpload="beforeUpload"
          >
            <a-avatar shape="square" :size="100" v-if="imageUrl" :src="imageUrl" alt="avatar"/>
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'"/>
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="密码" :labelCol="formItemLayout.labelCol">
          <a-input
            type="password"
            placeholder="请输入密码"
            style="width:300px;"
            v-decorator="[
          'password',
          {
            rules: [{
              required: true, message: '请输入密码!',
            }, {
              validator: validateToNextPassword,
            }],
          }
        ]"
          />
        </a-form-item>
        <a-form-item label="确认密码" :labelCol="formItemLayout.labelCol">
          <a-input
            type="password"
            placeholder="请再次输入你的密码"
            style="width:300px;"
            v-decorator="[
          'confirm',
          {
            rules: [{
              required: true, message: '请再次输入你的密码!',
            }, {
              validator: compareToFirstPassword,
            }],
          }
        ]"
            @blur="handleConfirmBlur"
          />
        </a-form-item>
        <a-form-item label="性别" :labelCol="formItemLayout.labelCol">
          <a-radio-group v-model="userSex" buttonStyle="solid">
            <a-radio-button value="男">男</a-radio-button>
            <a-radio-button value="女">女</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="联系方式" :labelCol="formItemLayout.labelCol">
          <a-input v-model="userPhone" placeholder="请输入联系方式" style="width:300px;"/>
        </a-form-item>

        <a-form-item label="生日" :labelCol="formItemLayout.labelCol">
          <a-date-picker
            @change="onChange"
            placeholder="选择您的生日"
            v-decorator="['date-picker', { rules: [{ type: 'object', required: true, message: '请选择时间!' }],},]"
          />
        </a-form-item>
        <a-form-item label="住址" :labelCol="formItemLayout.labelCol">
          <a-input v-model="userAddress" placeholder="请输入住址" style="width:300px;"/>
        </a-form-item>
        <a-form-item :labelCol="formItemLayout.labelCol">
          <a-button style="margin-left:300px;width:100px;">取消</a-button>
          <a-button type="primary" style="margin-left:20px;width:100px;" @click="regist">提交</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div v-show="!isRegist" style="width:38%;margin:0 auto;margin-top:250px; font-size:25px;">恭喜你注册成功啦！点击页面右上角登录>></span></div>
  </div>
</template>

<script>
import api from "@/assets/api/index.js";
const formItemLayout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 8 }
};
export default {
  data() {
    return {
      isRegist:true,
      form: this.$form.createForm(this),
      loading: false,
      imageUrl: "",
      formItemLayout,
      userPhone: "",
      userAddress: "",
      userSex: "男"
    };
  },
  mounted(){
     document.getElementById("qwe").scrollTop = 0

  },
  methods: {
    // 校验两次密码的输入是否一致
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("密码不一致！");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },

    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        this.imageUrl = info.file.response.result.imgUrl;
        this.loading = false;
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        this.$message.error("只能上传JPG格式的图片");
      }
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 1MB!");
      }
      return isJPG && isLt2M;
    },
    //   注册
    regist(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          api
            .registerUser({
              userName: values.userName,
              userWriteName: values.userWriteName,
              userPassword: values.password,
              userSex: this.userSex,
              userAddress: this.userAddress,
              userImage: this.imageUrl,
              userPhone: this.userPhone,
              userCreateTime: new Date(),
              userBirth: values["range-picker"]
            })
            .then(res => {
              if(res.data.code === 200){
                this.$message.success("注册成功！");
                this.isRegist = false;
              }else{
                this.$message.error("注册失败，请联系管理员！");
              }
            });
        }
      });
    },
    onChange(e) {}
  }
};
</script>

<style>
.ant-layout-content {
  background: rgb(238, 238, 238);
}
.ant-form-explain {
  clear: none;
}
</style>
