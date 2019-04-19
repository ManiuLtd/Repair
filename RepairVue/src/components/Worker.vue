<template>
  <div id="worker">
    <div class="w-header" style="height: 4.35rem;">
      <van-row type="flex" justify="end" style="padding-top: 0.2rem">
        <van-col span="4">
          <router-link to="/RepairListFixer/editFixerSelf">
            <div>
              <van-icon name="edit" size="20px" style="color: white;"/>
            </div>
          </router-link>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" style="margin-top: 0.7rem">
        <van-col span="6"></van-col>
        <van-col span="5">
          <div
            style="height: 1.6rem;border-radius: 50%;overflow: hidden;border: 2px solid darkgoldenrod;">
            <img :src="headpic" alt="" style="width: 100%;height: 100%;">
            <!--<img :src="headpic" alt="" style="width: 100%;height: 100%;">-->

          </div>

        </van-col>
        <van-col span="6"></van-col>
      </van-row>
      <van-row type="flex" justify="center">
        <span style="color: white;font-size: 0.4rem;">{{this.name.name}}</span>

      </van-row>
      <van-row>

      </van-row>

    </div>
    <van-notice-bar :scrollable="true"
                    :text="'公告：'+text"
                    style="height: 2em"
    />
    <div class="listIcon container-fluid" style="background-color: white;height: 2rem">
      <div class="row">
        <div class="col-xs-4 col-sm-4" style="position: relative;height: 1.5rem;">
          <div style="position: absolute;top: 0;left: 0;bottom: 0;right: 0;margin: auto;height: 50%;"
               @click="toAllList">
            <van-icon name="records" size="1.8em" color="#0f1ba6" style="font-weight: bold"/>
            <!--<p>待维修工单</p>-->
           <p> <el-badge :value="RepairNum" :max="99" :hidden="RepairNum==0?true:false" style="font-size: 0.3rem;color: #0f1ba6;">待维修工单</el-badge></p>

          </div>
        </div>
        <div class="col-xs-4 col-sm-4" style="position: relative;height: 1.5rem;">
          <div style="position: absolute;top: 0;left: 0;bottom: 0;right: 0;margin: auto;height: 50%;"
               @click="toWaitList">
            <van-icon name="logistics" size="1.8em" color="#a61011" style="font-weight: bold"/>
            <!--<p style="font-size: 0.3rem;color: #a61011;">待确认工单</p>-->
            <p> <el-badge :value="RepairNum1" :max="99" :hidden="RepairNum1==0?true:false" style="font-size: 0.3rem;color: #a61011;">待确认工单</el-badge></p>

          </div>
        </div>
        <div class="col-xs-4 col-sm-4" style="position: relative;height: 1.5rem;">
          <div style="position: absolute;top: 0;left: 0;bottom: 0;right: 0;margin: auto;height: 50%;"
               @click="toHistory">
            <van-icon name="tosend" size="1.8em" color="#18a62e" style="font-weight: bold"/>
            <p style="font-size: 0.3rem;color: #18a62e;">已完成工单</p>
          </div>
        </div>
      </div>
    </div>
    <p style="height: 0.1em;background-color: #f7f7f7"></p>
    <!--<div>-->
      <div class="partsReq" style="width: 100%;height: 3.5em;background-color: white">

      <router-link to="/RepairListFixer/backMessage">
          <van-row style="width: 90%;line-height:3.5em;display:inline-block;text-align: center;">
            <van-col span="2" style="line-height: 4.5em">
             <span><van-icon name="records" size="1.8em" color="#3c3c3c"
                             style="font-weight: bold;"></van-icon></span>
            </van-col>
            <van-col span="8"><span
              style="font-weight: bold;font-size: 0.4rem;color: #414141;">查看投诉</span>
            </van-col>
            <van-col span="1" offset="12">
              <van-icon name="arrow" size="1em" style="line-height: 3.5em;"></van-icon>

            </van-col>
          </van-row>
          <!--<div-->
            <!--style="border-bottom: 1px solid #f3f3f3;position: relative;">-->
          <!--</div>-->
        <!--</div>-->
      </router-link>
    </div>
    <div class="partsReq" style="width: 100%;height: 3.5em;background-color: white">
      <router-link to="/RepairListFixer/polling">
        <van-row style="border-top: 1px solid #f3f3f3;width: 90%;line-height:3.5em;display:inline-block;text-align: center;">
          <van-col span="2" style="line-height: 4.5em">
             <span><van-icon name="aim" size="1.8em" color="#3c3c3c"
                             style="font-weight: bold;"></van-icon></span>
          </van-col>
          <van-col span="8"><span
            style="font-weight: bold;font-size: 0.4rem;color: #414141;">进行巡检</span>
          </van-col>
          <van-col span="1" offset="12">
            <van-icon name="arrow" size="1em" style="line-height: 3.5em;"></van-icon>

          </van-col>
        </van-row>
        <!--<div-->
          <!--style="width: 90%;height:100%;display:inline-block;text-align: center;border-bottom: 1px solid #f3f3f3;position: relative;">-->
          <!--<van-icon name="aim" size="1.8em" color="#3c3c3c"-->
                    <!--style="position: absolute;left: 0;top: 50%;transform: translate(0,-50%);font-weight: bold"/>-->
          <!--<span-->
            <!--style="font-weight: bold;font-size: 0.4rem;color: #414141;position: absolute;left: 0.8rem;top: 50%;transform: translate(0,-50%);">进行巡检</span>-->
          <!--<van-icon name="arrow" size="1em" style="position: absolute;right: 0;line-height: 3em"/>-->
        <!--</div>-->
      </router-link>
    </div>
    <div class="partsReq" style="width: 100%;height: 3.5em;background-color: white">
      <!--跳转到配件申请页面，并传参告诉它这是直接申请配件-->
      <router-link :to="{path:'/RepairListFixer/selectParts', query:{isN:2}}">
        <van-row style="border-top: 1px solid #f3f3f3;width: 90%;line-height:3.5em;display:inline-block;text-align: center;">
          <van-col span="2" style="line-height: 4.5em">
             <span><i class="el-icon-setting" size="1.8em" color="#3c3c3c"
                             style="font-weight: bold;color:#3c3c3c;font-size: 0.5rem"></i></span>
          </van-col>
          <van-col span="8"><span
            style="font-weight: bold;font-size: 0.4rem;color: #414141;">申请配件</span>
          </van-col>
          <van-col span="1" offset="12">
            <van-icon name="arrow" size="1em" style="line-height: 3.5em;"></van-icon>

          </van-col>
        </van-row>
        <!--<div-->
          <!--style="width: 90%;height:100%;display:inline-block;text-align: center;border-bottom: 1px solid #f3f3f3;position: relative;">-->
          <!--&lt;!&ndash;<van-icon name="aim" size="25px" color="#3c3c3c" style="position: absolute;left: 0;top: 50%;transform: translate(0,-50%);font-weight: bold"/>&ndash;&gt;-->
          <!--<i class="el-icon-setting"-->
             <!--style="position: absolute;left: 0;top: 50%;transform: translate(0,-50%);font-weight: bold;color:#3c3c3c;font-size: 0.5rem"></i>-->
          <!--<span-->
            <!--style="font-weight: bold;font-size: 0.4rem;color: #414141;position: absolute;left: 0.8rem;top: 50%;transform: translate(0,-50%);">申请配件</span>-->
          <!--<van-icon name="arrow" size="1em" style="position: absolute;right: 0;line-height: 3em"/>-->
        <!--</div>-->
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        listDataF: '',
        name: '',
        notice: '',
        text: '',
        RepairNum:'',
        RepairNum1:'',

        // assets与static的区别相同点：资源在html中使用，都是可以的。不同点：使用assets下面的资源，在js中使用的话，路径要经过webpack中file-loader编译，路径不能直接写。assets中的文件会经过webpack打包，重新编译，推荐该方式。而static中的文件，不会经过编译。项目在经过打包后，会生成dist文件夹，static中的文件只是复制一遍而已。简单来说，static中建议放一些外部第三方，自己的放到assets，别人的放到static中。注意：如果把图片放在assets与static中，html页面可以使用；但在动态绑定中，assets路径的图片会加载失败，因为webpack使用的是commenJS规范，必须使用require才可以
        headpic: require('../assets/image/guys.png')
      }
    },
    methods: {
      toAllList() {
        this.$router.push({
          name: 'repairListFixer', query: {listDatax: this.listDataF}
        });
      },
      toWaitList() {
        this.$router.push({path: '/RepairListFixer/waitListFixer'});
      },
      toHistory() {
        this.$router.push({path: '/RepairListFixer/listHistory'});
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
          this.listDataF = res.data.data;
        }).catch((error) => {
          console.log(error);
        })
      },
      // 发起网络请求
      getData() {
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/user/WXG", {}, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          console.log("维修工信息", res);
          this.name = res.data.data;
          if (res.data.data.headPic){
            this.headpic = this.GLOBAL.BASE_URL+res.data.data.headPic;
          }
        }).catch((error) => {
          console.log(error);
        })
      },
      // 发起网络请求,查询所有公告
      getNoticeData() {
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/notice/findNotice", {}, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          if (res.data.msg=="请先进行登录") {
            this.$toast("账号密码变更，请重新登陆！");
          }
          console.log("查询公告", res);
          // this.notice = res.data.data[res.data.data.length-1];
          this.notice = res.data.data;
          for (this.i = 0; this.i < this.notice.length; this.i++) {
            this.text += this.notice[this.i].text + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0';
          }
          console.log(this.notice);
        }).catch((error) => {
          console.log(error);
        })
        // 查询待维修工单
        this.$http.post("/actionLog/findByWxgUsername", {}, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          console.log("被派维修工单", res);
          this.RepairNum = res.data.data.length;
          res.data.data.forEach((item)=>{
            if (item.state!==2 && item.state!==1) {
              this.RepairNum-=1;
            }
          })
        }).catch((error) => {
          console.log(error);
        })
        this.$http.post("/actionLog/findByWxgUsername", {}, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          console.log("未确认维修工单", res);
          this.RepairNum1 = res.data.data.length;
          res.data.data.forEach((item)=>{
            if (item.state<3) {
              this.RepairNum1-=1;
            }
          })
        }).catch((error) => {
          console.log(error);
        })
      }
    },
    created() {
      this.getData();
      this.getListData();
      this.getNoticeData();
      // 销毁插件
      // QRScanner.destroy();
      // $("body").css("background","whitesmoke");
    }
  }
</script>
<style>
  /*在物业端第一个界面引入汇总好的css样式文件，之后的界面跳转样式还会保留，可以看作样式污染，节约代码。比较优雅*/
  @import "../assets/css/header.css";

  .w-header {
    background: url(../assets/image/worker1.jpg) no-repeat;
    background-position: -9px -8px;
  }

</style>
