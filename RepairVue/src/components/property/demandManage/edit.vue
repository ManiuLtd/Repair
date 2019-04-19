<template>
  <div id="editdemand">
    <van-row type="flex" class="header" justify="space-between">
      <van-col span="4">
        <router-link to="/demand/index">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="10" offset="2">编辑需求</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <div class="content">
      <!--equipmentAdd-->
      <div style="">
        <el-form ref="form">
          <el-form-item label="标题">
            <el-input v-model="title"/>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="content"/>
          </el-form-item>
          <!--<el-form-item label="图片">
            <el-input v-model="pic"/>
          </el-form-item>-->
          <!--<el-form-item label="限定区域">
            <el-radio-group v-model="sizeForm.resource" size="medium">
              <el-radio border label="省份"></el-radio>
              <el-radio border label="市"></el-radio>
            </el-radio-group>
          </el-form-item>-->
          <el-form-item label="区域">
            <!--<el-input v-model="area"/>-->
            <el-select v-model="value" placeholder="区域" style="width: 100%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="input-group btn-login" @click="edit(data.id)">编辑需求</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "add",
    data() {
      return {
        data:'',
        content: '',
        title: '',
        area: '',
        message: "需求信息数据",
        msg: false,
        notnull: false,
        value:'',
        options:[
          {
            value:1,
            label:"全省"
          },{
            value:2,
            label:"全市"
          },

        ]
      };
    },
    created(){
      this.select();
    },
    methods: {
      select: function () {
        this.demandId = this.$route.params.demandId;
        this.$http
          .post(
            "/auction/findRequirementById",
            {
              'id': this.demandId,
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
              window.localStorage.setItem(
                "demand",
                JSON.stringify(res.data.token)
              );
              this.data = res.data.data;
              this.title = this.data.title;
              this.content = this.data.content;
              this.area = this.data.area;
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
              title: "获取需求信息失败",
              message: "服务器请求失败，请检查网络或联系管理员",
              type: "error"
            });
            console.log(err);
          });
      },
      edit: function (demandID) {
        if (demandID === "") {
          this.$toast("请退回上一层重试");
          this.notnull = true;
        } else {
          if(this.value == '' || this.title == ''){
            this.$toast("请完善信息");
          }else {
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http
              .post(
                "/auction/wyPublishRequirement",
                {
                  id:demandID,
                  title: this.title,
                  content: this.content,
                  areaType: this.value
                },
                {
                  headers: {
                    'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
                    'Content-Type': 'application/json'
                  }
                },
                {
                  emulateJSON: true,
                }
              )
              .then(res => {
                console.log("编辑需求",res);
                loading.close();
                if (res.data.code === "1") {
                  this.$toast.success("编辑成功");
                  window.localStorage.setItem(
                    "demand",
                    JSON.stringify(res.data.token)
                  );
                  this.$router.push({
                    path: "/demandBlack"
                  });
                } else {
                  this.$toast.fail("编辑失败");

                  this.$router.push({
                    path: "/"
                  });
                  this.msg = true;
                  console.log("this is fail", res);
                }
              })
              .catch(err => {
                this.$notify({
                  title: "编辑失败",
                  message: "服务器请求失败，请检查网络或联系管理员",
                  type: "error"
                });
                console.log(err);
              });
          }

        }
      }

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

  .input-group {
    margin-top: 2%;
  }

  .content {
    margin: 5%;
  }
</style>
