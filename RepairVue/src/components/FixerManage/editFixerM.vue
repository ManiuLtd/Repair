<template>
  <div id="editFixerM">
    <van-row type="flex" class="header" justify="space-between">
      <van-col span="4">
        <router-link to="/fixerManage/editFixerMessage">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="8" offset="2">{{fixerName}}</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <van-cell-group style="">
      <van-field
        clearable
        v-model="fixerId"
        disabled
        label="维修工号："
      />
      <van-field
        clearable
        v-model="fixerUsername"
        label="账号："
      />
      <van-field
        label="密码："
        v-model="fixerPassword"
      />
      <van-field
        clearable
        v-model="fixerName"
        label="姓名："
      />
      <van-field
        clearable
        v-model="fixerPhone"
        label="电话："
      />
      <van-field
        clearable
        v-model="fixerEmail"
        label="email："
      />

    </van-cell-group>
    <van-button size="normal" type="default" style="margin-left: -0.2rem;margin-top: 1em" @click="submit">修改</van-button>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        fixerM:'',
        fixerId: '',
        fixerUsername:'',
        fixerPassword: '',
        fixerName: '',
        fixerPhone:'',
        fixerEmail: '',
        show:false
      }
    },
    methods:{
      submit(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        this.$http.post("/user/wbqyupdateWXG",{
          "id":this.fixerId,
          "username":this.fixerUsername,
          "password":this.fixerPassword,
          "name":this.fixerName,
          "email":this.fixerEmail,
          "phone":this.fixerPhone

        },{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          loading.close();
          if(res.data.code == 1){
            this.$toast.success('修改成功');
            console.log("111",res);
            this.show = true;
          }else{
            this.$toast(res.data.msg);

          }

        }).catch((error)=>{
          console.log(error);
        })
      },
      getFixerM(){
          this.fixerM = this.$route.query.fixerM;
          this.fixerUsername = this.fixerM.username;
          this.fixerId = this.fixerM.id;
          this.fixerPassword = this.fixerM.password;
          this.fixerName = this.fixerM.name;
          this.fixerEmail = this.fixerM.email;
          this.fixerPhone = this.fixerM.phone;

      },
      // 点击返回到上个组件
      clickH(){
        this.$router.replace({path:'/fixerManage/editFixerMessage'});
      }
    },
    created(){
      this.getFixerM();
    }

  }
</script>
<style>
  .van-field{
    margin-top: 0.2rem;
  }
</style>
