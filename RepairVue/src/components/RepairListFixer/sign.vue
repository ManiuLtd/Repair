<template>
  <div id="sign">
    <van-row type="flex" justify="space-between" class="header">
      <van-col span="4">
        <router-link to="/RepairListFixer/repairListFixer">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="8" offset="2">到达现场</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <div class="listCon"
         style="width: 100%;display: inline-block;text-align: center;border-radius: 5px;margin-top: 0.5em;font-size: 0.3rem;padding: 1em 1em;color: #989898;">
      <van-row type="flex">
        <van-col span="8" style="text-align: left">维修状态：</van-col>
        <van-col span="6"><span v-html="signData.state <= 2 ? isSure:isNo"></span></van-col>
      </van-row>
      <!--<div class="row">-->
      <!--<div class="col-xs-6 col-sm-6">维修状态：<span v-html="signData.state <= 2 ? isSure:isNo"></span></div>-->
      <!--</div>-->
      <div class="row" style="text-align: left;margin-top: 0.8em">
        <div class="col-xs-12 col-sm-12">报修时间：<span>{{signData.startTime}}</span></div>
      </div>
      <p style="text-align: left;margin-top: 0.8em">设备名称：<span>{{signData.equipment.name}}</span></p>
      <p style="text-align: left;margin-top: 0.8em">物业名称：<span>{{signData.equipment.wy.name}}</span></p>
      <!--<p style="text-align: left;margin-top: 0.8em">维修情况反馈：<span>{{signData.fankui}}</span></p>-->
      <span
        style="position: relative;float:left;overflow: hidden;color: #989898;">故障描述：<span>{{signData.miaoshu}}</span>
      </span>
      <p style="margin-top: 3em">
        <van-cell-group>
          <van-field
            v-model="message"
            label="维修情况反馈："
            type="textarea"
            placeholder="请输入"
            rows="2"
            autosize
            style="text-align: left;padding-left: 0;padding-top: 0;"
          />
        </van-cell-group>
      </p>

    </div>

    <van-button size="large" round @click="postId">扫码</van-button>

    <van-button size="large" round @click="reqParts" class="one">申请配件</van-button>
    <van-button size="large" round @click="finish">维修完成</van-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        listData: '',
        signData: '',
        isSure: '已确认',
        isNo: '未确认',
        message:''
      }
    },

    methods: {
      // destroy(){
      //   QRScanner.destroy(function(status){
      //     console.log(status);
      //   });
      // },
      getSign() {
        this.signData = this.$route.query.listToSign;
        console.log("传过来了", this.signData);
      },

      postId() {
        this.$router.replace({name: 'saoma', query: {toId: this.signData.id}});
        // QRScanner.prepare(onDone);
      },
      reqParts() {
        this.$router.replace({name: 'selectParts', query: {selectParts: this.signData.id}});

      },
      finish() {
        // console.log(this.signData.id);
        // 发起网络请求
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/actionLog/weiXiuWanCheng", {
          actionLogId: this.signData.id,
          wxfankui:this.message
        }, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            this.$toast.success('维修完成');
            console.log("签到", res.data.code);
          } else {
            this.$toast.fail('请先签到');
          }
          console.log("完成", res);
          this.listData = res.data.data;
        }).catch((error) => {
          console.log(error);
        })
      }
    },
    created() {
      this.getSign();
      // QRScanner.destroy();
      // this.destroy();
      // QRScanner.cancelScan();
      // $("html").css("background","white");

    }
  }
</script>
<style>
</style>
