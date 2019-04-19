<!-- 公告管理-->
<template>
  <div>
    <van-row type="flex" class="header" justify="space-between">
      <van-col span="4">
        <router-link to="/index">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="10" offset="2">公告管理</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <el-tabs type="card" class="el-tabs" :stretch="true">
      <el-tab-pane label="公告管理" class="el-tab-pane">
      <!--<el-table-->
        <!--ref="filterTable"-->
        <!--:data="data1.filter(data => !search || data.text.toLowerCase().includes(search.toLowerCase()))"-->
        <!--style="width: 100%">-->
        <!--<el-table-column-->
          <!--prop="text"-->
          <!--label="公告内容"-->
          <!--&gt;-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--align="right">-->
          <!--<template slot="header" slot-scope="scope">-->
            <!--<el-input-->
              <!--v-model="search"-->
              <!--size="mini"-->
              <!--prefix-icon="el-icon-search"-->
              <!--style="padding: 0"-->
              <!--placeholder="输入关键字搜索"/>-->
          <!--</template>-->
          <!--<template slot-scope="scope">-->
            <!--&lt;!&ndash;<router-link :to="{ name: 'announceEdit', params: { announceId: scope.row.id }}">&ndash;&gt;-->
              <!--&lt;!&ndash;<el-button size="mini" type="primary" icon="el-icon-edit" class="input-group">编辑</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
            <!--<el-button type="primary" size="mini" icon="el-icon-delete" class="input-group" @click="del(scope.row.id)">删除</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      <!--</el-table>-->
        <div v-for="(noti,index) in data1" :key=index v-if="!showNotice[index]" style="font-size: 0.3rem">
          <van-row>
            <van-col span="1" offset="1" style="text-align: right">
              <div style="height: 3em;">
                <img src="../../../assets/Company/icon_fill_.png" alt="" style="width: 2em;margin-top: 0.5em">
              </div>
            </van-col>
            <van-col span="19">
              <div  @click="open(noti.text)">
                <van-notice-bar :text="noti.text" background="white" color="black" style="padding:0;width: 100%;"/>
              </div>
            </van-col>
            <van-col span="2" offset="1">
              <div style="height: 3em;" @click="del(noti,index)">
                <van-icon name="close" size="1em" style="font-weight: bold;margin-top: 1em"/>
              </div>
            </van-col>
          </van-row>

        </div>
      </el-tab-pane>
      <el-tab-pane label="添加公告" class="el-tab-pane">
        <el-input class="input-group" v-model="text" placeholder="公告内容">
        </el-input>
        <el-button type="primary" class="input-group btn-login" @click="add">提交公告</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
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
  .el-message-box--center{
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
</style>
<script>
  export default {
    data() {
      return {
        data1:[],
        text: '',
        search: '',
        radio: "",
        showNotice:[],

      }
    },
    created(){
      this.select()
    },
    methods: {
      // 显示公告
      open(v) {
        this.$alert(v, '公告',{center: true})
      },
      // 删除公告
      del: function (v,i) {
        if (v.id === "") {
          this.notnull = true;
        } else {
          this.$http
            .post(
              "/notice/delNotice",
              {id: v.id},
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
                this.$router.replace("/announceBlack")
              }else {
                this.$router.push({
                  path: "/index"
                });
                this.msg = true;
                console.log("this is fail", res);
                this.$toast(res.data.msg);

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
                this.$toast.success("添加成功")
                window.localStorage.setItem(
                  "announce",
                  JSON.stringify(res.data.token)
                );
                this.$router.push({
                  path: "/index"
                });
              } else {
                this.$router.push({
                  path: "/index"
                });
                this.msg = true;
                console.log("this is fail", res);
                this.$toast(res.data.msg);

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
              console.log("公告",res);
              window.localStorage.setItem(
                "announce",
                JSON.stringify(res.data.token)
              );
              this.data1 = res.data.data;
            } else {
              this.$router.push({
                path: "/index"
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
