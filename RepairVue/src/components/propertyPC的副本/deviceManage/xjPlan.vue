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
                <h2>巡检计划详情</h2>
              </div>
              <!--<el-form ref="form">-->
                <!--<el-form-item label="第一次巡检时间">-->
                  <!--<el-input v-model="firstPollingTime" disabled="disabled"/>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="巡检类型">-->
                  <!--<el-input  v-model="pollingType" disabled="disabled"/>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="实施状态">-->
                  <!--<el-input v-model="pollingIsAggre" disabled="disabled"/>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                  <!--<el-button type="primary" class="input-group btn-login" @click="edit1(id)">同意</el-button>-->
                  <!--<el-button type="primary" class="input-group btn-login" @click="edit2(id)">不同意</el-button>-->
                <!--</el-form-item>-->
              <!--</el-form>-->
              <el-tabs type="border-card" class="el-tabs">
                <!--<el-tab-pane label="巡检工单管理" class="el-tab-pane" :stretch="true">-->
                <!--物业对巡检工单信息的展现 -->
                <el-table
                  :data="data1.filter(data => !search || data.equipment.name.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%">
                  <el-table-column
                    label="设备名称"
                    prop="equipment.name">
                  </el-table-column>
                  <el-table-column
                    label="维保企业"
                    prop="wbqy.name">
                  </el-table-column>
                  <el-table-column
                    width="135"
                    align="right"
                    prop="id">
                    <template slot="header" slot-scope="scope">
                      <el-input
                        v-model="search"
                        size="mini"
                        style="padding: 0"
                        prefix-icon="el-icon-search"
                        placeholder="关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                      <router-link :to="{ name: 'PatrolReminderSelect', params: { xjgdId: scope.row.id }}">
                        <el-button size="mini" type="primary" class="input-group">巡检工单查看</el-button>
                      </router-link>
                    </template>
                  </el-table-column>
                </el-table>
                <!--</el-tab-pane>-->
              </el-tabs>

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
    // data() {
    //   return {
    //     data:'',
    //     id:'',
    //     firstPollingTime:'',
    //     pollingType:'',
    //     pollingIsAggre:'',
    //     message: "巡检计划数据",
    //     msg: false,
    //     notnull: false
    //   };
    // },
    // created(){
    //   this.select();
    // },
    // methods: {
    //   edit1: function (equipmentID) {
    //     if (equipmentID === "") {
    //       this.notnull = true;
    //     } else {
    //       this.$http
    //         .post(
    //           "/polling/WYConfirmPollingPlan",
    //           {
    //             equipmentId:equipmentID,
    //             isAgree: 1,
    //           },
    //           {
    //             headers: {
    //               'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
    //               'Content-Type': 'application/json'
    //             }
    //           },
    //           {
    //             emulateJSON: true,
    //
    //           }
    //         )
    //         .then(res => {
    //           if (res.data.code == "1") {
    //             window.localStorage.setItem(
    //               "equipment",
    //               JSON.stringify(res.data.token)
    //             );
    //
    //             this.$router.replace("/devicePCBlack");
    //           } else {
    //             this.$router.push({
    //               path: "/"
    //             });
    //             this.msg = true;
    //             console.log("this is fail", res);
    //           }
    //         })
    //         .catch(err => {
    //           this.$notify({
    //             title: "同意失败",
    //             message: "服务器请求失败，请检查网络或联系管理员",
    //             type: "error"
    //           });
    //           console.log(err);
    //         });
    //     }
    //   },
    //   edit2: function (equipmentID) {
    //     if (equipmentID === "") {
    //       this.notnull = true;
    //     } else {
    //       this.$http
    //         .post(
    //           "/polling/WYConfirmPollingPlan",
    //           {
    //             equipmentId:equipmentID,
    //             isAgree: 2,
    //           },
    //           {
    //             headers: {
    //               'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
    //               'Content-Type': 'application/json'
    //             }
    //           },
    //           {
    //             emulateJSON: true,
    //
    //           }
    //         )
    //         .then(res => {
    //           if (res.data.code == "1") {
    //             window.localStorage.setItem(
    //               "equipment",
    //               JSON.stringify(res.data.token)
    //             );
    //             this.$router.replace("/devicePCBlack");
    //           } else {
    //             this.$router.push({
    //               path: "/"
    //             });
    //             this.msg = true;
    //             console.log("this is fail", res);
    //           }
    //         })
    //         .catch(err => {
    //           this.$notify({
    //             title: "不同意失败",
    //             message: "服务器请求失败，请检查网络或联系管理员",
    //             type: "error"
    //           });
    //           console.log(err);
    //         });
    //     }
    //   },
    //   select: function () {
    //     this.elementId = this.$route.params.elementId;
    //     this.$http
    //       .post(
    //         "/equipment/findById",
    //         {
    //           id: this.elementId,
    //         },
    //         {
    //           headers: {
    //             'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
    //             'Content-Type': 'application/json'
    //           }
    //         },
    //         {}
    //       )
    //       .then(res => {
    //         console.log("巡检计划",res);
    //         if (res.data.code === "1") {
    //           window.localStorage.setItem(
    //             "repair",
    //             JSON.stringify(res.data.token)
    //           );
    //           this.data = res.data.data;
    //           this.id = this.data.id;
    //           this.firstPollingTime = this.data.firstPollingTime;
    //           this.pollingType = this.data.pollingType;
    //           if(this.data.pollingIsAggre == '1'){
    //             this.pollingIsAggre = '已通过';
    //           }else if(this.data.pollingIsAggre == '2'){
    //             this.pollingIsAggre = '未通过';
    //           }else{
    //             this.pollingIsAggre = '未审核';
    //           }
    //
    //         } else {
    //           this.$router.push({
    //             path: "/"
    //           });
    //           this.msg = true;
    //           console.log("this is fail", res);
    //         }
    //       })
    //       .catch(err => {
    //         this.$notify({
    //           title: "获取巡检计划失败",
    //           message: "服务器请求失败，请检查网络或联系管理员",
    //           type: "error"
    //         });
    //         console.log(err);
    //       });
    //   }
    // }
    data() {
      return {
        data1:[],
        search: '',
        message: "巡检工单信息数据",
        msg: false,
        notnull: false
      }
    },
    created(){
      this.select();
    },
    methods: {
      select: function () {
        this.$http.post(
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
            if (res.data.code === "1") {
              window.localStorage.setItem(
                "xjgd",
                JSON.stringify(res.data.token)
              );
              console.log("this is success", res);
              this.data1 = res.data.data;
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
