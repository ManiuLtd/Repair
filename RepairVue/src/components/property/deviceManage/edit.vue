<!--设备编辑-->
<template>
  <div id="editquip">
    <van-row class="header" type="flex" justify="space-between" style="">
      <van-col span="4">
        <router-link to="/equipment/index">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="8" offset="2">设备编辑</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <div class="content">
      <!--equipmentEdit-->
      <div style="">
        <el-form ref="form">
          <!--<span style="float: left;line-height: 3em">设备编号</span>-->
          <el-form-item label="设备编号">
            <el-input v-model="code" disabled="disabled"/>
          </el-form-item>
          <!--<span style="float: left;line-height: 3em">设备名称</span>-->
          <el-form-item label="设备名称">
            <el-input v-model="name"/>
          </el-form-item>
          <!--<el-form-item label="设备属性">-->
            <!--<el-input  v-model="this.isTeZhongSheBei ? '特种设备' : '普通设备'"/>-->
          <!--</el-form-item>-->
          <!--<span style="float: left;line-height: 3em">设备属性</span>-->
          <el-form-item label="设备属性">
          <el-select v-model="value" :placeholder="this.isTeZhongSheBei ? '特种设备' : '普通设备'" style="width: 100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
            </el-form-item>
            <!--<span style="float: left;line-height: 3em">设备类型</span>-->
          <el-form-item label="设备类型">
            <el-input  v-model="type"/>
          </el-form-item>
          <!--<span style="float: left;line-height: 3em">设备描述</span>-->
          <el-form-item label="设备描述">
            <el-input  v-model="miaoshu"/>
          </el-form-item>
          <!--<span style="float: left;line-height: 3em">规格型号</span>-->
          <el-form-item label="规格型号">
            <el-input  v-model="version"/>
          </el-form-item>
          <!--<span style="float: left;line-height: 3em">设备地址</span>-->
          <el-form-item label="设备地址">
            <el-input  v-model="address"/>
          </el-form-item>
          <!--<span style="float: left;line-height: 3em">归属部门</span>-->
          <el-form-item label="归属部门">
            <el-input  v-model="bumeng"/>
          </el-form-item>
          <!--<span style="float: left;line-height: 3em">维保单位</span>-->
          <!--<el-form-item>-->
            <!--<el-input  v-model="wbqyname"/>-->
          <!--</el-form-item>-->
          <el-form-item label="维保单位">
          <el-select v-model="value1" style="width: 100%">
            <el-option
              v-for="item in options1"
              :key="item.index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
            </el-form-item>
            <!--<span style="float: left;line-height: 3em">二维码</span>-->
          <el-form-item label="二维码">
            <!--网络请求取消了令牌验证后，图片可以通过转换二进制流显示了，不太明白-->
          <!--<img :src="'http://localhost:8080/equipment/ewm?id='+elementId+'&width=300&height=300'-->
<!--" alt="" style="width: 100%;">-->
            <img :src="qrcode
" alt="" style="width: 100%;">
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="input-group btn-login" @click="edit(data.id)">编辑设备</el-button>
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
        id:'',
        data:'',
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
        wbqyname:'',
        qrcode:'',
        elementId:'',
        options:[
          {
            value:0,
            label:'普通设备'
          },{
            value:1,
            label:'特种设备'
          },
        ],
        options1:[],
        value:'',
        value1:"",
      };
    },
    created(){
      this.select();
      this.select1();
    },
    methods: {
      select: function () {
        var that = this;
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.elementId = this.$route.params.elementId;
        console.log("id",this.elementId);
        this.$http
          .post(
            "/equipment/findById/",
            {
              'id': this.elementId,
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
            loading.close();
            console.log("设备查询",res);
            if (res.data.code === "1") {
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
              this.id = this.data.wbqy.id;
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
        console.log("id!!",that.elementId);
        // get请求的请求头和请求参数是放在一起的
        this.$http
          .get(
            "/equipment/ewm?id="+that.elementId,{responseType: 'arraybuffer'},{

            },


          ).then(function (response) {
            console.log("res",response);
          loading.close();
          //将从后台获取的图片流进行转换
          return 'data:image/png;base64,' + btoa(
            new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
        }).then(function (data) {
          //接收转换后的Base64图片
          that.qrcode = data;
          // console.log("qrcode",that.qrcode)
          // console.log("data",data)
        })
          // .then(res => {
          //   loading.close();
          //   console.log("二维码", res);
          //
          //   this.qrcode = res.data;
          // })
          .catch(err => {
            this.$notify({
              title: "二维码生成失败",
              message: "服务器请求失败，请检查网络或联系管理员",
              type: "error"
            });
            console.log(err);
          });
      },
      select1: function () {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http
          .post(
            "/user/wyFindNotOutOfDateContract",
            {},
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
            loading.close();
            console.log("全部合同", res.data.data);
            if (res.data.code === "1") {
              window.localStorage.setItem(
                "equipment",
                JSON.stringify(res.data.token)
              );

              res.data.data.forEach(item=>{
                this.options1.push({value:item.wbqy.id,name:item.wbqy.name})
              });
              console.log("option2",this.options1)

              // 数组去重
              this.options1.forEach((item,index)=>{
                // 遍历数组，让其每一个元素与数组中下标在它后面的的元素比较
                for (let i = index+1;i<this.options1.length;i++){
                  // id相同即删掉后一个元素
                  if(item.value == this.options1[i].value){
                    this.options1.splice(i,1);
                    // splice删除后，数组会自动往前堆叠，下一个会移到上一个被删除元素的位置
                    i-=1;
                  }
                }
              })
              console.log("option1",this.options1)
            } else {
              // this.$router.push({
              //   path: "/"
              // });
              this.msg = true;
              console.log("this is fail", res);
            }
          })
          .catch(err => {
            // 下次这里再出错，就去看看合同里的物业信息是不是都有，且添加合同那里的物业信息，我感觉应该加一个接口，判断是否有这个用户名，才能提交添加合同
            this.$notify({
              title: "访问失败2",
              message: "服务器请求失败，请检查网络或联系管理员",
              type: "error"
            });
            console.log(err);
          });
      },

      edit: function (equipmentID) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        if (equipmentID === "") {
          this.notnull = true;
        } else {
          this.$http
            .post(
              "/equipment/addEquipment",
              {
                id:equipmentID,
                code: this.code,
                name: this.name,
                isTeZhongSheBei: this.value,
                type: this.type,
                miaoshu: this.miaoshu,
                version: this.version,
                address: this.address,
                bumeng: this.bumeng,
                wbqy: {"id": this.id}
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
              loading.close();
              console.log("编辑成功", res);
              if (res.data.code === "1") {
                window.localStorage.setItem(
                  "equipment",
                  JSON.stringify(res.data.token)
                );
                this.$toast.success("编辑成功");
                this.$router.replace("/deviceBlack");
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
                title: "添加失败",
                message: "服务器请求失败，请检查网络或联系管理员",
                type: "error"
              });
              console.log(err);
            });
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

  /*.input-group {*/
    /*margin-top: 2%;*/
  /*}*/

  .content {
    margin: 5%;
  }
</style>
