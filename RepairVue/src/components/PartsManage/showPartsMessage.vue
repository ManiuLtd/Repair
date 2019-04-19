<template>
  <div id="showPartsM">
    <van-row type="flex" class="header" justify="space-between">
      <van-col span="4">
        <router-link to="selectAll">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="8" offset="2">{{partsName}}</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <van-cell-group style="padding-top: 0.2rem">
      <van-field
        clearable
        v-model="partsName"
        label="配件名称："

      />
      <van-field
        clearable
        v-model="partsId"
        label="配件ID："
        disabled
      />
      <van-field
        label="配件类型："
        v-model="partsType"
        rows="3"

      />
      <van-field
        clearable
        v-model="partsPeice"
        label="价格："

      />
      <van-field
        clearable
        v-model="partsNum"
        label="数量："
        error-message="只可输入数字"
      />
      <van-field
        clearable
        v-model="partsUse"
        label="使用项目："

      />
      <van-field
        clearable
        type="textarea"
        rows="3" autosize
        v-model="partsNote"
        label="备注："

      />
    </van-cell-group>
    <el-button type="text" @click="submitNum">修改信息</el-button>
  </div>
</template>
<script>
  export default {
    created(){
      this.getpartsM();
    },
    data(){
      return{
        partsData:'',
        partsName: '',
        partsId:'',
        partsType: '',
        partsPeice: '',
        partsNum: '',
        partsUse: '',
        partsNote: ''
      }
    },
    methods:{
      // open3() {
      //   this.$prompt('请输入数量', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     inputPattern: /^\d+(\.{0,1}\d+){0,1}$/,
      //     inputErrorMessage: '格式不正确',
      //     center: true
      //   }).then(({ value }) => {
      //     this.submitNum(value);
      //   }).catch(() => {
      //
      //   });
      // },
      // 修改配件信息
      submitNum(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        this.$http.post("/parts/insertParts",{
          "id":this.partsId,
          "name":this.partsName,"type":this.partsType,"useEquipment":this.partsUse,"beizhu":this.partsNote,"peice":this.partsPeice,"number":this.partsNum
        },{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          loading.close();
          if(res.data.code == 1){
            this.$toast.success('修改成功');
            this.$router.go(-1);
          }else {
            this.$toast.fail('修改失败');
          }
          console.log("111",res);
        }).catch((error)=>{
          console.log(error);
        })
      },
      getpartsM(){
        this.partsData = this.$route.query.partsMessage;
        this.partsName = this.partsData.name;
        this.partsId = this.partsData.id;
        this.partsType = this.partsData.type;
        this.partsPeice = this.partsData.peice;
        this.partsNum = this.partsData.number;
        this.partsUse = this.partsData.useEquipment;
        this.partsNote = this.partsData.beizhu;
      }
    }
  }
</script>
<style>
  .el-message-box--center{
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
</style>
