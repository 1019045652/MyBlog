<template>
<div>
  <div class="c">
    <div class="fdListContainer">
    <h1 v-show="isShow" style="color:red;">你还没有转发过文章哦！</h1>
      <div v-for="(fd,index) in fdList" :key="index" class="fdArticle">
        <div
          style="font-weight:600;background:#cb94e0bb;border-radius:5px 5px 0 0;padding:5px 15px 5px 15px;"
        >于 {{fd.forwardTime | dateFormat}} 转发了：</div>
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
  background-color: rgba(231, 208, 240, 0.87);
  border-radius: 5px;
}
.fdListContainer {
  padding: 20px;
  width: 50%;
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
