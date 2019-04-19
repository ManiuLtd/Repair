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
            <div style="margin-top:30px;padding:10px ;">

              <div class="title">
                <h2>确认巡检工单</h2>
              </div>
              <el-form ref="form" label-width="80px">
                <el-form-item label="设备名称">
                  <el-input v-model="name"/>
                </el-form-item>
                <el-form-item label="创建时间">
                  <el-input  v-model="creationTime"/>
                </el-form-item>
                <el-form-item label="完成时间">
                  <el-input  v-model="pollingTime"/>
                </el-form-item>
                <el-form-item label="确认时间">
                  <el-input  v-model="WYAckTime	"/>
                </el-form-item>
                <el-form-item label="第一次巡检时间">
                  <el-input  v-model="firstPollingTime"/>
                </el-form-item>
                <el-form-item label="巡检类型">
                  <el-input  v-model="PollingType"/>
                </el-form-item>
                <el-form-item label="巡检工单照片">
                  <el-input  v-model="pollingPicUrls"/>
                </el-form-item>
                <el-form-item label="巡检结构照片">
                  <el-input  v-model="pollingEndPicUrls"/>
                </el-form-item>
                <el-form-item label="巡检结果描述">
                  <el-input  v-model="pollingMsg"/>
                </el-form-item>
                <el-form-item label="巡检维修工">
                  <el-input  v-model="wxg"/>
                </el-form-item>
                <el-form-item label="维保企业">
                  <el-input  v-model="wbqy"/>
                </el-form-item>
                <el-form-item label="物业确认结果">
                  <el-input  v-model="wyAck"/>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="input-group btn-login" @click="edit(data.id)">确认巡检结果</el-button>
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
    name: "edit",
    data() {
      return {
        data:'',
        name:'',
        creationTime:'',
        pollingTime:'',
        WYAckTime:'',
        firstPollingTime:'',
        PollingType:'',
        pollingPicUrls:'',
        pollingEndPicUrls:'',
        pollingMsg:'',
        wxg:'',
        wbqy:'',
        wyAck:'',
        message: "设巡检工单信息数据",
        msg: false,
        notnull: false
      };
    },
    created(){
      this.select();
    },
    methods: {
      select: function () {
        this.xjgdId = this.$route.params.xjgdId;
        this.$http
          .post(
            "/polling/selectPollingLogById",
            {
              'pollingId': this.xjgdId,
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
            if (res.data.code == "1") {
              window.localStorage.setItem(
                "element",
                JSON.stringify(res.data.token)
              );
              this.data = res.data.data;
              this.name = this.data.equipment.name;
              this.creationTime = this.data.creationTime;
              this.pollingTime = this.data.pollingTime;
              this.WYAckTime = this.data.WYAckTime;
              this.firstPollingTime = this.data.firstPollingTime;
              this.PollingType = this.data.PollingType;
              this.pollingPicUrls = this.data.pollingPicUrls;
              this.pollingEndPicUrls = this.data.pollingEndPicUrls;
              this.pollingMsg = this.data.pollingMsg;
              this.wxg = this.data.wxg.name;
              this.wbqy = this.data.wbqy.username;
              this.wyAck = this.data.wyAck;
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
              title: "获取巡检工单信息失败",
              message: "服务器请求失败，请检查网络或联系管理员",
              type: "error"
            });
            console.log(err);
          });
      },
      edit: function (pollingId) {
        if (pollingId === "") {
          this.notnull = true;
        } else {
          console.log("the msg is1111 ", pollingId)
          this.$http
            .post(
              "/polling/ackPollingResult",
              {
                id:pollingId
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
                  "xjgd",
                  JSON.stringify(res.data.token)
                );

                this.$router.replace("/index");
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
                title: "确认失败",
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
