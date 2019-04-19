<template>
  <div id="selectEquip">
    <div class="header" style="border-bottom: 1px solid gray">
      <van-row type="flex" class="header" justify="space-between">
        <van-col span="4">
          <router-link to="/checkPlan/selectWy">
            <van-icon name="arrow-left" size="1em" color="white"/>
          </router-link>
        </van-col>
        <van-col span="8" offset="2">设备预览</van-col>
        <van-col span="6">
          <router-link :to="{path:'/checkPlan/historyList', query:{wyId:id}}" style="color: black;font-weight: bold;font-size: 0.7em;border-bottom: 1px solid black">历史巡检</router-link>
        </van-col>
      </van-row>
    </div>
    <div v-for="(com,index) in equipments" :key="index" @click="toPlan(com.id)">
      <!--<router-link :to="{name:'submitPlan',params:{equipId:com.id}}">-->
        <van-panel :title="com.name" :status="com.wy.name" style="text-align: left;padding-left: 1em;">
        </van-panel>
      <!--</router-link>-->
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        equipments:'',
        id:""
      }
    },
    methods:{
      // 跳转并传id到巡检计划页面，用replace防止home回退到设备预览页没有网络请求导致空白页的bug
      toPlan(v){
        // console.log(v)
        this.$router.replace({name:'submitPlan',query:{equipId:v}});
      },
      // 发起网络请求 获取上一级目录传来的id，根据id查询设备
      getProData(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // 接收id
        this.id = this.$route.params.equip;
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/equipment/findByWBQYUsernameAndWYId",{
          "wyid":this.id
        },{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          loading.close();
          console.log("查询设备",res.data.data);
          this.equipments = res.data.data;
        }).catch((error)=>{
          console.log(error);
        })
      }
    },
    created(){
      this.getProData();
    }
  }
</script>
<style>

</style>
