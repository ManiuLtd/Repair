<template>
  <div id="RepairList" style="background-color: whitesmoke;height: 100vh;padding-top: 1.8rem">
      <van-row class="header" style="position: fixed;top: 0;
" type="flex" justify="space-between">
          <van-col span="4">
            <router-link to="/companyA">
              <van-icon name="arrow-left" size="1em" color="white"/>
            </router-link>
          </van-col>
          <van-col span="8" offset="2">维修工单</van-col>
          <van-col span="6"></van-col>
        </van-row>
    <div class="van-hairline--bottom" style="width:100%;position: fixed;top: 0.8rem;">
      <van-tabs v-model="active" color="grey" style="font-size: 0.2rem;">
        <van-tab>
          <div slot="title">
            <router-link to="/repairList/noRepair">未处理</router-link>
          </div>
        </van-tab>
        <van-tab>
          <div slot="title">
            <router-link to="/repairList/repairing">维修中</router-link>
          </div>
        </van-tab>
        <van-tab>
          <div slot="title">
            <router-link to="/repairList/finishList">已完成</router-link>
          </div>
        </van-tab>
        <van-tab>
          <div slot="title">
            <router-link to="/repairList/ShowAllRepair">所有工单</router-link>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="listCon">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        active:0
      }
    },
    methods:{
    }
  }
</script>
<style>
  body,html{
    height: 100%; padding: 0; margin: 0;
  }

</style>
<style scoped>
  /*父路由组件设置的样式在子路由组件中可用（类名相同的话）*/
  .listCon{
    width:100%;
    /*!*height:100vh;*!直接设置父元素的高度为100vh即可*/
    color: black;
    background-color: whitesmoke;
    /*border: 1px solid red;*/
  }
</style>
<!--scope的没办法控制组件之外的的元素的属性-->
<!--<style scoped>-->
  <!--html{-->
    <!--background-color: whitesmoke;/*无效*/-->
  <!--}-->
<!--</style>-->
<!--样式污染解决办法：https://www.cnblogs.com/karthuslorin/p/9038854.html-->
