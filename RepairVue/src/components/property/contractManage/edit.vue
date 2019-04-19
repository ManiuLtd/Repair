<!--合同编辑-->
<template>
  <div id="editWy">
    <van-row class="header" type="flex" justify="space-between" style="">
    <van-col span="4">
    <router-link to="/contract/index">
    <van-icon name="arrow-left" size="1em" color="white"/>
    </router-link>
    </van-col>
    <van-col span="8" offset="2">合同编辑</van-col>
    <van-col span="6"></van-col>
    </van-row>
    <div class="content">
      <!--equipmentAdd-->
      <div style="margin-top:0.3rem;">
        <el-form ref="form">
          <el-form-item label="维保企业">
            <el-input  v-model="wbqy" readonly/>
          </el-form-item>
          <el-form-item label="合同内容">
            <el-input  v-model="content"/>
          </el-form-item>
          <el-form-item label="开始日期">
            <el-input  v-model="startDate" type="date"/>
          </el-form-item>
          <el-form-item label="结束日期">
            <el-input  v-model="endDate" type="date"/>
          </el-form-item>
          <el-form-item label="负责人">
            <el-input  v-model="fuzeren"/>
          </el-form-item>
          <!--<el-form-item label="付款方式">-->
            <!--<el-input  v-model="fukuanfangshi"/>-->
          <!--</el-form-item>-->
          <el-form-item label="付款方式">
            <el-input class="input-group" v-model="fukuanfangshi" placeholder="付款方式">
            </el-input>
          </el-form-item>

          <el-form-item label="付款时间">
            <el-input  v-model="fukuanshijian" type="date"/>
          </el-form-item>
          <el-form-item style="width: 80%">
            <el-button type="warning" class="input-group btn-login" size="medium" @click="edit(data.id)">编辑合同</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "add",
    data() {
      return {
        data:'',
        wbqy: '',
        content: '',
        startDate: '',
        username:'',
        endDate: '',
        fuzeren: '',
        fukuanfangshi: '',
        fukuanshijian: '',
        message: "合同信息数据",
        msg: false,
        notnull: false,
        wbqyuser:''

      };
    },
    created(){
      this.select();
    },
    methods: {
      select: function () {
        this.contractId = this.$route.params.contractId;
        this.$http
          .post(
            "/user/findContractById/",
            {
              'id': this.contractId,
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
            console.log("合同",res);
            if (res.data.code === "1") {
              window.localStorage.setItem(
                "contract",
                JSON.stringify(res.data.token)
              );
              this.data = res.data.data;
              this.wbqy = this.data.wbqy.name;
              this.wbqyuser = this.data.wbqy.username;
              this.content = this.data.content;
              this.startDate = this.data.startDate;
              this.endDate = this.data.endDate;
              this.fuzeren = this.data.fuzeren;
              this.fukuanfangshi = this.data.fukuanfangshi;
              this.fukuanshijian = this.data.fukuanshijian;
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
              title: "获取合同信息失败",
              message: "服务器请求失败，请检查网络或联系管理员",
              type: "error"
            });
            console.log(err);
          });
      },
      edit: function (contractID) {
        // 网络请求延迟界面
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        if (contractID === "") {
          this.notnull = true;
        } else {
          this.$http
            .post(
              "/user/addContract",
              {
                id:contractID,
                wbqy: this.wbqyuser,
                content: this.content,
                startDate: new Date(this.startDate).getTime(),
                endDate: new Date(this.endDate).getTime(),
                fuzeren: this.fuzeren,
                fukuanfangshi: this.fukuanfangshi,
                fukuanshijian: new Date(this.fukuanshijian).getTime()
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
              console.log("编辑成功",res);
              loading.close();
              if (res.data.code === "1") {
                this.$toast.success('编辑成功');
                window.localStorage.setItem(
                  "contract",
                  JSON.stringify(res.data.token)
                );
                this.$router.replace("/contractBlack");

              } else {
                this.$toast.fail('编辑失败');
                this.$router.push({
                  path: "/"
                });
                this.msg = true;
                console.log("this is fail", res);
              }
            })
            .catch(err => {
              this.$notify({
                title: "编辑失败",
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
    margin: 0 5%;
  }
</style>
