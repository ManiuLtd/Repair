<template>
  <el-container style="">
    <div class="header" style="">
      物业端
    </div>
    <el-main style="font-size: 0.3rem;padding: 0">
      <div class="content">
        <van-swipe :autoplay="3000" style="height: 10em;margin-top: -1px">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" style="width: 100%;height: 100%;"/>
          </van-swipe-item>
        </van-swipe>

        <!--<van-notice-bar :scrollable="true" style="height: 2em;">{{text}}</van-notice-bar>-->
        <van-notice-bar :scrollable="true"
                        :text="'公告：'+text"
                        style="height: 2em;"/>
        <div style="">
          <van-row style="margin-top: 1em;">
            <router-link to="/contract/index">
              <van-col span="8">
                <img src="../assets/property/image/MaintenanceUnit.png" style="width: 5.5em;height :5.5em"/>
                <!--<van-icon name="success" size="40px"/>-->
                <div>项目管理</div>
              </van-col>
            </router-link>
            <router-link to="/equipment/warranty">
              <van-col span="8">
                <img src="../assets/property/image/repair.png" style="width: 5.5em;height :5.5em"/>
                <!--<van-icon name="success" size="40px"/>-->
                <div>一键报修</div>
              </van-col>
            </router-link>
            <router-link to="/PatrolReminder/index">
              <van-col span="8">
                <img src="../assets/property/image/Inspection.png" style="width: 5.5em;height :5.5em"/>
                <!--<van-icon name="success" size="40px"/>-->
                <div>巡检提醒</div>
              </van-col>
            </router-link>
          </van-row>
          <van-row style="margin-top: 1em">
            <router-link to="/equipment/index">
              <van-col span="8">
                <img src="../assets/property/image/ProjectMan.png" style="width: 5.5em;height :5.5em" />
                <!--<van-icon name="info-o" size="40px"/>-->
                <div>设备管理</div>
              </van-col>
            </router-link>
            <router-link to="/complaint/index">
              <van-col span="8">
                <img src="../assets/property/image/ComplaintM.png" style="width: 5.5em;height :5.5em"/>
                <div>投诉管理</div>
              </van-col>
            </router-link>
            <router-link to="/demand/index">
              <van-col span="8">
                <img src="../assets/property/image/RepairS.png" style="width: 5.5em;height :5.5em"/>
                <div>需求发布</div>
              </van-col>
            </router-link>
          </van-row>
          <van-row style="margin-top: 1em">
            <!--isZiZhangHao是1的话是子账号，0的话是主体账号-->
            <router-link to="/countCenterPH/equipment" v-if="isZiZhangHao == 0">
              <van-col span="8">
                <img src="../assets/property/image/StatisticalC.png" style="width: 5.5em;height :5.5em"/>
                <div>统计中心</div>
              </van-col>
            </router-link>
            <router-link to="/announce/index">
              <van-col span="8">
                <img src="../assets/property/image/notification.png" style="width: 5.5em;height :5.5em"/>
                <div>发布公告</div>
              </van-col>
            </router-link>
            <router-link to="/GenerateSubAccount">
              <van-col span="8">
                <img src="../assets/property/image/more.png" style="width: 5.5em;height :5.5em"/>
                <div>更多</div>
              </van-col>
            </router-link>
          </van-row>
          <!--<img src="../assets/Company/wuye.png" alt="">-->
        </div>
      </div>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>

  export default {
    name: "Index",
    data() {
      return {
        data:'',
        text:'',
        i:'',
        images: [
          // 如果把图片放在assets与static中，html页面可以使用；但在动态绑定中，assets路径的图片会加载失败，因为webpack使用的是commenJS规范，必须使用require才可以
          require('../assets/Company/wuye.png'),
          require('../assets/Company/wuye.png'),

          // require('../assets/Company/'),

        ],
        active: '',
        isZiZhangHao:'',

    }
    },
    created(){
      this.select();
    },
    methods: {
      select: function () {
        // 调取localStorage中存储的用户信息，然后用查找字符串和截取字符串的笨办法得到isZiZhangHao的值。。。
        console.log("user!",window.localStorage.getItem("user").substr(window.localStorage.getItem("user").indexOf('isZiZhangHao')+14,1));

        this.isZiZhangHao = window.localStorage.getItem("user").substr(window.localStorage.getItem("user").indexOf('isZiZhangHao')+14,1);
        console.log("this.isZiZhangHao",this.isZiZhangHao)
        this.$http
          .post(
            "/notice/findNotice",
            {},
            {
              headers: {
                'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
                'Content-Type': 'application/json'
              }
            },
            {
              emulateJSON: true,
            }
          )
          .then(res => {
            if (res.data.code === "1") {
              window.localStorage.setItem(
                "announce",
                JSON.stringify(res.data.token)
              );
              this.data = res.data.data;
              for(this.i = 0;this.i<this.data.length; this.i++){
                this.text += this.data[this.i].text+'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0';
              }
              console.log("this.msg："+this.text);
              console.log("this.msg："+res.data.msg);
             } //else {
            //   this.$router.push({
            //     path: "/"
            //   });
            //   this.msg = true;
            //   console.log("this is fail", res);
            // }
          })
          .catch(err => {
            this.$notify({
              title: "访问失败",
              message: "服务器请求失败，请检查网络或联系管理员",
              type: "error"
            });
            console.log(err);
          });
      }
    }
  }
</script>

<style>
  /*在物业端第一个界面引入汇总好的css样式文件，之后的界面跳转样式还会保留，可以看作样式污染，节约代码。比较优雅*/
  @import "../assets/css/header.css";
  .el-header {
    padding: 0 5px;}
  .el-main {
    padding: 0 0px;
  }
  .el-footer {
    padding: 0 0px;
  }

</style>
