<template>
  <div id="self" style="font-size: 0.3rem">
    <van-row class="header" type="flex" justify="space-between" style="">
      <van-col span="4">
        <router-link to="company">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="8">维保企业</van-col>
      <van-col span="4"></van-col>
    </van-row>
    <van-cell-group style="padding-top: 1.5em;">
      <p style="">企业名称:</p>
      <van-field
        clearable
        v-model="comName"
        style="padding-left:4em"
      />
      <!--<p style="">统一社会信用代码:</p>-->
      <!--<van-field-->
        <!--clearable-->
        <!--v-model="code"-->
        <!--style="padding-left:4em"-->
        <!--readonly-->
      <!--/>-->
      <p>企业描述:</p>
      <van-field
        type="textarea"
        v-model="comDescri"
        rows="1" autosize
        style="padding-left:4em"
      />
      <p>联系电话:</p>
      <van-field
        clearable
        v-model="comPhone"
        style="padding-left:4em"
      />
    </van-cell-group>

    <van-button size="large" type="default" style="" @click="updateData">保存</van-button>
    <!--<router-link to="/PayForMember">-->
      <van-button size="large" style="" @click="topay">充值</van-button>
    <!--</router-link>-->
    <van-button size="large" type="default" style="" @click="toWe">关于我们</van-button>
    <!--<router-link to="/">-->
      <van-button size="large" @click="delLocalStorage">退出登录</van-button>
    <!--</router-link>-->

  </div>
</template>
<script>
  export default {
    data() {
      return {
        comName: '',
        comDescri: '',
        comPhone: '',
        comDatax: '',
        wbqy: '',
        code:''
      }
    },
    // watch:{
    //   comName(val,oldval){
    //     if(!this.show){
    //       this.show = !this.show;
    //     }
    //
    //   },
    //   comDescri(val,oldval){
    //     this.show = !this.show;
    //
    //   },
    //   comPhone(val,oldval){
    //     this.show = !this.show;
    //
    //   }
    // },
    methods: {
      toWe(){
        this.$router.push({name:'withWe',query:{iswy:0}});
      },
      topay(){
        this.$router.push({name:'payForMember',query:{iswy:0}});
      },
      delLocalStorage() {
        // 置空别名
        // window.JPush.setAlias({ sequence: 1, alias: ""},
        //   (result) => {
        //     var sequence = result.sequence
        //     var alias = result.alias
        //   }, (error) => {
        //     var sequence = error.sequence
        //     var errorCode = error.code
        //   });
        window.localStorage.setItem(
          "user", ""
        )
        this.$router.replace({name:'/'});

      },
      // 发起网络请求,查询维保企业自己的信息
      getSelfData() {
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/user/findUs", {}, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          console.log("查询自己信息", res);
          this.wbqy = res.data.data;
          console.log("维保企业信息" ,res.data.data);
          this.comName = this.wbqy.name;
          this.comDescri = this.wbqy.miaoshu;
          this.comPhone = this.wbqy.phone;
          this.code = this.wbqy.unifiedSocialCreditCode;

        }).catch((error) => {
          console.log(error);
        })
      },
      // 发起网络请求
      updateData() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/user/updateWBQY", {
          "name": this.comName,
          "miaoshu": this.comDescri,
          "phone": this.comPhone
        }, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          loading.close();
          if (res.data.code == 1) {
            this.$toast.success("修改成功");
          } else {
            this.$toast.success("修改失败");
          }
          console.log("修改成功", res);
        }).catch((error) => {
          console.log(error);
        })
      }
    },
    created() {
      this.getSelfData();
    }

  }
</script>
<style scoped>
  .van-cell {
    font-size: 0.3rem;
  }

  p{
    text-align: left;margin-left: 1em
  }
</style>
