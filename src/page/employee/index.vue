<style scoped>
.employee {
  margin-left: 320px;
  text-align: left;
  margin-top: 80px;
  background-color: #eeeeee;
  padding-bottom: 50px;
}
.employee .title {
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
.input {
  width: 350px;
  padding: 20px 0;
}
.box-1 {
  position: relative;
  padding-left: 40px;
  margin-top: 0px;
  margin-left: 0px;
  background-color: #fff;
  box-shadow: 0 2px 14px 0 rgba(66, 66, 66, 0.1);
  border-radius: 8px;
  width: 1460px;

}
.page {
  padding: 20px 0 40px 0;
  text-align: right;
  margin-right: 40px;
}
</style>
<style>
body{
  margin:0;
  background-color: #eeeeee;
}
.employee .el-table::before {
  display: none;
}
.el-button{
  border:none;
  position: absolute;
  top:21px;
  left: 335px;
  z-index: 1;
}
.el-tag{
 
}
</style>

<template>
<div class='employee'>
  <div class='title'>员工管理</div>
  <div class='box-1'>
    <el-input placeholder="员工姓名/手机号码" class='input' v-model="keywords"/>
    <el-button icon="el-icon-search" circle @click='getEmployeeList'></el-button>
   <el-table  :data="tableData" class='table'>
    <el-table-column prop="status" label="状态" class='title' align='center'>
       <template scope="scope">
            <el-tag :type="scope.row.status == '0' ? 'danger' : 'primary'" close-transition>{{scope.row.status==0?'停用':'启用'}}</el-tag>
      </template>

    </el-table-column>
    <el-table-column prop="id"  label="员工ID" class='title' align='center'></el-table-column>
    <el-table-column prop="department" label="所属部门" class='title' align='center'></el-table-column>
    <el-table-column prop="realname" label="员工姓名" class='title' align='center'></el-table-column>
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
      keywords: "",
      start: 1,
      limit: 10,
      total: 0,
    };
  },
  mounted() {
    this.getEmployeeList();
  },
  methods: {
    async getEmployeeList() {
      let param='keywords='+this.keywords+'&start='+this.start+'&limit='+this.limit;
      let res = await this.api.getEmployee(param);
      console.log(res)
      if (res.code == 0) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      }
    },
    page(value){
      this.start = value;
      this.getEmployeeList();
    },
   

    
  }
};
</script>

