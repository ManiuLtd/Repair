<!--<template>-->
  <!--&lt;!&ndash;使网页的div高度满屏的方法：直接给div的高度设成  height:100vh，即可用让div的高度是视窗的高度了&ndash;&gt;-->
  <!--&lt;!&ndash;使网页的div宽度满屏的方法：直接给div的宽度设成width:100vw,即可将div的宽度设成视窗的宽度&ndash;&gt;-->
  <!--<div id="backMessage" style="height:100vh;background-color: #eaeaea;">-->
    <!--<van-row type="flex" justify="space-between" class="header">-->
      <!--<van-col span="4">-->
        <!--<router-link to="/companyA">-->
          <!--<van-icon name="arrow-left" size="1em" color="white"/>-->
        <!--</router-link>-->
      <!--</van-col>-->
      <!--<van-col span="8" offset="2">投诉反馈</van-col>-->
      <!--<van-col span="6"></van-col>-->
    <!--</van-row>-->
    <!--<div style="background-color: whitesmoke">-->
      <!--<div class="listCon container-fluid"-->
           <!--style="width: 93%;background-color: white;display: inline-block;text-align: center;border-radius: 5px;margin-top: 1em;font-size: 0.3rem;padding: 1em 0.8em;color: #989898;"-->
           <!--v-for="list in listData" @click="showBackAll" v-if="list.fankui">-->
        <!--<van-row>-->
          <!--<van-col span="8">维修状态：</van-col>-->
          <!--<van-col span="13" offset="2"><span v-html="list.state == 0 ? isSure:isNo"></span></van-col>-->
        <!--</van-row>-->
        <!--<van-row style="margin-top: 1em">-->
          <!--<van-col span="8">维修时间：</van-col>-->
          <!--<van-col span="16"><span>{{list.startTime}}</span></van-col>-->
        <!--</van-row>-->
        <!--<van-row style="margin-top: 1em">-->
          <!--<van-col span="8">设备名称：</van-col>-->
          <!--<van-col span="13" offset="2"><span>{{list.equipment.name}}</span></van-col>-->
        <!--</van-row>-->
        <!--<van-row style="margin-top: 1em">-->
          <!--<van-col span="8">物业名称：</van-col>-->
          <!--<van-col span="13" offset="2"><span>{{list.equipment.wy.name}}</span></van-col>-->
        <!--</van-row>-->
        <!--<van-row style="margin-top: 1em" v-if="list.wxg==null ? wxgname='未指派维修工' : wxgname=list.wxg.name">-->
          <!--<van-col span="8">维修工：</van-col>-->
          <!--<van-col span="13" offset="2"><span>{{wxgname}}</span></van-col>-->
        <!--</van-row>-->
        <!--<van-row style="margin-top: 1em">-->
          <!--<van-col span="8">故障描述：</van-col>-->
          <!--<van-col span="13" offset="2"><span>{{list.miaoshu}}</span></van-col>-->
        <!--</van-row>-->
        <!--<van-row style="margin-top: 1em">-->
          <!--<van-col span="8">投诉反馈：</van-col>-->
          <!--<van-col span="16" class="showBack van-ellipsis"><span>{{list.fankui}}</span></van-col>-->
        <!--</van-row>-->
      <!--</div>-->

    <!--</div>-->

  <!--</div>-->

