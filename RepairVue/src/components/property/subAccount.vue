<template>
  <div id="childWy">
    <van-row class="header" type="flex" justify="space-between" style="">
      <van-col span="4">
        <router-link to="/GenerateSubAccount">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="10" offset="2">子账号详情</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <div class="content">
      <div style="">
        <el-form ref="form">
          <el-form-item label="用户名">
            <el-input v-model="username" disabled="disabled"/>
          </el-form-item>
          <el-form-item label="密码">
            <el-input  v-model="password" disabled="disabled"/>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="name" disabled="disabled"/>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="miaoshu" disabled="disabled"/>
          </el-form-item>
          <el-form-item label="是否正常">
            <el-input  v-model="state[isEnable]" disabled="disabled"/>
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
        <!--<el-button type="primary" class="input-group btn-login" @click="add(data.id)">删除子账号</el-button>-->
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        name: '',
        miaoshu: '',
        isEnable: '',
        phone: '',
        email: '',
        province: '',
        city: '',
        headPic: '',
        addTime: '',
        forbiddenTime: '',
        wy: '',
        message: "物业子账号信息数据",
        msg: false,
        notnull: false,
        state:[
          '不可用',
          '可用',
          '被管理员禁用',
          '免费使用',
        ]
      };
    },
    created(){
      this.select()
    },
    methods: {
      select: function () {
        this.subAccountId = this.$route.params.subAccountId;
        this.$http
          .post(
            "/user/WYfindByID",
            {id: this.subAccountId},
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
            console.log("子账号",res);
            if (res.data.code === "1") {
              window.localStorage.setItem(
                "subAccount'",
                JSON.stringify(res.data.token)
              );
              this.data = res.data.data;
              this.username = this.data.username;
              this.password = this.data.password;
              this.name = this.data.name;
              this.miaoshu = this.data.miaoshu;
              this.isEnable = this.data.isEnable;
              this.phone = this.data.phone;
              this.email = this.data.email;
              this.province = this.data.province;
              this.city = this.data.city;
              this.headPic = this.data.headPic;
              this.addTime = this.data.addTime;
              this.forbiddenTime = this.data.forbiddenTime;
              this.wy = this.data.wy.name;
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
    },
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
