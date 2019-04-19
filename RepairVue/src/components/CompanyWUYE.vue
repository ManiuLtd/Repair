<template>
  <div class="content">


    <div class="companyCon">
      <router-view></router-view>
    </div>
    <div>
      <van-tabbar v-model="active">
        <van-tabbar-item icon="shop" @click="toCompany">首页</van-tabbar-item>
        <van-tabbar-item icon="contact"  @click="editBtn">个人</van-tabbar-item>
      </van-tabbar>
    </div>

  </div>


</template>

<script>
  export default {
    data(){
      return{
        active: 0,
        comDatax:''
      }
    },
    methods:{
// 编辑企业信息方法
      editBtn(){
        this.$router.push({name:'WUYESelfEdit',query
            :{comDatax:this.comDatax}});
      },
      toCompany(){
        this.$router.push({path:"/index"});
      },
      getcomDatax(){
        this.comDatax = this.$route.query.comDatax;
      }
    },
    created(){
      this.getcomDatax();
    }


  }
</script>

<style>

</style>
