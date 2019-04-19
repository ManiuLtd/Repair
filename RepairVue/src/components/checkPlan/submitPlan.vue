<template>
  <div id="submitPlan">
    <div class="header">
      <van-row type="flex" class="header" justify="space-between">
        <van-col span="4">
          <router-link to="/checkPlan/selectWy">
            <van-icon name="arrow-left" size="1em" color="white"/>
          </router-link>
        </van-col>
        <van-col span="10" offset="2">巡检工单派送</van-col>
        <van-col span="6"></van-col>
      </van-row>
    </div>
    <van-cell-group  style="padding-top: 1em;font-size: 0.3rem">
      <van-row>
        <van-col span="8" id="span" style="line-height: 2.6em">
          <span style="">巡检时间：</span>

        </van-col>
        <van-col span="11">
          <el-date-picker
            v-model="checkTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            class="datePicker"
            size="small"
            style="width: 10em;"
            ref="inputText"
            @click="clickinput">
          </el-date-picker>
          <!--<div style="border: 1px solid #dcdfe6;border-radius: 4px;padding: 0.35em 0.4em">-->
            <!--<input type="date" v-model="checkTime" style="border: none;background-color: white;color: #dcdfe6">-->
          <!--</div>-->
        </van-col>
      </van-row>
      <van-row style="margin-top: 1em">
        <van-col span="8" id="span" style="line-height:2.6em">
          <span style="">下次巡检时间：</span>

        </van-col>
        <van-col span="11">
          <el-date-picker
            v-model="checkTime1"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            size="small"
            style="width: 10em;"
            onfocus="blur();">
          </el-date-picker>
          <!--<div style="border: 1px solid #dcdfe6;border-radius: 4px;padding: 0.35em 0.4em">-->
            <!--<input type="date" v-model="checkTime1" style="border: none;background-color: white;color: #dcdfe6">-->
          <!--</div>-->
        </van-col>
      </van-row>

      <van-row style="margin-top: 1em">
        <van-col span="8" id="span" style="line-height: 2.6em">
          <span style="">维修工：</span>

        </van-col>
        <van-col span="10" offset="1">
          <p style="width: 80%;border: 1px solid #b4bccc;border-radius:5px;line-height: 2.3em;color: #b4bccc;font-size: 0.26rem" @click="selectWorkers"><span class="divP">请选择维修工</span></p>
          <!--<el-input v-model="input" placeholder="请选择维修工" @focus="selectWorkers" size="small" style="width: 10em;"></el-input>-->
        </van-col>
      </van-row>
      <van-row>
        <van-col span="7" style="margin-top: 1em">
          <span style="">巡检类型：</span>
        </van-col>
        <van-col span="7" style="margin-top: 1em;margin-left: 2em">
          <!--通过v-model绑定值当前选中项的 name-->
          <van-radio-group v-model="radio">
            <van-radio name="1" style="height: 2em">周检</van-radio>
            <van-radio name="2" style="height: 2em">月检</van-radio>
            <van-radio name="3" style="height: 2em">季检</van-radio>
            <van-radio name="4" style="height: 2em">年检</van-radio>
          </van-radio-group>
        </van-col>
      </van-row>
      <!--<van-row style="margin-top: 5rem;font-size: 1.8rem;">-->
        <!--<van-col span="7">-->
          <!--<span style="line-height: 9rem;">图片</span>-->
          <!--<van-icon name="photograph" style="font-size: 2rem;"/>-->

        <!--</van-col>-->
        <!--<van-col span="10" style="margin-left: -5rem">-->
          <!--&lt;!&ndash;使用vant图片上传插件&ndash;&gt;-->
          <!--<van-uploader :after-read="onRead">-->
            <!--&lt;!&ndash;图片预览修饰作用&ndash;&gt;-->
            <!--<img class="head-img" src="../../../src/assets/Company/nothing.jpg" ref="goodsImg" style="width: 60%;height: 10rem;margin-left: 6rem">-->
          <!--</van-uploader>-->
        <!--</van-col>-->
        <!--<van-col span="8" style="padding-top: 3rem"><span style="font-size: 1.5rem;" class="imgSpan">未选择任何文件</span></van-col>-->
      <!--</van-row>-->
    </van-cell-group>
    <van-button size="large" class="dis" :disabled="disabled" @click="submit" style="margin-top: 1em">提交</van-button>
    <!--<van-button size="large" @click="selectWorkers" v-if="isAggre == 1">派出维修工</van-button>-->
    <van-popup v-model="show" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        title="请选择维修技师"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>

  </div>
