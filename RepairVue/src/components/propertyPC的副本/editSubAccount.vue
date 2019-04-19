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
                <h2>设置子账号状态</h2>
              </div>
              <el-form ref="form" label-width="80px">
                <el-form-item label="用户名">
                  <el-input v-model="username" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="名称">
                  <el-input v-model="name" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input v-model="miaoshu" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="是否正常">
                  <el-input  v-model="isEnable" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="联系电话">
                  <el-input  v-model="phone" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input  v-model="email" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="省份">
                  <el-input  v-model="province" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="城市">
                  <el-input  v-model="city" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="头像">
                  <el-input  v-model="headPic" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="添加时间">
                  <el-input  v-model="addTime" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="禁止时间">
                  <el-input  v-model="forbiddenTime" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="物业">
                  <el-input  v-model="wy" disabled="disabled"/>
                </el-form-item>
              </el-form>
              <el-button type="primary" class="input-group btn-login" @click="Edit(data.id)">提交编辑信息</el-button>
              <el-button type="primary" class="input-group btn-login" @click="del(data.id)">删除子账号</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import three from './three'
  export default {
    components:{
      three
    },
    data() {
      return {
        username: '',
        name: '',
        miaoshu: '',
        isEnable: '',
        addTime: '',
        forbiddenTime: '',
        wy: '',
        message: "编辑物业子账号信息数据",
        loading: false,
        msg: false,
        notnull: false
      };
    },

    methods: {
      errmiss: function () {
        if (this.msg === true || this.notnull === true) {
          this.msg = false;
          this.notnull = false;
        }
      },

      Edit: function () {
        if (this.text === "") {
          this.notnull = true;
        } else {
          console.log("the msg is ", this.username)
          this.$http
            .post(
              "/notice/addNotice",
              {
                text: this.text
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
                  "announce",
                  JSON.stringify(res.data.token)
                );
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
                title: "添加失败",
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
