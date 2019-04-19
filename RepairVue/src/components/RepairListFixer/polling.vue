<template>
  <div id="polling">
    <van-row type="flex" justify="space-between" class="header">
      <van-col span="4">
        <router-link to="/worker">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="8" offset="2">进行巡检</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <div style="background-color: whitesmoke;height: 100vh;">
      <div class="listCon container-confirm"
           style="width: 95%;background-color: white;display: inline-block;text-align: left;margin-top: 1em;font-size: 0.3rem;padding: 1em 0.8em;color: black;border-bottom: 1px solid whitesmoke"
           v-for="poll in pollData" v-if="poll.pollingTime == null">
        <van-row>
          <van-col span="8">受检企业：</van-col>
          <van-col span="13" offset="2"><span>{{poll.equipment.wy.name}}</span></van-col>
        </van-row>
        <van-row style="margin-top: 1em">
          <van-col span="8">巡检设备：</van-col>
          <van-col span="13" offset="2"><span>{{poll.equipment.name}}</span></van-col>
        </van-row>
        <van-row style="margin-top: 1em">
          <van-col span="10">首次巡检时间：</van-col>
          <van-col span="13"><span>{{poll.thisPollingTime}}</span></van-col>
        </van-row>
        <van-row style="margin-top: 1em">
          <van-col span="8">巡检类型：</van-col>
          <van-col span="13" offset="2">{{pollingType[poll.pollingType-1]}}</van-col>
        </van-row>
        <van-row style="margin-top: 1em">
          <!--<van-col span="6"><img :src="GLOBAL.BASE_URL+poll.pollingEndPicUrls" style="width: 100%">-->
          <!--</van-col>-->
          <van-col span="22" style="text-align: right;line-height:3em;">
            <router-link :to="{name:'submitPoll',params:{pollId:poll.id}}">
              <van-button type="warning" size="small">进行巡检</van-button>
            </router-link>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        pollData: '',
        pollingType: [
          '周检',
          '月检',
          '季检',
          '年检'
        ],
        is: "asdf"
      }
    },
    methods: {
      // 发起网络请求,查询巡检工单
      getPollData() {
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/polling/selectPollingLogByWXG", {}, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          console.log("巡检工单", res);
          this.pollData = res.data.data;
        }).catch((error) => {
          console.log(error);
        })
      }
    },
    created() {
      this.getPollData();
    }
  }

</script>
<style>

</style>
