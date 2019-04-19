<template>
  <div id="partsReq" style="font-size: 0.3rem">
    <div style="margin-top: 1em;">
      <router-link to="/partsManage/partsReqAll" class="selectAll"
                   style="color: darkgoldenrod;border-bottom: 1px solid darkgoldenrod">查询所有配件申请记录
      </router-link>
    </div>
    <el-row style="width: 0.02rem;display: inline-block;float: left">
      <el-col :span="2">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item index="1" style="padding: 0">
            <router-link to="/partsManage/partsReq1"><i class="el-icon-menu" style=""></i></router-link>

            <!--<span slot="title">工单申请配件</span>-->
          </el-menu-item>
          <el-menu-item index="2" style="padding: 0">
            <router-link to="/partsManage/partsReq2"><i class="el-icon-setting"></i></router-link>

            <!--<span slot="title">直接申请配件</span>-->
          </el-menu-item>
        </el-menu>
      </el-col>

    </el-row>
    <!--动态生成申请数据栏，得到每栏的数据源和下标。利用v-if来显示移除数据栏-->
    <div class="container-fluid" v-for="(part,index) in partsReq" v-if="!showFlag[index]">
      <van-row style="text-align: left">
        <van-col span="13">申请人：<span>{{part.user.name}}</span></van-col>
        <van-col span="5" offset="5">
          <van-button type="warning" size="small" @click="confirmList(part.id,1,index)">确认</van-button>
        </van-col>
      </van-row>
      <van-row style="text-align: left;margin-top: 0.5rem">
        <van-col span="18">
          申请时间：<span>{{part.applicationTime}}</span>
        </van-col>
      </van-row>

      <van-row style="text-align: left;margin-top: 1rem">
        <van-col span="13">申请配件：<span>{{part.parts.name}}</span></van-col>
        <van-col span="5" offset="5">
          <van-button type="danger" size="small" @click="confirmList(part.id,0,index)">退回</van-button>
        </van-col>
      </van-row>
      <p style="text-align: left;margin-top: 0.5rem">使用物业：<span>{{part.equipment.wy.name}}</span></p>
      <p style="text-align: left;margin-top: 0.5rem">维修设备：<span>{{part.equipment.name}}号工单</span></p>
      <p style="text-align: left;margin-top: 0.5rem">备注：<span>{{part.beizhu}}</span></p>

    </div>
    <div class="partsright">
      <router-view></router-view>
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
        partsReq: ''

      }
    },
    methods: {
      // 发起网络请求
      // getPartsReqData(){
      //   // 登录时，token被存在了localStorage里，现在直接调用它做请求头
      //   // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
      //   this.$http.post("/parts/chaxunshengqing",{},{
      //     headers: {
      //       'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
      //       'Content-Type': 'application/json'
      //     }
      //   }).then((res)=>{
      //     console.log("所有申请",res);
      //     this.partsReq = res.data.data;
      //   }).catch((error)=>{
      //     console.log(error);
      //   })
      // },
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
      // this.getPartsReqData();
    },
  }
</script>
<style>
  body {
    background-color: whitesmoke;
  }

  .partsright {
    width: 93%;
    height: 100%;
    color: chocolate;
    position: relative;
    top: 0;
    left: 9%;
    /*right: 0;*/
  }

</style>
