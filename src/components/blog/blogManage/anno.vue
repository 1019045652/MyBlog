<template>
  <div style="padding:50px;padding-top:100px;">
    <a-button type="primary" @click="showAdd()">新增公告</a-button><br><br>
    <a-modal
      title="发布公告"
      cancelText="取消"
      okText="发布"
      v-model="annoShow"
      @ok="handleOk"
      :width="500"
    >
      <span>公告标题：</span>
      <a-input v-model="annoTitle" style="width:300px;"></a-input>
      <br>
      <br>
      <span>公告内容：</span>
      <a-textarea v-model="annoText" style="width:300px;" :rows="5"></a-textarea>
    </a-modal>

    <a-modal title="公告内容" v-model="textShow" :footer="null" :width="500">
      <span v-html="text"></span>
    </a-modal>
    <a-table :columns="columns" :dataSource="annoList">
      <span slot-scope="record" slot="time">{{record.annoTime|dateFormat}}</span>
      <span slot-scope="record" slot="operation">
        <a-button @click="showText(record.annoText)"  >查看内容</a-button>
        <a-button @click="deleteAnno(record.annoId)" type="danger">删除</a-button>
      </span>
    </a-table>
  </div>
</template>

<script>
import api from "@/assets/api/index.js";
const columns = [
  {
    title: "公告标题",
    dataIndex: "annoTitle"
  },
  {
    title: "发布人",
    dataIndex: "writerName"
  },
  {
    title: "发布时间",
    dataIndex: "annoTime",
    scopedSlots: { customRender: "time" }
  },

  {
    title: "Action",
    key: "operation",
    align: "center",
    scopedSlots: { customRender: "operation" }
  }
];
export default {
  data() {
    return {
      annoShow: false,
      annoList: [],
      columns,
      annoTitle: "",
      annoText: "",
      a: 0,
      textShow: false,
      text: ""
    };
  },
  mounted() {
    api.findAnno().then(res => {
      this.annoList = res.data.result;
    });
  },
  watch: {
    a: "getAnnoList"
  },
  methods: {
    deleteAnno(id) {
      api
        .deleteAnno({
          annoId: id
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
    showText(text) {
      this.text = text;
      this.textShow = true;
    },
    getAnnoList() {
      api.findAnno().then(res => {
        this.annoList = res.data.result;
      });
    },
    showAdd() {
      this.annoShow = true;
    },
    handleOk() {
      api
        .addAnno({
          annoTitle: this.annoTitle,
          annoWriter: sessionStorage.getItem("userId"),
          annoTime: new Date(),
          annoText: this.annoText
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success("发布成功！");
            this.annoShow = false;
            this.annoTitle = "";
            this.annoText = "";
            this.a++;
          } else {
            this.$message.error(res.data.message);
          }
        });
    }
  }
};
</script>

<style>
</style>
