<template>
    <div style="background:white;padding:20px 100px 100px 100px;">
        <div style="text-align:center;font-size:30px; margin-bottom:40px;">欢迎注册</div>
        <a-form >
           <a-form-item label="用户名" :labelCol="formItemLayout.labelCol">
            <a-input placeholder="请输入用户名" v-model="userName" style="width:300px;"/>
          </a-form-item>
          <a-form-item label="密码" :labelCol="formItemLayout.labelCol">
            <a-input placeholder="请输入密码" v-model="userPassword" style="width:300px;"/>
             
          </a-form-item>
           <a-form-item label="确认密码" :labelCol="formItemLayout.labelCol">
            <a-input placeholder="请确认密码" style="width:300px;"/>
          </a-form-item>

           <a-form-item label="联系方式" v-model="userPhone" :labelCol="formItemLayout.labelCol">
            <a-input placeholder="请输入联系方式" style="width:300px;"/>
          </a-form-item>

           <a-form-item label="生日"  :labelCol="formItemLayout.labelCol">
            <a-date-picker @change="onChange" placeholder="选择您的生日"/>
          </a-form-item>
          
   
        </a-form>
    </div>
</template>

<script>
 const formItemLayout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 8 },
};
export default {
    data(){
        return{
            formItemLayout,
        }
    },
    methods:{
        onChange(){

        }
    }
}
</script>

<style>

</style>
