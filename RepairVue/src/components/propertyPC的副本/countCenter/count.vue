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
          <div id="count">
            <van-row type="flex" justify="space-between" style="height: 67px;background-color: darkgoldenrod;color: whitesmoke;font-size: 20px;font-weight: bold;line-height: 67px;letter-spacing:4px;" class="header">
              <van-col span="4">

              </van-col>
              <van-col span="8" offset="2">统计中心</van-col>
              <van-col span="6"></van-col>
            </van-row>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <van-row>
                  <van-col span="5">
                    <span>统计分类：</span>
                  </van-col>
                  <van-col span="6"><span>{{text}}</span></van-col>
                  <van-col span="2">
                    <el-dropdown trigger="click"  @command="handleCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                      <el-dropdown-menu slot="dropdown">

                          <el-dropdown-item command="/countCenterPC/fault">故障统计</el-dropdown-item>
                        <el-dropdown-item command="/countCenterPC/replaceParts">配件更换情况</el-dropdown-item>
                        <el-dropdown-item command="/countCenterPC/checkHistory">巡检记录</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </van-col>
                </van-row>
              </div>
              <div class="block" style="width: 100%;padding: 0;">
                <van-row>
                  <van-col span="4">
                    <span class="demonstration" style="">日期：</span>
                  </van-col>
                  <van-col span="20">
                    <el-date-picker
                      v-model="value1"
                      type="date"
                      size="mini"
                      placeholder="选择日期" style="width: 9rem;"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <span style="margin:0 1rem;">至</span>
                    <el-date-picker
                      v-model="value2"
                      type="date"
                      size="mini"
                      placeholder="选择日期" style="width: 9rem;"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </van-col>
                </van-row>
              </div>
            </el-card>
            <div class="countCon">
              <!--往子组件上绑定父组件要传输的值-->
              <router-view :value1="value1" :value2="value2" :equipId="equipId"></router-view>
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
    data() {
      return {
        value1:'',
        value2:'',
        equipId:'',
        command:'/countCenterPC/fault',
        text:'',
      }
    },
    // 任一值改变将进行其余两值的非空判断，非空则进行子路由跳转并传值
    // watch:{
    //   command(val){
    //     if(val && this.value1 && this.value2){
    //       // this.$router.push({path:val,query:{equipId:this.equipId,time1:this.value1,time2:this.value2}})
    //       // this.$refs.childView.drawLine(["衬衫", "羊毛衫", "雪纺衫"],[5, 2, 1]);
    //       this.$refs.childView.getNoticeData();
    //
    //     }
    //   },
    //   value1(val){
    //
    //     if(val && this.command && this.value2){
    //       // this.$refs.childView.drawLine(["衬衫", "羊毛衫", "雪纺衫"],[5, 2, 1]);
    //       this.$refs.childView.getNoticeData();
    //
    //       // this.$router.push({path:this.command,query:{equipId:this.equipId,time1:val,time2:this.value2}})
    //     }
    //   },
    //   value2(val){
    //     if(val && this.value1 && this.command){
    //       // this.$router.push({path:this.command,query:{equipId:this.equipId,time1:this.value1,time2:val}});
    //       // this.$refs.childView.drawLine(["衬衫", "羊毛衫", "雪纺衫"],[5, 2, 1]);
    //       console.log(this);
    //       this.$refs.childView.getNoticeData();
    //
    //
    //     }
    //   },
    // },
    methods:{
      // 根据下拉菜单选中项不同变换跳转路径command，并改变text文本值
      handleCommand(command){
        this.command = command;
        switch (command) {
          case "/countCenterPC/fault":
            this.text = "故障统计";
            this.$router.push({path:"/countCenterPC/fault",query:{equipId:this.equipId}});
            break;
          case "/countCenterPC/replaceParts":
            this.text = "配件更换情况";
            this.$router.push({path:"/countCenterPC/replaceParts",query:{equipId:this.equipId}});

            break;
          case "/countCenterPC/checkHistory":
            this.text = "巡检记录";
            this.$router.push({path:"/countCenterPC/checkHistory",query:{equipId:this.equipId}});

            break;
        }
      },
      getEquipData(){
        this.equipId = this.$route.params.equipId;
      }
    },
    created(){
      this.getEquipData();
    }
  }
</script>
<style>
  .el-input--suffix .el-input__inner {
    padding-right: 0;
  }

</style>
