<template>
  <!--使网页的div高度满屏的方法：直接给div的高度设成  height:100vh，即可用让div的高度是视窗的高度了-->
  <!--使网页的div宽度满屏的方法：直接给div的宽度设成width:100vw,即可将div的宽度设成视窗的宽度-->
  <div id="repairListFixer" style="height:100vh;background-color: #eaeaea;">
    <van-row type="flex" justify="space-between" class="header">
      <van-col span="4">
        <router-link to="/worker">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="8" offset="2">投诉反馈</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <div class="listCon container-fluid"
         style="width: 93%;background-color: white;display: inline-block;text-align: center;border-radius: 5px;margin-top: 1em;font-size: 0.3rem;padding: 1em 0.8em;color: #989898;"
         v-for="list in listData" @click="showBackAll" v-if="list.fankui">
      <van-row>
        <van-col span="8">维修状态：</van-col>
        <van-col span="13" offset="2"><span v-html="list.state == 0 ? isSure:isNo"></span></van-col>
      </van-row>
      <van-row style="margin-top: 1em">
        <van-col span="8">维修时间：</van-col>
        <van-col span="16"><span>{{list.startTime}}</span></van-col>
      </van-row>
      <van-row style="margin-top: 1em">
        <van-col span="8">设备名称：</van-col>
        <van-col span="13" offset="2"><span>{{list.equipment.name}}</span></van-col>
      </van-row>
      <van-row style="margin-top: 1em">
        <van-col span="8">物业名称：</van-col>
        <van-col span="13" offset="2"><span>{{list.equipment.wy.name}}</span></van-col>
      </van-row>
      <van-row style="margin-top: 1em">
        <van-col span="8">故障描述：</van-col>
        <van-col span="13" offset="2"><span>{{list.miaoshu}}</span></van-col>
      </van-row>
      <van-row style="margin-top: 1em">
        <van-col span="8">投诉反馈：</van-col>
        <van-col span="16" class="showBack van-ellipsis"><span>{{list.fankui}}</span></van-col>
      </van-row>
    </div>

  </div>

</template>
<script>
  export default {
    data() {
      return {
        listData: '',
        isSure: '已完成',
        isNo: '未完成',
        visible: false,
        show: true
      }
    },
    methods: {
      toSign(v) {
        this.$router.push({name: 'sign', query: {listToSign: v}});
      },
      // 发起网络请求
      getListData() {
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/actionLog/findByWxgUsername", {}, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          console.log("被派维修工单", res);
          this.listData = res.data.data;
        }).catch((error) => {
          console.log(error);
        })
      },
      showBackAll() {
        //通过改变show的Boolean值，实现点击删除类名，再点击添加类名，
        if (this.show) {
          $(".van-ellipsis").removeClass("van-ellipsis");
        } else {
          $(".showBack").addClass("van-ellipsis");
        }
        this.show = !this.show;
      }
    },
    created() {
      this.getListData();
    }
  }
</script>
<!--有个有趣的现象：在worker.vue里style后加scoped无法显示背景图片，而在这个里面不加scoped无法显示背景图片-->
<style>

</style>
