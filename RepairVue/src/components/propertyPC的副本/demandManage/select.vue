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
            <!--equipmentAdd-->
            <div style="margin-top:30px;padding:10px ;">
              <div class="title">
                <h2>报价详情</h2>
              </div>
              <el-form ref="form" label-width="80px">
                <el-form-item label="竞价的项目">
                  <el-input  v-model="requirement.title" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="报价内容">
                  <el-input  v-model="name" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="价格">
                  <el-input  v-model="price" disabled="disabled" type="date"/>
                </el-form-item>
                <el-form-item label="联系人">
                  <el-input  v-model="lianxiren" disabled="disabled" type="date"/>
                </el-form-item>
                <el-form-item label="联系人电话">
                  <el-input  v-model="phone" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="城市">
                  <el-input  v-model="city" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="附件url">
                  <el-input  v-model="fujianurl" disabled="disabled" type="date"/>
                </el-form-item>
                <el-form-item label="报价的维保企业">
                  <el-input  v-model="wbqy" disabled="disabled" type="date"/>
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
        requirement:'',
        name:'',
        price:'',
        lianxiren: '',
        phone: '',
        city: '',
        fujianurl:'',
        message: "报价信息数据",
        msg: false,
        notnull: false
      };
    },
    created(){
      this.select();
    },
    methods: {
      select: function () {
        this.quoteId = this.$route.params.quoteId;
        this.$http
          .post(
            "/auction/findAuctionById/",
            {
              'id': this.quoteId,
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
              this.requirement = this.data.requirement;
              this.name = this.data.name;
              this.price = this.data.price;
              this.lianxiren = this.data.lianxiren;
              this.phone = this.data.phone;
              this.city = this.data.city;
              this.fujianurl = this.data.fujianurl;
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
              title: "获取报价信息失败",
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
