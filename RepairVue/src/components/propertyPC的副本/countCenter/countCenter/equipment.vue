<template>
  <div id="equip">
    <div>
      <van-row type="flex" class="header" justify="space-between">
        <van-col span="4">
          <router-link to="/index">
            <van-icon name="arrow-left" size="1em" color="white"/>
          </router-link>
        </van-col>
        <van-col span="8" offset="2">设备总览</van-col>
        <van-col span="6"></van-col>
      </van-row>
    </div>
    <div v-for="(com,index) in equipments" :key="index">
      <router-link :to="{name:'countPH',params:{equipId:com.id}}">
        <van-panel :title="com.name" :status="com.wy.name" style="text-align: left;padding-left: 1em;">
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
      }
    },
    methods:{
      // 发起网络请求
      getProData(){
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/equipment/findByWyUsername",{},{
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
