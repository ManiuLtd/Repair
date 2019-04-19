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
              <el-tab-pane label="投诉管理" class="el-tab-pane">
                <el-table
                  ref="filterTable"
                  :data="data.filter(data => !search || data.equipment.name.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%">
                  <el-table-column
                    prop="startTime"
                    label="报修时间"
                    sortable
                    width="110"
                    column-key="date">
                  </el-table-column>
                  <el-table-column
                    prop="equipment.name"
                    label="设备名称"
                    width="90">
                  </el-table-column>
                  <!--<el-table-column
                    prop="equipment.name"
                    label="地址"
                    :formatter="formatter">
                  </el-table-column>-->
                  <el-table-column
                    width="140"
                    align="right">
                    <template slot="header" slot-scope="scope">
                      <el-input
                        v-model="search"
                        size="mini"
                        placeholder="关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                      <router-link :to="{ name: 'repairPC', params: { repairId: scope.row.id }}">维修工单详情</router-link>;
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

<style>
  .el-tabs--border-card>.el-tabs__content{
    padding: 15px;
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
