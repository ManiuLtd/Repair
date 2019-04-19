<template>
  <div>
    <van-row type="flex" class="header" justify="space-between">
      <van-col span="4">
        <router-link to="/index">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="8" offset="2">投诉管理</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <el-tabs type="border-card" class="el-tabs">
      <!--<el-tab-pane label="投诉管理" class="el-tab-pane">-->
        <el-table
          ref="filterTable"
          :data="data.filter(data => !search || data.equipment.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
          <el-table-column
            prop="startTime"
            label="报修时间"
            style="width: 6em"
            show-overflow-tooltip
            sortable
            column-key="date">
          </el-table-column>
          <el-table-column
            style="width: 4em"
            prop="equipment.name"
            label="设备名称"
            >
          </el-table-column>
          <!--<el-table-column
            prop="equipment.name"
            label="地址"
            :formatter="formatter">
          </el-table-column>-->
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
              <router-link :to="{ name: 'repair', params: { repairId: scope.row.id }}"><el-button size="mini" type="primary" class="input-group">维修工单详情</el-button></router-link>
            </template>
          </el-table-column>
        </el-table>
      <!--</el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<style>
  .el-tabs--border-card>.el-tabs__content{
    padding: 15px;
  }
</style>
<script>
  export default {
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
      select: function () {
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
              console.log("维修工单", res);
              window.localStorage.setItem(
                "actionLog",
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
