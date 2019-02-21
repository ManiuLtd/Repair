<template>
  <div id="sign">
    <van-row type="flex" justify="center" style="height: 67px;background-color: darkgoldenrod;color: whitesmoke;font-size: 20px;font-weight: bold;line-height: 67px;letter-spacing:4px;">
      <van-col span="8">到达现场</van-col>
    </van-row>
    <div class="listCon container-fluid" style="width: 100%;display: inline-block;text-align: center;border-radius: 5px;margin-top: 10px;font-size: 16px;padding: 20px 15px;color: #989898;">
      <van-row type="flex">
        <van-col span="10">维修状态：：<span v-html="signData.state <= 2 ? isSure:isNo"></span></van-col>
      </van-row>
      <!--<div class="row">-->
        <!--<div class="col-xs-6 col-sm-6">维修状态：<span v-html="signData.state <= 2 ? isSure:isNo"></span></div>-->
      <!--</div>-->
      <div class="row" style="text-align: left;margin-top: 10px">
        <div class="col-xs-12 col-sm-12">报修时间：<span>{{signData.startTime}}</span></div>
      </div>
      <p style="text-align: left;margin-top: 10px">设备名称：<span>{{signData.equipment.name}}</span></p>
      <p style="text-align: left;margin-top: 10px">物业名称：<span>{{signData.equipment.wy.name}}</span></p>
      <span style="position: relative;float:left;overflow: hidden;color: #989898;">故障描述：<span>{{signData.miaoshu}}</span>
      </span>
      <span style="width: 75%;display: inline-block;"></span>
    </div>

      <van-button size="large" round @click="postId" >扫码</van-button>

    <van-button size="large" round @click="reqParts" class="one">申请配件</van-button>
    <van-button size="large" round @click="finish" type="warning">维修完成</van-button>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        listData:'',
        signData:'',
        isSure:'已确认',
        isNo:'未确认'
      }
    },

    methods:{

      getSign(){
        this.signData = this.$route.query.listToSign;
        console.log("传过来了",this.signData);
      },

      postId(){
        this.$router.push({name:'saoma',query:{toId:this.signData.id}});
        // QRScanner.prepare(onDone);
      },
      reqParts(){
        this.$router.push({name:'selectParts',query:{selectParts:this.signData.id}});

      },
      finish(){
        // console.log(this.signData.id);
        // 发起网络请求
          // 登录时，token被存在了localStorage里，现在直接调用它做请求头
          // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
          this.$http.post("/actionLog/weiXiuWanCheng",{
            actionLogId:this.signData.id
          },{
            headers: {
              'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
              'Content-Type': 'application/json'
            }
          }).then((res)=>{
            console.log("完成",res);
            this.listData = res.data.data;
          }).catch((error)=>{
            console.log(error);
          })
        }
    },
    created(){
      this.getSign();
      // QRScanner.destroy();
      // $("html").css("background","white");

    }
  }
</script>
<style>
body,html{
  display: block;
  opacity:1;

}
#sign .one{
  background-color: lime;
  color: white;
}
</style>
