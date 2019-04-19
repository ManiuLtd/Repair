<template>
  <div id="proCon" style="height: 100vh">
    <van-row class="header" type="flex" justify="space-between" style="">
      <van-col span="4">
        <router-link :to="iswy == 1 ? '/WUYESelfEdit' : 'selfEdit'">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="8">关于我们</van-col>
      <van-col span="4"></van-col>
    </van-row>
    <van-row type="flex" justify="center" style="margin-top: 6em">
      <van-col span="6"></van-col>
      <van-col span="10">
        <img src="../assets/Company/QRcode.jpg" alt="" style="width: 100%">
      </van-col>
      <van-col span="6"></van-col>
    </van-row>
    <p style="font-size: 0.9em;margin-top: 1em">扫描二维码，即可关注中通广联公众号</p>
    <p style="color: gray;font-size: 0.8em;position: absolute;bottom: 2em;left: 0;right: 0;">北京中通广联自动化设备有限公司<br>版权所有</p>
  </div>
</template>
<script>
  export default {
    methods: {
      // 接受来自维保企业传来的iswy
      getdata(){
        if(this.$route.query.iswy == 0){
          this.iswy = this.$route.query.iswy;
        }
        console.log("iswy",this.iswy);
      }
    },
    data() {
      return {
        iswy:1

      }
    },
    created() {
      this.getdata();

    }
  }
</script>
<style>

</style>

