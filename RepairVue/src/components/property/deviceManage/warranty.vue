<!-- 一键报修主页-->
<template>
  <div>
    <van-row class="header" type="flex" justify="space-between" style="">
      <van-col span="4">
        <router-link to="/index">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="8" offset="2">一键报修</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <el-tabs type="card" class="el-tabs" :stretch="true">
      <el-tab-pane label="报修管理" class="el-tab-pane">
      <el-table
        :data="data1.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
          label="设备名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="设备地址"
          prop="address">
        </el-table-column>
        <el-table-column
          width="135"
          align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              style="padding: 0"
              prefix-icon="el-icon-search"
              placeholder="关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <router-link :to="{ name: 'warrantyMes', params: { elementId: scope.row.id }}">
              <el-button size="mini" type="primary" icon="el-icon-edit" class="input-group">一键报修</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      </el-tab-pane>
      <el-tab-pane label="维修工单管理" class="el-tab-pane">
        <el-table
          :data="data2.filter(data => !search || data.equipment.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
          <el-table-column
            label="设备名称"
            prop="equipment.name">
          </el-table-column>
          <!--当遇到需要用到表中源数据的数字来作为某些文字状态的下标时，采用如下方法-->
          <el-table-column
            label="维修状态"
            prop="state"
            :formatter="formatState"
          >
          </el-table-column>
          <el-table-column
            width="135"
            align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                style="padding: 0"
                prefix-icon="el-icon-search"
                placeholder="关键字搜索"/>
            </template>
            <template slot-scope="scope">
                <router-link :to="{ name: 'repair1', params: { repairId: scope.row.id }}"> <el-button size="mini" type="primary" class="input-group">维修工单详情</el-button></router-link>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style>
  .el-tabs--border-card>.el-tabs__content{
    padding: 15px;
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
</style>

<script>
  export default {

    data() {
      return {
        data1:[],
        data2:[],
        search: '',
        showFlag: false,
        radio: "",
        equipmentId:'',
        state1:[
          "正常",
          "维修中",
          "维修工确认",
          "派出维修工",
          "故障",
        ]
      }

    },
    created(){
      this.select();
      this.select1();
    },
    methods: {
      // 格式化state，让其由数字转为文字
      formatState(row){
        return this.state1[row.state];
      },
      errmiss: function () {
        if (this.msg === true || this.notnull === true) {
          this.msg = false;
          this.notnull = false;
        }
      },
      select1: function () {
        this.$http
          .post(
            "/actionLog/findActionLogByWyUsername",
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
                "actionLog",
                JSON.stringify(res.data.token)
              );
              this.data2 = res.data.data;
              console.log("data2",this.data2);
            } else {
              this.$router.push({
                path: "/"
              });
              this.msg = true;
              console.log("this is fail", res);
            }
          })
          .catch(err => {
            // this.$notify({
            //   title: "访问失败",
            //   message: "服务器请求失败，请检查网络或联系管理员",
            //   type: "error"
            // });
            console.log(err);
          });
      },
      select: function () {
        this.$http
          .post(
            "/equipment/findByWyUsername",
            {},
            {
              headers: {
                'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
                'Content-Type': 'application/json'
              }
            },
          )
          .then(res => {
            if (res.data.code === "1") {
              this.data1 = res.data.data;
              console.log("data1",res.data.data);

            } else {

            }
          })
          .catch(err => {
            // this.$notify({
            //   title: "访问失败",
            //   message: "服务器请求失败，请检查网络或联系管理员",
            //   type: "error"
            // });
            console.log("!"+err);
          });
      }
    }
  }
</script>

