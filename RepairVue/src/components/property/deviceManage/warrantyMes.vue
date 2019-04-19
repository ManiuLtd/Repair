<template>
  <div id="withRepair">
    <van-row class="header" type="flex" justify="space-between" style="">
      <van-col span="4">
        <router-link to="/equipment/warranty">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="10" offset="2">一键报修详情</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <div class="content">
      <div style="">
        <el-form ref="form">
          <el-form-item label="设备编号">
            <el-input  v-model="code" readonly/>
          </el-form-item>
          <el-form-item label="设备名称">
            <el-input  v-model="name" readonly/>
          </el-form-item>
          <el-form-item label="设备属性">
            <!--用三目运算符data前面需要加this.-->
            <el-input  v-model="this.isTeZhongSheBei ? '特种设备' : '普通设备'" readonly/>
          </el-form-item>
          <el-form-item label="设备类型">
            <el-input  v-model="type" readonly/>
          </el-form-item>
          <el-form-item label="设备描述">
            <el-input  v-model="miaoshu" readonly/>
          </el-form-item>
          <el-form-item label="规格型号">
            <el-input  v-model="version" readonly/>
          </el-form-item>
          <el-form-item label="设备地址">
            <el-input  v-model="address" readonly/>
          </el-form-item>
          <el-form-item label="归属部门">
            <el-input  v-model="bumeng" readonly/>
          </el-form-item>
          <el-form-item label="维保单位">
            <el-input  v-model="wbqyname" readonly/>
          </el-form-item>
          <el-form-item label="报修描述">
            <el-input  v-model="miaoshuMistake"/>
          </el-form-item>
          <!--<el-form-item label="报修描述">
            <el-input  v-model="miaoshu"/>
          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" size="small" class="btn-login" @click="add(data.id) ">一键报修</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>


</template>

<script>
  export default {
    name: "edit",
    data() {
      return {
        wbqyname:'',
        data: [],
        code: '',
        name: '',
        isTeZhongSheBei: '',
        type: '',
        miaoshu: '',
        version: '',
        address: '',
        bumeng: '',
        message: "设备信息数据",
        msg: false,
        notnull: false,
        miaoshuMistake:''
      };
    },
    created(){
      this.select();
    },
    methods: {
      add: function (equipmentId) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        if (equipmentId === "") {
          this.$toast("请返回重试");
          this.notnull = true;
        } else {
          console.log("the msg is ", equipmentId, this.miaoshu)
          this.$http
            .post(
              "/actionLog/repairs",
              {
                equipmentId: equipmentId,
                miaoshu: this.miaoshuMistake
              },
              {
                headers: {
                  'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
                  'Content-Type': 'application/json'
                }
              },
              {
                // emulateJSON: true,
              }
            )
            .then(res => {
              console.log("res:",res);
              loading.close();
              if (res.data.code === "1") {
                this.$toast.success('报修成功');
                this.$router.go(-1);
              } else {
                this.$toast.fail('报修失败');

              }
            })
            .catch(err => {
              this.$notify({
                title: "一键报修失败",
                message: "服务器请求失败，请检查网络或联系管理员",
                type: "error"
              });
              console.log(err);
            });
        }
      },
      select: function () {
        this.elementId = this.$route.params.elementId;
        this.$http
          .post(
            "/equipment/findById/",
            {
              id: this.elementId,
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
            if (res.data.code === "1") {
              console.log("this is success", res);

              window.localStorage.setItem(
                "element",
                JSON.stringify(res.data.token)
              );
              this.data = res.data.data;
              this.code = this.data.id;
              this.name = this.data.name;
              this.isTeZhongSheBei = this.data.isTeZhongSheBei;
              this.type = this.data.type;
              this.miaoshu = this.data.miaoshu;
              this.version = this.data.version;
              this.address = this.data.address;
              this.bumeng = this.data.bumeng;
              this.wbqyname = this.data.wbqy.name;
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
              title: "获取设备信息失败",
              message: "服务器请求失败，请检查网络或联系管理员",
              type: "error"
            });
            console.log(err);
          });
      },
    }
  }

</script>

<style scoped>
  .btn-login {
    width: 100%;
  }

  .title {
    text-align: center;
  }
  .content {
    margin: 5%;
  }
</style>
