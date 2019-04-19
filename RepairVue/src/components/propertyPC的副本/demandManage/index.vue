<!-- 需求管理-->
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
              <el-tab-pane label="需求管理" class="el-tab-pane">
              <el-table
                ref="filterTable"
                :data="data.filter(data => !search || data.text.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
                <el-table-column
                  prop="title"
                  label="标题"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="addDate"
                  label="发布时间"
                  width="100">
                </el-table-column>
                <el-table-column
                  align="right">
                  <template slot="header" slot-scope="scope">
                    <el-input
                      v-model="search"
                      size="mini"
                      placeholder="关键字搜索"/>
                  </template>
                  <template slot-scope="scope">
                    <router-link :to="{ name: 'demandPCEdit', params: { demandId: scope.row.id }}">
                      <el-button size="mini" type="primary" icon="el-icon-edit" class="input-group">编辑</el-button>
                    </router-link>
                    <el-button type="primary" size="mini" icon="el-icon-delete" class="input-group" @click="del(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              </el-tab-pane>
              <el-tab-pane label="添加需求" class="el-tab-pane">
                <div class="title">
                  <h2>添加需求</h2>
                </div>
                <el-form ref="form" label-width="80px" size="mini">
                  <el-input class="input-group" v-model="title" placeholder="标题">
                  </el-input>
                  <el-input class="input-group" v-model="content" placeholder="内容">
                  </el-input>
                  <!--<el-input class="input-group" v-model="pic" placeholder="图片">
                  </el-input>-->
                  <!--<el-form-item label="限定区域">
                    <el-radio-group v-model="sizeForm.resource" size="medium">
                      <el-radio border label="省份"></el-radio>
                      <el-radio border label="市"></el-radio>
                    </el-radio-group>
                  </el-form-item>-->
                  <el-input class="input-group" v-model="area" placeholder="区域">
                  </el-input>
                  <el-button type="primary" class="input-group btn-login" @click="add()">发布需求</el-button>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="报价记录管理" class="el-tab-pane">
                <el-table
                  ref="filterTable"
                  :data="data1.filter(data1 => !search || data1.requirement.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%">
                  <el-table-column
                    prop="requirement.title"
                    label="竞价的项目"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="wbqy.username"
                    label="	报价的维保企业"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    align="right">
                    <template slot="header" slot-scope="scope">
                      <el-input
                        v-model="search"
                        size="mini"
                        placeholder="关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                      <router-link :to="{ name: 'quotePCSelect', params: { quoteId: scope.row.id }}">
                        <el-button size="mini" type="primary" icon="el-icon-edit" class="input-group">报价详情</el-button>
                      </router-link>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import three from '../three'
  export default {
    components:{
      three
    },
    data() {
      return {
        data:[],
        data1:[],
        title:'',
        pic:'',
        content:'',
        area:'',
        search: '',
        radio: "",
      }
    },
    created(){
      this.select();
      this.select1();
    },
    methods: {
      add: function () {
        if (this.title === "") {
          this.notnull = true;
        } else {
          this.$http
            .post(
              "/auction/wyPublishRequirement",
              {

                title: this.title,
                content: this.content,
                area:this.area
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
                  "demand",
                  JSON.stringify(res.data.token)
                );
                this.$router.push({
                  path: "/demandPCBlack"
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
      select1: function () {
        this.$http
          .post(
            "/auction/wyViewAuction",
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
                "quote",
                JSON.stringify(res.data.token)
              );
              this.data1 = res.data.data;
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
      },
      select: function () {
        this.$http
          .post(
            "/auction/wyViewRequirement",
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
                "demand",
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