<!--</template>-->
<!--<script>-->
  <!--export default {-->
    <!--data() {-->
      <!--return {-->
        <!--listData: '',-->
        <!--isSure: '已完成',-->
        <!--isNo: '未完成',-->
        <!--visible: false,-->
        <!--show: true,-->
        <!--wxgname:''-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--// toSign(v) {-->
      <!--//   this.$router.push({name: 'sign', query: {listToSign: v}});-->
      <!--// },-->
      <!--// 发起网络请求-->
      <!--getListData() {-->
        <!--let that = this;-->
        <!--// alert(new Date().getMilliseconds());-->
        <!--// const loading = this.$loading({-->
        <!--//   lock: true,-->
        <!--//   text: 'Loading',-->
        <!--//   spinner: 'el-icon-loading',-->
        <!--//   background: 'rgba(0, 0, 0, 0.7)'-->
        <!--// });-->
        <!--// // Ajax网络请求-->
        <!--// $.ajax({-->
        <!--//   url: 'http://app.zhongtongguanglian.com/actionLog/selectAllActionLogByWBQYName',-->
        <!--//   type: "POST",-->
        <!--//   // dataType: "JSONP",-->
        <!--//   beforeSend: function (XMLHttpRequest) {-->
        <!--//     XMLHttpRequest.setRequestHeader("Auth-Token", JSON.parse(window.localStorage.getItem("token") || "[]").toString());-->
        <!--//   },-->
        <!--//   success: function (res) {-->
        <!--//     loading.close();-->
        <!--//-->
        <!--//     console.log("成功",res);-->
        <!--//-->
        <!--//     // 上传成功code返回1-->
        <!--//     if (res.code == 1) {-->
        <!--//       loading.close();-->
        <!--//-->
        <!--//       that.$toast("查询成功");-->
        <!--//       that.listData = res.data;-->
        <!--//     }else {-->
        <!--//       loading.close();-->
        <!--//       that.$toast("查询失败");-->
        <!--//       console.log("失败",e);-->
        <!--//     }-->
        <!--//   },-->
        <!--//   error: function (e) {-->
        <!--//     loading.close();-->
        <!--//     that.$toast("查询失败",e);-->
        <!--//     console.log("查询失败",e);-->
        <!--//-->
        <!--//   }-->
        <!--// });-->
        <!--// 登录时，token被存在了localStorage里，现在直接调用它做请求头-->
        <!--// console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());-->
        <!--this.$http.post("/actionLog/selectAllActionLogByWBQYNameAndstate", {}, {-->
          <!--headers: {-->
            <!--'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),-->
            <!--'Content-Type': 'application/json'-->
          <!--}-->
        <!--}).then((res) => {-->
          <!--// console.log("res",res)-->
          <!--// alert("成功"+new Date().getMilliseconds());-->
          <!--// if (res.data.code == '1') {-->
          <!--//   this.$toast("查询成功");-->
            <!--this.listData = res.data.data;-->
            <!--// loading.close();-->

          <!--// }else {-->
          <!--//   loading.close();-->
          <!--//   this.$toast("查询失败");-->

          <!--// }-->
          <!--console.log("维修记录", res);-->
        <!--}).catch((error) => {-->
          <!--// alert("失败"+new Date().getMilliseconds());-->
          <!--// loading.close();-->
          <!--console.log(error);-->
        <!--})-->
      <!--},-->
      <!--showBackAll() {-->
        <!--//通过改变show的Boolean值，实现点击删除类名，再点击添加类名，-->
        <!--if (this.show) {-->
          <!--$(".van-ellipsis").removeClass("van-ellipsis");-->
        <!--} else {-->
          <!--$(".showBack").addClass("van-ellipsis");-->
        <!--}-->
        <!--this.show = !this.show;-->
      <!--}-->
    <!--},-->
    <!--created() {-->
      <!--this.getListData();-->
    <!--}-->
  <!--}-->
<!--</script>-->
<!--&lt;!&ndash;有个有趣的现象：在worker.vue里style后加scoped无法显示背景图片，而在这个里面不加scoped无法显示背景图片&ndash;&gt;-->
<!--<style>-->
  <!--.container-fluid span{-->
    <!--color: chocolate;-->
  <!--}-->
<!--</style>-->
<template>
  <div id="NoRepair">
<van-row type="flex" justify="space-between" class="header">
  <van-col span="4">
    <router-link to="/companyA">
      <van-icon name="arrow-left" size="1em" color="white"/>
    </router-link>
  </van-col>
  <van-col span="8" offset="2">投诉反馈</van-col>
  <van-col span="6"></van-col>
</van-row>
    <div class=" container-fluid" style=""  v-for="(rep,index) in RepairList" @click="showBackAll(index)" v-if="rep.fankui">
      <van-row>
        <van-col span="8">维修状态：</van-col>
        <van-col span="13" offset="2"><span v-html="status[rep.state].text"></span></van-col>
      </van-row>
      <van-row style="margin-top: 1em">
        <van-col span="8">报修时间：</van-col>
        <van-col span="16"><span>{{rep.startTime}}</span></van-col>
      </van-row>
      <van-row style="margin-top: 1em">
        <van-col span="8">设备名称：</van-col>
        <van-col span="13" offset="2"><span>{{rep.equipment.name}}</span></van-col>
      </van-row>
      <van-row style="margin-top: 1em">
        <van-col span="8">物业名称：</van-col>
        <van-col span="13" offset="2"><span>{{rep.equipment.wy.name}}</span></van-col>
      </van-row>
      <van-row style="margin-top: 1em">
        <van-col span="8">故障描述：</van-col>
        <van-col span="16" class="showBack van-ellipsis"><span>{{rep.miaoshu}}</span></van-col>
      </van-row>
      <van-row style="margin-top: 1em">
      <van-col span="8">投诉反馈：</van-col>
      <van-col span="16" class="showBack van-ellipsis"><span>{{rep.fankui}}</span></van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        RepairList:"",
        show:[],
        status:[
          {text:"已完成"},
          {text:"维修中"},
          {text:"维修工前往"},
          {text:"已派发"},
          {text:"未处理"}
        ]
      }
    },
    methods:{
      showBackAll(v){
        //通过改变show的Boolean值，实现点击删除类名，再点击添加类名，

        if(this.show[v]){
          $(".showBack").eq(v).addClass("van-ellipsis");
          this.show[v] = 0;
          console.log(this.show[v],v);
        }else {

          $(".van-ellipsis").eq(v).removeClass("van-ellipsis");
          // this.show.forEach((value,index)=>{
          //   if(value){
          //     $(".showBack").eq(index).addClass("van-ellipsis");
          //     this.show[index] = 0;
          //   }
          // })
          this.show[v] = 1;
          console.log(this.show[v],v);
        }
      },
      getNoRepairList(){

        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        this.$http.post("/actionLog/selectAllActionLogByWBQYNameAndstate",{

        },{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
            loading.close();

            console.log("所有工单",res);
          this.RepairList = res.data.data;
        }).catch((error)=>{
          loading.close();

          console.log(error);
        });
      },

    },
    created(){
      this.getNoRepairList();
    }

  }
</script>
<style>

  .van-swipe-cell{
    width: 100%;
    height: 100px;
    box-shadow: 0 3px 3px 4px #ccc;
    margin-bottom: 8px;
  }

</style>

