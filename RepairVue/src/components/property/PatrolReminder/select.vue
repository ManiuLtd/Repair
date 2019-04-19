<template>
  <div id="selectList">
    <van-row class="header" type="flex" justify="space-between" style="">
      <van-col span="4">
        <router-link to="/PatrolReminder/index">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="8" offset="2">确认巡检</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <div class="content">
      <div style="">
        <el-form ref="form">
          <el-form-item label="设备名称">
            <el-input v-model="name"/>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input  v-model="creationTime"/>
          </el-form-item>
          <el-form-item label="完成时间">
            <el-input  v-model="pollingTime"/>
          </el-form-item>
          <el-form-item label="巡检时间">
            <el-input  v-model="pollingTime"/>
          </el-form-item>
          <el-form-item label="下次巡检时间">
            <el-input  v-model="nextPollingTime"/>
          </el-form-item>
          <el-form-item label="巡检类型">
            <el-input  v-model="type[PollingType-1]"/>
          </el-form-item>
          <el-form-item label="巡检照片">
            <img :src="pollingEndPicUrls" alt="" width="100%">
          </el-form-item>
          <!--<el-form-item label="巡检结构照片">-->
            <!--<el-input  v-model="pollingEndPicUrls"/>-->
          <!--</el-form-item>-->
          <el-form-item label="描述">
            <el-input  v-model="pollingMsg"/>
          </el-form-item>
          <el-form-item label="维修工">
            <el-input  v-model="wxg"/>
          </el-form-item>
          <el-form-item label="维保企业">
            <el-input  v-model="wbqy"/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="input-group btn-login" @click="edit(data.id)" v-html="button[wyAck==null ? 0 : wyAck==0? 0 : 1]" :disabled="wyAck==null ? false : wyAck==0? false : true"></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: "edit",
    data() {
      return {
        data:'',
        name:'',
        creationTime:'',
        nextPollingTime:'',
        WYAckTime:'',
        pollingTime:'',
        PollingType:'',
        pollingPicUrls:'',
        pollingEndPicUrls:'',
        pollingMsg:'',
        wxg:'',
        wbqy:'',
        wyAck:'',
        message: "设巡检工单信息数据",
        msg: false,
        notnull: false,
        type:[
          "周检",
          "月检",
          "季检",
          "年检",
        ],
        button:[
          '确认巡检结果',
          '已确认']
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
            console.log("确认巡检", res);
            if (res.data.code == "1") {
              window.localStorage.setItem(
                "element",
                JSON.stringify(res.data.token)
              );
              this.data = res.data.data;
              this.name = this.data.equipment.name;
              this.creationTime = this.data.creationTime;
              this.pollingTime = this.data.thisPollingTime;
              this.WYAckTime = this.data.WYAckTime;
              this.nextPollingTime = this.data.nextPollingTime;
              this.PollingType = this.data.pollingType;
              // this.pollingPicUrls = this.data.pollingPicUrls;
              this.pollingEndPicUrls = this.GLOBAL.BASE_URL+this.data.pollingEndPicUrls;
              this.pollingMsg = this.data.pollingMsg;
              this.wxg = this.data.wxg.name;
              this.wbqy = this.data.wbqy.name;
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
        // 网络请求延迟界面
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        if (pollingId === "") {
          this.notnull = true;
        } else {
          this.$http
            .post(
              "/polling/ackPollingResult",
              {
                'pollingId':pollingId
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
              console.log("确认成功"+res);
              loading.close();
              if (res.data.code === 1) {
                this.$toast.success('确认成功');
                window.localStorage.setItem(
                  "xjgd",
                  JSON.stringify(res.data.token)
                );

                this.$router.go(-1);
              } else {
                this.$toast.fail('确认失败');
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
