<template>
  <!--由于网络环境原因，npm install echarts -S失败，我采用国内的淘宝镜像安装了echarts-->
  <!--安装-->
  <!--npm install -g cnpm --registry=https://registry.npm.taobao.org-->
  <!--使用-->
  <!--cnpm install echarts -S-->
  <div id="fault" style="">
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->

    <div id="myChart" style="height:7rem;width: 100%"></div>
    <p>（x轴为故障发生时间，y轴为故障发生次数）</p>
    <!--<ve-line :data="chartData" :settings="chartSettings"></ve-line>-->
    <!--<ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>-->
    <!--<ve-bar :data="chartData" :settings="chartSettings"></ve-bar>-->
  </div>
</template>
<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // import echarts from '../../assets/echarts'
  // 引入柱状图组件   这里之所以使用 require 而不是 import，是因为 require 可以直接从 node_modules 中查找，而 import 必须把路径写全。
  // require('echarts/lib/chart/bar')
  export default {
    data() {
      // this.chartSettings = {
      // xAxisType: 'time',
      // yAxisType: 'value',
      //
      //
      // };
      return {
        // 故障发生的时间和次数
        num:[],
        time:[],
        // // vchart的东西
        // chartData: {
        //   columns: ['日期', '次数'],
        //   rows: [
        //     {'日期': '', '次数': ''},
        //   ],
        // }
      }
    },
    // 接收从父组件传来的三个值
    props:{
      value1:{
        type:String,
        required:true
      },
      value2:{
        type:String,
        required:true
      },
      equipId:{
        type:Number,
        required:true
      }
    },
    // 监听两个值的变化，发生变化时，重新发起网络请求，获取用户选中时间段的信息
    watch:{
      value1(){
        // 再次给数组赋值前，重置两个数组
        this.num = [];
        this.time = [];
        // 发起请求
        this.getProblemData();
        // 防止异步操作，先由网络请求获取数据，再让下面的方法拿到数据，渲染界面
        // 这里用了200毫秒，是为了大于浏览器的刷新时间（网络请求刷新）
        setTimeout(()=>{
          this.drawLine();
        },200)

      },
      value2(){
        this.num = [];
        this.time = [];
        this.getProblemData();
        setTimeout(()=>{
          this.drawLine();
        },200)

      }
    },
    // 这里echarts初始化应在钩子函数mounted()中，这个钩子函数是在el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用
    mounted() {
      setTimeout(()=>{
        this.drawLine();
      },200)
    },
    methods: {
      drawLine() {
        // console.log("ooo",this.time);

        // for (let i=0;i<=this.time.length-1;i++){
        //   this.chartData.rows[i]['日期'] = this.time[i];
        //   this.chartData.rows[i]['次数'] =this.num[i];
        //   this.chartData.rows.push({'日期':'','次数':''});
        // }
        //
        // console.log("!!",this.chartData)
        // this.chartData.rows[0]['日期'] =this.time ;
        // this.chartData.rows[0]['次数'] =this.num;

        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({

          title: { text: 'ECharts 入门示例'},
          tooltip: {},
          xAxis: {
            // data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            data: this.time,

            axisLabel: {
              // 可以设置为0强制显示所有标签
              interval:0,
              // 标签倾斜的角度
              rotate:40
            },
          },
          yAxis: { minInterval : 1},
          series: [{
            name: '销量',
            type: 'bar',
            // data: d2
            data: this.num
          }],

        });
      },
      // 发起网络请求,查询该设备故障统计
      getProblemData(){
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/equipment/statisticsFailureFrequency",{
          "id":this.equipId,"startTime":this.value1,"endTime":this.value2
        },{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          console.log("故障统计",res);
          if(res.data.length == 0){
            this.$message('该时间段内没有发生过故障');
          }
          res.data.forEach((item,index,Arr)=>{
            this.num[index] = Arr[index].number;
            this.time[index] = Arr[index].time.slice(0,10);
          });

        }).catch((error)=>{
          console.log(error);
        })
      }
    },
    created(){
      this.getProblemData();

    }
  }
</script>
<style></style>
<!--<template>-->
  <!--<ve-line :data="chartData" :settings="chartSettings"></ve-line>-->
<!--</template>-->

<!--<script>-->
  <!--export default {-->
    <!--data () {-->
      <!--this.chartSettings = {-->
        <!--xAxisType: 'time'-->
      <!--}-->
      <!--return {-->
        <!--chartData: {-->
          <!--columns: ['日期', '次数'],-->
          <!--rows: [-->
            <!--{ '日期': '2018-01-01', '次数': 1393 },-->
          <!--]-->
        <!--}-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->
<!--<template>-->
  <!--<ve-line :data="chartData"></ve-line>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
  <!--data: function () {-->
    <!--return {-->
      <!--chartData: {-->
        <!--columns: ['日期', '销售额'],-->
        <!--rows: [-->
          <!--{ '日期': '1月1日', '销售额': 123 },-->
          <!--{ '日期': '1月2日', '销售额': 1223 },-->
          <!--{ '日期': '1月3日', '销售额': 2123 },-->
          <!--{ '日期': '1月4日', '销售额': 4123 },-->
          <!--{ '日期': '1月5日', '销售额': 3123 },-->
          <!--{ '日期': '1月6日', '销售额': 7123 }-->
        <!--]-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--}-->
<!--</script>-->
