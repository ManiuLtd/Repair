<template>
  <div id="editFixerM">
    <van-row>
      <div @click="editFixer(fixer)" v-for="fixer in fixers">

        <van-col span="8" class="fixerPart">
          <van-icon name="contact" color="black" size="2em" style="font-weight: bold"/>
          <p style="color: black">{{fixer.name}}</p>
          <p style="color: black">工号：{{fixer.id}}</p>
        </van-col>
      </div>
    </van-row>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        fixers:''
      }
    },
    methods:{
      editFixer(v){
        this.$router.push({name:'editFixerM',query:{fixerM:v}})
      },
      // 发起网络请求
      getFixerM(){
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/user/findWXGsByWBQYUsername",{},{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          console.log("111",res);
          this.fixers = res.data.data;
        }).catch((error)=>{
          console.log(error);
        })
      }
    },
    created(){
      this.getFixerM();
    }
  }
</script>
<style scoped>
  .fixerPart{
    width: 40%;
    height: 2.8rem;
    background-color: white;
    border-radius: 5px;
    margin-top: 10px;
    font-size: 16px;
    padding: 20px 15px;
    color: black;
    margin-left: 6%;
    display: block;
  }


</style>
