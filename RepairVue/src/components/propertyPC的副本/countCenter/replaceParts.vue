<template>
  <div id="replace">
    <div id="myChart" style="width: 100%;height:35rem;"></div>
    <p>（x轴为更换配件名称，y轴为更换的数量）</p>
  </div>
</template>
<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件   这里之所以使用 require 而不是 import，是因为 require 可以直接从 node_modules 中查找，而 import 必须把路径写全。
  require('echarts/lib/chart/bar')
  export default {
    data() {
      return {
        name:[],
        time:[]
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
        this.name = [];
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
        // 再次给数组赋值前，重置两个数组
        this.name = [];
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
      open(){
        this.$message('该时间段内没有进行过配件更换');
      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: { text: 'ECharts 入门示例' },
          tooltip: {},
          xAxis: {
            // data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            data: this.name
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            // data: d2
            data: this.time
          }]
        });
      },
      // 发起网络请求,查询该设备配件更换情况
      getProblemData(){
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/parts/equipmentUseParts",{
          "id":this.equipId,"startTime":this.value1,"endTime":this.value2
        },{
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          console.log("配件更换情况",res);
          console.log("res.data.data.length"+res.data.data.length)
          if(res.data.data.length == 0){
            this.open();
          }
          res.data.data.forEach((item,index,Arr)=>{
            var equal = false;
            this.name.forEach((item1,index1,arr)=>{
              if(arr[index1] == Arr[index].parts.name){
                this.time[index1] += Arr[index].num;
                equal=true;
              }
            });
            if(!equal){
              this.name[index] = Arr[index].parts.name;
              this.time[index] = Arr[index].num;
            }
          });
          console.log("name"+this.name);
          console.log("time"+this.time);
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
