<template>
  <div id="self">
    <div class="w-header" style="height: 4.35rem;">
      <van-row type="flex" justify="space-between"
               style="height: 3em;font-size: 0.3rem;font-weight: bold;line-height: 3em;">
        <van-col span="4">
          <router-link to="/worker">
            <van-icon name="arrow-left" size="1em" color="white"/>
          </router-link>
        </van-col>
      </van-row>
      <div style="width:4rem;height:3rem;position: relative;top: 0.2rem;left: 0px;right:0;margin:0 auto;">
        <!--<div style="width: 75px;height: 75px;border-radius: 50%;position: absolute;top: 10px;overflow: hidden;left:0;right: 0;margin: 0 auto;">-->
        <van-uploader :after-read="onRead"
                      style="width: 1.5rem;height: 1.5rem;border-radius: 50%;position: absolute;top: 0.2rem;overflow: hidden;left:0;right: 0;margin: 0 auto;border: 2px solid darkgoldenrod;">
          <!--<img src="../../assets/image/guys.png" alt="" style="width: 100%;height: 100%;" v-if="!headpic">-->
          <img :src="headpic" alt="" style="width: 100%;height: 100%;" ref="img">
        </van-uploader>

        <!--</div>-->
        <span style="color: white;font-size: 0.4rem;position: absolute;top: 1.9rem;left: 0;right: 0;margin: 0 auto;">{{this.listDataF.name}}</span>
      </div>
    </div>
    <van-panel style="text-align: left;padding-left: 1em" class="van-hairline--bottom">
      <div slot="header" style="">
        <p style="font-size: 0.3rem;line-height: 1.5em;padding-top: 1em;color: gray;font-weight: bold">姓名</p>
        <!--<p style="font-size: 2rem;line-height: 5rem;margin-top: -1rem;font-weight: bold">{{this.listDataF.name}}</p>-->
        <el-input
          v-model="name"
          clearable
          style="">
        </el-input>
      </div>
    </van-panel>
    <van-panel style="text-align: left;padding-left: 1em" class="van-hairline--bottom">
      <div slot="header" style="">
        <p style="font-size: 0.3rem;line-height: 1.5em;padding-top: 1em;color: gray;font-weight: bold">简介</p>
        <!--<p style="font-size: 2rem;line-height: 5rem;margin-top: -1rem;font-weight: bold">{{this.listDataF.miaoshu}}</p>-->
        <el-input
          v-model="miaoshu"
          clearable
          style="">
        </el-input>
      </div>
    </van-panel>
    <van-panel style="text-align: left;padding-left: 1em" class="van-hairline--bottom">
      <div slot="header" style="">
        <p style="font-size: 0.3rem;line-height: 1.5em;padding-top: 1em;color: gray;font-weight: bold">联系方式</p>
        <!--<p style="font-size: 2rem;line-height: 5rem;margin-top: -1rem;font-weight: bold">{{this.listDataF.phone}}</p>-->
        <el-input
          v-model="phone"
          clearable
          style="">
        </el-input>
      </div>
    </van-panel>
    <van-button size="large" style="" @click="saveM">保存个人信息</van-button>
    <router-link to="/">
      <van-button size="large" style="" @click="delLocalStorage">退出登录</van-button>
    </router-link>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        listDataF: '',
        name: '',
        miaoshu: '',
        phone: '',
        imgData: '',
        // headpic:"../../assets/image/guys.png"
        headpic: require('../../assets/image/guys.png')

      }
    },
    methods: {
      onRead(file) {
        // 将选中图片展示在界面上
        this.$refs.img.src = file.content;
        // 创建formData对象
        var formData = new FormData();
        // 往formData对象添加键值对，值为file.file
        formData.append("file", file.file);
        // ajax里的this不是指向的vue实例,创建实例别名that
        var that = this;
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // Ajax网络请求
        $.ajax({
          url: this.GLOBAL.BASE_URL+'user/uploadPic',
          type: "post",
          data: formData,
          processData: false,
          contentType: false,
          beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Auth-Token", JSON.parse(window.localStorage.getItem("token") || "[]").toString());
          },
          success: function (data) {
            // 上传成功code返回1
            if (data.code == 1) {
              //图片网络路径
              let v = data.data;
              that.$http.post("/user/updateWXG", {
                "headPic": v
              }, {
                headers: {
                  'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
                  'Content-Type': 'application/json'
                }
              }).then((res) => {
                console.log("头像上传",res);
                loading.close();
                if (res.data.code == 1) {
                  that.$toast('头像上传成功');
                } else {
                  that.$toast.fail('头像上传失败');

                }
                console.log("修改成功", res);
              }).catch((error) => {
                loading.close();
                that.$toast.fail('头像上传失败');
                console.log(error);
              })
            }
          },
          error: function (e) {
            loading.close();
            that.$toast.fail('头像上传失败');
            // alert("错误！！");
          }
        });
      },

      saveM() {
        console.log("phone" + this.phone)
        if (this.phone == "") {
          this.$toast('请填写联系方式');
        } else {
          // 发起网络请求 保存维修工信息
          // 登录时，token被存在了localStorage里，现在直接调用它做请求头
          // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.$http.post("/user/updateWXG", {
            "name": this.name,
            "miaoshu": this.miaoshu,
            "phone": this.phone
          }, {
            headers: {
              'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
              'Content-Type': 'application/json'
            }
          }).then((res) => {
            loading.close();
            if (res.data.code == 1) {
              this.$toast.success('修改成功');
            } else {
              this.$toast.fail('修改失败');

            }
            console.log("修改成功", res);
          }).catch((error) => {
            console.log(error);
          })
        }

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
        );
      },
      // 发起网络请求
      getListData() {
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/user/WXG", {}, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          console.log("维修工信息", res);
          this.listDataF = res.data.data;
          this.name = this.listDataF.name;
          this.miaoshu = this.listDataF.miaoshu;
          this.phone = this.listDataF.phone;
          if(this.listDataF.headPic){
            this.headpic = this.GLOBAL.BASE_URL+this.listDataF.headPic;
          }

        }).catch((error) => {
          console.log(error);
        })
      }
    },
    created() {
      this.getListData();
    }
  }
</script>
<style>

</style>
