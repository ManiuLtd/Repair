<template>
  <div id="check">
    <van-row type="flex" class="header" justify="space-between">
      <van-col span="4">
        <router-link to="/equipment/index">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="8" offset="2">巡检详情</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <div class="content">
      <!--repairMain-->
      <div style="">
        <el-form ref="form">
          <el-form-item label="巡检时间">
            <el-input v-model="firstPollingTime" disabled="disabled"/>
          </el-form-item>
          <el-form-item label="巡检类型">
            <el-input  v-model="state[pollingType-1]" disabled="disabled"/>
          </el-form-item>
          <el-form-item label="下次巡检">
            <el-input v-model="nextPollingTime" disabled="disabled"/>
          </el-form-item>
          <!--<el-form-item>-->
            <!--<el-button type="primary" class="input-group btn-login" @click="edit1(id)">同意</el-button>-->
            <!--<el-button type="primary" class="input-group btn-login" @click="edit2(id)">不同意</el-button>-->
          <!--</el-form-item>-->
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
        data1:'',
        id:'',
        firstPollingTime:'',
        pollingType:'',
        pollingIsAggre:'',
        message: "巡检计划数据",
        msg: false,
        notnull: false,
        nextPollingTime:'',
        state:[
          "周检",
          "月检",
          "季检",
          "年检",
        ]
      };
    },
    created(){
      this.select();
    },
    methods: {
      edit1: function (equipmentID) {
        if (equipmentID === "") {
          this.notnull = true;
        } else {
          this.$http
            .post(
              "/polling/WYConfirmPollingPlan",
              {
                equipmentId:equipmentID,
                isAgree: 1,
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
              if (res.data.code == "1") {
                window.localStorage.setItem(
                  "equipment",
                  JSON.stringify(res.data.token)
                );

                this.$router.replace("/deviceBlack");
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
                title: "同意失败",
                message: "服务器请求失败，请检查网络或联系管理员",
                type: "error"
              });
              console.log(err);
            });
        }
      },
      edit2: function (equipmentID) {
        if (equipmentID === "") {
          this.notnull = true;
        } else {
          this.$http
            .post(
              "/polling/WYConfirmPollingPlan",
              {
                equipmentId:equipmentID,
                isAgree: 2,
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
              if (res.data.code == "1") {
                window.localStorage.setItem(
                  "equipment",
                  JSON.stringify(res.data.token)
                );
                this.$router.replace("/deviceBlack");
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
                title: "不同意失败",
                message: "服务器请求失败，请检查网络或联系管理员",
                type: "error"
              });
              console.log(err);
            });
        }
      },
      select: function () {
          this.elementId = this.$route.params.elementId;
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http
          .post(
            "/polling/selectPollingLogByWY",
            {},
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
            console.log("巡检工单", res);
            if (res.data.code === "1") {
              window.localStorage.setItem(
                "equipment",
                JSON.stringify(res.data.token)
              );
              this.data1 = res.data.data;
              console.log("该设备的巡检",this.elementId);
              this.data1.forEach(item=>{
                if(item.equipment.id == this.elementId){
                  this.data = item;
                  console.log("该设备的巡检",this.data);
                  this.firstPollingTime = this.data.thisPollingTime;
                  this.nextPollingTime = this.data.nextPollingTime;
                  this.pollingType = this.data.pollingType;
                }
              });

              // this.id = this.data.id;

              // if(this.data.pollingIsAggre == '1'){
              //   this.pollingIsAggre = '已通过';
              // }else if(this.data.pollingIsAggre == '2'){
              //   this.pollingIsAggre = '未通过';
              // }else{
              //   this.pollingIsAggre = '未审核';
              // }
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
              title: "访问失败",
              message: "服务器请求失败，请检查网络或联系管理员",
              type: "error"
            });
            console.log(err);
          });
      },

      // select: function () {
      //   const loading = this.$loading({
      //     lock: true,
      //     text: 'Loading',
      //     spinner: 'el-icon-loading',
      //     background: 'rgba(0, 0, 0, 0.7)'
      //   });
      //   this.elementId = this.$route.params.elementId;
      //   this.$http
      //     .post(
      //       "/equipment/findById",
      //       {
      //         id: this.elementId,
      //       },
      //       {
      //         headers: {
      //           'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
      //           'Content-Type': 'application/json'
      //         }
      //       },
      //       {}
      //     )
      //     .then(res => {
      //       loading.close();
      //       console.log("巡检详情", res);
      //       if (res.data.code === "1") {
      //         window.localStorage.setItem(
      //           "repair",
      //           JSON.stringify(res.data.token)
      //         );
      //         this.data = res.data.data;
      //         this.id = this.data.id;
      //         this.firstPollingTime = this.data.firstPollingTime;
      //         this.pollingType = this.data.pollingType;
      //         if(this.data.pollingIsAggre == '1'){
      //           this.pollingIsAggre = '已通过';
      //         }else if(this.data.pollingIsAggre == '2'){
      //           this.pollingIsAggre = '未通过';
      //         }else{
      //           this.pollingIsAggre = '未审核';
      //         }
      //       } else {
      //         this.$router.push({
      //           path: "/"
      //         });
      //         this.msg = true;
      //         console.log("this is fail", res);
      //       }
      //     })
      //     .catch(err => {
      //       this.$notify({
      //         title: "获取巡检计划失败",
      //         message: "服务器请求失败，请检查网络或联系管理员",
      //         type: "error"
      //       });
      //       console.log(err);
      //     });
      // }
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
