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
                <el-tab-pane label="设备管理" class="el-tab-pane">
                  <!--物业对设备管理信息的展现 -->
                  <el-table
                    :data="data1.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                          <el-form-item label="设备编号">
                            <span>{{ props.row.id }}</span>
                          </el-form-item>
                          <el-form-item label="设备名称">
                            <span>{{ props.row.name }}</span>
                          </el-form-item>
                          <el-form-item label="设备类型">
                            <span>{{ props.row.type }}</span>
                          </el-form-item>
                          <el-form-item label="设备描述">
                            <span>{{ props.row.miaoshu }}</span>
                          </el-form-item>
                          <el-form-item label="设备属性" :formatter="formatState"
                          >
                            <span>{{ state[props.row.isTeZhongSheBei] }}</span>
                          </el-form-item>
                          <el-form-item label="规格型号">
                            <span>{{ props.row.version }}</span>
                          </el-form-item>
                          <el-form-item label="设备地址">
                            <span>{{ props.row.address }}</span>
                          </el-form-item>
                          <el-form-item label="归属部门">
                            <span>{{ props.row.bumeng }}</span>
                          </el-form-item>
                          <el-form-item label="维保单位">
                            <span>{{ props.row.wbqy.name }}</span>
                          </el-form-item>
                        </el-form>
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="设备名称"
                      prop="name">
                    </el-table-column>
                    <el-table-column
                      label="设备地址"
                      prop="address">
                    </el-table-column>
                    <el-table-column
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
                        <router-link :to="{ name: 'elementPCEdit', params: { elementId: scope.row.id }}">
                          <el-button size="mini" type="primary" icon="el-icon-edit" class="input-group">编辑</el-button>
                        </router-link>
                        <el-button type="primary" size="mini" icon="el-icon-delete" class="input-group" @click="del(scope.row.id)" :loading="loading">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              <el-tab-pane label="添加设备">
                <!--equipmentAdd-->
                <div style="margin-top:30px;padding:10px ;">
                  <div class="title">
                    <h2>设备添加</h2>
                  </div>
                  <el-input class="input-group" v-model="code" placeholder="设备编号">
                  </el-input>
                  <el-input class="input-group" v-model="name" placeholder="设备名称"/>
                  <!--</el-input>-->
                  <!--<el-input class="input-group" v-model="isTeZhongSheBei" placeholder="设备属性">-->
                  <!--</el-input>-->
                  <el-select v-model="value" placeholder="设备属性" style="width: 100%;margin-top: 2%">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-input class="input-group" v-model="type" placeholder="设备类型">
                  </el-input>
                  <el-input class="input-group" v-model="miaoshu" placeholder="设备描述">
                  </el-input>
                  <el-input class="input-group" v-model="version" placeholder="规格型号">
                  </el-input>
                  <el-input class="input-group" v-model="address" placeholder="设备地址">
                  </el-input>
                  <el-input class="input-group" v-model="bumeng" placeholder="归属部门">
                  </el-input>
                  <el-input class="input-group" v-model="wbqy" placeholder="维保单位">
                  </el-input>
                  <el-input class="input-group" v-model="neiron">
                  </el-input>
                  <el-button type="primary" class="input-group btn-login" @click="add">提交</el-button>
                </div>
              </el-tab-pane>
                <el-tab-pane label="巡检计划管理">
                  <div style="margin-top:30px;padding:10px ;">
                    <el-table
                      :data="data1.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                      style="width: 100%">
                      <el-table-column
                        label="设备名称"
                        prop="name">
                      </el-table-column>
                      <el-table-column
                        label="维保企业"
                        prop="wbqy.name">
                      </el-table-column>
                      <el-table-column
                        align="right">
                        <template slot="header" slot-scope="scope">
                          <el-input
                            v-model="search"
                            size="mini"
                            style="padding: 0;"
                            prefix-icon="el-icon-search"
                            placeholder="关键字搜索"/>
                        </template>
                        <template slot-scope="scope">
                          <router-link :to="{ name: 'equipmentPCXjPlan', params: { elementId: scope.row.id }}">
                            <el-button size="mini" type="primary" icon="el-icon-edit" class="input-group">批复</el-button>
                          </router-link>
                        </template>
                      </el-table-column>
                    </el-table>
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
  .demo-table-expand {
    font-size: 0;
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
        data1:[],
        search: '',
        activeName: 'second',
        code: '',
        name: '',
        isTeZhongSheBei: '',
        type: '',
        miaoshu: '',
        version: '',
        address: '',
        bumeng: '',
        wbqy: '',
        neiron:'',
        message: "设备信息数据",
        msg: false,
        notnull: false,
        loading:false,
        state:[
          '普通设备',
          '特种设备'
        ],
        options:[
          {
            value:0,
            label:'普通设备'
          },{
            value:1,
            label:'特种设备'
          },
        ],
        value:'',
      }

    },
    created(){
      this.select()
    },
    methods: {
      // 格式转换
      formatState(row){
        return this.state[row.isTeZhongSheBei];
      },
      del: function (id) {
        if (id === "") {
          this.notnull = true;
        } else {
          console.log("the msg is", id);
          this.loading = true;
          this.$http
            .post(
              "/equipment/delEquipment",
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
              this.loading = false;
              if (res.data.code === "1") {
                window.localStorage.setItem(
                  "equipment",
                  JSON.stringify(res.data.token)
                );
                this.$toast("删除成功");
                this.$router.replace("/devicePCBlack")
              }else {
                this.$toast(res.data.msg);
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
        if (this.code === "" || this.name === "") {
          this.notnull = true;
        } else {
          this.$http
            .post(
              "/equipment/addEquipment",
              {
                code: this.code,
                name: this.name,
                isTeZhongSheBei: this.value,
                type: this.type,
                miaoshu: this.miaoshu,
                version: this.version,
                address: this.address,
                bumeng: this.bumeng,
                wbqy: {"id": this.wbqy}
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
                  "equipment",
                  JSON.stringify(res.data.token)
                );
                this.$router.replace("/devicePCBlack")
              } else {

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
              "/equipment/findByWyUsername",
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
              console.log("全部设备",res);
              if (res.data.code === "1") {
                window.localStorage.setItem(
                  "equipment",
                  JSON.stringify(res.data.token)
                );
                this.data1 = res.data.data;
              } else {

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
      },
  }
</script>
