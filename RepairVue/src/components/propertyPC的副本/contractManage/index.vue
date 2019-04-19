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
              <el-tab-pane label="合同管理" class="el-tab-pane">
                <!--物业所对应的合同展示 -->
                <el-table
                  :data="data.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%">
                  <el-table-column
                    label="序号"
                    width="90"
                    prop="id">
                  </el-table-column>
                  <el-table-column
                    label="合同内容"
                    width="90"
                    prop="content">
                  </el-table-column>
                  <el-table-column
                    width="135"
                    align="right">
                    <template slot="header" slot-scope="scope">
                      <el-input
                        v-model="search"
                        size="mini"
                        placeholder="关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                      <router-link :to="{ name: 'contractPCEdit', params: { contractId: scope.row.id }}">
                        <el-button size="mini" type="primary" icon="el-icon-edit" class="input-group">编&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp辑</el-button>
                      </router-link>
                      <router-link :to="{ name: 'contractPCSelect', params: { contractId: scope.row.id }}">
                        <el-button size="mini" type="primary" icon="el-icon-edit" class="input-group">合同详情</el-button>
                      </router-link>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="添加合同">
                <!--equipmentAdd-->
                <div style="margin-top:30px;padding:10px ;">
                  <div class="title">
                    <h2>添加合同</h2>
                  </div>
                  <el-input class="input-group" v-model="wbqy" placeholder="维保企业">
                  </el-input>
                  <el-input class="input-group" v-model="content" placeholder="合同内容">
                  </el-input>
                  <el-input class="input-group" type="date" v-model="startDate" placeholder="开始日期">
                  </el-input>
                  <el-input class="input-group" type="date" v-model="endDate" placeholder="结束日期">
                  </el-input>
                  <el-input class="input-group" v-model="fuzeren" placeholder="负责人">
                  </el-input>
                  <el-input class="input-group" v-model="fukuanfangshi" placeholder="付款方式">
                  </el-input>
                  <el-input class="input-group" type="date" v-model="fukuanshijian" placeholder="付款时间">
                  </el-input>
                  <el-button type="primary" class="input-group btn-login" @click="add">提交</el-button>
                </div>
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
        search: '',
        wbqy: '',
        content: '',
        startDate: '',
        endDate: '',
        fuzeren: '',
        fukuanfangshi: '',
        fukuanshijian: '',
        message: "合同信息数据",
        msg: false,
        notnull: false
      }

    },
    created(){
      this.select()
    },
    methods: {
      add: function () {
        if (this.content === "" || this.fuzeren === "") {
          this.notnull = true;
        } else {
          this.$http
            .post(
              "/user/addContract",
              {
                wbqy: this.wbqy,
                content: this.content,
                startDate: new Date(this.startDate).getTime(),
                endDate: new Date(this.endDate).getTime(),
                fuzeren: this.fuzeren,
                fukuanfangshi: this.fukuanfangshi,
                fukuanshijian: new Date(this.fukuanshijian).getTime()
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
                  "contract",
                  JSON.stringify(res.data.token)
                );
                this.$router.replace("/contractPCBlack")
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
      del: function (id) {
        if (id === "") {
          this.notnull = true;
        } else {
          this.$http
            .post(
              "/contract/"+id,
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
                this.$router.replace("/contractPCBlack")
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
      select: function () {
        this.$http
          .post(
            "/user/wyFindAllContract",
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
                "contract",
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
