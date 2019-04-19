<template>
  <div id="NoRepair">
    <div class="container-fluid" v-for="(rep,index) in RepairList" @click="showBackAll">
      <van-row>
        <van-col span="8">维修状态：</van-col>
        <van-col span="13" offset="2"><span>已完成</span></van-col>
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
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        RepairList:"",
        show:true

      }
    },
    methods:{
      showBackAll(){
        //通过改变show的Boolean值，实现点击删除类名，再点击添加类名，
        if(this.show){
          $(".van-ellipsis").removeClass("van-ellipsis");
        }else {
          $(".showBack").addClass("van-ellipsis");
        }
        this.show = !this.show;
      },
      getNoRepairList(){
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        this.$http.post("/actionLog/selectAllActionLogByWBQYNameAndstate",{
          "state":"0"
        },{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          console.log("完成工单",res);
          this.RepairList = res.data.data;
        }).catch((error)=>{
          console.log(error);
        });
      },

    },
    created(){
      this.getNoRepairList();
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
