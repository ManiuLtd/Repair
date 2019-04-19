<template>
  <div id="saoma" style="">
    <van-row type="flex" justify="space-between" style="height: 3em;font-size: 0.3rem;line-height: 3em;margin-top: 1em">
      <van-col span="4">
        <router-link to="/RepairListFixer/repairListFixer">
          <van-icon name="arrow-left" size="2em" color="darkgoldenrod" style="font-weight: bolder;"/>
        </router-link>
      </van-col>
    </van-row>
    <div class="qrscanner">
      <div class="qrscanner-area">
        <van-row type="flex" justify="center" style="margin-top: 30%">
          <van-col span="4"></van-col>
          <van-col span="15">
            <div class="area">
              <div class="through-line"></div>
            </div>
          </van-col>
          <van-col span="4"></van-col>
        </van-row>

      </div>

    </div>

  </div>
  <!--<div class="arrive" style="display: none;height: 100vh;background-color: white">-->
  <!--<van-row type="flex" justify="center" style="">-->
  <!--<van-col span="6" style="font-size: 20px">签到成功！</van-col>-->
  <!--</van-row>-->
  <!--</div>-->

</template>
<script>
  import Vue from 'vue'

  export default {
    data() {
      return {
        light: false,
        frontCamera: false,
        data: '',
        actionLogId: ''
      }
    },
    methods: {
      getId() {
        this.actionLogId = this.$route.query.toId;
        console.log("id", this.actionLogId);
      },
      // onDone(err, status) {
      //   if (err) {
      //     console.error(err);
      //   }
      //   if (status.authorized) {
      //     alert("开启扫码");
      //     QRScanner.show(function (status) {
      //       alert("展示");
      //       console.log("show展示", status);
      //     });
      //     QRScanner.scan(displayContents);
      //
      //
      //   } else if (status.denied) {
      //     alert('用户拒绝访问摄像头');
      //   } else {
      //   }
      // },

      // displayContents(err, text) {
      //   if (err) {
      //     alert('启动扫描出错：' + JSON.stringify(err));
      //   } else {
      //     QRScanner.scan(callback);
      //
      //   }
      // },
      //
      // callback(err, contents) {
      //   if (err) {
      //     console.error(err._message);
      //   }
      //   alert('The QR Code contains: ' + contents);
      //   this.postData(contents);
      //   QRScanner.destroy();
      // },
      // 发起网络请求
      postData(v) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/actionLog/queRenDaoDa", {
          "actionLogId": this.actionLogId,
          "equimentId": v
        }, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          loading.close();
          if (res.data.code == 1) {
            this.$toast.success('签到成功');
            console.log("签到", res.data.code);
          } else {
            this.$toast.fail('签到失败');
          }

          // alert("签到成功！");
          // 扫码进程导致其他界面变成扫描预览，取消扫描不奏效，得用毁坏扫码
          // QRScanner.destroy(function (status) {
          //   console.log(status);
          // });
          // QRScanner.cancelScan();
          //返回上一页
          // this.$router.go(-2);
          this.$router.replace({name: 'repairListFixer'});
        }).catch((error) => {
          console.log(error);
        })
      },

      //切换开启手电筒
      btn1() {
        if (this.light) {
          QRScanner.enableLight();
          alert('enableLight');
        } else {
          QRScanner.disableLight();
        }
        this.light = !this.light;
      }
      ,
      //切换前后摄像头
      btn2() {
        if (this.frontCamera) {
          QRScanner.useFrontCamera();
          alert('useFrontCamera');
        } else {
          QRScanner.useBackCamera();
        }
        this.frontCamera = !this.frontCamera;
      }
    },
    // 销毁实例，有了它，其他页面被污染的情况才取消的
    destroyed() {

      QRScanner.destroy(function (status) {
        // alert('实例已销毁');
        $("html").css("background", "white");
        console.log("实例", status);

      });
    },
    // watch: {
    //   data: function (val) {
    //     this.postData(val);
    //   }
    // },
    created() {
      var that = this;
      this.getId();
      QRScanner.prepare(onDone);
      // QRScanner.scan(this.postData(callback));
      // QRScanner.prepare(onDone);
      function onDone(err, status) {
        if (err) {
          console.error(err);
        }
        if (status.authorized) {
          // alert("开启扫码");
          QRScanner.show(function (status) {
            // alert("展示");
            console.log("show展示", status);
          });
          QRScanner.scan(callback);


        } else if (status.denied) {
          alert('用户拒绝访问摄像头');
        } else {
        }
      }

      // function displayContents(err, text) {
      //   if (err) {
      //     alert('启动扫描出错：' + JSON.stringify(err));
      //   } else {
      //     alert("扫描结果：",text);
      //     // if (!window.plus) return;
      //     // QRScanner.scan(callback);
      //
      //   }
      // }

      function callback(err, contents) {
        if (err) {
          // QRScanner.destroy();
          console.error(err._message);
          alert("没扫到", err._message);
          // that.$router.push({path:"/RepairListFixer/repairListFixer"});
        } else {

          // QRScanner.hide(function(status){
          //   alert("隐藏");
          //   console.log(status);
          // });
          that.postData(contents);
          // alert('The QR Code contains: ' + contents);
        }


      }

    }

  }
</script>
<style>
  .qrscanner {
    width: 100%;
    height: 100%;
    /*background: transparent;*/
  }

  body, html {
    width: 100%;
    height: 100%;
  }

  .qrscanner-area {
    width: 100%;
    height: 85%;
    background-size: contain;
    /*border: 5px solid whitesmoke;*/
  }

  .area {
    background: linear-gradient(darkgoldenrod, darkgoldenrod) left top,
    linear-gradient(darkgoldenrod, darkgoldenrod) left top,
    linear-gradient(darkgoldenrod, darkgoldenrod) right top,
    linear-gradient(darkgoldenrod, darkgoldenrod) right top,
    linear-gradient(darkgoldenrod, darkgoldenrod) right bottom,
    linear-gradient(darkgoldenrod, darkgoldenrod) right bottom,
    linear-gradient(darkgoldenrod, darkgoldenrod) left bottom,
    linear-gradient(darkgoldenrod, darkgoldenrod) left bottom;
    background-repeat: no-repeat;
    background-size: 10px 20px, 20px 10px;
    height: 3.6rem;
    width: 100%;
    position: relative;
    /*left: 21.5%;*/
    /*top: 30%;*/
  }

  .through-line {
    /*left: 16.5%;*/
    width: 95%;
    height: 2px;
    background: darkgoldenrod;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    animation: myfirst 2s linear infinite alternate;
  }

  @keyframes myfirst {
    0% {
      /*background: green;*/
      top: 15%;
    }
    /*25% {*/
    /*!*background: yellow;*!*/
    /*top: 25%;*/
    /*}*/
    50% {
      /*background: blue;*/
      top: 50%;
    }
    /*75% {*/
    /*!*background: green;*!*/
    /*top: 75%;*/
    /*}*/
    100% {
      /*background: red;*/
      top: 85%;
    }
  }

  .button-bottom {
    width: 128px;
    position: absolute;
    left: 50%;
    bottom: 80px;
    margin-left: -64px;
  }

  .icon-camera {
    float: left;
  }

</style>