</template>
<script>
  export default {
    data(){
      return{
        equip:'',
        radio:'1',
        checkTime:'',
        checkTime1:"",
        file:'',
        disabled:false,
        imgData:'',
        isAggre:'',
        show:false,
        columns: [],
        fixerData:"",
        currentDate: new Date(),
        minDate:new Date(),
        input:"",
        workerId:""
      }
    },
    methods:{
      clickinput(){
        this.$refs.inputText.blur();
      },
      getValues(v){
        console.log("时间"+v)
      },
      // 接收设备id
      getEuip(){
        this.equip = this.$route.query.equipId;
      },
      // 上传图片
      // onRead(file) {
      //   // 将选中图片展示在界面上
      //   this.$refs.goodsImg.src = file.content;
      //   console.log("file"+file.file);
      //   // 创建formData对象
      //   var formData = new FormData();
      //   // 往formData对象添加键值对，值为file.file
      //   formData.append("file", file.file);
      //   console.log("formData"+formData);
      //
      //   // ajax里的this不是指向的vue实例,创建实例别名that
      //   var that = this;
      //   // Ajax网络请求
      //   $.ajax({
      //     url:"http://app.zhongtongguanglian.com:8080/user/uploadPic",
      //     type:"post",
      //     data:formData,
      //     processData:false,
      //     contentType:false,
      //     beforeSend: function (XMLHttpRequest) {
      //       XMLHttpRequest.setRequestHeader("Auth-Token", JSON.parse(window.localStorage.getItem("token") || "[]").toString());
      //     },
      //     success:function(data){
      //       // 上传成功code返回1
      //       if(data.code == 1){
      //         // 将图片旁边的span文本转换
      //         $(".imgSpan").text("");
      //       }
      //       that.imgData = data.data;
      //       console.log("data",data);
      //     },
      //     error:function(e){
      //       alert("错误！！");
      //     }
      //   });
      // },
      // 提交计划网络请求
      submit(){
        if(this.checkTime == "" || this.checkTime1 == "" || this.input == "" || this.radio == ""){
            this.$toast("请先完善信息");
        }else {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.$http.post("/polling/createPollingLog",{
            "equipmentId":this.equip,
            "thisTime":this.checkTime,
            "type":this.radio,
            "nextTime":this.checkTime1,
            "WXGId":this.workerId
          },{
            headers: {
              'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
              'Content-Type': 'application/json'
            }
          }).then((res)=>{
            loading.close();
            console.log("派遣计划",res);
            if(res.data.code == 1){
              this.$toast.success("派送成功")
              this.$router.push({
                path: "/company"
              });
            }else {
              this.$toast.success("派送失败")
            }

          }).catch((error)=>{
            console.log(error);
          })
        }
        // console.log("id"+this.equip);
        // console.log("checkTime"+this.checkTime);
        // console.log("checkTime1"+this.checkTime1);
        // console.log("input"+this.input);
        // console.log("radio"+this.radio);
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        // console.log("imgdata",this.imgData);

      },
      // 查询所有维修工
      selectWorkers(){
        this.$http.post("/user/findWXGsByWBQYUsername",{},{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          console.log("维修工信息",res);
          this.fixerData = res.data.data;
          // 置空数组，防止出现重复添加的现象
          this.columns=[];
          // 用forEach方法遍历数组
          this.fixerData.forEach(item=>
          {
            // 把name用push方法依次放在数组的末尾  push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
            this.columns.push(item.name);
          })
          this.show = true;
        }).catch((error)=>{
          console.log(error);
        })
      },
      onConfirm(value, index) {

        console.log("点击维修工号",this.fixerData[index].id);
        // 保存技师id方便网络请求
        this.workerId = this.fixerData[index].id;
        console.log("技师",value,index);
        // 技师名字存到输入框
        this.input = value;
        $(".divP").text(value);
        // this.fixerData[index].id  是当前确定技师的id。

        this.show = false;

      },
      onCancel() {
        this.show = false;
      }
    },
    created(){
      this.getEuip();
    }
  }

</script>
<style scoped>
  /*vant单选框点击效果似乎被其他默认样式影响，导致点击位置下移，查看控制台后，在此清零*/
  input[type="radio"], input[type="checkbox"]{
    margin: 0;
  }
</style>
