<!--合同详情-->
<template>
  <div id="withWy">
    <van-row class="header" type="flex" justify="space-between" style="">
      <van-col span="4">
        <router-link to="/contract/index">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="8" offset="2">合同详情</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <div class="content">
      <!--equipmentAdd-->
      <div style="margin-top:0.3rem;">
        <el-form ref="form" disabled="">
          <el-form-item label="维保企业">
            <el-input  v-model="wbqy"/>
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
          <el-form-item label="支付方式">
            <el-input v-model="fukuanfangshi" style="">
            </el-input>
          </el-form-item>

          <el-form-item label="付款时间">
            <el-input  v-model="fukuanshijian" type="date"/>
          </el-form-item>

        </el-form>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "select",
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
        notnull: false
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
            if (res.data.code === "1") {
              window.localStorage.setItem(
                "contract",
                JSON.stringify(res.data.token)
              );
              this.data = res.data.data;
              this.wbqy = this.data.wbqy.name;
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
