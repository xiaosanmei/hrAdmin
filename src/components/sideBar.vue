<style scoped>

</style>
<template>
<div>
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="login">群发消息</el-menu-item>
  <el-menu-item index="login">员工管理</el-menu-item>
  <el-menu-item index="login">系统管理</el-menu-item>
  <el-menu-item index="login">场馆管理</el-menu-item>
  <el-menu-item index="login">预约管理</el-menu-item>
</el-menu>
</div>
</template>
<script>
export default {
  data(){
      return{
     activeIndex: '',
      }
  },
  created(){
      this.activeIndex=this.$route.name;
  },
   methods: {
      handleSelect(param) {
      this.$route.push(param)
      }
    }
}
</script>

