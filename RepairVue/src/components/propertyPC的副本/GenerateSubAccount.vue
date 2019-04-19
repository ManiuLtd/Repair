<!-- 物业对子账号管理-->
<template>
  <el-container>
    <el-container>
      <div>
        <three></three>
      </div>
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
        <el-main>
          <div>
            <el-tabs type="border-card" class="el-tabs">
              <el-tab-pane label="物业账号管理" class="el-tab-pane">
                <el-table
              ref="filterTable"
              :data="data.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
              <el-table-column
                prop="username"
                label="用户名称"
                sortable
                width="120"
                column-key="date">
              </el-table-column>
              <el-table-column
                prop="city"
                label="所属地址"
                width="100">
              </el-table-column>
              <el-table-column
                align="right">
                <template slot="header" slot-scope="scope">
                  <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                  <router-link :to="{ name: 'subPCAccount', params: { subAccountId: scope.row.id }}">子账号详情</router-link>;
                  <!--<router-link :to="{ name: 'editPCSubAccount', params: { subAccountId: scope.row.id }}">禁止账号使用</router-link>;-->
                </template>
              </el-table-column>
            </el-table>
              </el-tab-pane>
              <el-tab-pane label="生成子账号">
                <el-button type="primary" class="input-group btn-login" @click="add" >生成子账号</el-button>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import three from './three'
  export default {
    components:{
      three
    },
    data() {
      return {
        data:[],
        search: '',
        radio: "",
      }
    },
    created(){
      this.select()
    },
    methods: {
      add: function () {
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
              if (res.data.code === "1") {
                window.localStorage.setItem(
                  "SubAccount",
                  JSON.stringify(res.data.token)
                );
                this.$router.push({
                  path: "/index"
                });

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
              this.data = res.data.data;
              console.log("this.msg："+res.data.msg);
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

<style scoped>

</style>
