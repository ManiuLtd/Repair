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
                <h2>合同详情</h2>
              </div>
              <el-form ref="form" label-width="80px">
                <el-form-item label="维保企业">
                  <el-input  v-model="wbqy" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="合同内容">
                  <el-input  v-model="content" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="开始日期">
                  <el-input  v-model="startDate" disabled="disabled" type="date"/>
                </el-form-item>
                <el-form-item label="结束日期">
                  <el-input  v-model="endDate" disabled="disabled" type="date"/>
                </el-form-item>
                <el-form-item label="负责人">
                  <el-input  v-model="fuzeren" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="付款方式">
                  <el-input  v-model="fukuanfangshi" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="付款时间">
                  <el-input  v-model="fukuanshijian" disabled="disabled" type="date"/>
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
              this.wbqy = this.data.wbqy.username;
              this.content = this.data.content;
              this.startDate = this.data.startDate;
              this.endDate = this.data.endDate;
              this.fuzeren = this.data.fuzeren;
              this.fukuanfangshi = this.data.fukuanfangshi;
              this.fukuanshijian = this.data.fukuanshijian;
              console.log("this.msg：",this.data)
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
