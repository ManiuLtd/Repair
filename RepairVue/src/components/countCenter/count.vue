<template>
  <div id="count">
    <van-row type="flex" justify="space-between" class="header">
      <van-col span="4">
        <router-link to="/countCenter/equipment">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="8" offset="2">统计中心</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <van-row>
          <van-col span="7">
            <span>统计分类：</span>
          </van-col>
          <van-col span="6"><span>{{text}}</span></van-col>
          <van-col span="2">
            <el-dropdown trigger="click"  @command="handleCommand">
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
              <el-dropdown-menu slot="dropdown">

                  <el-dropdown-item command="/countCenter/fault">故障统计</el-dropdown-item>
                <el-dropdown-item command="/countCenter/replaceParts">配件更换情况</el-dropdown-item>
                <el-dropdown-item command="/countCenter/checkHistory">巡检记录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </van-col>
        </van-row>
      </div>
      <div class="block" style="width: 100%;padding: 0;min-height: 2em">
        <!--<van-row>-->
          <!--<van-col span="5">-->
            <!--<span class="demonstration" style="">日期：</span>-->
          <!--</van-col>-->
        <!--</van-row>-->
        <div style="width: 49%;border-right: 1px solid gainsboro;float: left;">
          <el-date-picker
            v-model="value1"
            type="date"
            size="mini"
            placeholder="开始日期"
            value-format="yyyy-MM-dd"
            class="dataone"
            style="width: 80%">
          </el-date-picker>
        </div>
        <div style="width: 49%;float: right">
          <el-date-picker
            v-model="value2"
            type="date"
            size="mini"
            placeholder="结束日期" style="width: 80%"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
        <!--<el-row>-->
          <!--<el-col span="12"><div>-->
            <!--<el-date-picker-->
              <!--v-model="value1"-->
              <!--type="date"-->
              <!--size="mini"-->
              <!--placeholder="开始日期"-->
              <!--value-format="yyyy-MM-dd"-->
              <!--class="dataone"-->
              <!--style="width: 100%">-->
            <!--</el-date-picker>-->
          <!--</div></el-col>-->
          <!--<el-col span="12"><div>-->
            <!---->
          <!--</div></el-col>-->
        <!--</el-row>-->
        <!--<van-row style="margin-top: 1em;">-->
          <!--<div>-->
            <!--<van-col span="12">-->
              <!--<el-date-picker-->
                <!--v-model="value1"-->
                <!--type="date"-->
                <!--size="mini"-->
                <!--placeholder="开始日期"-->
                <!--value-format="yyyy-MM-dd"-->
                <!--class="dataone">-->
              <!--</el-date-picker>-->
              <!--&lt;!&ndash;<div style="border: 1px solid #dcdfe6;border-radius: 4px;padding: 0.2em 0.4em">&ndash;&gt;-->
              <!--&lt;!&ndash;<input type="date" v-model="value1" style="border: none;background-color: white;width: 100%;color: #dcdfe6">&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--</van-col>-->

          <!--</div>-->
          <!--<van-col span="12">-->
            <!--&lt;!&ndash;<div style="border: 1px solid #dcdfe6;border-radius: 4px;padding: 0.2em 0.4em">&ndash;&gt;-->
              <!--&lt;!&ndash;<input type="date" v-model="value2" style="border: none;background-color: white;width: 100%;color: #dcdfe6">&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--<el-date-picker-->
              <!--v-model="value2"-->
              <!--type="date"-->
              <!--size="mini"-->
              <!--placeholder="结束日期" style=""-->
              <!--value-format="yyyy-MM-dd"-->
              <!--&gt;-->
            <!--</el-date-picker>-->
          <!--</van-col>-->

        <!--</van-row>-->

      </div>


    </el-card>
    <div class="countCon">
      <!--往子组件上绑定父组件要传输的值-->
      <router-view :value1="value1" :value2="value2" :equipId="equipId"></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value1:'',
        value2:'',
        equipId:'',
        command:'/countCenter/fault',
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
          case "/countCenter/fault":
            this.text = "故障统计";
            this.$router.push({path:"/countCenter/fault",query:{equipId:this.equipId}});
            break;
          case "/countCenter/replaceParts":
            this.text = "配件更换情况";
            this.$router.push({path:"/countCenter/replaceParts",query:{equipId:this.equipId}});

            break;
          case "/countCenter/checkHistory":
            this.text = "巡检记录";
            this.$router.push({path:"/countCenter/checkHistory",query:{equipId:this.equipId}});

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
