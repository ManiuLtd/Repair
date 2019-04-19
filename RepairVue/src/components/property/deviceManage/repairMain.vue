<template>
  <div id="repairList">
    <van-row class="header" type="flex" justify="space-between" style="">
      <van-col span="4">
        <router-link to="/equipment/warranty">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="10" offset="2">维修工单详情</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <div class="content">
      <!--repairMain-->
      <div style="">
        <el-form>
          <el-form-item label="设备名称">
            <el-input v-model="name" disabled="disabled"/>
          </el-form-item>
          <el-form-item label="设备地址">
            <el-input  v-model="address" disabled="disabled"/>
          </el-form-item>
          <el-form-item label="报修时间">
            <el-input v-model="startTime" disabled="disabled"/>
          </el-form-item>
          <el-form-item label="派出时间">
            <el-input v-model="paichuTime" disabled="disabled"/>
          </el-form-item>
          <el-form-item label="到达时间">
            <el-input  v-model="arrivalTime" disabled="disabled"/>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-input  v-model="endTime" disabled="disabled"/>
          </el-form-item>
          <el-form-item label="反馈内容">
            <el-input  v-model="fankui" disabled="disabled"/>
          </el-form-item>
          <el-form-item label="设备状态">
            <el-input  v-model="state1[state]" disabled="disabled"/>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        data:'',
        name:'',
        startTime: '',
        paichuTime: '',
        querenTime: '',
        arrivalTime: '',
        endTime: '',
        address: '',
        fankui: '',
        wxg: '',
        state:'',
        repairId:'',
        message: "维修工单数据",
        msg: false,
        notnull: false,
        state1:[
          "正常",
          "维修中",
          "维修工确认",
          "派出维修工",
          "故障",
        ]
      };
    },
    created(){
      this.select();
    },
    methods: {
      select: function () {
        this.repairId = this.$route.params.repairId;
        this.$http
          .post(
            "/actionLog/findById/",
            {
              id: this.repairId,
            },
            {
              headers: {
                'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
                'Content-Type': 'application/json'
              }
            },
            {}
          )
          .then(res => {
            console.log("维修工单详情" ,res)

            if (res.data.code === "1") {
              window.localStorage.setItem(
                "repair",
                JSON.stringify(res.data.token)
              );
              this.data = res.data.data;
              this.name = this.data.equipment.name;
              this.address = this.data.equipment.address;
              this.startTime = this.data.startTime;
              this.paichuTime = this.data.paichuTime;
              this.arrivalTime = this.data.arrivalTime;
              this.endTime = this.data.endTime;
              this.fankui = this.data.wxfankui;
              this.state = this.data.state;
              console.log("this.msg：" + res.data.msg)
            } else {
              this.$router.push({
                path: "/"
              });
              this.msg = true;
              console.log("this is fail", res);
            }
          })
          .catch(err => {
            this.$notify({
              title: "获取维修工单失败",
              message: "服务器请求失败，请检查网络或联系管理员",
              type: "error"
            });
            console.log(err);
          });
      }
    }
  }

</script>

<style scoped>
  .title {
    text-align: center;
  }

  .content {
    margin: 5%;
  }
</style>
