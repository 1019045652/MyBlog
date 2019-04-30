<template>
  <div class="typeContainer">
    <a-input v-model="type" style="width:300px;" placeholder="请输入需要添加的文章类型"></a-input>
    <a-button type="primary" @click="addType()">添加</a-button>

    <br>
    <span style="color:red;" v-show="checkType">不能为空！</span>
    <br>
    <br>
    <a-table style="width:600px;" :columns="columns" :dataSource="typeData">
      <span slot-scope="record" slot="operation">
        <a-button @click="editType(record.articleTypeId)">修改</a-button>
        <a-button @click="deleteUser(record.id)" type="danger">删除</a-button>
      </span>
    </a-table>
    <a-modal :destroyOnClose="true" title="修改文章分类" v-model="typeShow" cancelText="取消" okText="提交" @ok="handleOk">
      <a-input v-model="editName" style="width:300px;" placeholder="请输入需要修改的文章类型"></a-input>
      <br><span style="color:red;" v-show="editShow">不能为空！</span>
    </a-modal>
  </div>
</template>
<script>
const columns = [
  {
    title: "类别名称",
    dataIndex: "articleTypeName",
    align: "center"
  },
  {
    title: "Action",
    key: "operation",
    align: "center",
    scopedSlots: { customRender: "operation" }
  }
];
import api from "@/assets/api/index.js";
export default {
  data() {
    return {
      editShow:false,
      checkType: false,
      a: 0,
      editName: "",
      typeShow: false,
      typeData: [],
      type: "",
      columns,
      typeId: -1
    };
  },
  watch: {
    a: "getList"
  },
  mounted() {
    api.findAllArticleType().then(res => {
      this.typeData = res.data.result;
    });
  },
  methods: {
    getList() {
      api.findAllArticleType().then(res => {
        this.typeData = res.data.result;
      });
    },
    //ok按钮
    handleOk() {
       if(this.editName === ""){
         this.editShow = true;
       }else{
      api
        .editType({
          articleTypeId: this.typeId,
          articleTypeName: this.editName
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.message);
            this.a++;
            this.typeShow = false;
            this.editShow = false;
            this.editName = "";
          } else {
            this.$message.error(res.data.message);
          }
        });
       }
    },
    addType() {
      if (this.type === "") {
        this.checkType = true;
      } else {
        this.checkType = false;
        api
          .addType({
            articleTypeName: this.type
          })
          .then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message);
              this.type = "";
            } else {
              this.$message.error(res.data.message);
            }
          });
      }
    },
    editType(id) {
     
      this.typeId = id;
      this.typeShow = true;
    }
  }
};
</script>

<style>
.typeContainer {
  padding: 100px;
  min-height: 100vh;
  background-image: url(../../../assets/img/4.jpg);
  background-attachment: fixed;
  background-size: cover;
}
.ant-table-row {
  background-color: rgba(255, 255, 255, 0.452);
}
.fansContainer {
  min-height: 100vh;
  background-image: url(../../../assets/img/4.jpg);
  background-attachment: fixed;
  background-size: cover;
}
</style>
