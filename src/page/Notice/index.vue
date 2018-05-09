<style scoped>
.venue {
  margin-left: 320px;
  text-align: left;
  margin-top: 80px;
  background-color: #eeeeee;
  padding-bottom: 50px;
  width: 100%;    
}
.venue .title {
  padding: 35px 0;
  font-size: 24px;
}
.table {
  padding-right: 40px;
  text-align: center;
}
.table .title {
  font-size: 18px;
  background-color: #f9f9f9;
}
.select {
  margin: 30px 10px 20px 0;
  width: 160px;
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
.page{
  padding: 20px 0px 40px 0px;
  text-align: right;
  margin-right: 40px;
}
.button-opertion {
  border: none;
  background-color: none;
  color: #0acd79;
}
.button {
  border: none;
  position: absolute;
  top: 31px;
  right: 40px;
  z-index: 1;
}
.button-1{
     position: absolute;
     right: 112px;
     z-index: 1;
     top: 109px;
}
.page{
 position: absolute;
 bottom: 0px;
 right: 0px;
}
</style>
<style>
body {
  margin: 0;
  background-color: #eeeeee;
}
.venue .el-table::before {
  display: none;
}

</style>

<template>
<div class='venue'>
  <div class='title'>公告管理</div>
   <el-button type="primary" round class='button-1' @click='publishNotice'>发布公告</el-button>
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
    <el-date-picker class='select' v-model="start_date" type="date"  placeholder="选择日期"></el-date-picker>
    <span>至</span>
    <el-date-picker class='select' v-model="end_date" type="date"  placeholder="选择日期"></el-date-picker>
   <el-button type="primary" round class='button' @click='search'>搜索</el-button>

   <el-table  :data="tableData" class='table'>
    <el-table-column  label="时间" class='title' align='center'>
        <template slot-scope="scope">
            <div>{{ getDate( scope.row.create_time) }}</div>
        </template>
    </el-table-column>
    <el-table-column prop="venue_name" label="场馆名称" class='title' align='center'></el-table-column>
    <el-table-column label="发送时段" class='title' align='center'>
        <template slot-scope="scope">
            <div>{{scope.row.announce_start}}至{{scope.row.announce_end }}</div>
        </template>
    </el-table-column>
    <el-table-column prop="city_name" label="城市" class='title' align='center'></el-table-column>
    <el-table-column prop="block_name" label="大厦" class='title' align='center'></el-table-column>
    <el-table-column prop="content" label="发布内容" class='title' align='center'></el-table-column>
    <el-table-column prop="create_user_name" label="操作人" class='title' align='center'></el-table-column>
    <el-table-column label="操作" class='title' align='center'>
      <template slot-scope="scope">
        <el-button  type="text"  @click="handleEdit(scope.row)">编辑</el-button>
        <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :current-page='start' :page-size='limit' :total="total" class='page' @current-change='page'></el-pagination>
  </div> 
</div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      cityOptions: [],
      blockOptions: [],
      venueOptions: [],
      typeOptions:[],
      categoryOptions:[],
      timeList:[],
      start_date:'',
      end_date:'',
      cityValue: "",
      blockValue: "",
      venueValue: "",
      dialogFormVisible:false,
      isEdit:false,
      start: 1,
      limit: 10,
      total: 0,
     
    };
  },
  mounted() {
       this.getNoticeList();
       this.cityList();
  },
    
  methods: {
      test() {
          return "12323"
      },
       async getNoticeList() {
      let param =  "city_id=" +this.cityValue +"&block_id=" +this.blockValue +"&venue_id=" + this.venueValue + "&limit=" +this.limit +"&start=" +this.start;
     let res = await this.api.announcement(param);
      console.log(res)
      if (res.code == 0) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      }
    },
    getDate(create_time){
        let createTimeNum = Number.parseInt(create_time);
        let d = new Date(createTimeNum * 1000);
       return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    },
    search(){
   this.getVenueList();
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
      async venueList(id) {
      let param = "city_id=" +id+'&block_id='+id;
      let res = await this.api.venueList(param);
      if (res.code == 0) {
        this.venueOptions = res.data.list;
      }
    },
  handleEdit(){

  },
  handleDelete(){

  },
  publishNotice(){

  }
  }
};
</script>

