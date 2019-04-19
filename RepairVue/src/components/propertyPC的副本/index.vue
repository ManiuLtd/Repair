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
          <div></div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import three from './three'
  export default {
    components:{
      three
    },
    name: "Index",
    data() {
      return {
        data:'',
        text:'',
        i:'',
        images: [
          'https://img.yzcdn.cn/2.jpg',
          'https://img.yzcdn.cn/2.jpg'
        ],
        active: 0
      }
    },
    created(){
      this.select()
    },
    methods: {
      select: function () {
        this.$http
          .post(
            "/notice/findNotice",
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
            if (res.data.code === "1") {
              window.localStorage.setItem(
                "announce",
                JSON.stringify(res.data.token)
              );
              this.data = res.data.data;
              for(this.i = 0;this.i<this.data.length; this.i++){
                this.text += this.data[this.i].text+"  ";
              }
              console.log("this.msg："+this.text);
              console.log("this.msg："+res.data.msg);
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
              title: "访问失败",
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
  .el-header {
    padding: 0 5px;}
  .el-main {
    padding: 0 0px;
  }
  .el-footer {
    padding: 0 0px;
  }
</style>
