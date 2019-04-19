<!-- 公告管理-->
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
              <el-tab-pane label="公告管理" class="el-tab-pane">
              <el-table
                ref="filterTable"
                :data="data.filter(data => !search || data.text.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
                <el-table-column
                  prop="text"
                  label="公告内容"
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
                    <router-link :to="{ name: 'announcePCEdit', params: { announceId: scope.row.id }}">
                      <el-button size="mini" type="primary" icon="el-icon-edit" class="input-group">编辑</el-button>
                    </router-link>
                    <el-button type="primary" size="mini" icon="el-icon-delete" class="input-group" @click="del(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              </el-tab-pane>
              <el-tab-pane label="添加公告" class="el-tab-pane">
                <div class="title">
                  <h2>添加公告</h2>
                </div>
                <el-input class="input-group" v-model="text" placeholder="公告内容">
                </el-input>
                <el-button type="primary" class="input-group btn-login" @click="add">提交公告</el-button>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<style>
  .el-tabs--border-card>.el-tabs__content{
    padding: 0px;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .btn-login {
    width: 100%;
  }

  .title {
    text-align: center;
  }

  .input-group {
    margin-top: 2%;
  }
</style>
<script>
  import three from '../three'
  export default {
    components:{
      three
    },
    data() {
      return {
        data:[],
        text: '',
        search: '',
        radio: "",
      }
    },
    created(){
      this.select()
    },
    methods: {
      del: function (id) {
        if (id === "") {
          this.notnull = true;
        } else {
          console.log("the msg is", id)
          this.$http
            .post(
              "/notice/delNotice",
              {id: id},
              {
                headers: {
                  'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
                  'Content-Type': 'application/json'
                }
              },
              {emulateJSON: true,}
            )
            .then(res => {
              if (res.data.code === "1") {
                window.localStorage.setItem(
                  "announce",
                  JSON.stringify(res.data.token)
                );
                this.$router.replace("/announcePCBlack")
              }else {
                this.$router.push({
                  path: "/"
                });
                this.msg = true;
                console.log("this is fail", res);
              }
            })
            .catch(err => {
              this.$notify({
                title: "删除失败",
                message: "服务器请求失败，请检查网络或联系管理员",
                type: "error"
              });
              console.log(err);
            });
        }
      },
      add: function () {
        if (this.text === "") {
          this.notnull = true;
        } else {
          console.log("the msg is ", this.text)
          this.$http
            .post(
              "/notice/addNotice",
              {
                text: this.text
              },
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
                  "announce",
                  JSON.stringify(res.data.token)
                );
                this.$router.push({
                  path: "/announcePCBlack"
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
        }
      },
      select: function () {
        this.$http
          .post(
            "/notice/findNotice",
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
                "announce",
                JSON.stringify(res.data.token)
              );
              this.data = res.data.data;
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
