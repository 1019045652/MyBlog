<template>
<div>
  <div style="padding-top:50px;padding-left:50px;" class="c">
     <div
      style="width:940px;height:50px;background:rgba(255, 255, 255, 0.775);margin-bottom:30px;border-radius:5px;padding-top:13px;"
    >
      <span style="margin-left:20px;">
        <b>
          当前位置
          <a-icon type="environment"/>：
        </b>我的操作 / 我的 Fans
      </span>
    </div>
    <div class="fdListContainer">
      
    <h1 v-show="isShow" style="color:red;">你还没有转发过文章哦！</h1>
      <div v-for="(fd,index) in fdList" :key="index" class="fdArticle">
        <div
          style="font-weight:600;background:white;border-radius:5px 5px 0 0;padding:5px 15px 5px 15px;"
        >于 {{fd.forwardTime | dateFormat}} 收藏了：</div>
        <div style="padding:10px 15px 10px 15px;">
          <h3 >
            <b @click="readArticle(fd.articleId)" class="fdTitle">{{fd.articleTitle}}</b>
          </h3>
          <hr>
          <a-avatar :size="22" :src="fd.userImage"/>
          <span style="font-size:13px;font-weight:600;">{{fd.userWriteName}}  </span>
          <span style="float:right;font-weight:600;">发布于 {{fd.articleCreateTime | dateFormat}} </span>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import api from "@/assets/api/index.js";
export default {
  data() {
    return {
      fdList: [],
      isShow:false,
    };
  },
  methods: {
    readArticle(id) {
      localStorage.setItem("articleId", id);
      this.$router.push("/blogRead/readArticle");
    }
  },
  created(){
  },
  mounted() {
    api
      .findFdArticleList({
        id: sessionStorage.getItem("userId")
      })
      .then(res => {
        this.fdList = res.data.result;
        if(this.fdList.length === 0){
            this.isShow = true;
        }
      });
  }

  
};
</script>

<style>
.fdArticle {
  margin-bottom: 8px;
  background-color: rgba(255, 255, 255, 0.603);
  border-radius: 5px;
  width:500px;
  margin-bottom: 20px;
}
.fdListContainer {
  padding: 0px;
  width: 50%;
  min-height:100vh;
  
}
.c {
    margin-top:50px;
  background-image: url(../../../assets/img/4.jpg);
  background-attachment: fixed;
  background-size: cover;
  width: 100%;

}
.fdTitle{
    cursor: pointer;
}
.fdTitle:hover{
    color:rgb(97, 173, 218);
}
</style>
