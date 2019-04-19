[![Build Status](https://travis-ci.org/Wevan/Repair.svg?branch=master)](https://travis-ci.org/Wevan/Repair)

# 安装依赖

先确保安装好 `node` 环境和 `npm`

在项目根目录下安装 `Cordova` 的依赖,`npm install`。

安装完成后 打开到 `RepairVue` 目录

执行 `npm install` 安装 `vue.js` 依赖

# 调试

在 `RepairVue` 目录下运行 `npm run dev`,打开浏览器 'http://localhost:8080'


# 编译环境

## Android 

安装 Android sdk 19.0.0以上

配置好环境目录

在项目根目录下运行 `cordova build android` 编译Android

## ios

请在mac os环境下编译，下载安装好 `xcode`

在项目根目录下运行 `cordova build ios` 编译ios