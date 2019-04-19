<template>
  <div id="selectA">
    <van-row type="flex" justify="space-between" class="header">
      <van-col span="4">
        <!--如果是直接申请就跳转到主界面，如果是通过工单就跳转到已确认界面-->
        <router-link :to="is == 1 ? '/RepairListFixer/repairListFixer' : '/worker'">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="8" offset="2">申请配件</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <!--v-for后面的这个key是用来区别当前循环到的元素的。绑定上吧还是，不绑定的话有组件复用的问题,会有警告-->
    <van-tabs v-model="active">
      <van-tab title="申请配件">
        <van-collapse v-model="activeName" accordion style="margin-top: 1em" v-for="(partsA,index) in partsAll"
                      :key="index">
          <van-collapse-item :name="index+1" style="margin: 1em 0;">
            <div slot="title" class="title">{{partsA.name}}</div>
            <div slot="right-icon" style="line-height: 3em;font-size: 1em">
              <van-icon name="setting"/>
            </div>
            <van-row type="flex" justify="space-around">
              <!--配件数量点击框-->
              <van-col span="10">
                <van-stepper v-model="partsN[index]"/>
              </van-col>
              <van-col span="4"></van-col>
              <van-col span="6">
                <van-button size="small" @click="reqParts(partsA.id,index)">申请</van-button>
              </van-col>
            </van-row>
          </van-collapse-item>
        </van-collapse>

      </van-tab>
      <van-tab title="申请结果">
        <el-table
          :data="application"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="applicationTime"
            label="申请时间"
            show-overflow-tooltip            >
          </el-table-column>
          <el-table-column
            prop="parts.name"
            label="申请配件"
            >
          </el-table-column>
          <el-table-column
            prop="num"
            label="申请数量">
          </el-table-column>
          <el-table-column
            prop="type"
            :formatter="formatState"
            label="">
          </el-table-column>
        </el-table>
      </van-tab>
    </van-tabs>

    <van-dialog
      v-model="show"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-field
        v-model="username"
        label="物业"
        placeholder="请选择物业"
        @focus="selectWy"
      />
      <van-field
        v-model="password"
        label="设备"
        placeholder="请选择设备"
        @focus="selectWyEquip"
      />
      <van-field
        v-model="beizhu"
        label="备注"
      />
    </van-dialog>
    <van-popup v-model="show1" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        title="物业"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-popup v-model="show2" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        title="设备"
        :columns="columns"
        @cancel="onCancel1"
        @confirm="onConfirm1"
      />
    </van-popup>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        partsAll: '',
        activeName: 1,
        partsN: [],
        listId: '',
        is: 1,
        columns: [],
        show: false,
        show1: false,
        show2: false,
        username: '',
        password: '',
        beizhu: '',
        wy: '',
        wyIndex: '',
        equipments: '',
        equipIndex: '',
        partOne: '',
        numIndex: '',
        active:2,
        application:'',
        instruction:[
          '无',
          '待审核',
          '已批准',
          '未批准',
        ]
      }
    },
    methods: {
      // 点击维修结果重新请求数据，更新界面
      // onClick(){
      //   //查看申请记录
      //   this.$http.post("/parts/wxgFindAllPartsLog", {}, {
      //     headers: {
      //       'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
      //       'Content-Type': 'application/json'
      //     }
      //   }).then((res) => {
      //     loading.close();
      //     console.log("查看申请记录", res);
      //     this.application = res.data.data;
      //   }).catch((error) => {
      //     console.log(error);
      //   })
      // },
      formatState(row){
        return this.instruction[row.type];
      },
      tableRowClassName({row, rowIndex}) {
        if (row.type === 3) {
          return 'warning-row';
        } else if (row.type === 2) {
          return 'success-row';
        }
        return '';
      },

      selectWy() {
        this.show1 = true;
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/user/WBQYfindAllWYHasCooperation", {}, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          loading.close();
          console.log("查询物业", res.data.data);
          this.wy = res.data.data;
          // 赋值为一个空数组以达到清空原数组
          this.columns = [];
          // 用forEach方法遍历数组
          this.wy.forEach(item => {
            // 把name用push方法依次放在数组的末尾  push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
            this.columns.push(item.name);
          })
        }).catch((error) => {
          console.log(error);
        })
      },
      selectWyEquip() {
        if (this.username == '') {
          this.$toast("请先选择物业");
        } else {
          this.show2 = true;
          console.log("物业id" + this.wy[this.wyIndex].id);
          console.log("....")

          // 通过用户选择的物业查询设备
          this.$http.post("/equipment/findByWBQYUsernameAndWYId", {
            // 用选择的索引值当作物业下标，拿到id
            "wyid": this.wy[this.wyIndex].id
          }, {
            headers: {
              'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
              'Content-Type': 'application/json'
            }
          }).then((res) => {
            console.log("!!!!")
            console.log("查询设备", res.data.data);
            this.equipments = res.data.data;
            // 赋值为一个空数组以达到清空原数组
            this.columns = [];
            // 用forEach方法遍历数组
            this.equipments.forEach(item => {
              // 把name用push方法依次放在数组的末尾  push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
              this.columns.push(item.name);
            })
          }).catch((error) => {
            console.log(error);
          })
        }


      },
      // 弹出框确认和取消方法
      beforeClose(action, done) {
        // 确认所填不为空，即发起申请（直接申请）
        if (action === 'confirm') {
          if (this.username == "" || this.password == "") {
            this.$toast("请完善信息");
          } else {
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http.post("/parts/shengqingpeijian", {
              "pid": this.partOne,
              "num": this.partsN[this.numIndex],
              "beizhu": this.beizhu,
              "eid": this.equipments[this.equipIndex].id,
              "partsLogType": "2"
            }, {
              headers: {
                'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
                'Content-Type': 'application/json'
              }
            }).then((res) => {
              loading.close();
              if (res.data.code == 1) {
                this.$toast.success('申请成功');
              } else {
                this.$toast.fail('申请失败');

              }
              console.log("直接申请配件", res);
              this.partsN[this.numIndex] = 1;
            }).catch((error) => {
              console.log(error);
            })
          }
          setTimeout(done, 100);
        } else {
          done();
        }
      },
      //收到sign组件发来的工单id
      getReqParts() {
        this.listId = this.$route.query.selectParts;
      },
      // 发起网络请求 请求所有的配件信息
      getPartsAll() {
        if (this.$route.query.isN) {
          this.is = this.$route.query.isN;
        }
        console.log("is" + this.is);
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/parts/wxgSelectAllParts", {}, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          loading.close();
          console.log("维修工查看配件", res);
          this.partsAll = res.data.data;
        }).catch((error) => {
          console.log(error);
        });
        //查看申请记录
        this.$http.post("/parts/wxgFindAllPartsLog", {}, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          loading.close();
          console.log("查看申请记录", res);
          this.application = res.data.data;
        }).catch((error) => {
          console.log(error);
        })

      },
      //网络请求 申请配件
      reqParts(v, k) {
        this.username = "";
        this.password = "";
        this.beizhu = "";
        if (this.is == 2) {
          // 调起弹出框，填上所需信息，在弹出框的确认中发起申请请求
          this.show = true;
          // 保存所申请的配件id
          this.partOne = v;
          // 携带这个下标值，用于获取此次申请配件数量，在直接申请配件请求中会用到
          this.numIndex = k;
        } else if (this.is == 1) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.$http.post("/parts/shengqingpeijian", {
            "pid": v,
            "num": this.partsN[k],
            "alid": this.listId,
            "partsLogType": this.is
          }, {
            headers: {
              'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
              'Content-Type': 'application/json'
            }
          }).then((res) => {
            loading.close();
            if (res.data.code == 1) {
              this.$toast.success('申请成功');
            } else {
              this.$toast.fail('申请失败');

            }
            console.log("工单申请配件", res);
            this.partsN[k] = 1;
          }).catch((error) => {
            console.log(error);
          })
        }
        // console.log(v);
        // console.log(this.partsN[k]);
        // console.log(this.listId);
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());


      },
      onConfirm(value, index) {
        this.show1 = false;
        // 填补物业名字
        this.username = value;
        // 保存选择索引，当作所选物业下标，用来拿到物业id
        this.wyIndex = index;
        // this.$toast(`当前值：${value}, 当前索引：${index}`);
      },
      onCancel() {
        this.show1 = false;
      },
      onConfirm1(value, index) {
        this.show2 = false;
        // 填补设备名字
        this.password = value;
        // 保存设备下标，拿到设备id，同物业
        this.equipIndex = index;
        // this.$toast(`当前值：${value}, 当前索引：${index}`);
      },
      onCancel1() {
        this.show2 = false;
      }

    },

    created() {
      this.getReqParts();
      this.getPartsAll();
    }
  }
</script>
<style>
  .title {
    line-height: 3em;
    font-size: 0.3rem;
    font-weight: bold;
    text-align: left;
    padding-left: 1em;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
