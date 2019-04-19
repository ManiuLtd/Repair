<template>
  <div id="partsAddN">
    <van-cell-group style="padding-top: 20px">
      <van-field
        clearable
        v-model="partsId"
        label="配件id："
      />
      <van-field
        label="数量："
        v-model="partsNum"
        rows="3"
      />
    </van-cell-group>
    <van-button size="normal" type="default" style="margin-left: -20px" @click="submitNum">提交</van-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        partsId: '',
        partsNum: '',
      }
    },
    methods: {
      submitNum() {
        // 登录时，token被存在了localStorage里，现在直接调用它做请求头
        this.$http.post("/parts/addParts", {
          "pid": this.partsId,
          "num": this.partsNum
        }, {
          headers: {
            'Auth-Token': JSON.parse(window.localStorage.getItem("token") || "[]").toString(),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          loading.close();
          if (res.data.code == 1) {
            this.$toast.success('入库成功');
          } else {
            this.$toast.fail('入库失败');
          }
          console.log("111", res);
        }).catch((error) => {
          console.log(error);
        })
      }
    }
  }
</script>
<style></style>
