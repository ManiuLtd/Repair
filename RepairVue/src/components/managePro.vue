<template>
  <div id="pro-con" style="background-color: whitesmoke;height: 100vh">
    <div style="">
      <van-row class="header" type="flex" justify="space-between" style="">
        <van-col span="4">
          <router-link to="/companyA">
            <van-icon name="arrow-left" size="1em" color="white"/>
          </router-link>
        </van-col>
        <van-col span="8" offset="2">项目管理</van-col>
        <van-col span="6"></van-col>
      </van-row>
        <!--<van-icon name="edit" size="25px" slot="right" @click-right="clickHright"/>-->
    </div>
    <div style="background-color: whitesmoke;">
      <div @click="showProCon(pro)" v-for="(pro,index) in proData1" :key="index">
        <el-card shadow="always" style="width:93%;color:black;display: inline-block;margin-top: 0.1rem;padding-left: 0.2rem;font-size: 0.3rem;">
          <div slot="header" style="line-height: 3.5em;">
            <van-row type="flex" justify="center">
              <!--<van-col span="24">-->
                <!--<p style="line-height: 0.35rem;padding-top: 0.35rem;font-weight: bold">物业名称</p>-->
                <el-card style="font-size: 0.4rem;line-height: 1.3em;font-weight: bold;">
                  <!--龙城健身管理服-->
                  {{pro.wy.name}}
                </el-card>
                <!--<p style="font-size: 0.4rem;line-height: 0.3rem;margin-top: 0.9rem;font-weight: bold"></p>-->
              <!--</van-col>-->
            </van-row>

          </div>
          <div>
            <van-row type="flex" justify="center">
              <van-col span="8">{{pro.startDate}}</van-col>
              <van-col span="8"></van-col>
              <van-col span="8">{{pro.endDate}}</van-col>
            </van-row>
          </div>
        </el-card>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    name:'managePro',
    data(){
      return{
        propName:'',
        proData1:''
      }
    },
    methods:{
      // 点击跳转到proCon组件并用query发送数据
      showProCon(v){
        console.log('!!!',this.proData1);
        // 向proCon组件发送data
        // this.bus.$emit("proDataTo",this.proData1);
        this.$router.replace({name:'proCon',query
            :{proDatax:v}});
      },
      // 发起网络请求
      getProData(){
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/user/WBQYfindAllContract",{},{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          console.log("项目管理",res.data);
          // Bus.$emit("proData",res.data);
          this.proData1 = res.data.data;
          // 提取物业名字
          // this.propName = this.proData1.data[0].wy.name;
          // if (!this.propName){
          //   this.propName = '这里还没有项目哦';
          // }
        }).catch((error)=>{
          console.log(error);
        })
      }
    },
    created(){
      // 初始化调用网络请求方法
      this.getProData();
    }
  }
</script>
<style>
  @import "../assets/css/header.css";

</style>
