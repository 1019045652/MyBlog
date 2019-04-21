<template>
  <div class="articleList clearfix" style="min-height:100vh;">
    <div class="articleDiv clearfix">
      <div style="margin-left:90px;">
        <!-- 首页的头部标题 -->
        <div class="articleListTitle">
          <p class="p1">安~的秘密小基地</p>
          <p class="p2">~你永远不懂我伤悲~</p>
        </div>
        <!-- 首部导航操作按钮 -->
        <div
          style="width:940px;height:50px;background:rgba(255, 255, 255, 0.775);margin-bottom:30px;border-radius:5px;padding-top:10px;"
        >
        </div>
        <!-- 遍历文章 -->
        <!-- 卡片遍历 -->
        <div class="article" v-for="(article,index) in pageArticleList" :key="index">
          <a-card  hoverable style="width: 300px">
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
            </template>
            <a-card-meta :description="article.articleSummary">
              <template class="ant-card-actions" slot="title">
                <span @click="readArticle(article.articleId)">{{article.articleTitle}}</span>
              </template>
              <a-avatar @click="toUserMessage(article.user.id)" slot="avatar" :src="article.user.userImage"/>
            </a-card-meta>
          </a-card>
        </div>
      </div>
      <a-pagination
        style="margin-left:460px;margin-bottom:80px;margin-top:30px;clear:both;"
        :pageSize="9"
        @change="onChange"
        :current="current"
        :total="total"
      />
    </div>
    <!-- 侧边栏（可移植） -->
    <div class="sideList">
      <div class="sideMenuList">
        <ul>
          <li>
            <a-icon type="sound" theme="filled"/>
          </li>
          <li>
            <a-icon type="fire" theme="filled"/>
          </li>
          <li>
            <a-icon type="github" theme="filled"/>
          </li>
        </ul>
      </div>
      <router-view></router-view>
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
      articleList: [],
      pageArticleList: [],
      current: 1,
      total: 0,
      isShowList: false,
      articleTypeList: [],
      articleTypeId: -1,
      nowMenu: "所有文章",
      style: "color:blue;"
    };
  },
  watch: {
    articleTypeId: "updateList",
    $route(to, from) {
      this.current = 1
      if(this.$route.query.articleTypeId>0){
         api
          .findArticleByType({
            articleTypeId: this.$route.query.articleTypeId
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
      }else{
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
      }
      
    }
  },
  methods: {
    // 查看用户信息
    toUserMessage(userId){
      this.$router.push({
        path:"/blogUser/userMessage",
        query:{
          id:userId
        }
      })
    },
    // 获取指定类型的文章列表
    updateList() {
      this.current = 1

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
        .css("display", "none");
    },
    fangda(index) {
      $(".mark")
        .eq(index)
        .css("display", "block");
    },
    readArticle(id) {
      localStorage.setItem("articleId", id);
      this.$router.push("/blogRead/readArticle");
    }
  },
  mounted() {
    if (this.$route.query.articleTypeId != null) {
       api
          .findArticleByType({
            articleTypeId: this.$route.query.articleTypeId
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
    } else {
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
    }
    // 获取文章分类列表
    api.findAllArticleType().then(res => {
      this.articleTypeList = res.data.result;
    });
  }
};
</script>
<style>
.article {
  float: left;
  margin-right: 20px;
  margin-bottom: 20px;
}
.articleListTitle {
  width: 50%;
  margin-left: 140px;
  text-align: center;
  margin-bottom: 50px;
}
.p1 {
  font-size: 32px;
  font-weight: bold;
  color: rgb(255, 255, 255);
  font-family: STKaiti;
}
.p2 {
  font-size: 16px;
  font-weight: bold;
  color: rgb(247, 166, 166);
}
.animated {
  animation-duration: 0.5s;
  animation-fill-mode: both;
}
.mark {
  cursor: pointer;
  padding-top: 30px;
  text-align: center;
  z-index: 10000;
  background-color: rgba(22, 173, 243, 0.637);
  width: 100%;
  height: 100%;
  display: none;
}
.articleTitle {
  color: #2976e9;
  cursor: pointer;
  font-size: 18px;
}
.articleTitle:hover {
  color: #073a69;
}
p {
  padding: 0;
  margin: 0px;
  margin-bottom: 3px;
}
.articleDiv {
  width: 80%;
  float: left;
}

.clearfix:after {
  content: ".";
  display: block;
  height: 20px;
  clear: both;
  visibility: hidden;
}
.articleCard {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.856);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.336);
  position: relative;
  overflow: hidden;
  float: left;
  width: 230px;
  height: 330px;
  margin-bottom: 15px;
  margin-right: 29px;
}
.headerImg {
  width: 100%;
  height: 45%;
  background-size: cover;
}
.content {
  height: 45%;
  position: relative;
  padding: 10px;
  overflow: hidden;
}
.foot {
  border-top: 1px solid rgba(136, 136, 136, 0.507);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  position: absolute;
  bottom: 0;
  height: 15%;
}
.foot1 {
  border-top: 1px solid rgba(136, 136, 136, 0.507);

  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 15%;
}
.articleList {
  margin-top: 50px;
  background-image: url(../../../assets/img/4.jpg);
  background-attachment: fixed;
  background-size: cover;
}
.headerImg {
  transition: height 0.8s;
  -moz-transition: height 0.8s; /* Firefox 4 */
  -webkit-transition: height 0.8s; /* Safari and Chrome */
  -o-transition: height 0.8s; /* Opera */
}
.headerImg:hover {
}
/* 侧边栏 */
.sideList {
  float: right;
  width: 20%;
  margin-top: 50px;
}
.sideMenuList {
  height: 50px;
}
.sideMenuList > ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.sideMenuList > ul > li {
  float: left;
  display: block;
  width: 33.3%;
  background: white;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.sideMenuList > ul > li:hover {
  background: rgb(236, 236, 236);
}
#cocodashabi {
  z-index: 1;
  position: relative;
  list-style: none;
  left: -20px;
  display: none;
}
#cocodashabi > li {
  z-index: 500000;
  display: block;
  cursor: pointer;
  width: 100px;
  height: 35px;
  line-height: 35px;
  background-color: rgb(255, 255, 255);
  text-align: center;
  user-select: none;
}
#cocodashabi > li:last-child {
  border-radius: 0 0 5px 5px;
}
#cocodashabi > li:hover {
  background-color: rgb(231, 228, 228);
  cursor: pointer;
  user-select: none;
}
.ant-card-meta-title {
  color: black;
}
.ant-card-meta-title:hover {
  color: rgb(102, 187, 226);
}
</style>
