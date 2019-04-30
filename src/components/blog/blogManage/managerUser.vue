<template>
  <div style="padding:100px;" class="fansContainer">
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
    <a-table style="width:600px;" :columns="columns" :dataSource="followUserList">
      <span slot-scope="record" slot="time">
        {{record.userCreateTime|dateFormat}}
      </span>
      <span slot-scope="record" slot="operation">
        <a-button @click="toUserMessage(record.id)" v-show="!showButton">查看信息</a-button>
        <a-button @click="deleteUser(record.id)" v-show="!showButton" type="danger">删除</a-button>
      </span>
    </a-table>
  </div>
</template>
<script>
import api from "@/assets/api/index.js";
const columns = [
  {
    title: "用户名",
    dataIndex: "userWriteName",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "用户性别",
    dataIndex: "userSex"
  },
  {
    title: "注册时间",
    align: "center",
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
      a:0,
      showButton: false,
      followUserList: [],
      columns
    };
  },
  watch:{
    a:"geuUserList"
  },
  mounted() {
    api
      .findAllUser({
        id: sessionStorage.getItem("userId")
      })
      .then(res => {
        if (res.data.code === 200) {
          this.followUserList = res.data.result;
        } else {
          this.$message.error(res.data.message);
        }
      });
  },
  methods: {
    // geuUserList
    geuUserList(){
       api
      .findAllUser({
        id: sessionStorage.getItem("userId")
      })
      .then(res => {
        if (res.data.code === 200) {
          this.followUserList = res.data.result;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 删除用户
    deleteUser(id){
       var _this = this;
      this.$confirm({
        title: " 确定要注销吗？",
        content: "注销后无法进行很多操作~",
        okText: "是",
        okType: "danger",
        cancelText: "否",
        onOk() {
          api.deleteUser({
        id:id,
        userId:sessionStorage.getItem("userId")
      }).then(res=>{
        if(res.data.code===200){
          _this.a++;
          _this.$message.success(res.data.message);
        }else{
          _this.$message.error(res.data.message);
        }
      })
        
        },
        onCancel() {}
      });


     
    },
    // 查看用户信息
    toUserMessage(id) {
      this.$router.push({
        path: "/blogUser/userMessage",
        query: {
          id: id
        }
      });
    },
    // 关注用户
    followUser(id) {
      api
        .followUser({
          followUserId: sessionStorage.getItem("userId"),
          followForUserId: id
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success("关注成功！");
            this.showButton = true;
          } else {
            this.$message.error("操作失败，请稍后重试！");
          }
        });
    },
    //取消关注用户
    removeFollow(id) {
      api
        .removeFollow({
          followUserId: sessionStorage.getItem("userId"),
          followForUserId: id
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success("取消成功！");
            this.showFollow = false;
          } else {
            this.$message.error("操作失败，请稍后重试！");
          }
        });
    }
  }
};
</script>

<style>
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

