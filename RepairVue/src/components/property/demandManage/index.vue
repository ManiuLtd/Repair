<!-- 需求管理-->
<template>
  <div>
    <van-row type="flex" class="header" justify="space-between">
      <van-col span="4">
        <router-link to="/index">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="10" offset="2">需求发布</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <el-tabs type="card" class="el-tabs" :stretch="true">
      <el-tab-pane label="需求管理" class="el-tab-pane">
      <el-table
        ref="filterTable"
        :data="dataF.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题"
          >
        </el-table-column>
        <el-table-column
          prop="addDate"
          label="发布时间"
          show-overflow-tooltip          >
        </el-table-column>
        <el-table-column
          width="135"
          align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              style="padding: 0"
              prefix-icon="el-icon-search"
              placeholder="关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <router-link :to="{ name: 'demandEdit', params: { demandId: scope.row.id }}">
              <el-button size="mini" type="primary" icon="el-icon-edit" class="input-group" style="margin-bottom: 0.5em">编辑</el-button>
            </router-link>
            <el-button type="primary" size="mini" icon="el-icon-delete" class="input-group" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </el-tab-pane>
      <el-tab-pane label="添加需求" class="el-tab-pane">
        <!--<div class="title">-->
          <!--<h2>添加需求</h2>-->
        <!--</div>-->
        <el-form ref="form" label-width="80px" size="mini">
          <el-input class="input-group" v-model="title" placeholder="标题">
          </el-input>
          <el-input class="input-group" v-model="content" placeholder="内容">
          </el-input>
          <el-upload
            class="upload-demo"
            :action="GLOBAL.BASE_URL+'user/uploadPic'"
            :file-list="fileList3"
            :before-upload="beforeUpload"
            style="text-align: right;padding-right: 1em;color: limegreen;font-weight: bold;">
            <span style="float: right;border-bottom: 1px solid limegreen">上传附件</span>
            <div slot="tip" class="el-upload__tip" style="float: left"></div>
          </el-upload>

          <!--<el-input class="input-group" v-model="pic" placeholder="图片">
          </el-input>-->
          <!--<el-form-item label="限定区域">
            <el-radio-group v-model="sizeForm.resource" size="medium">
              <el-radio border label="省份"></el-radio>
              <el-radio border label="市"></el-radio>
            </el-radio-group>
          </el-form-item>-->
          <el-select v-model="value" placeholder="区域" style="width: 100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!--<el-input class="input-group" type="datetime" v-model="startDate" placeholder="开始日期">-->
          <!--</el-input>-->
          <!--onfocus="this.blur();"用来不让input获得焦点时弹出软件盘-->
          <el-date-picker
            v-model="startDate"
            type="datetime"
            placeholder="开始时间"
            onfocus="this.blur();"
            style="width: 100%;margin-top: 1em"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>

          <!--<el-input class="input-group" type="date" v-model="endDate" placeholder="结束日期">-->
          <!--</el-input>-->
          <el-date-picker
            v-model="endDate"
            type="datetime"
            placeholder="结束时间"
            onfocus="this.blur();"
            style="width: 100%;margin-top: 1em"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
          <el-button type="primary" class="input-group btn-login" @click="add()">发布需求</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="报价记录管理" class="el-tab-pane">
        <el-table
          ref="filterTable"
          :data="data1.filter(data => !search || data.requirement.title.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
          <el-table-column
            prop="requirement.title"
            label="竞价项目"
            >
          </el-table-column>
          <el-table-column
            prop="wbqy.name"
            label="维保企业"
            >
          </el-table-column>
          <el-table-column
            width="135"
            align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                style="padding: 0"
                prefix-icon="el-icon-search"
                placeholder="关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <router-link :to="{ name: 'quoteSelect', params: { quoteId: scope.row.id }}">
                <el-button size="mini" type="primary" icon="el-icon-edit" class="input-group" style="width: 8em">报价详情</el-button>
              </router-link>
              <el-button type="primary" size="mini" icon="el-icon-delete" class="input-group" @click="delHistory(scope.row.id)" style="width: 8em;margin-top: 2%">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dataF:[],
        data1:[],
        title:'',
        pic:'',
        content:'',
        area:'',
        search: '',
        radio: "",
        value:'',
        options:[
          {
            value:1,
            label:"全省"
          },{
            value:2,
            label:"全市"
          },

        ],
        startDate:"",
        endDate:'',
        fileList3:[],
        loadsrc:''
      }
    },
    created(){
      this.select();
      this.select1();
    },
    methods: {
      beforeUpload(file){
        let fd = new FormData();
        let that = this;
        fd.append('file',file);//传文件
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          target:".mask"
        });
        $.ajax({
          url: this.GLOBAL.BASE_URL+'user/uploadPic',
          type: "post",
          data: fd,
          processData: false,
          contentType: false,
          beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Auth-Token", JSON.parse(window.localStorage.getItem("token") || "[]").toString());
          },
          success: function (data) {
            loading.close();
            console.log("图片上传",data);
            that.loadsrc = data.data;
          },
          error: function (e) {
            loading.close();
            console.log("错误！！",e);
          }
        });
      },

      delHistory(v){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http
          .post(
            "/auction/wyDelAuction",
            {
              auctionId:v

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
            console.log("删除记录",res);
            loading.close();
            if (res.data.code === "1") {
              this.$toast.success("删除成功");
              window.localStorage.setItem(
                "demand",
                JSON.stringify(res.data.token)
              );
              this.$router.push({
                path: "/demandBlack"
              });
            } else {
              this.$toast.fail("删除失败");
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
      },
      del(v){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http
          .post(
            "/auction/wyDelRequirement",
            {
              id:v

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
            console.log("删除",res);
            loading.close();
            if (res.data.code === "1") {
              this.$toast.success("删除成功");
              window.localStorage.setItem(
                "demand",
                JSON.stringify(res.data.token)
              );
              this.$router.push({
                path: "/demandBlack"
              });
            } else {
              this.$toast.fail("删除失败");
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
      },
      add: function () {
        console.log("时间1",this.startDate);
        console.log("时间2",this.endDate);
        if (this.title === "" || this.value === "" || this.startDate === "" || this.endDate === "") {
          this.$toast("请完善信息");
          this.notnull = true;
        } else {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          console.log("the msg is ", this.title)
          this.$http
            .post(
              "/auction/wyPublishRequirement",
              {

                title: this.title,
                content: this.content,
                areaType:this.value,
                startTime:this.startDate,
                endTime:this.endDate,
                pic:this.loadsrc
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
              console.log("发布",res);
              loading.close();
              if (res.data.code === "1") {
                this.$toast.success("发布成功");
                window.localStorage.setItem(
                  "demand",
                  JSON.stringify(res.data.token)
                );
                this.$router.push({
                  path: "/demandBlack"
                });
              } else {
                this.$toast.fail("发布失败");
                this.$router.push({
                  path: "/"
                });
                this.msg = true;
                console.log("this is fail", res);
                this.$toast(res.data.msg);

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
      },
      select1: function () {
        this.$http
          .post(
            "/auction/wyViewAuction",
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
                "quote",
                JSON.stringify(res.data.token)
              );
              this.data1 = res.data.data;
              console.log("物业查看报价",this.data1)
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
      },
      select: function () {
        this.$http
          .post(
            "/auction/wyViewRequirement",
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
                "demand",
                JSON.stringify(res.data.token)
              );
              this.dataF = res.data.data;
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
<style>
  .el-upload .el-upload__input{
    display:none!important;
  }
</style>
