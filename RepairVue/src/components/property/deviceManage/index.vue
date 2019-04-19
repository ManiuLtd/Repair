<template>
  <div>
    <van-row type="flex" class="header" justify="space-between">
      <van-col span="4">
        <router-link to="/index">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="8" offset="2">设备管理</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <el-tabs type="card" class="el-tabs" :stretch="true">
      <el-tab-pane label="设备管理" class="el-tab-pane">
        <!--物业对设备管理信息的展现 -->
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
              <router-link :to="{ name: 'elementEdit', params: { elementId: scope.row.id }}">
                <el-button size="mini" type="primary" icon="el-icon-edit" class="input-group" style="margin-bottom: 0.5em;
">编辑</el-button>
              </router-link>
              <el-button type="primary" size="mini" icon="el-icon-delete" class="input-group" @click="del(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="添加设备">
        <!--equipmentAdd-->
        <div style="">
          <!--<el-input class="input-group" v-model="code" placeholder="设备编号">-->
          <!--</el-input>-->
          <el-input class="input-group" v-model="name" placeholder="设备名称">
          </el-input>
          <!--<el-input class="input-group" v-model="isTeZhongSheBei" placeholder="设备属性">-->
          <!--</el-input>-->
          <el-select v-model="value" placeholder="设备属性" style="width: 100%;margin-bottom: 2%">
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
          <!--<el-input class="input-group" v-model="wbqy" placeholder="维保单位">-->
            <el-select v-model="value1" placeholder="维保单位" style="width: 100%">
              <el-option
                v-for="item in options1"
                :key="item.index"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>

          <!--</el-input>-->
          <el-button type="primary" class="input-group btn-login" @click="add">提交</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="巡检计划管理">
        <!--equipmentAdd-->
        <div style="">
          <el-table
            :data="data2.filter(data => !search1 || data.equipment.name.toLowerCase().includes(search1.toLowerCase()) || data.wbqy.name.toLowerCase().includes(search1.toLowerCase()))"
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
              align="right">
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="search1"
                  size="mini"
                  style="padding: 0"
                  prefix-icon="el-icon-search"
                  placeholder="关键字搜索"/>
              </template>
              <template slot-scope="scope">
                <router-link :to="{ name: 'equipmentXjPlan', params: { elementId: scope.row.equipment.id }}">
                  <el-button size="mini" type="primary" icon="el-icon-edit" class="input-group">查看</el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style>
  /*.el-tabs--border-card>.el-tabs__content{*/
    /*padding: 0px;*/
  /*}*/
  /*.demo-table-expand {*/
    /*font-size: 0;*/
  /*}*/
  /*.demo-table-expand label {*/
    /*width: 90px;*/
    /*color: #99a9bf;*/
  /*}*/
  /*.demo-table-expand .el-form-item {*/
    /*margin-right: 0;*/
    /*margin-bottom: 0;*/
    /*width: 50%;*/
  /*}*/

  /*.btn-login {*/
    /*width: 100%;*/
  /*}*/

  /*.title {*/
    /*text-align: center;*/
  /*}*/

  .input-group {
    margin-bottom: 2%;
  }
</style>

<script>
  export default {
    data() {
      return {
        data1:[],
        data2:[],
        search: '',
        search1: '',
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
        options1:[],
        value1:'',

      }

    },
    created(){
      this.select();
      this.select2();
      this.select3();
    },
    methods: {
      del: function (id) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        if (id === "") {
          this.notnull = true;
        } else {
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
              loading.close();
              console.log("删除成功", res);
              if (res.data.code === "1") {
                this.$toast.success("删除成功");
                window.localStorage.setItem(
                  "equipment",
                  JSON.stringify(res.data.token)
                );
                this.$router.replace("/deviceBlack")
              }else {
                this.$toast.fail("删除失败");
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

        console.log("设备属性",this.value);
        console.log("维保id",this.value1);
        if (this.value === "" || this.name === "" || this.value1 === '') {
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
              "/equipment/addEquipment",
              {
                // code: this.code,
                name: this.name,
                isTeZhongSheBei: this.value,
                type: this.type,
                miaoshu: this.miaoshu,
                version: this.version,
                address: this.address,
                bumeng: this.bumeng,
                wbqy: {"id": this.value1}
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
              loading.close();
              console.log("添加设备",res);
              if (res.data.code === "1") {
                this.$toast.success("添加成功");
                window.localStorage.setItem(
                  "equipment",
                  JSON.stringify(res.data.token)
                );
                this.$router.push({
                  path: "/deviceBlack"
                });

              } else {
                this.$toast.fail("添加失败");
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
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
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
            loading.close();
            console.log("全部设备", res);
            if (res.data.code === "1") {
              window.localStorage.setItem(
                "equipment",
                JSON.stringify(res.data.token)
              );
              this.data1 = res.data.data;
              console.log('data1',this.data1);
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
              title: "访问失败1",
              message: "服务器请求失败，请检查网络或联系管理员",
              type: "error"
            });
            console.log(err);
          });
        },
      select3: function () {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
          this.$http
            .post(
              "/user/wyFindNotOutOfDateContract",
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
              loading.close();
              console.log("全部合同", res.data.data);
              if (res.data.code === "1") {
                window.localStorage.setItem(
                  "equipment",
                  JSON.stringify(res.data.token)
                );

                res.data.data.forEach(item=>{
                  this.options1.push({value:item.wbqy.id,name:item.wbqy.name})
                });
                console.log("option2",this.options1)

                // 数组去重
                this.options1.forEach((item,index)=>{
                  // 遍历数组，让其每一个元素与数组中下标在它后面的的元素比较
                  for (let i = index+1;i<this.options1.length;i++){
                    // id相同即删掉后一个元素
                    if(item.value == this.options1[i].value){
                      this.options1.splice(i,1);
                      // splice删除后，数组会自动往前堆叠，下一个会移到上一个被删除元素的位置
                      i-=1;
                    }
                  }
                })
                console.log("option1",this.options1)
              } else {
                // this.$router.push({
                //   path: "/"
                // });
                this.msg = true;
                console.log("this is fail", res);
              }
            })
            .catch(err => {
              // 下次这里再出错，就去看看合同里的物业信息是不是都有，且添加合同那里的物业信息，我感觉应该加一个接口，判断是否有这个用户名，才能提交添加合同
              this.$notify({
                title: "访问失败2",
                message: "服务器请求失败，请检查网络或联系管理员",
                type: "error"
              });
              console.log(err);
            });
        },
      select2: function () {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
          this.$http
            .post(
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
              loading.close();
              console.log("巡检工单", res);
              if (res.data.code === "1") {
                window.localStorage.setItem(
                  "equipment",
                  JSON.stringify(res.data.token)
                );
                this.data2 = res.data.data;
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
                title: "访问失败3",
                message: "服务器请求失败，请检查网络或联系管理员",
                type: "error"
              });
              console.log(err);
            });
        }
      }
  }
</script>
