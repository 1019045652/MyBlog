<template>
  <div id="sd" class="read_container clearfix">
    <div class="readArticle">
      <div class="readArticleTitle">
        <p class="read_p1">{{article.articleTitle}}</p>
        <p class="read_p2">
          <a-icon class="read_icon" theme="filled" type="smile"/>
          {{user.userWriteName}}
          <a-icon class="read_icon" theme="filled" type="eye"/>
          {{article.articleReadCount}}
          <a-icon class="read_icon" theme="filled" type="tags"/>开发经验
          <a-icon class="read_icon" theme="filled" type="message"/>2325
          <a-icon class="read_icon" theme="filled" type="schedule"/>
          {{article.articleCreateTime|dateFormat}}
        </p>
      </div>
      <div class="articleContent">
        <div style="border:0;" class="ql-container ql-snow">
          <div style="padding:0px; border-radius:5px;" class="ql-editor">
            <img :src="article.articleImg">
            <div class="read_content" v-html="article.articleContent"></div>
          </div>
        </div>
      </div>
      <div class="articleContent" style="margin-top:20px;">
        <div
          class="read_content"
          style="border-radius:5px;padding:20px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;"
        >
          <!-- 点赞 -->
          <a href="javaScript:;" @click="dz()" style="color:gray;">
            <a-icon class="doIcon" type="like" theme="filled" style="margin-left:20px;"/>
            <b>点赞({{dzCount}})</b>
          </a>
          <!-- 取消点赞 -->
          <a @click="removeDz()" style="color:#3385ff;" v-show="isDz">
            <a-icon class="doIcon" type="like" theme="filled" style="margin-left:20px;"/>
            <b>取消点赞({{dzCount}})</b>
          </a>
          <!--  -->
          <a href="#maodian" style="color:gray;">
            <a-icon class="doIcon" type="message" theme="filled"/>
            <b>评论({{plCount}})</b>
          </a>
          <!-- 收藏 -->
          <a @click="sc()" style="color:gray;">
            <a-icon class="doIcon" type="star" theme="filled"/>
            <b>收藏({{scCount}})</b>
          </a>
          <!-- 取消收藏 -->
          <a @click="removeSc()" style="color:#3385ff;" v-show="isSc">
            <a-icon class="doIcon" type="star" theme="filled"/>
            <b>取消收藏({{scCount}})</b>
          </a>
          <!-- 收藏 -->
          <a @click="zf()" v-show="!isZf" style="color:gray;">
            <a-icon class="doIcon" type="star" theme="filled"/>
            <b>收藏({{zfCount}})</b>
          </a>
          <!-- 取消转发 -->
          <a @click="removeZf()" v-show="isZf" style="color:#3385ff;">
            <a-icon class="doIcon" type="star" theme="filled"/>
            <b>取消收藏({{zfCount}})</b>
          </a>
        </div>
      </div>
      <!-- 回复区和正文区的隔开的地方 -->
      <div class="articleContent reply" style="margin-top:20px;">
        <div class="read_content" style="padding:20px;border-radius:5px;margin-bottom:40px;">
          <p
            style="font-weight:600;font-size:20px;color:pink;"
          >留言回复区-----^0^-----^_^-----^v^------^0^------0V0!!------^oo^------</p>
          <hr>
          <div v-for="(ly,index) in lys" :key="index">
            <p style="color:rgb(41, 110, 53);font-weight:600;">{{ly.lyUserName}}:</p>
            <p style="text-indent:25px">{{ly.lyContent}}</p>
            <p style="text-indent:25px;color:gray;font-weight:600;">发布于{{ly.lyTime | dateFormat}}</p>
            <p style="text-indent:25px;color:rgb(10, 100, 194);">回复</p>
            <hr>
          </div>
        </div>
        <div class="read_content" id="maodian" style="padding:20px;border-radius:5px;">
          <h3>留言区：</h3>
          <a-textarea v-model="ly" placeholder="请输入你的留言" :rows="4"/>
          <br>
          <br>
          <a-button type="primary" @click="lySubmit()">提交</a-button>
        </div>
      </div>
    </div>

    <!-- 侧边栏 -->
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
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import axios from "axios";
import api from "@/assets/api/index.js";
export default {
  data() {
    return {
      // 点赞转发收藏按钮的数量
      dzCount:0,
      plCount:0,
      scCount:0,
      zfCount:0,
      // 点赞转发收藏按钮的样式转换
      isDz: false,
      isSc: false,
      isZf: false,
      a: 0,
      nowUser: "",
      ly: "",
      article: {},
      articleId: "",
      user: {},
      lys: []
    };
  },
  watch: {
    a: "getLy"
  },
  mounted() {
    this.articleId = localStorage.getItem("articleId");
    // 获取文章内容
    api
      .getArticleById({
        articleId: this.articleId
      })
      .then(res => {
        this.article = res.data.result;
        this.user = res.data.result.user;
      });

    // 获取userName
    api
      .getUserById({
        id: sessionStorage.getItem("userId")
      })
      .then(res => {
        this.nowUser = res.data.result.userWriteName;
      });
    // 获取留言
    api
      .findAllLy({
        articleId: this.articleId
      })
      .then(res => {
        this.lys = res.data.result;
      });
    // 判断是否转发过这篇文章
    api
      .isForward({
        forwardArticleId: localStorage.getItem("articleId"),
        forwardUserId: sessionStorage.getItem("userId")
      })
      .then(res => {
        if(res.data.code === 200){
          this.isZf = true;
        }else{
          this.isZf = false;
        }
      });
      // 获取文章转发次数
      api.getZfCount({
        articleId:this.articleId
      }).then(res=>{
        this.zfCount = res.data.result
      })
  },
  methods: {
    dz() {
      if (sessionStorage.getItem("userId") === null) {
        this.$message.error("请先登录");
      } else {
        this.$message.success("点赞成功");
      }
    },
    sc() {},
    zf() {
      api
        .forwardArticle({
          forwardArticleId: localStorage.getItem("articleId"),
          forwardUserId: sessionStorage.getItem("userId")
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success("收藏成功！");
            this.isZf = true;
            this.zfCount++;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    removeZf(){
      api.removeForward({
          forwardArticleId: localStorage.getItem("articleId"),
          forwardUserId: sessionStorage.getItem("userId")
      }).then(res=>{
        if(res.data.code === 200){
          this.$message.success(res.data.message);
          this.isZf = false;
          this.zfCount--;
        }else{
          this.$message.error(res.data.message)
        }
      })
    },
    // 获取留言
    getLy() {
      api
        .findAllLy({
          articleId: this.articleId
        })
        .then(res => {
          this.lys = res.data.result;
        });
    },
    // 提交留言
    lySubmit() {
      api
        .addLy({
          lyUserId: sessionStorage.getItem("userId"),
          lyUserName: this.nowUser,
          lyContent: this.ly,
          lyTime: new Date(),
          lyArticleId: this.articleId
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.message);
            this.ly = "";
            this.a += 1;
          } else {
            this.$message.error("留言失败！");
          }
        });
    }
  }
};
</script>
<style>

  .reply p{
    margin-bottom: 5px;
  }
  .doIcon {
    margin-left: 10px;
    cursor: pointer;
  }
  .replyArea {
  }
  .replyForm {
  }
  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  .read_container {
    background-image: url(../../../assets/img/4.jpg);
    background-attachment: fixed;
    background-size: cover;

  }
  .read_content {
    padding: 40px;
    background-color: rgba(255, 255, 255, 0.897);
  }
  .read_icon {
    margin-left: 15px;
  }
  .read_p1 {
    font-size: 32px;
    font-weight: bold;
    color: rgb(71, 71, 71);
    margin-bottom: 15px;
  }
  .read_p2 {
    font-weight: 600;
    color: rgb(122, 122, 122);
    margin-bottom: 50px;
  }
  .readArticleTitle {
    text-align: center;
  }
  .readArticle {
    float: left;
    width: 80%;
    padding: 60px 20px 10px 20px;
    min-height: 100vh;
  }
  .articleContent {
    width: 70%;
    margin: 0 auto;
  }
  /* 侧边栏 */
  .sideList {
    float: right;
    width: 20%;
    margin-top:50px;

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
</style>

