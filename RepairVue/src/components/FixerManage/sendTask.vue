<template>
  <div id="sendT">
    <div class="container-fluid" @click="sendRep(rep,index)" v-for="(rep,index) in RepairList" v-if="rep.state>0">
      <van-row>
        <van-col span="8">维修状态：</van-col>
        <van-col span="13" offset="2"><span>{{state[rep.state-1]}}</span></van-col>
      </van-row>
      <van-row style="margin-top: 1em">
        <van-col span="8">维修时间：</van-col>
        <van-col span="16"><span>{{rep.startTime}}</span></van-col>
      </van-row>
      <van-row style="margin-top: 1em">
        <van-col span="8">设备名称：</van-col>
        <van-col span="13" offset="2"><span>{{rep.equipment.name}}</span></van-col>
      </van-row>
      <van-row style="margin-top: 1em" v-if="rep.wxg==null ? wxgname='未指派维修工' : wxgname=rep.wxg.name">
        <van-col span="8">维修工：</van-col>
        <van-col span="13" offset="2"><span>{{wxgname}}</span></van-col>
      </van-row>
      <van-row style="margin-top: 1em">
        <van-col span="8">物业名称：</van-col>
        <van-col span="13" offset="2"><span>{{rep.equipment.wy.name}}</span></van-col>
      </van-row>
      <van-row style="margin-top: 1em">
        <van-col span="8">故障描述：</van-col>
        <van-col span="16" class="showBack van-ellipsis"><span>{{rep.miaoshu}}</span></van-col>
      </van-row>
      <van-row style="margin-top: 1em">
        <van-col offset="1">
          <el-button type="warning" size="mini" plain>点击派送</el-button>
        </van-col>
      </van-row>
    </div>
    <!--<div class="sendT-con" @click="sendRep(rep,index)" v-for="(rep,index) in RepairList">-->
        <!--<van-cell-group style="width:85%;margin:10px auto;text-align:center;margin-bottom: 20px;background-color: lightgray;border-radius: 10px">-->
          <!--&lt;!&ndash;数据绑定设置项目标题&ndash;&gt;-->
          <!--&lt;!&ndash;<span>维修工单号：</span>&ndash;&gt;-->
          <!--<van-cell :title="'维修工单号：'+rep.id" style="background-color: lightgray;border-radius: 10px">-->
          <!--</van-cell>-->
          <!--<van-tag plain type="success" v-if="show1[index]">已派送</van-tag>-->

        <!--</van-cell-group>-->

    <!--</div>-->
    <van-popup v-model="show" position="bottom" :overlay="true">
      <van-picker
      show-toolbar
      title="请选择维修技师"
      :columns="columns"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
    </van-popup>

  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    data() {
      return {
        RepairList:'',
        ListId: '',
        show:false,
        show1:[],
        fixerData:'',
        columns: [],
        confirmD:'',
        index:'',
        RepairNum:'',
        state:[
          "维修中",
          "维修工确认",
          "派出维修工",
          "故障",
        ]
      }
    },
    methods:{
      sendRep(v,index){
        this.show=true;
        this.ListId = v.id;
        console.log("维修工单号",this.ListId);
        this.index = index;
      },
      getRepairList(){
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        this.$http.post("/actionLog/selectAllActionLogByWBQYNameAndstate",{
        },{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          console.log("维修工单",res);
          this.RepairList = res.data.data;
          this.RepairNum = res.data.data.length;
        }).catch((error)=>{
          console.log(error);
        });
      },
      getwoker(){
        this.$http.post("/user/findWXGsByWBQYUsername",{},{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          console.log("维修工信息",res);
          this.fixerData = res.data.data;
          // 用forEach方法遍历数组
          this.fixerData.forEach(item=>
          {
            // 把name用push方法依次放在数组的末尾  push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
            this.columns.push(item.name);
          })
        }).catch((error)=>{
          console.log(error);
        })
      },
      onConfirm(value, index) {

        console.log("点击维修工号",this.fixerData[index].id);
        // this.fixerData[index].id  是当前确定技师的id。
        this.$http.post("/actionLog/paiChuWXG",{
          "actionLogId":this.ListId,
          "wxgId":this.fixerData[index].id
        },{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          if(res.data.code){
            this.$toast.success('派出成功');
            console.log("派出成功",res);
          }else {
            this.$toast.fail('派出失败');

          }

          this.getRepairList();
          this.show = false;
          console.log(this.index);
          console.log(this.show1[this.index]);
          Vue.set(this.show1,this.index,true);
          console.log(this.show1[this.index]);

        }).catch((error)=>{
          console.log(error);
        })
      },
      onCancel() {
        this.show = false;
      }

    },
    created(){
      this.getRepairList();
      this.getwoker();
      for (let i = 0; i < this.RepairNum; i++) {
        this.show1[i] = false;
      }
    }

  }
</script>
<style scoped>
  div.van-cell{
    font-size: 20px;
  }
  .van-swipe-cell{
    width: 100%;
    height: 100px;
    box-shadow: 0 3px 3px 4px #ccc;
    margin-bottom: 8px;
  }
</style>
