<style scoped>
.appoint {
  margin-left: 320px;
  text-align: left;
  margin-top: 80px;
  background-color: #eeeeee;
  padding-bottom: 50px;
  width: 100%;    
}
.appoint .title {
  padding: 35px 0;
  font-size: 24px;
}
.box-1 {
  position: relative;
  padding-left: 40px;
  background-color: #fff;
  box-shadow: 0 2px 14px 0 rgba(66, 66, 66, 0.1);
  border-radius: 8px;
  width: 1450px;
  height: 700px;
}
.select {
  margin: 30px 10px 20px 0;
  width: 200px;
}
.title-button{
   position: absolute;
   top:112px;
   right: 110px;
}
.title-button.sign{
  right: 230px;
}
.title-box-top{
  padding:20px 0;
  border-bottom: 1px solid #eee;
}
.title-box-top .logo{
  width: 18px;
  height: 18px;
  position: absolute;
  right: 40px;
}
.title-box-top .logo.a{
  right: 80px;
}
.button {
  border: none;
  position: absolute;
  top: 92px;
  right: 40px;
  z-index: 1;
}
.content{
  height: 500px;
  width: 1400px;
  margin-right: 40px;
}
.content .block{
  margin:20px 30px;
  border: 1px solid#999;
  width: 260px;
  height: 450px;
   display: inline-block;
   text-align: center;
   border-radius: 10px;
   overflow:hidden;
}
.content .block .block-title{
  padding: 10px 10px;
  margin-bottom: 230px;
  background-color:#eee;
}
.content .block .block-title .text{
  margin-right: 136px;
}
.content .block .block-title .appint-button{
  color: #0acd79;
  border: 1px solid #0acd79;
  background-color:#eee;
  font-size: 12px;
  padding:7px 12px;
}
.content .block .logo{
  width: 12px;
  height: 12px;
  font-size: 12px;
  margin-top: 15px;
  color: #999; 
}
.content .block .text-1{
  font-size: 16px;
  color: #999;  
  margin:10px 28px 5px 28px;
  border-bottom: 1px solid #999;
  overflow:hidden;
  height: 60px;
}
.content .block .button-2{
  color: red;
  font-size: 15px;
}
.time{
  display:inline-block;
  vertical-align:bottom;

}
.text-left{
text-align: left;
}
.text-right{
  text-align: right;
  position: relative;
  top: -25px;
  padding: 4px 0;
}
.upBlock{
}
.upBlock:hover{
  position:absolute;
  top: auto;
  height: auto;
  border: 1px solid #edeeef;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
}

</style>
<style>
body {
  margin: 0;
  background-color: #eeeeee;
}
</style>

<template>
<div class='appoint'>
  <div class='title'>
    <span>预约管理</span>
    <el-button type="primary" round class='title-button'>补签</el-button>
    <el-button type="primary" round class='title-button sign'>黑名单</el-button>
  </div>
  <div class='box-1'>
    <div class='title-box-top'>
      <span>今日预约：0</span>
      <span>今日来访：0</span>
      <img  class='logo a' src='../../assets/images/appoint_view.png'/>
      <img class='logo'src='../../assets/images/appoint_list.png'/>
    </div>
     <el-select v-model="cityValue" placeholder="请选择城市" class='select' @change="blockList">
    <el-option v-for="item in cityOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
   <el-select v-model="blockValue"  placeholder="请选择大厦" class='select' @change="venueList">
    <el-option v-for="item in blockOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
  </el-select>
  <el-select v-model="venueValue" placeholder="请选择场馆" class='select' >
    <el-option v-for="item in venueOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
  </el-select>
   <el-button type="primary" round class='button' @click='search'>搜索</el-button>
   <div class='content'>
     <div class='block' v-for="item in tableData">
       <div class='block-title'>
         <span class='text'>0人</span>
          <el-button round class='appint-button'>正常预约</el-button>
       </div>
       <div>{{item.name}}</div>
       <div>
         <img  class='logo' src='../../assets/images/location.png'/>
         <span class='logo'>{{item.block_name}}</span>
       </div>
       <div  class='text-1'>
       <div class='text-left'>开放时间:</div>
       <div class='upBlock'>
         <div class='text-right' v-for="item in item.schedules" v-if="item.time_segments.length>0" >
              <span>{{openTimeList[item.week]}} : </span>
              <span class='time'>
                <div v-for='itemSeg in item.time_segments'>{{itemSeg.start}}-{{itemSeg.end}}</div>
              </span>
         </div>
       </div>
       </div>
     <el-button type="text" class='button-2'>停用</el-button>
     </div>
   </div>
</div> 




</div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      cityOptions:[],
      blockOptions:[],
      venueOptions:[],
      appintList:[],
      itemOpitons:[],
      cityValue:'',
      blockValue:'',
      venueValue:'',
      schedules:[],
      openTimeList:[
         '无',
        '周一',
        '周二',
        '周三',
        '周四',
        '周五',
        '周六',
        '周日'
      ],


    };
  },
  mounted() {
   this.cityList();
   this.getVenueList();
  },
  methods: {
    async getVenueList(){
    let param =  "city_id=" +this.cityValue +"&block_id=" +this.blockValue +"&venue_id=" + this.venueValue;
      let res=await this.api.venueList(param);
      console.log(res)
      if(res.code==0){
        this.tableData=res.data.list;
      }
    },
   async cityList(id) {
      let res = await this.api.cityList();
      if (res.code == 0) {
        this.cityOptions = res.data.list;
      };
    },
    async blockList(id) {
      let param ="city_id=" +id;
      let res = await this.api.blockList(param);
      if (res.code == 0) {
        this.blockOptions = res.data.list;
      }
    },
    async categoryList(id) {
      let res = await this.api.categoryList();
      if (res.code == 0) {
        this.categoryOptions = res.data;
      }
    },
      async venueList(id) {
      let param = "city_id=" +id+'&block_id='+id;
      let res = await this.api.venueList(param);
      if (res.code == 0) {
        this.venueOptions = res.data.list;
      }
    },
    search(){

    }
  }
};
</script>

