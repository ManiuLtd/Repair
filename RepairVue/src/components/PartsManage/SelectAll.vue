<template>
  <div id="selectA">
    <van-row type="flex" class="header" justify="space-between">
      <van-col span="4">
        <router-link to="partsManage">
          <van-icon name="arrow-left" size="1em" color="white"/>
        </router-link>
      </van-col>
      <van-col span="8" offset="2">全部配件</van-col>
      <van-col span="6"></van-col>
    </van-row>
    <!--为了使用element的表格关键字搜索-->
    <!--partsAll这个数据源类型必须是数组，如果设成字符串string则filter会报错-->

    <el-table
      :data="partsAll.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))">
      <el-table-column
        label="配件名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="数量"
        prop="number">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="关键字"
            style="width: 8em;padding: 0"
            prefix-icon="el-icon-search"

          />

        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<div class="pro-con-con" @click="showPartsM(partsA)" v-for="partsA in partsAll">-->
    <!--<van-cell-group style="text-align: left">-->
    <!--&lt;!&ndash;数据绑定设置项目标题&ndash;&gt;-->
    <!--<van-cell :title="partsA.name" :value="partsA.number"/>-->
    <!--</van-cell-group>-->
    <!--</div>-->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // 这个数据源必须是数组，如果设成字符串string则filter会报错
        partsAll: [],
        search: ''
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        // 向showPartsMessage组件发送data
        this.$router.push({
          name: 'showPartsMessage', query: {partsMessage: row}
        });
      },
      // 发起网络请求
      getPartsAll() {
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        // console.log(JSON.parse(window.localStorage.getItem("token") || "[]").toString());
        this.$http.post("/parts/wbqySelectAllParts", {}, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          console.log("111", res);
          this.partsAll = res.data.data;
        }).catch((error) => {
          console.log(error);
        })
      }
    },
    created() {
      this.getPartsAll();
    }
  }
</script>
<style scoped>
  body {
    background-color: white;
  }
</style>
