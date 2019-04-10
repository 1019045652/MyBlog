<template>
  <div class="articleList clearfix" style="background-color:white;">
    <a-card
  hoverable
  style="width: 300px"
>
  <img
    alt="example"
    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    slot="cover"
  />
  <template class="ant-card-actions" slot="actions">
    <a-icon type="setting" />
    <a-icon type="edit" />
    <a-icon type="ellipsis" />
  </template>
  <a-card-meta
    title="Card title"
    description="This is the description">
    <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
  </a-card-meta>
</a-card>
    <div class="articleDiv clearfix">
      <div style="margin-left:150px;">
        <!-- 首页的头部标题 -->
        <div class="articleListTitle">
          <p class="p1">安~的秘密小基地</p>
          <p class="p2">~你永远不懂我伤悲~</p>
        </div>
        <div
          style="width:750px;height:50px;background:rgba(255, 255, 255, 0.775);margin-bottom:30px;border-radius:5px;padding-top:10px;"
        >
          <span
            @click="showList()"
            style="color:gray;border-radius:3px 3px 0 0;font-weight:600;cursor:pointer;user-select:none;margin-left:20px;display:block;background:pink;width:100px;height:30px;padding-top:5px;text-align:center;"
          >
            {{nowMenu}}
            <a-icon v-show="isShowList" type="caret-down"/>
            <a-icon v-show="!isShowList" type="caret-right"/>
          </span>
          <ul id="cocodashabi">
            <li @click="toArticleTypeList(-2,'所有文章')">所有文章</li>
            <li
              v-for="(articleType,index) in articleTypeList"
              :key="index"
              @click="toArticleTypeList(articleType.articleTypeId,articleType.articleTypeName)"
            >{{articleType.articleTypeName}}</li>
          </ul>
        </div>
        <!-- 遍历文章 -->
        <div class="article" v-for="(article,index) in pageArticleList" :key="index">
          <!-- 文章卡片 -->
          <div class="articleCard">
            <!-- 头部图片 -->
            <div
              :style="'background-image:url('+article.articleImg+')'"
              @mouseover="fangda(index)"
              @mouseout="suoxiao(index)"
              class="headerImg"
            >
              <div @click="readArticle(article.articleId)" class="mark animated fadeIn">
                <div
                  style="padding-top:10px;width:80%;height:80%;margin:0 auto;border:1px solid white;"
                >
                  <div style="color:white;">
                    <a-icon type="eye" style="color:white;"/>
                    {{article.articleReadCount}}
                  </div>
                  <div style="color:white;">
                    <a-icon type="bars" style="color:white;"/>java
                  </div>
                  <div style="color:white;">前往阅读</div>
                </div>
              </div>
            </div>
            <!-- 主体内容 -->
            <div class="content">
              <div style="height:60px;">
                <h2
                  class="articleTitle"
                  @click="readArticle(article.articleId)"
                >{{article.articleTitle}}</h2>
              </div>
              <p style="color:gray;font-size:15px;">{{article.articleSummary}}</p>
            </div>
            <!-- 尾部 -->
            <div class="foot">
              <div style="float:left;">
                <a-avatar :src="article.user.userImage"/>
                <span
                  style="font-size:13px;font-weight:600;color:gray;"
                >{{article.user.userWriteName}}</span>
              </div>
            </div>
            <div class="foot1">
              <div style="float:right;">{{article.articleCreateTime | dateFormat}}</div>
            </div>
          </div>
        </div>
      </div>
      <a-pagination
        style="float:left;margin-left:400px;margin-bottom:80px;margin-top:30px;"
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
      nowMenu:"所有文章"
    };
  },
  watch: {
    articleTypeId: "updateList"
  },
  methods: {
    // 获取指定类型的文章列表
    updateList() {
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
    toArticleTypeList(id,name) {
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
      console.log(1);
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
  padding: 50px 0 0 0;
}

.clearfix:after {
  content: ".";
  display: block;
  height: 0;
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
</style>
