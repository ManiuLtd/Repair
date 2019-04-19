<template>
  <div id="repairWith">
    <van-row type="flex" class="header" justify="space-between">
      <van-col span="4">
        <router-link to="/complaint/index">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="10" offset="2">维修工单详情</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <div class="content">

      <!--repairMain-->
      <div style="">
        <el-form ref="form">
          <el-form-item label="设备名称">
            <el-input v-model="equipment" disabled="disabled"/>
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
          <!--<el-form-item label="反馈内容">-->
            <!--<el-input  v-model="fankui" disabled="disabled"/>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="设备状态">-->
            <!--<el-input  v-model="state" disabled="disabled"/>-->
          <!--</el-form-item>-->
          <el-form-item label="投诉内容">
            <el-input v-model="fankui"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="input-group btn-login" @click="add(data.id)">提交投诉</el-button>
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
        equipment: '',
        startTime: '',
        paichuTime: '',
        querenTime: '',
        arrivalTime: '',
        endTime: '',
        address: '',
        fankui: '',
        weqy: '',
        wxg: '',
        state:'',
        repairId:'',
        message: "维修工单数据",
        msg: false,
        notnull: false
      };
    },
    created(){
      this.select();
    },
    methods: {
      select: function () {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
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
            {
            }
          )
          .then(res => {
            loading.close();
            console.log("详情",res);
            if (res.data.code === "1") {
              window.localStorage.setItem(
                "repair",
                JSON.stringify(res.data.token)
              );
              this.data = res.data.data;
              this.equipment =this.data.equipment.name;
              this.address =this.data.equipment.address;
              this.startTime =this.data.startTime;
              this.paichuTime =this.data.paichuTime;
              this.arrivalTime =this.data.arrivalTime;
              this.endTime =this.data.endTime;
              this.fankui =this.data.fankui;
              this.state =this.data.state;
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
      },
      add: function (id) {

        if (this.fankui === "") {
          this.$toast("投诉内容为空");
          this.notnull = true;

        } else {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.$http
            .post(
              "/actionLog/fanKui",
              {
                actionLogId: id,
                fankui: this.fankui,
              },
              {
                headers: {
                  'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
                  'Content-Type': 'application/json'
                }
              },
              {
                emulateJSON: true,

              }
            )
            .then(res => {
              loading.close();
              console.log("提交投诉",res);
              if (res.data.code === "1") {
                this.$toast.success("投诉成功")
                window.localStorage.setItem(
                  "fanKui",
                  JSON.stringify(res.data.token)
                );
                this.$router.push({
                  path: "/index"
                });

              } else {
                this.$toast.fail("提交失败")
                this.$router.push({
                  path: "/"
                });
                this.msg = true;
                console.log("this is fail", res);
              }
            })
            .catch(err => {
              this.$notify({
                title: "投诉添加失败",
                message: "服务器请求失败，请检查网络或联系管理员",
                type: "error"
              });
              console.log(err);
            });
        }
      }

    }
  }

</script>

<style scoped>

  .mx {
    background-color: blue;
    color: #6c6c6c;
  }

  .btn-login {
    width: 100%;
  }

  .title {
    text-align: center;
  }

  .input-group {
    margin-top: 2%;
  }

  .content {
    margin: 5%;
    /*margin-top: 40%;*/
  }
</style>
