<template>
  <div id="Notice" style="background-color: white;">
    <van-row type="flex" class="header" justify="space-between">
      <van-col span="4">
        <router-link to="company">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="8" offset="2">公告管理</van-col>
      <van-col span="5" offset="2">
        <div style="color:white;"><router-link to="/addNotice"><van-icon name="add-o" size="0.4rem" style="line-height: 0.8rem;color:white"></van-icon></router-link></div>
      </van-col>
    </van-row>
    <div v-for="(noti,index) in notice" :key=index v-if="!showNotice[index]" style="font-size: 0.3rem">
      <van-row>
        <van-col span="1" offset="1" style="text-align: right">
          <div style="height: 3em;">
            <img src="../../assets/Company/icon_fill_.png" alt="" style="width: 2em;margin-top: 0.5em">
          </div>
        </van-col>
        <van-col span="19">
          <div  @click="open(noti.text)">
            <van-notice-bar :text="noti.text" background="white" color="black" style="padding:0;width: 100%;"/>
          </div>
        </van-col>
        <van-col span="2" offset="1">
          <div style="height: 3em;" @click="deleteNotice(noti,index)">
            <van-icon name="close" size="1em" style="font-weight: bold;margin-top: 1em"/>
          </div>
        </van-col>
      </van-row>

    </div>

  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    data(){
      return{
        showNotice:[],
        notice:''
      }
    },
    methods:{
      open(v) {
        this.$alert(v, '公告',{center: true})
      },
      deleteNotice(v,index){
        // 删除公告
        this.$http.post("/notice/delNotice",{
          "id":v.id
        },{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          console.log("删除公告",res);
          Vue.set(this.showNotice,index,true);
        }).catch((error)=>{
          console.log(error);
        })
      },
      // 发起网络请求,查询所有公告
      getNoticeData(){
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/notice/findNotice",{},{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          console.log("查询公告",res);
          this.notice = res.data.data
        }).catch((error)=>{
          console.log(error);
        })
      }
    },
    created(){
      // 初始化调用网络请求方法
      this.getNoticeData();
    }
  }
</script>
<style>

  .el-message-box--center{
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
</style>
