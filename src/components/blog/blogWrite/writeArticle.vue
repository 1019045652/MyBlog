<template>
  <div style="background:white;padding:24px;">
    <div>
      <h1>编写你的博客</h1>
      <!-- 富文本编辑器 -->
      <div class="edit_container">
        <!-- 自定义的图片上传 -->
        <a-upload
          class="avatar-uploader"
          action="http://localhost:8081/upload"
          :fileList="null"
          @change="handleChange"
          
        ></a-upload>

        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        ></quill-editor>
        <a-button type="primary" @click.native="submit()">提交</a-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike", "image", "clean"],
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }] // remove formatting button
];
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      content: "",
      // 编辑器的头部栏
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      }
    };
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    submit() {
      axios.post("http://localhost:8081/addArticle", {
        userId: "123",
        articleContent: this.content,
        articleTitle: "第二篇文章"
      });
    },
    // 上传前的事件
    beforeUpload(){

    },
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }else{
        alert("...")
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },

    //  handleFileList(info.fileList) 
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  }
};
</script>
<style>
</style>
