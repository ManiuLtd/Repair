<template>
  <div id="indexPro">
    <div style="">
      <van-row class="header" type="flex" justify="space-between" style="">
        <van-col span="4">
          <router-link to="/index">
            <van-icon name="arrow-left" size="1em" color="white"/>
          </router-link>
        </van-col>
        <van-col span="8" offset="2">项目管理</van-col>
        <van-col span="6"></van-col>
      </van-row>
      <!--<van-icon name="edit" size="25px" slot="right" @click-right="clickHright"/>-->
    </div>
    <!--<div class="van-hairline&#45;&#45;bottom">-->
      <!--<van-tabs color="chocolate">-->
        <!--<van-tab>-->
          <!--<div slot="title">-->
            <!--<router-link to="/partsManage/partsAddMessage">合同管理</router-link>-->
          <!--</div>-->
        <!--</van-tab>-->
        <!--<van-tab>-->
          <!--<div slot="title">-->
            <!--<router-link to="/partsManage/partsReq">添加合同</router-link>-->
          <!--</div>-->
        <!--</van-tab>-->
      <!--</van-tabs>-->
    <!--</div>-->
    <el-tabs type="card" class="el-tabs" :stretch="true">
      <el-tab-pane label="合同管理">
        <!--物业所对应的合同展示 -->
        <el-table
          :data="data1.filter(data => !search || data.content.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            >
          </el-table-column>
          <el-table-column
            label="合同内容"
            prop="content">
          </el-table-column>
          <el-table-column
            width="135"
            align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="关键字"
                style="padding: 0"
                prefix-icon="el-icon-search"

              />

            </template>
            <template slot-scope="scope">
              <div style="width: 7em">
                <router-link :to="{ name: 'contractEdit', params: { contractId: scope.row.id }}">
                  <el-button size="mini" type="primary" icon="el-icon-edit" class="input-group" style="width: 100%">编辑</el-button>
                </router-link>
              </div>
              <div style="margin-top: 3%;width: 7em;">
                <router-link :to="{ name: 'contractSelect', params: { contractId: scope.row.id }}">
                  <el-button size="mini" type="primary" icon="el-icon-edit" class="input-group" style="width: 100%;">合同详情</el-button>
                </router-link>
              </div>

            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="添加合同">
        <!--equipmentAdd-->
        <div style="">
          <!--<div class="title">-->
            <!--<h2>添加合同</h2>-->
          <!--</div>-->
          <el-input class="input-group" v-model="wbqy" placeholder="维保企业用户名">
          </el-input>
          <el-input class="input-group" v-model="content" placeholder="合同内容">
          </el-input>
            <el-date-picker
              v-model="startDate"
              type="date"
              size="large"
              placeholder="开始日期" style="width: 100%;"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>



          <!--<el-input class="input-group" type="date" v-model="startDate" placeholder="开始日期">-->
          <!--</el-input>-->
          <el-date-picker
            v-model="endDate"
            type="date"
            size="large"
            placeholder="结束日期" style="width: 100%;"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
          <!--<el-input class="input-group" type="date" v-model="endDate" placeholder="结束日期">-->
          <!--</el-input>-->
          <el-input class="input-group" v-model="fuzeren" placeholder="负责人">
          </el-input>
          <el-input class="input-group" v-model="phone" placeholder="联系人电话">
          </el-input>
          <el-input class="input-group" v-model="fukuanfangshi" placeholder="付款方式">
          </el-input>
          <el-date-picker
            v-model="fukuanshijian"
            type="date"
            size="large"
            placeholder="付款日期" style="width: 100%;"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
          <!--<el-input class="input-group" type="date" v-model="fukuanshijian" placeholder="付款时间">-->
          <!--</el-input>-->
          <el-button type="warning" class="input-group btn-login" @click="add" style="margin-top: 1em">提交</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style>


</style>

<script>

  export default {

    data() {
      return {
        start:'开始',
        data1:[],
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
        notnull: false,
        phone:'',

      }

    },
    created(){
      this.select()
    },
    methods: {
      add: function () {
        // console.log(this.wbqy);
        // console.log(this.content);
        // console.log(new Date(this.startDate).getTime());
        // console.log(new Date(this.endDate).getTime());
        // console.log(this.fuzeren);
        // console.log(this.fukuanfangshi);
        // console.log(new Date(this.fukuanshijian).getTime());
        // 网络请求延迟界面
        if (this.content === "" || this.fuzeren === "" || this.startDate === '' || this.endDate==='' || this.fukuanshijian==='' || this.wbqy==='') {
          this.$toast("请完善信息");
          this.notnull = true;
        } else {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
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
                fukuanshijian: new Date(this.fukuanshijian).getTime(),
                phone:this.phone,
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
              console.log("提交成功",res);
              loading.close();
              if (res.data.code === "1") {
                this.$toast.success('提交成功');
                window.localStorage.setItem(
                  "contract",
                  JSON.stringify(res.data.token)
                );
                this.$router.push({
                  path: "/contractBlack"
                });
              } else {
                console.log("失败",res);
                this.$toast(res.data.msg);
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
                this.$router.replace("/contractBlack")
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
              console.log("this is success", res);

              this.data1 = res.data.data;
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
