<template>
  <div class="content">


    <div class="companyCon" style="">
      <router-view></router-view>
    </div>
    <!--父元素要设置高度才能不遮挡上面-->
    <div style="height: 3em;margin-top: 2em">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="shop" @click="toCompany">首页</van-tabbar-item>
        <van-tabbar-item icon="contact" @click="editBtn">个人</van-tabbar-item>
      </van-tabbar>
    </div>

  </div>


</template>

<script>
  export default {
    data(){
      return{
        active:'',
        comDatax:''
      }
    },
    methods:{
// 编辑企业信息方法
      editBtn(){
        this.$router.push({name:'selfEdit',query
            :{comDatax:this.comDatax}});
      },
      toCompany(){
        this.$router.push({path:"/company"});
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
