<template>
  <div id="historyList" style="background-color: whitesmoke;">
    <div style="margin-bottom: 3em">
      <van-row type="flex" class="header" justify="space-between" style="position: fixed;top: 0;">
        <van-col span="4">
          <router-link to="/checkPlan/selectWy">
            <van-icon name="arrow-left" size="1em" color="white"/>
          </router-link>
        </van-col>
        <van-col span="8" offset="1">历史巡检</van-col>
        <van-col span="4"></van-col>
      </van-row>
    </div>
    <div class="container-fluid" v-for="(rep,index) in checkList" style="margin-top: 1em">
      <van-row style="">
        <van-col span="8">计划巡检时间：</van-col>
        <van-col span="16"><span>{{rep.thisPollingTime.slice(0,10)}}</span></van-col>
      </van-row>
      <van-row style="margin-top: 1em" v-if="rep.pollingTime!==null">
        <van-col span="8">巡检完成时间：</van-col>
        <van-col span="16"><span>{{rep.pollingTime}}</span></van-col>
      </van-row>
      <van-row style="margin-top: 1em">
        <van-col span="8">下次巡检时间：</van-col>
        <van-col span="16"><span>{{rep.nextPollingTime.slice(0,10)}}</span></van-col>
      </van-row>

      <van-row style="margin-top: 1em">
        <van-col span="8">设备名称：</van-col>
        <van-col span="13" offset="2"><span>{{rep.equipment.name}}</span></van-col>
      </van-row>
      <van-row style="margin-top: 1em">
        <van-col span="8">巡检维修工：</van-col>
        <van-col span="13" offset="2"><span>{{rep.wxg.name}}</span></van-col>
      </van-row>
      <van-row style="margin-top: 1em">
        <van-col span="8">巡检类型：</van-col>
        <van-col span="13" offset="2"><span>{{type[rep.pollingType]}}</span></van-col>
      </van-row>
      <van-row v-if="rep.pollingEndPicUrls!==null">
        <van-col span="10">
          <img :src="GLOBAL.BASE_URL+rep.pollingEndPicUrls" alt="" style="width: 100%;margin-top: 1em;margin-left: 1em">
        </van-col>
      </van-row>
      <div style="margin-top: 1em">
        <van-row type="flex" justify="space-between">
          <van-col span="6" v-if="rep.wyAck==1">
            <span style="color: green;text-align: left">物业已确认</span>
          </van-col>
          <van-col span="6"></van-col>
          <van-col span="6">
            <span style="color: red">{{rep.pollingTime==null?'未完成':'已完成'}}</span>
          </van-col>
        </van-row>

      </div>

    </div>


  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    data() {
      return {
        wyId:'',
        checkList:'',
        type:[
          "",
          "周检",
          "月检",
          "季检",
          "年检",
        ],
      }
    },
    methods:{
      getRepairList(){
        this.wyId = this.$route.query.wyId;
        console.log("wuyeid"+this.wyId);
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        this.$http.post("/polling/selectPollingLogByWBQYAndWYId",{
          "wyId":this.wyId
        },{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          loading.close();
          console.log("巡检工单",res);
          this.checkList = res.data.data;
        }).catch((error)=>{
          console.log(error);
        });

      },
    },
    created(){
      this.getRepairList();
    }

  }
</script>
<style scoped>
  div.van-cell{
    font-size: 20px;
  }
  .van-swipe-cell{
    width: 100%;
    height: 100px;
    box-shadow: 0 3px 3px 4px #ccc;
    margin-bottom: 8px;
  }
  body{

  }
</style>
