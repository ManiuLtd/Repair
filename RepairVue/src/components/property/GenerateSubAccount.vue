<!-- 物业对子账号管理-->
<template>
  <div>
    <van-row class="header" type="flex" justify="space-between" style="">
      <van-col span="4">
        <router-link to="/index">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="10" offset="2">子账号管理</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <el-tabs type="card" class="el-tabs" :stretch="true">
      <el-tab-pane label="物业账号管理" class="el-tab-pane">
        <el-table
      ref="filterTable"
      :data="data1.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="用户名称"
        sortable
        column-key="date">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="city"-->
        <!--label="所属地址"-->
        <!--&gt;-->
      <!--</el-table-column>-->
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            style="padding: 0"
            prefix-icon="el-icon-search"
            placeholder="输入关键字"/>
        </template>
        <template slot-scope="scope">
          <router-link :to="{ name: 'subAccount', params: { subAccountId: scope.row.id }}"><el-button size="mini" type="primary" class="input-group">子账号详情</el-button></router-link>
          <!--<router-link :to="{ name: 'editSubAccount', params: { subAccountId: scope.row.id }}">禁止账号使用</router-link>;-->
        </template>
      </el-table-column>
    </el-table>
      </el-tab-pane>
      <el-tab-pane label="生成子账号">
        <van-cell-group>
          <van-field v-model="user"
                     placeholder="维修工号"
                     label="账号"
                     left-icon="contact"
                     style=""
          />
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="user"
                     placeholder="密码"
                     label="密码"
                     left-icon="edit"
          />
        </van-cell-group>
        <el-button type="primary" class="input-group btn-login" @click="add" >生成子账号</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data1:[],
        search: '',
        radio: "",
        labelPosition: 'right',
        user:''
      }
    },
    created(){
      this.select()
    },
    methods: {
      add: function () {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
          this.$http
            .post(
              "/user/WYaddZiZhangHao",
              {},
              {
                headers: {
                  'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
                  'Content-Type': 'application/json'
                }
              },
              {
                emulateJSON: true,

              }
            )
            .then(res => {
              loading.close();
              if (res.data.code === "1") {
                this.$toast.success("获取成功");
                console.log(res);
                this.user = res.data.data.username;
                window.localStorage.setItem(
                  "SubAccount",
                  JSON.stringify(res.data.token)
                );

              } else {
                this.$router.push({
                  path: "/"
                });
                this.msg = true;
                console.log("this is fail", res);
              }
            })
            .catch(err => {
              this.$notify({
                title: "添加失败",
                message: "服务器请求失败，请检查网络或联系管理员",
                type: "error"
              });
              console.log(err);
            });
      },
      select: function () {
        this.$http
          .post(
            "/user/WYfindAllZiZhangHao",
            {},
            {
              headers: {
                'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
                'Content-Type': 'application/json'
              }
            },
            {
              emulateJSON: true,
            }
          )
          .then(res => {
            if (res.data.code === "1") {
              window.localStorage.setItem(
                "GenerateSubAccount",
                JSON.stringify(res.data.token)
              );
              this.data1 = res.data.data;
              console.log("this.msg："+res.data.msg);
            } else {
              this.$router.push({
                path: "/"
              });
              this.msg = true;
              console.log("this is fail", res);
              this.$toast(res.data.msg);

            }
          })
          .catch(err => {
            this.$notify({
              title: "访问失败",
              message: "服务器请求失败，请检查网络或联系管理员",
              type: "error"
            });
            console.log(err);
          });
      }
    }
  }
</script>

<style>
  .van-field .van-cell__title{
    max-width: 1rem;
    margin-right: 2em;
  }
</style>
