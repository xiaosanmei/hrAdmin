<style scoped>
.el-menu-demo{
    position: fixed;
    left: 0;
    top:0;
    height: 100%;
    z-index:99;
    margin-top:80px;
    width: 260px;
}
.titleLogo{
    width: 177px;
    position: fixed;
    top: 20px;
    left: 45px;
}
.title{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background: #fff;
}
.title .tou{
    position: fixed;
    top:20px;
    right: 200px;
    width: 40px;
    height: 40px;
    border-radius: 50px;
}
.logo-1{
    height: 100px;
}
.title .text{
    font-size: 16px;
    position: fixed;
    right: 100px;
    top: 35px;
}
.log{
     width: 30px;
    height: 30px;
    padding-right: 10px;
}
.text{
    font-size: 16px;
    color: #999;
}
.box{
     background-color: #fff;
     
}
</style>
<template>
<div class='box'>
    <div class='title'>
        <img class='titleLogo' src='../assets/images/logo.png'/>
        <img  class='tou' src='../assets/images/tou.jpeg'/>
        <span class='text'>1710187335</span>
    </div>
   
<el-menu :default-active="activeIndex" class='el-menu-demo' mode="vertical" @select="handleSelect">
  <el-menu-item index="messages" class='text' @click='messages'><img class='log' src='../assets/images/icon_msg.png'/>群发消息</el-menu-item>
  <el-menu-item index="employee" class='text'@click='employee'><img class='log' src='../assets/images/icon_employee.png'/>员工管理</el-menu-item>
  <el-menu-item index="system" class='text'@click='system'><img class='log' src='../assets/images/icon_sytem.png'/>系统管理</el-menu-item>
  <el-menu-item index="venue" class='text'@click='venue'><img class='log' src='../assets/images/icon_venue.png'/>场馆管理</el-menu-item>
  <el-submenu index=''>
      <template slot="title">
       <el-menu-item index="appoint" class='text' @click='appoint'><img class='log' src='../assets/images/icon_appoint.png'/>预约管理</el-menu-item>
      </template>
      <el-menu-item index="timeSet" @click='time_set'>开放时间设置</el-menu-item>
      <el-menu-item index="maintenance">维护管理</el-menu-item>
      <el-menu-item index="notice">公告管理</el-menu-item>
      <el-menu-item index="appointment">预约设置</el-menu-item>
</el-submenu>
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
      this.$router.push(param)

      },
      messages(){
          this.$router.push('messages')
      },
      employee(){
          this.$router.push('employee');
      },
      system(){
          this.$router.push('system')
      },
      venue(){
          this.$router.push('venue')
      },
      appoint(){
          this.$router.push('appoint')
      },
      time_set(){
            this.$router.push('timeSet')
      }

    }
}
</script>

