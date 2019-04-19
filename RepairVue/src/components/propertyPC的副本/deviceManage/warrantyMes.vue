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
                <h2>一键报修详情页面</h2>
              </div>
              <el-form ref="form" label-width="80px">
                <el-form-item label="设备编号">
                  <el-input  v-model="code" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="设备名称">
                  <el-input  v-model="name" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="设备属性">
                  <el-input  v-model="isTeZhongSheBei" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="设备类型">
                  <el-input  v-model="type" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="设备描述">
                  <el-input  v-model="miaoshu" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="规格型号">
                  <el-input  v-model="version" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="设备地址">
                  <el-input  v-model="address" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="归属部门">
                  <el-input  v-model="bumeng" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="维保单位">
                  <el-input  v-model="id" disabled="disabled"/>
                </el-form-item>
                <!--<el-form-item label="报修描述">
                  <el-input  v-model="miaoshu" v-on:focus="errmiss"/>
                </el-form-item>-->
                <el-form-item>
                  <el-button type="primary" size="small" class="btn-login" @click="add(data.id) ">一键报修</el-button>
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
        id:'',
        data: [],
        code: '',
        name: '',
        isTeZhongSheBei: '',
        type: '',
        miaoshu: '',
        version: '',
        address: '',
        bumeng: '',
        message: "设备信息数据",
        msg: false,
        notnull: false
      };
    },
    created(){
      this.select();
    },
    methods: {
      add: function (equipmentId) {
        if (equipmentId === "" || this.miaoshu === "") {
          this.notnull = true;
        } else {
          this.$http
            .post(
              "/actionLog/repairs",
              {
                equipmentId: equipmentId,
                /*miaoshu: this.miaoshu*/
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
                  "warranty",
                  JSON.stringify(res.data.token)
                );
                this.data = res.data.data;
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
                title: "一键报修失败",
                message: "服务器请求失败，请检查网络或联系管理员",
                type: "error"
              });
              console.log(err);
            });
        }
      },
      select: function () {
        this.elementId = this.$route.params.elementId;
        this.$http
          .post(
            "/equipment/findById/",
            {
              id: this.elementId,
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
                "element",
                JSON.stringify(res.data.token)
              );
              this.data = res.data.data;
              this.code = this.data.code;
              this.name = this.data.name;
              this.isTeZhongSheBei = this.data.isTeZhongSheBei;
              this.type = this.data.type;
              this.miaoshu = this.data.miaoshu;
              this.version = this.data.version;
              this.address = this.data.address;
              this.bumeng = this.data.bumeng;
              this.id = this.data.wbqy.id;
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
              title: "获取设备信息失败",
              message: "服务器请求失败，请检查网络或联系管理员",
              type: "error"
            });
            console.log(err);
          });
      },
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
  .content {
    margin: 5%;
  }
</style>
