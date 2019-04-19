<template>
  <el-container>
    <el-header style="background-color: #3a8ee6;text-align: right; font-size: 16px; line-height: 60px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息查看</el-dropdown-item>
          <el-dropdown-item>修改个人信息</el-dropdown-item>
          <el-dropdown-item>修改账号密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>个人中心</span>
    </el-header>

    <el-container>
      <el-aside>
        <three></three>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
      </el-container>
  </el-container>

</template>

<script>
  import three from './three'

  export default {
      name: "pcIndex",
      components:{
        three
      },
    }
</script>

<style>

</style>
