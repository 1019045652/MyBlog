<template>
  <div class="userMessageContainer">
    <div style="margin-top:50px;padding:40px;">
      <a-card style="width:70%;margin:0 auto;margin-bottom:20px;">
        <template slot="title">
          <a-icon type="tag" theme="filled"/>个人信息
        </template>
        <div style="float:left;width:30%;">
          <a-avatar
            @click="toUserMessage()"
            class="messageImage"
            :size="userImageSize"
            :src="userMessage.userImage"
          />
        </div>
        <div style="float:right;width:70%;">
          <!-- 账号 -->
          <div class="messageLanMu">
            <a-icon type="smile" theme="filled" style="font-size:18px;"/>
            <span style="font-weight:800;">用户名：</span>
            <span style="color:gray;">{{userMessage.userName}}</span>
          </div>

          <!-- 昵称 -->
          <div class="messageLanMu">
            <a-icon type="edit" theme="filled" style="font-size:18px;"/>
            <span style="font-weight:800;">昵称：</span>
            <span style="color:gray;">{{userMessage.userWriteName}}</span>
          </div>
          <!-- 性别： -->
          <div class="messageLanMu">
            <a-icon type="skin" theme="filled" style="font-size:18px;"/>
            <span style="font-weight:800;">性别：</span>
            <span style="color:gray;">{{userMessage.userSex}}</span>
          </div>
          <div class="messageLanMu">
            <a-icon type="environment" theme="filled" style="font-size:18px;"/>
            <span style="font-weight:800;">地址：</span>
            <span style="color:gray;">{{userMessage.userAddress}}</span>
          </div>
          <div class="messageLanMu">
            <a-icon type="mobile" theme="filled" style="font-size:18px;"/>
            <span style="font-weight:800;">联系方式：</span>
            <span style="color:gray;">{{userMessage.userPhone}}</span>
          </div>
          <div class="messageLanMu">
            <a-icon type="hourglass" theme="filled" style="font-size:18px;"/>
            <span style="font-weight:800;">注册时间：</span>
            <span style="color:gray;">{{userMessage.userCreateTime | dateFormat}}</span>
          </div>
        </div>
      </a-card>

      <!-- 博客信息 -->
      <a-card style="width:70%;margin:0 auto;">
        <template slot="title">
          <a-icon type="tag" theme="filled"/>博客信息
        </template>
        <div style="float:right;width:45%;">
          <!-- 发布过的博客 -->
          <div class="messageLanMu">
            <a-icon type="customer-service" theme="filled" style="font-size:18px;"/>
            <span style="font-weight:800;">已关注：</span>
            <span style="color:gray;">11</span>
          </div>

          <!-- 昵称 -->
          <div class="messageLanMu">
            <a-icon type="heart" theme="filled" style="font-size:18px;"/>
            <span style="font-weight:800;">fans：</span>
            <span style="color:gray;">12</span>
          </div>
        </div>
        <!-- 左边 -->
        <div style="float:left;width:40%;margin-left:20px;">
          <!-- 账号 -->
          <div class="messageLanMu">
            <a-icon type="file-text" theme="filled" style="font-size:18px;"/>
            <span style="font-weight:800;">已发布文章：</span>
            <span style="color:gray;" v-if="userMessage.writeCount!==0">{{userMessage.writeCount}}篇</span>
            <span style="color:gray;" v-else>暂无发布文章！</span>
          </div>

          <!-- 昵称 -->
          <div class="messageLanMu">
            <a-icon type="star" theme="filled" style="font-size:18px;"/>
            <span style="font-weight:800;" >已收藏文章：</span>
            <span style="color:gray;" v-if="userMessage.collectCount!==0">{{userMessage.collectCount}}篇</span>
            <span style="color:gray;" v-else>暂无收藏文章！</span>
          </div>
        </div>
      </a-card>
      <div style="background:white;">
      <!-- 时间轴 -->
    
      </div>
    </div>
    
  </div>
</template>
<script>
import api from "@/assets/api/index.js";
export default {
  data() {
    return {
      userMessage: [],
      userImageSize: 150
    };
  },
  mounted() {

     api
        .getUserById({
          id: this.$route.query.id
        })
        .then(res => {
          this.userMessage = res.data.result;
        });
        
    // if (sessionStorage.getItem("seMe") === 3) {
     
    // } else {
    //   api
    //     .getUserById({
    //       id: sessionStorage.getItem("messageId")
    //     })
    //     .then(res => {
    //       this.userMessage = res.data.result;
    //     });
    // }
  },
  methods: {}
};
</script>
<style>
.userMessageContainer {
  min-height: 100vh;
  background-image: url(../../../assets/img/4.jpg);
  background-attachment: fixed;
  background-size: cover;
}
.messageImage {
  border: 5px solid rgb(202, 202, 202) !important;
  margin-top: 32px;
}
.ant-card {
  background-color: rgba(255, 255, 255, 0.799);
}
.messageLanMu {
  border-bottom: 2px solid rgba(128, 128, 128, 0.192);
  padding-bottom: 5px;
  margin-top: 10px;
}
</style>


