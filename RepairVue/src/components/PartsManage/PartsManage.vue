<template>
  <div id="parts">
    <van-row type="flex" class="header" justify="space-between">
      <van-col span="4">
        <router-link to="/companyA">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="8">配件管理</van-col>
      <van-col span="4">
        <router-link to="/selectAll"
                     style="color: black;font-weight: bold;font-size: 0.65em;border-bottom: 1px solid black">库存
        </router-link>
      </van-col>
    </van-row>
    <div class="van-hairline--bottom">
      <van-tabs color="gray">
        <van-tab>
          <div slot="title">
            <router-link to="/partsManage/partsAddMessage">配件登记</router-link>
          </div>
        </van-tab>
        <van-tab>
          <div slot="title">
            <router-link to="/partsManage/partsReq">批示申请</router-link>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="partsBottom">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {}
  }
</script>
<style>
  .partsBottom {
    width: 100%;
    height: 100%;
    color: chocolate;
  }
</style>
