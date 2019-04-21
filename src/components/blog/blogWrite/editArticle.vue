<template>
  <div class="quill-wrap">
    <!-- 文章标题 -->
    <br>
    <span><b><span style="color:red;">*</span>文章标题：</b></span>
    <a-input type="text" style="width:400px;" v-model="articleTitle" placeholder="请输入文章标题"></a-input><br>
    <span v-show="titleCheck" class="prompt">请输入文章标题！</span>
    <br>
    <!-- 文章摘要 -->
    <span><b><span style="color:red;">*</span>文章摘要：</b></span>
    <a-input type="text" style="width:400px;" v-model="articleSummary" placeholder="请输入文章摘要"></a-input><br>
     <span  v-show="summaryCheck" class="prompt">请输入文章摘要！</span>
    <br>
    <!-- 文章类别 -->
    <span><b><span style="color:red;">*</span>文章分类：</b></span>
    
    <select  style="width:100px;height:30px;border-radius:4px;outline:none;"  v-model="articleType" @change="showChange()" >
      <option style="border:1px solid #ccc;" v-for="type in typeList"  :key="type.articleTypeId" :value="type.articleTypeId" >{{type.articleTypeName}}</option>
    </select>
    <br><br>
    <!-- 文章预览图 -->
    <span><b><span style="color:red;">*</span>文章封面：</b></span>
     <a-upload
     style="position:relative;top:-20px;right:-80px;"
    name="file"
    listType="picture-card"
    class="avatar-uploader"
    :showUploadList="false"
    action="http://localhost:8081/upload"
    @change="handleChange"
    :beforeUpload="beforeUpload"
  >
    <a-avatar shape="square" :size="120" v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">点此上传</div>
    </div>
  </a-upload>
    <!-- 文章内容 -->
    <div >
    <quill-editor style="height:200px;" v-model="content" ref="myQuillEditor" :options="editorOption"></quill-editor>
    </div>
    <br>
    <br>
    <br>
    <a-button type="primary" @click.native="addArticle">发布文章</a-button>
  </div>
</template>
<script>
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
import axios from "axios";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import api from "@/assets/api/index.js";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike", "image", "clean"],
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
  [{ size: ["small",false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],// remove formatting button
  [{ 'color': [] }, { 'background': [] }],  
];

Quill.register("modules/ImageExtend", ImageExtend);
export default {
  components: { quillEditor },
  data() {
    return {
      article:{},
      articleId:0,
      typeList:{},
      articleType:"java",
      summaryCheck:false,
      titleCheck:false,
      loading:false,
      imageUrl:"",
      articleTitle:'',
      articleSummary:'',
      content: "",
      toolbarOptions,
      // 富文本框参数设置
      editorOption: {
        placeholder:"编写内容...",
        modules: {
          ImageExtend: {
            loading: true,
            name: "file",
            action: "http://localhost:8081/upload",
            response: res => {
              return res.result.imgUrl;
            }
          },
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function() {
                QuillWatch.emit(this.quill.id);
              }
            },
            
          }
        }
      }
    };
  },
  methods:{
    showChange(){
      console.log(this.articleType)
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.imageUrl = info.file.response.result.imgUrl
        this.loading = false
      }
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('只能上传JPG格式的图片')
      }
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message.error('Image must smaller than 1MB!')
      }
      return isJPG && isLt2M
    },
    // 发布文章
    addArticle(){
      if(this.articleTitle === ""){
        this.titleCheck = true;
        return;
      }
      if(this.articleSummary === ""){
        this.summaryCheck = true;
        this.titleCheck = false;
        return;
      }
      if(this.imageUrl === ""){
        this.$message.error("请上传文章封面！")
        this.titleCheck = false;
        this.summaryCheck = false;
        return;
      }
      if(this.content === ""){
        this.$message.error("请编写文章内容！")
        this.titleCheck = false;
        this.summaryCheck = false;
        return;
      }
      if(this.articleType === "java"){
        this.$message.error("请选择分类！")
        return;
      }
      this.titleCheck = false;
      this.summaryCheck = false;
        console.log(this.article.articleCreateTime)
      axios.post('http://localhost:8081/updateArticle',{
            articleId:localStorage.getItem("articleId"),
            userId:sessionStorage.getItem("userId"),
            articleTitle:this.articleTitle,
            articleSummary:this.articleSummary,
            articleContent:this.content,
            articleImg:this.imageUrl,
            articleType:this.articleType,
            articleReadCount:this.article.articleReadCount,
            articleCreateTime:this.article.articleCreateTime,
            articleLikes:this.article.articleLikes,
            
      }).then(res=>{
        if(res.data.code === 200){
          this.$message.success("更新成功！")
          this.$router.push("/blogUser/myArticle")
        }else{
          this.$message.error("发布失败，请稍后重试！")
        }
      })
    }

  },
  mounted(){
    // 获取文章类型列表
    api.findAllArticleType().then(res=>{
      this.typeList = res.data.result
    })
    //获取文章回显
      this.articleId = localStorage.getItem("articleId");
    api
      .getArticleById({
        articleId: this.articleId
      })
      .then(res => {
        this.user = res.data.result.user;
        this.articleTitle = res.data.result.articleTitle
        this.content = res.data.result.articleContent
        this.articleSummary = res.data.result.articleSummary
        this.imageUrl = res.data.result.articleImg
        this.article = res.data.result
      });
  },
};
</script>
<style>
.quill-wrap{
  padding:50px;
  background: rgba(255, 255, 255, 0.733);
}

.prompt{
  color:red;
  margin-left: 82px;
}
</style>



