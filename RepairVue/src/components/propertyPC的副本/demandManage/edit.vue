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
                <h2>编辑公告</h2>
              </div>
              <el-form ref="form" label-width="80px">
                <el-form-item label="标题">
                  <el-input v-model="title"/>
                </el-form-item>
                <el-form-item label="内容">
                  <el-input v-model="content"/>
                </el-form-item>
                <!--<el-form-item label="图片">
                  <el-input v-model="pic"/>
                </el-form-item>-->
                <!--<el-form-item label="限定区域">
                  <el-radio-group v-model="sizeForm.resource" size="medium">
                    <el-radio border label="省份"></el-radio>
                    <el-radio border label="市"></el-radio>
                  </el-radio-group>
                </el-form-item>-->
                <el-form-item label="区域">
                  <el-input v-model="area"/>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="input-group btn-login" @click="edit(data.id)">编辑需求</el-button>
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
    name: "add",
    data() {
      return {
        data:'',
        content: '',
        title: '',
        area: '',
        message: "需求信息数据",
        msg: false,
        notnull: false
      };
    },
    created(){
      this.select();
    },
    methods: {
      select: function () {
        this.demandId = this.$route.params.demandId;
        this.$http
          .post(
            "/auction/findRequirementById",
            {
              'id': this.demandId,
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
                "demand",
                JSON.stringify(res.data.token)
              );
              this.data = res.data.data;

              this.title = this.data.title;
              this.content = this.data.content;
              this.area = this.data.area;
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
              title: "获取需求信息失败",
              message: "服务器请求失败，请检查网络或联系管理员",
              type: "error"
            });
            console.log(err);
          });
      },
      edit: function (demandID) {
        if (demandID === "") {
          this.notnull = true;
        } else {
          this.$http
            .post(
              "/auction/wyPublishRequirement",
              {
                id:demandID,
                title: this.title,
                content: this.content,
                area: this.area
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
                  "demand",
                  JSON.stringify(res.data.token)
                );
                this.$router.push({
                  path: "/demandPCBlack"
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
    margin: 5%;
  }
</style>
