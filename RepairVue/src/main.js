// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import App from './App'
import './assets/css/header.css'
// import 'babel-polyfill'
// import Es6Promise from 'es6-promise'
// require('es6-promise').polyfill()
// Es6Promise.polyfill()
// import echarts from 'echarts'

// const Vue = require('vue')
// const ElementUI = require('element-ui')
// const axios = require('axios')
import global from './components/Base'
import Vuex from 'vuex'
import {Lazyload,RadioGroup, Radio,Dialog,Cell, CellGroup,Uploader,Toast } from 'vant';
import VeLine from 'v-charts/lib/line.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VeBar from 'v-charts/lib/bar.common'
// import { VChart,VScale} from 'vux'
// import VeLine from 'v-charts/lib/line'
// import Router from "vue-router";
Vue.component(VeLine.name, VeLine);
Vue.component(VeHistogram.name, VeHistogram);
Vue.component(VeBar.name, VeBar);
// Vue.component('v-chart', VChart);
// Vue.component('v-scale', VScale);
Vue.use(RadioGroup).use(Radio).use(Uploader).use(Cell).use(CellGroup).use(Dialog).use(Toast);
Vue.use(Lazyload);
Vue.use(Vuex);
// Vue.use(echarts);
// Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.GLOBAL = global;
Vue.use(Vant);

Vue.use(ElementUI);
axios.defaults.baseURL=global.BASE_URL;
// Vue.config.productionTinpmp = false;
// axios.defaults.baseURL = 'http://localhost:8080/';
// axios.defaults.baseURL = 'http://192.168.43.28:8080/';
// axios.defaults.baseURL = 'http://app.zhongtongguanglian.com:8080/';
// axios.defaults.baseURL = 'http://www.haojunqian.cn:8080/';
// document.addEventListener('deviceready', function () {
// 路由守卫  在index.js中设置auth，给要判断的路径设置auth，不设置默认是false，因为要判断全部的路径所以没有设置，默认fasle的都判断
// to指要去的路由，from指当前路由，next表示执行操作，可以跳转的意思
router.beforeEach((to,from,next) => {
    // 这里刚进入界面时，to是有的，但from没有是空的，会报错暂停。所以设置这样的代码，以便进行下去
    if(from.name==null){
      next();
    }
// 对所有默认fasle的路由进行判断
//   在main.js里给每个路由设置了meta数组，里面有wbqy，wy，wxg等权限标签，每次跳转时都要对权限进行比较验证，用indexof来进行比较，如果相同或是包含的关系，就可以跳转
    if(to.matched.some( m => m.meta.auth)==false) {
      // console.log("先判断是否登录");
      // 如果跳转登陆注册界面的话，就直接跳转
      if(to.name=='Login' || to.name=='register'){
        next();
        // 如果存储的user为空，这里是不让退出用户重返之前界面
      }else if(localStorage.getItem('user')=='') {
        Vue.prototype.$toast('您已退出，请重新登录');
        next('/');
        //   原来存在一个问题：物业端和技师端都可以实现回退出现提示，但维保不行，原因是在main.js里登陆权限数组里wbqy是第一个元素，维保对接时和第一个权限比较是相同的，所以不会提示。然后我又加了一个判断，如果当前页面是维保企业，那跳转时进行权限比对时统一和跳转路由的最后一个权限进行比对，反正其他路由只有一个权限，第一个元素和最后一个元素是同一个元素。而登陆和注册页面就不一样了，这样就防止了维保跳登陆界面时的情况，和登陆的最后一个权限比对就会跳出退出提示
      }else if (from.meta[0]=='wbqy') {
        if (from.meta.indexOf(to.meta[to.meta.length-1]) < 0) {
          Dialog.confirm({
            title: '提示',
            message: '是否退出当前账户',
            messageAlign:'center'
          }).then(() => {
            // on confirm
            window.localStorage.setItem(
              "user", ""
            );
            next('/login');

          }).catch(() => {
            // on cancel
          });
        }else {
          next();

        }
      }else if(from.meta.indexOf(to.meta[0])<0) {
        //   }else if(Vue.prototype.getArrEqual.length) {
        // alert('您已退出，请重新登录');
        Dialog.confirm({
          title: '提示',
          message: '是否退出当前账户',
          messageAlign:'center'
        }).then(() => {
          // on confirm
          window.localStorage.setItem(
            "user", ""
          );
          next('/login');

        }).catch(() => {
          // on cancel
        });
      }
// 如果权限相同就跳转
      else {
        next();

      }


    }else {
      next()

    }
    // }

  })

  new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
  });
//   document.addEventListener("jpush.receiveRegistrationId", function (event) {
//     // alert("receiveRegistrationId" + JSON.stringify(event));
//     // $("#registrationId").html(event.registrationId);
//   }, false);
//   initiateUI();
// }, false);

var getRegistrationID = function() {
  window.JPush.getRegistrationID(onGetRegistrationID);
};
var onGetRegistrationID = function(data) {
  try {
    // alert("JPushPlugin:registrationID is " + data);
    if (data.length == 0) {
      var t1 = window.setTimeout(getRegistrationID, 1000);
    }
  } catch (exception) {
    alert("getReg"+exception);
  }
};
var onOpenNotification = function(event) {
  try {
    var alertContent;
    if (device.platform == "Android") {
      alertContent = event.alert;
    } else {
      alertContent = event.aps.alert;
    }
    // alert("open Notification:" + alertContent);
  } catch (exception) {
    // alert("JPushPlugin:onOpenNotification" + exception);
  }
};
var onReceiveNotification = function(event) {
  try {
    var alertContent;
    if (device.platform == "Android") {
      alertContent = event.alert;
    } else {
      alertContent = event.aps.alert;
    }
  } catch (exception) {
    // alert("onReceiveNoti"+exception)
  }
};
var onReceiveMessage = function(event) {
  try {
    var message;
    if (device.platform == "Android") {
      message = event.message;
    } else {
      message = event.content;
    }
  } catch (exception) {
    // alert("JPushPlugin:onReceiveMessage-->" + exception);
  }
};
var initiateUI = function() {
  try {
    window.JPush.init();
    window.JPush.setDebugMode(true);
    window.setTimeout(getRegistrationID, 1000);
    if (device.platform != "Android") {
      window.JPush.setApplicationIconBadgeNumber(0);
    }
  } catch (exception) {
    // alert("init"+exception);
  }
};
  document.addEventListener("jpush.openNotification", onOpenNotification, false);
document.addEventListener("jpush.receiveNotification", onReceiveNotification, false);
document.addEventListener("jpush.receiveMessage", onReceiveMessage, false);

/* eslint-disable no-new */
// 创建公共父级方法
// let bus = new Vue();
// Vue.prototype.bus = bus;
// new Vue({
//   el: '#app',
//   router,
//   components: {App},
//   template: '<App/>'
// });
