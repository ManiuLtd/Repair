<template>
  <el-aside width="200px">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>设备管理</template>
        <el-menu-item-group>
          <router-link to="/equipmentPC/index"><el-menu-item index="1-1">设备管理</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>项目管理</template>
        <el-menu-item-group>
          <router-link to="/contractPC/index"><el-menu-item index="1-1">项目管理</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>投诉管理</template>
        <el-menu-item-group>
          <router-link to="/complaintPC/index"><el-menu-item index="1-1">投诉管理</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-setting"></i>需求发布</template>
        <el-menu-item-group>
          <router-link to="/demandPC/index"><el-menu-item index="1-1">需求管理</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-setting"></i>发布公告</template>
        <el-menu-item-group>
          <router-link to="/announcePC/index"><el-menu-item index="1-1">公告管理</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title"><i class="el-icon-setting"></i>一键报修</template>
        <el-menu-item-group>
          <router-link to="/equipmentPC/warranty"><el-menu-item index="1-1">一键报修</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title"><i class="el-icon-setting"></i>巡检提醒</template>
        <el-menu-item-group>
          <router-link to="/PatrolReminderPC/index"><el-menu-item index="1-1">巡检管理</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title"><i class="el-icon-setting"></i>统计中心</template>
        <el-menu-item-group>
          <router-link to="/countCenterPC/count"><el-menu-item index="1-1">统计管理</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="8">
      <template slot="title"><i class="el-icon-setting"></i>物业账号管理</template>
      <el-menu-item-group>
        <router-link to="/GeneratePCSubAccount"><el-menu-item index="1-1">账号管理</el-menu-item></router-link>
      </el-menu-item-group>
    </el-submenu>
    </el-menu>
  </el-aside>
</template>
