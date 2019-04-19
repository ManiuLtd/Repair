<template>
  <div id="announce">
    <van-row type="flex" class="header" justify="space-between">
      <van-col span="4">
        <router-link to="/announce/index">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="10" offset="2">编辑公告</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <div class="content">

      <!--equipmentAdd-->
      <div style="">
        <el-form ref="form" label-width="80px">
          <el-form-item label="公告内容">
            <el-input v-model="text"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="input-group btn-login" @click="edit(data.id)">编辑公告</el-button>
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
        data:'',
        id:'',
        text: '',
        message: "公告信息数据",
        msg: false,
        notnull: false
      };
    },
    created(){
      this.select();
    },
    methods: {
      select: function () {
        this.announceId = this.$route.params.announceId;
        this.$http
          .post(
            "/notice/findNoticeById",
            {
              'id': this.announceId,
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
              this.text = this.data.text;
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
              title: "获取公告信息失败",
              message: "服务器请求失败，请检查网络或联系管理员",
              type: "error"
            });
            console.log(err);
          });
      },
      edit: function (announceID) {
        if (announceID === "") {
          this.notnull = true;
        } else {
          this.$http
            .post(
              "/notice/addNotice",
              {
                id:announceID,
                text: this.text
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
                  "announce",
                  JSON.stringify(res.data.token)
                );

                this.$router.replace("/announceBlack");
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
