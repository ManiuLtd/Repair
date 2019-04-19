<template>
  <div id="fixersM" style="background: whitesmoke;height:100vh;padding-top: 1.8rem">
    <van-row type="flex" class="header" style="position: fixed;top: 0;z-index: 100;
" justify="space-between">
      <van-col span="4">
        <router-link to="/companyA">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="10" offset="2">维修工管理</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <div class="van-hairline--bottom" style="width:100%;position: fixed;top: 0.8rem;z-index: 100;">
      <van-tabs v-model="active" color="gray">
        <van-tab>
          <div slot="title">
            <router-link to="/fixerManage/showFixerReqs">添加技师</router-link>
          </div>
        </van-tab>
        <van-tab>
          <div slot="title">
            <router-link to="/fixerManage/editFixerMessage">修改信息</router-link>
          </div>
        </van-tab>
        <van-tab>
          <div slot="title">
            <router-link to="/fixerManage/sendTask">改派任务</router-link>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="fixerCon">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        active:0,
        changeColor:1
      }
    },
    methods:{
      change(t){
        this.changeColor = t;
      }
    }
  }
</script>
<style>
  .fixerCon{
    width: 100%;
    /*height: 100%;*/
    color: chocolate;
    /*border: 1px solid red;*/
    background-color: whitesmoke;

  }

</style>
