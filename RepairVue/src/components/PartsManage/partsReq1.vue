<template>
  <div id="req1" style="width: 97%;">
    <el-badge is-dot class="item" style="margin-top: 2em;font-size: 0.15rem">工单申请配件</el-badge>
    <!--动态生成申请数据栏，得到每栏的数据源和下标。利用v-if来显示移除数据栏-->
    <div class="container-confirm" v-for="(part,index) in partsReq1" v-if="!showFlag[index]">
      <van-row style="text-align: left">
        <van-col span="13">申请人：<span>{{part.user.name}}</span></van-col>
        <van-col span="5" offset="5">
          <van-button type="warning" size="small" @click="confirmList(part.id,1,index)">确认</van-button>
        </van-col>
      </van-row>
      <van-row style="text-align: left;margin-top: 0.5em">
        <van-col span="18">
          申请时间：<span>{{part.applicationTime}}</span>
        </van-col>
      </van-row>

      <van-row style="text-align: left;margin-top: 0.5em">
        <van-col span="13">申请配件：<span>{{part.parts.name}}</span></van-col>
        <van-col span="5" offset="5">
          <van-button type="danger" size="small" @click="confirmList(part.id,0,index)">退回</van-button>
        </van-col>
      </van-row>
      <p style="text-align: left;margin-top: 0.5em">数量：<span>{{part.num}}</span></p>
      <!--<p style="text-align: left;margin-top: 0.5em">应用项目：<span>{{part.actionLog.id}}号工单</span></p>-->
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'

  export default {
    data() {
      return {
        activeName: 1,
        plid: '',
        istongyi: 0,
        showFlag: [],
        partsReq: "",
        partsReq1: []
      }
    },
    methods: {
      // 发起网络请求
      getPartsReqData() {
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/parts/chaxunshengqing", {}, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          this.partsReq = res.data.data;
          console.log("所有申请（工单申请）", res);
          // 赋值为一个空数组以达到清空原数组
          this.partsReq1 = [];
          // 用forEach方法遍历数组
          this.partsReq.forEach(item => {
            if (item.partsLogType == 2) {
              // 直接申请配件的partsLogType=2，这里是给直接申请配件留的地方
            } else {
              // 直接申请
              // 把对象用push方法依次放在数组的末尾  push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
              this.partsReq1.push(item);
            }


          })

        }).catch((error) => {
          console.log(error);
        })
      },
      //利用数组的监测set方法来监测数组变化，以便在数组数据变化时重新渲染视图
      confirmList(v, j, k) {
        this.plid = v;
        Vue.set(this.showFlag, k, true);
        console.log(this.showFlag[k]);
        this.istongyi = j;
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        //发起网络请求，传输body数据给后台
        this.$http.post("/parts/pishi", {
          "plid": this.plid,
          "istongyi": this.istongyi
        }, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          loading.close();
          if (res.data.code == 1) {
            if (this.istongyi) {
              this.$toast.success('确认成功');
            } else {
              this.$toast.success('退回成功');
            }
          } else {
            if (this.istongyi) {
              this.$toast.fail('确认失败');
            } else {
              this.$toast.fail('退回失败');
            }
          }
          console.log("111", res);
        }).catch((error) => {
          console.log(error);
        })
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }

    },

    created() {
      this.getPartsReqData();
    },
  }
</script>
<style></style>
