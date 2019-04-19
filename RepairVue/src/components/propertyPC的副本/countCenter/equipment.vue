<template>
  <el-container>
    <el-container>
      <div>
        <three></three>
      </div>
      <el-container>
        <el-header style="background-color: #3a8ee6;text-align: right; font-size: 16px; line-height: 60px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息查看</el-dropdown-item>
              <el-dropdown-item>修改个人信息</el-dropdown-item>
              <el-dropdown-item>修改账号密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>个人中心</span>
        </el-header>
        <el-main>
          <div id="equip">
            <div class="header" style="border-bottom: 1px solid gray">
              <van-row type="flex" justify="space-between" style="height: 67px;background-color: darkgoldenrod;color: whitesmoke;font-size: 20px;font-weight: bold;line-height: 67px;letter-spacing:4px;">
                <!--<van-col span="4">
                  <router-link to="/">
                    <van-icon name="arrow-left" size="1em" color="white"/>
                  </router-link>
                </van-col>-->
                <van-col span="0" offset="2">设备总览</van-col>
                <van-col span="6"></van-col>
              </van-row>
            </div>
            <div v-for="(com,index) in equipments" :key="index">
              <router-link :to="{name:'countPC',params:{equipId:com.id}}">
                <van-panel :title="com.name" :status="com.wy.name" style="text-align: left;padding-left: 1rem;">
                </van-panel>
              </router-link>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
  import three from '../three'
  export default {
    components:{
      three
    },
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
