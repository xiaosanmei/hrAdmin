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
  width: 200px;
}
.select-1 {
  margin: 30px 10px 20px 0;
  width: 300px;
}
.box-1 {
  position: relative;
  padding-left: 40px;
  background-color: #fff;
  box-shadow: 0 2px 14px 0 rgba(66, 66, 66, 0.1);
  border-radius: 8px;
  width: 1450px;
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

.form{
  position: fixed;
  top:15%;
  left:35%;
  background-color: #fff;
  width: 700px;
  height: 350px;
  border: 1px solid #eeeeee;
  border-radius: 12px;  
}
  .input{
    display: inline-block;
    padding-right: 10px;  
  }
.input-1{
 width: 300px;
}
.button {
  border: none;
  position: absolute;
  top: 31px;
  right: 225px;
  z-index: 1;
}
.button.add {
  right: 125px;
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
  <div class='title'>场馆管理</div>
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
   <el-button type="primary" round class='button' @click='search'>查询</el-button>
   <el-button type="primary" round class='button add' @click='showAdd'>新增</el-button>
   <el-table  :data="tableData" class='table'>
    <el-table-column prop="city_name"  label="区域" class='title' align='center'></el-table-column>
    <el-table-column prop="block_name" label="大厦" class='title' align='center'></el-table-column>
    <el-table-column prop="name" label="场馆名称" class='title' align='center'></el-table-column>
    <el-table-column prop="manager" label="接口人" class='title' align='center'></el-table-column>
    <el-table-column label="操作" class='title' align='center'>
      <template slot-scope="scope">
        <el-button class='button-opertion' @click="handleEdit(scope.row)">编辑</el-button>
        <el-button class='button-opertion' @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :current-page='start' :page-size='limit' :total="total" class='page' @current-change='page'></el-pagination>
  </div> 


<el-dialog title="添加场馆" :visible.sync="dialogFormVisible">
  <el-form :model="form">
  <el-form-item>
  <el-select v-model="form.city_id" placeholder="请选择城市"class='select-1' @change="blockList" >
     <el-option v-for="item in cityOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
  <el-select v-model="form.block_id" placeholder="请选择大厦" class='select-1'>
      <el-option v-for="item in blockOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>

    <el-form-item label="场馆名称" class='input'>
      <el-input v-model="form.name" auto-complete="off" class='input-1' placeholder="请输入场馆名称"></el-input>
    </el-form-item>
     <el-form-item label="接口人" class='input'>
      <el-input v-model="form.manager" auto-complete="off" class='input-1' placeholder="请输入接口人"></el-input>
    </el-form-item>
  <el-select v-model="form.category_id" placeholder="请选择场馆类型" class='select-1' @chang='categoryList'>
     <el-option v-for="item in categoryOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
  <el-select v-model="form.type" placeholder="请选择场地" class='select-1'>
    <el-option label="有场地场馆" value="1"></el-option>
    <el-option label="无场地场馆" value="2"></el-option>     
    <el-option label="多功能场馆" value="3"></el-option>            
  </el-select>

  <el-upload action="http://doctorman-dev.doctorwork.com/venue/add" 
 list-type="picture-card" :on-preview="handlePictureCardPreview"  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
  <img width="100%" :src="form.dialogImageUrl" alt="">
 </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click='cancel'>取 消</el-button>
    <el-button type="primary" @click='submit'>确 定</el-button>
  </div>
</el-dialog>
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
      cityValue: "",
      blockValue: "",
      venueValue: "",
      dialogFormVisible:false,
      isEdit:false,
      start: 1,
      limit: 10,
      total: 0,
      form:{
        city_id:'',
        block_id:'',
        name:'',
        manager:'',
        type:'',
        category_id:'',
        cover_url:'',
        dialogImageUrl:'',
      },
    };
  },
  mounted() {
    this.getVenueList();
    this.cityList();
    this.categoryList();
  },
  methods: {
    async getVenueList() {
      let param =  "city_id=" +this.cityValue +"&block_id=" +this.blockValue +"&venue_id=" + this.venueValue + "&limit=" +this.limit +"&start=" +this.start;
      let res = await this.api.venueList(param);
      if (res.code == 0) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      }
    },
    page(value) {
      this.start = value;
      this.getEmployeeList();
    },
    async handleDelete(row) {
      let param='id='+row.id;
      console.log(param)
        let res = await this.api.removeList(param);
         if (res.code==0) {
            this.$message({ type: "success", message: "删除成功" });
            
      };
       this.getVenueList();
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
    showAdd() {
      this.dialogFormVisible=true;
      this.isEdit=false;
    },
    search(){
      this.getVenueList();
    },
    handleEdit(row){
      this.isEdit=true;
      this.dialogFormVisible=true;
      this.form.name=row.name;
      this.form.city_id=row.city_id;
      this.form.block_id=row.block_id;
      this.form.manager=row.manager;
      this.form.cover_url=row.cover_url;
      this.form.category_id=row.category_id;
      this.form.type=row.type;
      this.form.dialogImageUrl=row.dialogImageUrl;
      this.form.id=row.id;
    },
    async submit(){
         let param="city_id=" +this.form.city_id+'&block_id='+this.form.block_id+'&name='+this.form.name+
                '&manager='+this.form.manager+'&category_id='+this.form.category_id+'&type='+this.form.type
                +'&cover_url='+this.form.cover_url+'&id='+this.form.id;
      if(this.isEdit){
         let res = await this.api.editVenue(param);
         console.log(res)
          if(res.code==0){
          this.getVenueList();
           this.cancel();
          }
      }else{
          let param="city_id=" +this.form.city_id+'&block_id='+this.form.block_id+'&name='+this.form.name+
                '&manager='+this.form.manager+'&category_id='+this.form.category_id+'&type='+this.form.type+
                '&cover_url='+this.form.cover_url;
                let res=await this.api.venueAdd(param);
                if(res.code==0){
                }
                this.form={};
                this.getVenueList();
                this.cancel();
           }
     
    },
    async cancel(){
      this.dialogFormVisible=false;
    },
    handlePictureCardPreview(file){
      console.log(file)
        this.form.dialogImageUrl=file.url;
        this.cancel();
      },
    handleRemove(file,fileList){
        console.log(file,fileList);
       }

  
  }
};
</script>

