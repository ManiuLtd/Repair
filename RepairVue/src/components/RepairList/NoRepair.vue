<template>
  <div id="sendT">
    <div class="container-fluid" @click="sendRep(rep,index)" v-for="(rep,index) in RepairList">
      <van-row>
        <van-col span="8">维修状态：</van-col>
        <van-col span="13" offset="2"><span>未处理</span></van-col>
      </van-row>
      <van-row style="margin-top: 1em">
        <van-col span="8">维修时间：</van-col>
        <van-col span="16"><span>{{rep.startTime}}</span></van-col>
      </van-row>
      <van-row style="margin-top: 1em">
        <van-col span="8">设备名称：</van-col>
        <van-col span="13" offset="2"><span>{{rep.equipment.name}}</span></van-col>
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
          <el-button type="warning" size="mini" plain>派送维修工</el-button>
        </van-col>
      </van-row>
    </div>
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
        RepairNum:''
      }
    },
    methods:{
      sendRep(v,index){
        if (this.columns.length) {
          this.show=true;
        }else {
          this.$toast("无可选维修工");
        }
        this.ListId = v.id;
        console.log("维修工单号",this.ListId);
        this.index = index;

      },
      getRepairList(){
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        this.$http.post("/actionLog/selectAllActionLogByWBQYNameAndstate",{
          "state":"4"
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
        this.show = false;
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        console.log("点击维修工号",this.fixerData[index].id);

        // this.fixerData[index].id  是当前确定技师的id。下面的this.index也是当前选中的下标
        this.$http.post("/actionLog/paiChuWXG",{
          "actionLogId":this.ListId,
          "wxgId":this.fixerData[index].id
        },{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          // console.log("点击维修工号",this.fixerData[this.index].id);
          loading.close();
          if(res.data.code == 1){
            this.$toast.success('派出成功');
            console.log("派出成功",res);
            this.getRepairList();
            console.log(this.index);
            console.log(this.show1[this.index]);
            Vue.set(this.show1,this.index,true);
            console.log(this.show1[this.index]);
          }

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
