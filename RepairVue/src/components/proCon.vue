<template>
  <div id="proCon">
    <div>
      <van-row type="flex" class="header" justify="space-between">
        <van-col span="4">
          <router-link to="managePro">
            <van-icon name="arrow-left" size="1em" color="white"/>
          </router-link>
        </van-col>
        <van-col span="8" offset="2">{{comName}}</van-col>
        <van-col span="6"></van-col>
      </van-row>
    </div>
    <van-tabs v-model="active">
      <van-tab title="合同内容">
        <van-cell-group style="padding-top: 1em;">
          <van-field
            disabled
            label="合作企业"
            v-model="comName"
          />

          <van-field
            disabled
            label="合作内容"
            type="textarea"
            v-model="proCon"
            rows="3" autosize
          />
          <van-field
            disabled
            label="开始时间"
            v-model="startTime"
          />
          <van-field
            disabled
            label="结束时间"
            v-model="endTime"
          />
          <van-field
            disabled
            label="负责人"
            v-model="person"

          />
          <van-field
            disabled
            label="联系电话"
            v-model="phone"

          />
          <van-field
            disabled
            label="付款方式"
            v-model="payWay"

          />
          <van-field
            disabled
            label="付款时间"
            v-model="payTime"

          />
        </van-cell-group>
      </van-tab>
      <van-tab title="维保设备">
        <!--<van-row style="margin-top: 1em">-->
        <!--<van-col span="8">-->
        <!--<el-dropdown @command="handleCommand">-->
        <!--<span class="el-dropdown-link">-->
        <!--维保设备<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
        <!--</span>-->
        <!--<el-dropdown-menu slot="dropdown">-->
        <!--<el-dropdown-item v-show="!equipment.length">空</el-dropdown-item>-->
        <!--<el-dropdown-item v-for="(equip,index) in equipment" :key="index" :command="equip.id">{{equip.name}}<span v-if="equip.wxg">({{equip.wxg.name}})</span></el-dropdown-item>-->
        <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->

        <!--</van-col>-->
        <!--</van-row>-->
        <el-alert
          title="没有维保设备"
          type="info"
          center
          show-icon
          v-if="!equipment.length">
        </el-alert>

        <div v-for="(equip,index) in equipment" :key="index" @click="writeWxg(equip.id)">
          <van-panel :title="equip.name" :status="equip.wxg==null ? null : equip.wxg.name"
                     style="text-align: left;padding-left: 1em;">
          </van-panel>
        </div>
      </van-tab>
    </van-tabs>

    <van-popup v-model="show" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        title="请设置默认技师"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
  export default {
    created() {
      this.getProDataEnd();
      this.getSelfData();
      this.getWokerData();
    },
    data() {
      return {
        proData2: '',
        comName: '',
        proCon: '',
        startTime: '',
        endTime: '',
        person: '',
        payWay: '',
        payTime: '',
        id: '',
        id1: '',
        equipment: "",
        show: false,
        fixerData: '',
        columns: [],
        active: 2,
        phone:''
      }
    },
    methods: {
      // 保存点击设备的id，设置show拉起底部技师选择框
      writeWxg(v) {
        this.show = true;
        this.id1 = v;
      },
      getWokerData() {
        this.$http.post("/user/findWXGsByWBQYUsername", {}, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          console.log("维修工信息", res);
          this.fixerData = res.data.data;
          // 用forEach方法遍历数组
          this.fixerData.forEach(item => {
            // 把name用push方法依次放在数组的末尾  push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
            this.columns.push(item.name);
          })
        }).catch((error) => {
          console.log(error);
        })
      },
      onConfirm(value, index) {
        this.show = false;
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http.post("/equipment/setDefaultWXG", {
          "equipmentId": this.id1,
          "wxgId": this.fixerData[index].id
        }, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          // console.log("点击维修工号",this.fixerData[this.index].id);

          loading.close();
          if (res.data.code == 1) {
            this.$toast.success('设置成功');
            this.getSelfData();
            console.log("设置成功", res);
          } else {
            this.$toast.fail('设置失败');
            console.log("设置失败", res);
          }

        }).catch((error) => {
          console.log(error);
        })
      },
      onCancel() {
        this.show = false;
      },
      // 发起网络请求,查询该物业与维保企业的所有维保设备
      getSelfData() {
        console.log("id", this.id);

        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/equipment/findByWBQYUsernameAndWYId", {
          "wyid": this.id
        }, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          console.log("维保设备", res.data.data);
          this.equipment = res.data.data;
        }).catch((error) => {
          console.log(error);
        })
      },
      // 接收上个组件发送的信息，并赋值
      getProDataEnd() {
        console.log("11111", this.$route.query.proDatax);
        this.proData2 = this.$route.query.proDatax;
        this.comName = this.proData2.wy.name;
        this.proCon = this.proData2.content;
        this.startTime = this.proData2.startDate;
        this.endTime = this.proData2.endDate;
        this.person = this.proData2.fuzeren;
        this.payWay = this.proData2.fukuanfangshi;
        this.payTime = this.proData2.fukuanshijian;
        this.id = this.proData2.wy.id;
        this.phone = this.proData2.phone;
      },
      // 点击返回到上个组件
      clickH() {
        this.$router.replace({path: '/managePro'});
      }
    }

  }
</script>
<style scoped>
  .van-nav-bar .van-icon {
    margin-top: -10px;
    margin-left: 10px;
  }
  .van-cell__title{
    max-width: 7em;
  }

</style>

