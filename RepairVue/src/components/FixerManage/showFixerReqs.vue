<template>
  <div id="showFixerR" style="background-color: white;height: 86.5vh;">
    <van-cell-group>
    <van-field v-model="fixerData.username" placeholder="维修工号"
               label="账号"
               left-icon="contact"
               style=""
    />
  </van-cell-group>
    <van-cell-group>
      <van-field v-model="fixerData.username"
                 placeholder="密码"
                 label="密码"
                 left-icon="edit"
      />
    </van-cell-group>
    <van-button type="default" @click="getFixerReq" style="margin-top: 20px">生成维修工号</van-button>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        fixerData:''
      }
    },
    methods:{
      // 发起网络请求
      getFixerReq(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/user/insertWXG",{},{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          loading.close();
          if(res.data.code == 1){
            this.$toast.success("获取成功");
            console.log("111",res);
            this.fixerData = res.data.wxg;
          }

        }).catch((error)=>{
          console.log(error);
        })
      }
    }
  }
</script>
<style scoped>
  .van-field .van-cell__title{
    max-width: 1rem;
    margin-right: 2em;
  }
</style>
