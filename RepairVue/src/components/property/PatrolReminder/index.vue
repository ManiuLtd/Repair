<template>
  <div>
    <van-row class="header" type="flex" justify="space-between" style="">
      <van-col span="4">
        <router-link to="/index">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="10" offset="2">巡检工单管理</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <el-tabs type="card" class="el-tabs">
      <!--<el-tab-pane label="巡检工单管理" class="el-tab-pane" :stretch="true">-->
        <!--物业对巡检工单信息的展现 -->
        <el-table
          :data="data1.filter(data => !search || data.equipment.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
          <el-table-column
            label="设备名称"
            prop="equipment.name">
          </el-table-column>
          <el-table-column
            label="维保企业"
            prop="wbqy.name">
          </el-table-column>
          <el-table-column
            width="135"
            align="right"
            prop="id">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                style="padding: 0"
                prefix-icon="el-icon-search"
                placeholder="关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <router-link :to="{ name: 'PatrolReminderSelect', params: { xjgdId: scope.row.id }}">
                <el-button size="mini" type="primary" class="input-group">巡检工单查看</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      <!--</el-tab-pane>-->
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
  .input-group {
    margin-top: 2%;
  }
</style>
<script>
  export default {
    data() {
      return {
        data1:[],
        search: '',
        message: "巡检工单信息数据",
        msg: false,
        notnull: false
      }
    },
    created(){
      this.select();
    },
    methods: {
      select: function () {
          this.$http.post(
              "/polling/selectPollingLogByWY",
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
                  "xjgd",
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
