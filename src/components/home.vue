<template>
  <div>
    home组件
    <el-button type="info" @click="exit">退出</el-button><!--info=灰色-->
  </div>
  
</template>

<style lang="less">
</style>

<script>
export default {
  methods: {
    exit(){
      window.sessionStorage.removeItem("token")
      this.$router.push("/")
    }
  },
}
</script>