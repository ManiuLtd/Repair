<template>
  <div class="qrscanner">
    <div class="qrscanner-area">
      <div class="area"></div>
    </div>

    <div class="through-line"></div>
  </div>
  <div class="arrive" style="display: none;height: 100vh;background-color: white">
    <van-row type="flex" justify="center" style="">
      <van-col span="6" style="font-size: 20px">签到成功！</van-col>
    </van-row>
  </div>

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
          console.log("签到", res);
          // alert("签到成功！");
          QRScanner.destroy(function(status){
            console.log(status);
          });
          //返回上一页
          this.$router.go(-2);
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
          alert("没扫到",err._message);
          // that.$router.push({path:"/RepairListFixer/repairListFixer"});
        }else {

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
    background: linear-gradient(#ae0000, #ae0000) left top,
    linear-gradient(#ae0000, #ae0000) left top,
    linear-gradient(#ae0000, #ae0000) right top,
    linear-gradient(#ae0000, #ae0000) right top,
    linear-gradient(#ae0000, #ae0000) right bottom,
    linear-gradient(#ae0000, #ae0000) right bottom,
    linear-gradient(#ae0000, #ae0000) left bottom,
    linear-gradient(#ae0000, #ae0000) left bottom;
    background-repeat: no-repeat;
    background-size: 2px 20px, 20px 2px;
    height: 18rem;
    width: 21rem;
    position: absolute;
    left: 20%;
    top: 20%;
  }
  .through-line {
    left: 20%;
    width: 60%;
    height: 2px;
    background: red;
    position: absolute;
    animation: myfirst 5s linear infinite alternate;
  }

  @keyframes myfirst {
    0% {
      /*background: green;*/
      top: 13rem;
    }
    25% {
      /*background: yellow;*/
      top: 17rem;
    }
    50% {
      /*background: blue;*/
      top: 21rem;
    }
    75% {
      /*background: green;*/
      top: 25rem;
    }
    100% {
      /*background: red;*/
      top: 29rem;
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
