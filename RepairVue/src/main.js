// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vant from 'vant';
import 'vant/lib/index.css';
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
// const Vue = require('vue')
// const ElementUI = require('element-ui')
// const axios = require('axios')
import Vuex from 'vuex'
import {Lazyload,RadioGroup, Radio,Dialog,Cell, CellGroup,Uploader,Toast } from 'vant';
Vue.use(RadioGroup).use(Radio).use(Uploader).use(Cell).use(CellGroup).use(Dialog).use(Toast);
Vue.use(Lazyload);
Vue.use(Vuex);
// Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.use(Vant);

Vue.use(ElementUI);

Vue.config.productionTinpmp = false;
// axios.defaults.baseURL = 'http://localhost:8080/';
// axios.defaults.baseURL = 'http://192.168.43.28:8080/';
// axios.defaults.baseURL = 'http://app.zhongtongguanglian.com:8080/';
// axios.defaults.baseURL = 'http://www.haojunqian.cn:8080/';
document.addEventListener('deviceready', function () {
  new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
  });
  document.addEventListener("jpush.receiveRegistrationId", function (event) {
    alert("receiveRegistrationId" + JSON.stringify(event));
    // $("#registrationId").html(event.registrationId);
  }, false);
  initiateUI();
}, false);
var getRegistrationID = function() {
  window.JPush.getRegistrationID(onGetRegistrationID);
};
var onGetRegistrationID = function(data) {
  try {
    alert("JPushPlugin:registrationID is " + data);
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
    alert("open Notification:" + alertContent);
  } catch (exception) {
    alert("JPushPlugin:onOpenNotification" + exception);
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
    alert("onReceiveNoti"+exception)
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
    alert("JPushPlugin:onReceiveMessage-->" + exception);
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
    alert("init"+exception);
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
