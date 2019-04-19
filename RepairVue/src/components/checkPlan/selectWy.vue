<template>
  <div id="selectWy">
    <div>
      <van-row type="flex" class="header" justify="space-between">
        <van-col span="4">
          <router-link to="/companyA">
            <van-icon name="arrow-left" size="1em" color="white"/>
          </router-link>
        </van-col>
        <van-col span="8" offset="2">受检物业</van-col>
        <van-col span="6"></van-col>
      </van-row>
    </div>
    <div v-for="(com,index) in wy" :key="index">
      <router-link :to="{name:'selectEquip',params:{equip:com.id}}">
        <van-panel :title="com.name" style="text-align: left;padding-left: 1em;">
        </van-panel>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        wy:'',
      }
    },
    methods:{
      // 发起网络请求
      getProData(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/user/WBQYfindAllWYHasCooperation",{},{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          loading.close();
          console.log("查询物业",res.data.data);
          this.wy = res.data.data;
        }).catch((error)=>{
          loading.close();
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
