<template>
  <div id="allEq">
    <div class="header" style="border-bottom: 1px solid gray">
      <van-row type="flex" justify="space-between" style="height: 67px;background-color: darkgoldenrod;color: whitesmoke;font-size: 20px;font-weight: bold;line-height: 67px;letter-spacing:4px;">
        <van-col span="4">
          <router-link to="/companyA">
            <van-icon name="arrow-left" size="1em" color="white"/>
          </router-link>
        </van-col>
        <van-col span="8" offset="2">受检企业</van-col>
        <van-col span="6"></van-col>
      </van-row>
    </div>
    <div v-for="(com,index) in equipments" :key="index">
      <router-link :to="{name:'submitPlan',params:{equip:com.id,isAggre:com.pollingIsAggre}}">
        <van-panel :title="com.name" :desc="com.wy.name" :status="status[com.pollingIsAggre]" style="text-align: left;padding-left: 1rem;">
        </van-panel>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        equipments:'',
        status:[
          '待审核',
          '已审核',
          '未通过'
        ]
      }
    },
    methods:{
      // 发起网络请求
      getProData(){
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/equipment/findByWbqyUsernameHasCooperation",{},{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
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
<style scoped>
  body{
    background-color: whitesmoke;
  }

</style>
