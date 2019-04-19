<template>
  <el-container>
    <el-container>
      <div>
        <three></three>
      </div>
      <el-container>
        <el-header style="background-color: #3a8ee6;text-align: right; font-size: 16px; line-height: 60px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息查看</el-dropdown-item>
              <el-dropdown-item>修改个人信息</el-dropdown-item>
              <el-dropdown-item>修改账号密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>个人中心</span>
        </el-header>
        <el-main>
          <div class="content">
            <div style="margin-top:30px;padding:10px ;">
              <div class="title">
                <h2>设备编辑</h2>
              </div>
              <el-form ref="form" label-width="80px">
                <el-form-item label="设备编号">
                  <el-input v-model="code" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="设备名称">
                  <el-input v-model="name"/>
                </el-form-item>
                <el-form-item label="设备属性">
                  <el-select v-model="value" :placeholder="state[isTeZhongSheBei]" style="width: 100%;margin-bottom: 2%">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="设备类型">
                  <el-input  v-model="type"/>
                </el-form-item>
                <el-form-item label="设备描述">
                  <el-input  v-model="miaoshu"/>
                </el-form-item>
                <el-form-item label="规格型号">
                  <el-input  v-model="version"/>
                </el-form-item>
                <el-form-item label="设备地址">
                  <el-input  v-model="address"/>
                </el-form-item>
                <el-form-item label="归属部门">
                  <el-input  v-model="bumeng"/>
                </el-form-item>
                <el-form-item label="维保单位">
                  <el-input  v-model="wbname"/>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="input-group btn-login" @click="edit(data.id)">编辑设备</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import three from '../three'
  export default {
    components:{
      three
    },
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
        wbname:'',
        state:[
          '普通设备',
          '特种设备'
        ],
        options:[
          {
            value:0,
            label:'普通设备'
          },{
            value:1,
            label:'特种设备'
          },
        ],
        value:'',
      };
    },
    created(){
      this.select();
    },
    methods: {
      select: function () {
        this.elementId = this.$route.params.elementId;
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
              this.wbname = this.data.wbqy.name;
              this.id = this.data.wbqy.id;

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
      edit: function (equipmentID) {
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
              if (res.data.code === "1") {
                window.localStorage.setItem(
                  "equipment",
                  JSON.stringify(res.data.token)
                );

                this.$router.replace("/devicePCBlack");
              } else {
                this.$toast("更改失败");
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

  .input-group {
    margin-top: 2%;
  }

  .content {
    margin: 5%;
  }
</style>
