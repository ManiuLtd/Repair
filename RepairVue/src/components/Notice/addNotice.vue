<template>
  <div id="addN">
    <div class="header" style="border-bottom: 1px solid gray">
      <van-row type="flex" class="header" justify="space-between">
        <van-col span="4">
          <router-link to="/notice">
            <van-icon name="arrow-left" size="1em" color="white"/>
          </router-link>
        </van-col>
        <van-col span="8" offset="2">添加公告</van-col>
        <van-col span="6"></van-col>
      </van-row>
    </div>
    <van-cell-group>
      <van-field
        v-model="message"
        label="公告内容"
        type="textarea"
        placeholder="请输入"
        rows="3"
        autosize
      />
    </van-cell-group>
    <van-button type="default" style="margin-top: 10px" @click="sendNotice">确定</van-button>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        message:''
      }
    },
    methods:{
      sendNotice(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http.post("/notice/addNotice",{
          "text":this.message
        },{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          loading.close();
          if(res.data.code == 1) {

            this.$toast.success('添加成功');
            this.$router.go(-1);
          }else {
              this.$toast.success('添加失败');
          }
          console.log("添加公告",res);

        }).catch((error)=>{
          loading.close();
          console.log(error);
        })
      }
    }
  }
</script>
<style scoped>
  .header{
    margin-bottom: 30px;
  }
  .van-nav-bar__left{
    font-size: 16px;
  }
  .van-nav-bar__title{
    font-size: 20px;
  }
  div.van-cell{
    font-size: 20px;
  }
  .van-swipe-cell{
    width: 100%;
    height: 100px;
    box-shadow: 0 3px 3px 4px #ccc;
    margin-bottom: 8px;
  }
  .van-notice-bar{
    margin-top: 5px;
  }
  div.van-cell{
    font-size: 15px;
  }
</style>
