<template>
  <el-container>
    <el-container>
      <div>
        <three></three>
      </div>
      <el-container>
        <el-header style="background-color: #3a8ee6;text-align: right; font-size: 16px; line-height: 60px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息查看</el-dropdown-item>
              <el-dropdown-item>修改个人信息</el-dropdown-item>
              <el-dropdown-item>修改账号密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>个人中心</span>
        </el-header>
        <el-main>
          <div class="content">
            <!--repairMain-->
            <div style="margin-top:30px;padding:10px ;">
              <div class="title">
                <h2>维修工单详情</h2>
              </div>
              <el-form ref="form" label-width="80px">
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
                <el-form-item label="反馈内容">
                  <el-input  v-model="fankui" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="设备状态">
                  <el-input  v-model="state" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="投诉内容">
                  <el-input v-model="fankui"/>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="input-group btn-login" @click="add(data.id)">提交投诉</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import three from '../three'
  export default {
    components:{
      three
    },
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
          this.notnull = true;
        } else {
          console.log("the msg is ", this.fankui, id);
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
              if (res.data.code === "1") {
                window.localStorage.setItem(
                  "fanKui",
                  JSON.stringify(res.data.token)
                );
                this.$router.push({
                  path: "/index"
                });

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
  }
</style>
