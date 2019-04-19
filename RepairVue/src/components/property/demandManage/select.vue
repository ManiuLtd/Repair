<!--需求详情-->
<template>
  <div id="priceSelect">
    <van-row type="flex" class="header" justify="space-between">
      <van-col span="4">
        <router-link to="/demand/index">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="10" offset="2">报价详情</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <div class="content">
      <div style="">
        <el-form ref="form" label-position="left">
          <el-form-item label="竞价项目">
            <el-input  v-model="title" readonly/>
          </el-form-item>
          <el-form-item label="报价内容">
            <el-input  v-model="name" readonly/>
          </el-form-item>
          <el-form-item label="价格">
            <el-input  v-model="price" readonly/>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input  v-model="lianxiren" readonly/>
          </el-form-item>
          <el-form-item label="联系人电话">
            <el-input  v-model="phone" readonly/>
          </el-form-item>
          <el-form-item label="城市">
            <el-input  v-model="city" readonly/>
          </el-form-item>
          <el-form-item label="附件url" style="overflow: hidden">
            <div style="overflow: scroll">
              <a :href="fujianurl" @click="down()">{{fujianurl}}</a>

            </div>
            <img :src="fujianurl" alt="" style="width:100%" @click="down()">
          </el-form-item>
          <el-form-item label="维保企业">
            <el-input  v-model="wbqy" readonly/>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        data:'',
        wbqy: '',
        title:'',
        name:'',
        price:'',
        lianxiren: '',
        phone: '',
        city: '',
        fujianurl:'',
        message: "报价信息数据",
        msg: false,
        notnull: false
      };
    },
    created(){
      this.select();
    },
    methods: {
      down(){
        console.log(11)
        window.location.href = this.fujianurl;
        // window.open(this.fujianurl, '_blank');
      },
      select: function () {
        this.quoteId = this.$route.params.quoteId;
        this.$http
          .post(
            "/auction/findAuctionById/",
            {
              'id': this.quoteId,
            },
            {
              headers: {
                'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
                'Content-Type': 'application/json'
              }
            },
            {
            }
          )
          .then(res => {
            console.log("报价",res)
            if (res.data.code === "1") {
              window.localStorage.setItem(
                "contract",
                JSON.stringify(res.data.token)
              );
              this.data = res.data.data;
              this.wbqy = this.data.wbqy.name;
              this.title = this.data.requirement.title;
              this.name = this.data.neirong;
              this.price = this.data.price;
              this.lianxiren = this.data.lianxiren;
              this.phone = this.data.phone;
              this.city = this.data.city;
              // this.fujianurl = this.data.fujianurl;
              if(this.data.fujianurl){
                this.fujianurl = this.GLOBAL.BASE_URL+this.data.fujianurl;
              }
              console.log("url",this.fujianurl);
            } else {
              this.$router.push({
                path: "/"
              });
              this.msg = true;
              console.log("this is fail", res);
            }
          })
          .catch(err => {
            this.$notify({
              title: "获取报价信息失败",
              message: "服务器请求失败，请检查网络或联系管理员",
              type: "error"
            });
            console.log(err);
          });
      }
    }
  }

</script>

<style scoped>
  .title {
    text-align: center;
  }
  .content {
    margin: 5%;
  }
</style>
