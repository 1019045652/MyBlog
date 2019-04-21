<template>
  <div class="myArticleContainer">
    <div v-show="isTableShow" style="width:80%;margin:0 auto;">
      <div class="article" v-for="(article,index) in pageArticleList" :key="index">
        <a-card hoverable style="width: 300px">
          <img
            alt="example"
            style="width:299px;height:203px;"
            :src="article.articleImg"
            slot="cover"
          >
          <template class="ant-card-actions" slot="actions">
            <span href>
              <a-icon type="star"/>
              {{article.zfCount}}
            </span>
            <span href>
              <a-icon type="message"/>
              {{article.plCount}}
            </span>
            <span href>
              <a-icon type="eye"/>
              {{article.articleReadCount}}
            </span>
            <span @click="deleteArticle(article.articleId)">
              <a-icon type="delete"/>删除
            </span>
            <span @click="editArticle(article.articleId)">
              <a-icon type="edit"/>编辑
            </span>
          </template>
          <a-card-meta :description="article.articleSummary">
            <template class="ant-card-actions" slot="title">
              <span @click="readArticle(article.articleId)">{{article.articleTitle}}</span>
            </template>
            <a-avatar
              @click="toUserMessage(article.user.id)"
              slot="avatar"
              :src="article.user.userImage"
            />
          </a-card-meta>
        </a-card>
      </div>
      <a-pagination
        style="margin-left:400px;margin-bottom:80px;margin-top:30px;clear:both;"
        :pageSize="9"
        @change="onChange"
        :current="current"
        :total="total"
      />
    </div>
    <div v-show="!isTableShow">
      <h1>{{myArticleMsg}}</h1>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import "@/assets/css/animate.css";
import api from "@/assets/api/index.js";
export default {
  data() {
    return {
      isTableShow: true,
      articleList: [],
      pageArticleList: [],
      current: 1,
      total: 0,
      isShowList: false,
      articleTypeList: [],
      articleTypeId: -1,
      nowMenu: "所有文章",
      style: "color:blue;",
      myArticleMsg: "尚未发布文章",
      a: 0
    };
  },
  watch: {
    a: "getMyArticleList"
  },
  methods: {
    //获取文章列表
    getMyArticleList() {
      api
        .findUserArticle({
          id: sessionStorage.getItem("userId")
        })
        .then(res => {
          this.myArticleMsg = res.data.message;
          this.articleList = res.data.result;
            if (res.data.message === "尚未发布文章!") {
            this.isTableShow = false;
          } else {
            this.isTableShow = true;
          }
          this.total = res.data.result.length;
          this.pageArticleList = [];
          
          var i = 0;
          res.data.result.forEach(ele => {
            if (i >= 9 * (this.current - 1) && i < 9 * (this.current - 1) + 9) {
              this.pageArticleList.push(ele);
            }
            i++;
          });
        });
    },
    // 刪除文章
    deleteArticle(id) {
      api
        .deleteArticle({
          articleId: id
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.message);
            this.a++;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 编辑文章
    editArticle(id) {
      localStorage.setItem("articleId",id)
      this.$router.push("/blogWrite/editArticle")
    },
    // 显示文章分类后的列表
    toArticleTypeList(id, name) {
      this.articleTypeId = id;
      this.nowMenu = name;
      $("#cocodashabi").slideUp(300);
      this.isShowList = false;
    },
    // 显示文章列表菜单
    showList() {
      if (this.isShowList) {
        $("#cocodashabi").slideUp(300);
        this.isShowList = false;
      } else {
        $("#cocodashabi").slideDown(300);
        this.isShowList = true;
      }
    },
    onChange(current) {
      document.getElementById("qwe").scrollTop = 0;
      this.current = current;
      this.pageArticleList = [];
      var i = 0;
      this.articleList.forEach(ele => {
        if (i >= 9 * (this.current - 1) && i < 9 * (this.current - 1) + 9) {
          this.pageArticleList.push(ele);
        }
        i++;
      });
    },
    suoxiao(index) {
      $(".mark")
        .eq(index)
        .css("display","none");
    },
    fangda(index) {
      $(".mark")
        .eq(index)
        .css("display", "block");
    },
    readArticle(id) {
      localStorage.setItem("articleId", id);
      this.$router.push("/blogRead/readArticle");
    },
    // 获取指定类型的文章列表
    updateList() {
      this.current = 1;
      if (this.articleTypeId === -2) {
        this.pageArticleList = [];
        axios.get("http://localhost:8081/findAllArticle").then(res => {
          this.articleList = res.data.result;
          var i = 0;
          this.articleList.forEach(ele => {
            if (i < 9) {
              this.pageArticleList.push(ele);
            }
            i++;
          });
          this.total = i;
        });
      } else {
        api
          .findArticleByType({
            articleTypeId: this.articleTypeId
          })
          .then(res => {
            this.articleList = res.data.result;
            this.total = res.data.result.length;
            this.pageArticleList = [];
            var i = 0;
            res.data.result.forEach(ele => {
              if (
                i >= 9 * (this.current - 1) &&
                i < 9 * (this.current - 1) + 9
              ) {
                this.pageArticleList.push(ele);
              }
              i++;
            });
          });
      }
    }
  },
  mounted() {
    api
      .findUserArticle({
        id: sessionStorage.getItem("userId")
      })
      .then(res => {
        this.myArticleMsg = res.data.message;
        this.articleList = res.data.result;
          if (res.data.message === "尚未发布文章!") {
            this.isTableShow = false;
          } else {
            this.isTableShow = true;
          }
        this.total = res.data.result.length;
        this.pageArticleList = [];
        var i = 0;
        res.data.result.forEach(ele => {
          if (i >= 9 * (this.current - 1) && i < 9 * (this.current - 1) + 9) {
            this.pageArticleList.push(ele);
          }
          i++;
        });
      });

    // 获取文章分类列表
    api.findAllArticleType().then(res => {
      this.articleTypeList = res.data.result;
    });
  }
};
</script>
<style>
.myArticleContainer {
  margin-top: 50px;
  padding: 20px;
  margin-top: 50px;
  background-image: url(../../../assets/img/4.jpg);
  background-attachment: fixed;
  background-size: cover;
  min-height: 100vh;
}
.article {
  float: left;
  margin-right: 20px;
  margin-bottom: 20px;
}
.ant-card-meta-title {
  color: black;
}
.ant-card-meta-title:hover {
  color: rgb(102, 187, 226);
}
</style>
