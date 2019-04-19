<template>
  <div id="contentA" style="">
    <div class="header" style="">
      维保企业端
    </div>

    <van-swipe :autoplay="3000" style="height: 10em;margin-top: -1px">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" style="width: 100%;height: 100%;" @click="img(image)"/>
      </van-swipe-item>
    </van-swipe>

    <van-notice-bar :scrollable="true"
                    :text="'公告：'+text"
                    style="height: 2em;"/>

    <div>
      <van-row style="margin-top: 1em">
        <van-col span="8">
          <router-link to="/managePro">
            <img src="../assets/Company/proman.png" style="width: 5.5em;height :5.5em"/>
            <div style="">项目管理</div>
          </router-link>
        </van-col>
        <van-col span="8">
          <router-link to="/repairList">
            <img src="../assets/Company/order.png" style="width: 5.5em;height :5.5em"/>
            <el-badge :value="RepairNum" :max="99" :hidden="RepairNum==0?true:false">维修工单</el-badge>
          </router-link>

        </van-col>
        <van-col span="8">
          <router-link to="/checkPlan/selectWy">
            <img src="../assets/Company/plan.png" style="width: 5.5em;height :5.5em"/>
            <div style="">巡检计划</div>
          </router-link>

        </van-col>
      </van-row>
      <van-row style="margin-top: 1.4em">
        <van-col span="8">
          <router-link to="/fixerManage">
            <img src="../assets/Company/worker.png" style="width: 5.5em;height :5.5em"/>
            <div style="">维修工管理</div>
          </router-link>
        </van-col>
        <van-col span="8">
          <router-link to="/partsManage">
            <img src="../assets/Company/storage.png" style="width: 5.5em;height :5.5em"/>
            <div style="">配件管理</div>
          </router-link>

        </van-col>
        <van-col span="8">
          <router-link to="/bidding">
            <img src="../assets/Company/require.png" style="width: 5.5em;height :5.5em"/>
            <div style="">竞价抢修</div>
          </router-link>

        </van-col>
      </van-row>
      <van-row style="margin-top: 1.4em">
        <van-col span="8">
          <router-link to="/notice">
            <img src="../assets/Company/msg.png" style="width: 5.5em;height :5.5em"/>
            <div style="">公告管理</div>
          </router-link>

        </van-col>
        <van-col span="8">
          <router-link to="/countCenter/equipment">
          <img src="../assets/Company/more1.png" style="width: 5.5em;height :5.5em"/>
          <div style="">统计中心</div>
          </router-link>
        </van-col>
        <van-col span="8">
          <router-link to="/backMessageWBQY">
          <img src="../assets/Company/repair.png" style="width: 5.5em;height :5.5em"/>
          <div style="">投诉反馈</div>
          </router-link>
        </van-col>

      </van-row>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        images: [
          // 如果把图片放在assets与static中，html页面可以使用；但在动态绑定中，assets路径的图片会加载失败，因为webpack使用的是commenJS规范，必须使用require才可以
          require('../assets/Company/wbqy1.png'),
          require('../assets/Company/wbqy2.png'),
        ],
        active: 0,
        notice:"",
        text:'',
        RepairNum:'',
      }

    },
    methods:{
      img(v){
        console.log("img",v);
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
          // this.notice = res.data.data[res.data.data.length-1];
          this.notice = res.data.data;
          for(this.i = 0;this.i<this.notice.length; this.i++){
            this.text += this.notice[this.i].text+'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0';
          }
          console.log(this.notice);
        }).catch((error)=>{
          console.log(error);
        });
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // 查询所有未处理工单
        this.$http.post("/actionLog/selectAllActionLogByWBQYNameAndstate",{
          "state":"4"
        },{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          console.log("未处理维修工单",res);
          // this.RepairList = res.data.data;
          this.RepairNum = res.data.data.length;
        }).catch((error)=>{
          console.log(error);
        });
      }
    },
    created(){
      // this.active = 0;
      this.getNoticeData();
    }
  }
</script>
<style>
  /*在维保企业端第一个界面引入汇总好的css样式文件，之后的界面跳转样式还会保留，可以看作样式污染，节约代码。比较优雅*/
  @import "../assets/css/header.css";
  /*相同类名的样式渲染，后一次渲染会覆盖前一次渲染的效果*/
</style>
