<template>
  <!--使网页的div高度满屏的方法：直接给div的高度设成  height:100vh，即可用让div的高度是视窗的高度了-->
  <!--使网页的div宽度满屏的方法：直接给div的宽度设成width:100vw,即可将div的宽度设成视窗的宽度-->
  <div id="repairListFixer" style="height: 100vh;background-color: whitesmoke">
    <van-row type="flex" justify="space-between" class="header" style="position: fixed;top: 0;">
      <van-col span="4">
        <router-link to="/worker">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="8" offset="2">已确认</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <div style="background-color: whitesmoke;margin-top: 3em">
      <div class="listCon container-fluid"
           style="width: 93%;background-color: white;display: inline-block;text-align: center;border-radius: 5px;margin-top: 1em;font-size: 0.3rem;padding: 1em 0.8em;color: #989898;"
           v-for="list in listData" @click="toSign(list)" v-if="list.state == 2 || list.state == 1">
        <van-row type="flex">
          <van-col span="12" style="text-align: left">维修状态：<span v-html="list.state <= 2 ? isSure:isNo"></span>
          </van-col>
        </van-row>
        <!--<div class="row">-->
        <!--<div class="col-xs-4 col-sm-4">维修状态：<span v-html="list.state == 2 ? isSure:isNo"></span></div>-->
        <!--</div>-->
        <div class="row" style="text-align: left;margin-top: 10px">
          <div class="col-xs-12 col-sm-12">报修时间：<span>{{list.startTime}}</span></div>
        </div>
        <p style="text-align: left;margin-top: 10px">设备名称：<span>{{list.equipment.name}}</span></p>
        <p style="text-align: left;margin-top: 10px">物业名称：<span>{{list.equipment.wy.name}}</span></p>
        <span style="position: relative;float:left;overflow: hidden;color: #989898;">故障描述：<span>{{list.miaoshu}}</span>
      </span>
        <el-button type="warning" plain size="mini">点击查看</el-button>
      </div>
    </div>


  </div>

</template>
<script>
  export default {
    data() {
      return {
        listData: '',
        isSure: '已确认',
        isNo: '未确认',
        visible: false
      }
    },
    methods: {
      toSign(v) {
        this.$router.replace({name: 'sign', query: {listToSign: v}});
      },
      // 发起网络请求
      getListData() {
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/actionLog/findByWxgUsername", {}, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          console.log("被派维修工单", res);
          this.listData = res.data.data;
        }).catch((error) => {
          console.log(error);
        })
      }
    },
    created() {
      this.getListData();
    }
  }
</script>
<!--有个有趣的现象：在worker.vue里style后加scoped无法显示背景图片，而在这个里面不加scoped无法显示背景图片-->
<style>

</style>
