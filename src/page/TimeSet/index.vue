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
  padding:0 40px;
  background-color: #fff;
  box-shadow: 0 2px 14px 0 rgba(66, 66, 66, 0.1);
  border-radius: 8px;
  width: 1450px;
  height: 100%;
  padding-bottom: 70px;
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
  top: 31px;
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
  margin-bottom: 240px;
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
  font-size: 15px;
  color: #999;  
  margin:15px 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #999;
}
.content .block .button-2{
  color: red;
  font-size: 14px;
}
.page{
  padding: 20px 0px 40px 0px;
  text-align: right;
  margin-right: 40px;
}
.time{
  display:inline-block;
  vertical-align:top;

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
    <span>开放时间设置</span>
  </div>
  <div class='box-1'>
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
   <el-table  :data="tableData" class='table'>
    <el-table-column prop="city_name"  label="城市" class='title' align='center'></el-table-column>
    <el-table-column prop="block_name" label="大厦" class='title' align='center'></el-table-column>
    <el-table-column prop="name" label="场馆名称" class='title' align='center'></el-table-column>
<!-- 开放时间多看-->
    <el-table-column  label="开放时间" class='title' align='center'>
        <template slot-scope="scope">
        <div v-for="item in scope.row.schedules" v-if="item.time_segments.length>0" >
            <span>{{openTimeList[item.week]}} : </span>
            <span class='time'>
               <div v-for='itemSeg in item.time_segments'>{{itemSeg.start}}-{{itemSeg.end}}</div>
            </span>
        </div>
        </template>
    </el-table-column>

    <el-table-column label="操作" class='title' align='center'>
      <template slot-scope="scope">
        <el-button type="text"  @click="handleEdit(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>

<el-dialog title="开放时间设置" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item>
    <el-select v-model="form.city_id" disabled  placeholder="请选择城市" @change="blockList" >
     <el-option v-for="item in cityOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
  <el-select v-model="form.block_id" disabled  placeholder="请选择大厦" >
      <el-option v-for="item in blockOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
 <el-select v-model="venueValue" disabled placeholder="请选择场馆" class='select' >
    <el-option v-for="item in venueOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
  </el-select>
    </el-form-item>
   <div>场馆开放时间</div>
  <template>  
    <el-time-picker  v-model="value2"  :picker-options="{  selectableRange: '18:30:00 - 20:30:00'}" placeholder="任意时间点">
  </el-time-picker>
  <el-time-picker arrow-control v-model="value3" :picker-options="{selectableRange: '18:30:00 - 20:30:00'}"placeholder="任意时间点">
  </el-time-picker>
</template>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </div>
</el-dialog>

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
      dialogFormVisible:false,
      isEdit:false,
      value2: new Date(2018, 21, 0, 9, 0),
      value3: new Date(2018, 9, 0, 21, 0),
      form:{
         
      },
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
      schedules:[
         { week: '1', 'time_segments':[{start: '', end: ''}] },
          { week: '2', 'time_segments':[{start: '', end: ''}] },
          { week: '3', 'time_segments':[{start: '', end: ''}] },
          { week: '4', 'time_segments':[{start: '', end: ''}] },
          { week: '5', 'time_segments':[{start: '', end: ''}] },
          { week: '6', 'time_segments':[{start: '', end: ''}] },
          { week: '7', 'time_segments':[{start: '', end: ''}] }
      ],
      cityValue:'',
      blockValue:'',
      venueValue:'',
      start: 1,
      limit: 10,
      total: 0,


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
      if(res.code==0){
        this.tableData=res.data.list;
      }
    },
   page(value) {
      this.start = value;
      this.getEmployeeList();
    },
     async cityList(id) {
      let res = await this.api.cityList();
      if (res.code == 0) {
        this.cityOptions = res.data.list;
      };
    },
    async blockList(id) {
      let param = "city_id=" +id;
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
     this.getVenueList();
  },
  handleEdit(id){
    this.dialogFormVisible=true;
    this.isEdit=true;

  },
  submit(){

  },
  cancel(){
    this.dialogFormVisible=false;
  }

  
  }
};
</script>

