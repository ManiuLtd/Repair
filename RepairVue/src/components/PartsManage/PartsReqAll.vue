<template>
  <div id="partsReqA">
    <div style="margin-bottom: 0.1rem;font-size: 0.3rem">
      <router-link to="/partsManage/partsReq" class="backReq"
                   style="color: darkgoldenrod;border-bottom: 1px solid darkgoldenrod">配件批示列表
      </router-link>
    </div>

    <!--<div class="partsAllC">-->
    <!--<div class="parts-A-con" v-for="partA in partsReqAllName">-->
    <!--<van-cell-group>-->
    <!--&lt;!&ndash;数据绑定设置项目标题&ndash;&gt;-->
    <!--<van-cell :title="partA"/>-->
    <!--</van-cell-group>-->
    <!--</div>-->
    <!--</div>-->
    <div class="container-fluid" v-for="(part,index) in partsReqAllName">
      <van-row style="text-align: left">
        <van-col span="13">申请人：<span>{{part.user.name}}</span></van-col>
      </van-row>
      <van-row style="text-align: left;">
        <van-col span="18">
          申请时间：<span>{{part.applicationTime}}</span>
        </van-col>
      </van-row>

      <van-row style="text-align: left;">
        <van-col span="13">申请配件：<span>{{part.parts.name}}</span></van-col>
      </van-row>
      <van-row>
        <p style="color: red;text-align: right">{{state[part.type]}}</p>
      </van-row>
      <!--后台没写这个信息-->
      <!--<p style="text-align: left;margin-top: 0.5rem">应用项目：<span>{{part.actionLog.id}}号工单</span></p>-->
    </div>


  </div>
</template>
<script>
  export default {
    data() {
      return {
        partsReqAllName: '',
        state:[
          "",
          "待批示",
          "通过",
          "未通过",
        ]
      }
    },
    methods: {
      // 发起网络请求
      getPartsReqAll() {
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/parts/wbqySelectAllPartsLog", {}, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          console.log("申请记录", res);
          this.partsReqAllName = res.data.data;
        }).catch((error) => {
          console.log(error);
        })
      }
    },
    created() {
      this.getPartsReqAll();
    }
  }
</script>
<style scoped>
  /*div.van-cell{*/
  /*font-size: 20px;*/
  /*}*/
  /*.partsAllC{*/
  /*position: relative;*/
  /*top: 30px;*/
  /*}*/
  /*.parts-A-con{*/
  /*width: 100%;*/
  /*height: 100px;*/
  /*box-shadow: 0 3px 3px 4px #ccc;*/
  /*margin-bottom: 8px;*/
  /*}*/
  /*.backReq{*/
  /*position: relative;*/
  /*left: -139px;*/
  /*top: 15px;*/
  /*}*/
  .container-fluid span {
    color: chocolate;
  }
</style>
