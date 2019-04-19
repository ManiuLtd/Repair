<template>
  <div id="proCon">
    <van-nav-bar title="龙泽丽苑物业有限公司">
      <van-icon name="arrow-left" slot="left"><span @click="clickH">返回</span></van-icon>
    </van-nav-bar>
    <van-cell-group>
      <span>合作企业</span>
      <van-cell-group>
        <van-field v-model="value" placeholder="请输入用户名"/>
      </van-cell-group>
    </van-cell-group>
    <van-cell-group>
      <span>合作内容</span>
      <van-cell-group>
        <van-field v-model="message" type="textarea" placeholder="请输入合作内容" rows="1" autosize/>
      </van-cell-group>
    </van-cell-group>
    <span>开始时间</span>
    <van-field v-model="startTime" type="textarea" placeholder="请选择开始时间" rows="1" autosize @click="show1 = true">
      {{startTime}}
    </van-field>
    <van-popup v-model="show1" position="bottom">
      <van-datetime-picker type="date" :formatter="formatter"
                           @confirm="startTime = getColumnValues($event);show1 = false;" @cancel="show1 = false;"/>
    </van-popup>
    <span>结束时间</span>
    <van-field v-model="overTime" type="textarea" placeholder="请选择结束时间" rows="1" autosize @click="show2 = true">
      {{overTime}}
    </van-field>
    <van-popup v-model="show2" position="bottom">
      <van-datetime-picker type="date" :formatter="formatter"
                           @confirm="overTime = getColumnValues($event);show2 = false;" @cancel="show2 = false;"/>
    </van-popup>
    <span>负责人</span>
    <van-cell-group>
      <van-field v-model="person" type="textarea" placeholder="请输入负责人" rows="1" autosize/>
    </van-cell-group>
    <span>付款方式</span>
    <div class="payTime" style="">
      <span>付款时间</span>
      <van-field v-model="payTime" type="textarea" placeholder="请选择结束时间" rows="1" autosize @click="show3 = true">
        {{payTime}}
      </van-field>
      <van-popup v-model="show3" position="bottom">
        <van-datetime-picker type="date" :formatter="formatter"
                             @confirm="payTime = getColumnValues($event);show3 = false;" @cancel="show3 = false;"/>
      </van-popup>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue';

  export default {
    name: 'proCon',
    methods: {
      clickH() {
        this.$router.replace({path: '/managePro'});
      },
      getColumnValues(index) {
        //将返回的object类型的选中日期转化为字符串类型，用slice将其中需要的英文月份部分取出来
        console.log(1111);
        const mon = index.toString().slice(4, 7);
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mon1;
        //vue的forEach方法遍历数组，将month的每一个元素与mon比较，相同则取当前元素的下标，加1即为数字月数
        month.forEach(item => {

          if (item == mon) {
            mon1 = month.indexOf(item) + 1;
            // console.log(month.indexOf(item)+1);
          }

        });
        console.log(index.toString().slice(11, -27) + "-" + "0" + mon1 + "-" + index.toString().slice(8, -32));
        return index.toString().slice(11, -27) + "-" + "0" + mon1 + "-" + index.toString().slice(8, -32);

      },

      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`
        } else if (type === 'day') {
          return `${value}日`
        }
        return value;

      }
    },
    data() {
      return {
        value: '',
        message: '',
        show1: 'false',
        show2: 'false',
        show3: "false",
        currentDate: "",
        startTime: "",
        overTime: "",
        person: "",
        radio: "",
        payTime: "",

      }
    },
    created() {
      // 将show的初始值初始化
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;

    }
  }
</script>
<style scoped>
  .radio {
    position: relative;
    top: 19px;
    left: 6px;
  }

  .van-radio {
    float: left;
    margin-left: 20px;
  }
</style>

