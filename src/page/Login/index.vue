<style scoped>
.box {
  background-image: url(../../assets/images/login-bg.png);
  background-size: 100% 100%;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}
.box .row .input {
  width: 260px;
}
.box .row .input-1 {
  width: 170px;
  vertical-align: bottom;
}
.box .row {
  margin: 15px 0;
  opacity: 0.4;
}
.el-input__inner {
  background: #f0f0f0;
}
input::-webkit-input-placeholder {
  color: #fff;
}
.box .title {
  margin-top: 240px;
  font-size: 35px;
  color: #fff;
}
.callMe {
  margin-top: 200px;
  color: #fff;
}

.button {
  background-color: #0acd79;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  border: transparent;
  border-radius: 25px;
  padding: 5px 20px;
  margin-top: 30px;
}
.imageing {
  padding-left: 15px;
}
.cover {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
</style>
<template>

 
    <div class='box'>
         <div class='cover'>
            <div class='title'>Health</div>
            <div class='row'>
                <el-input v-model="account" placeholder="请输入内容" class='input'></el-input>
            </div>
            <div class='row'>
                <el-input v-model="password" type='password' placeholder="请输入密码" class='input'></el-input>
            </div>
            <div class='row'>
                <el-input v-model="captionCode" placeholder="请输入验证码" class='input-1'></el-input>
                <span class='imageing'>
                    <img v-bind:src="captionCodeImg"/>
                </span>
            </div>
            <button class='button' @click='login'>登陆</button>
            <div class='callMe'>联系我们</div>
         </div>
 </div>
</template>
<script>
export default {
  data() {
    return {
      account: "",
      password: "",
      captionCode: "",
      captionCodeImg: ""
    };
  },
  mounted() {
    this.getCaption();
  },
  methods: {
   async getCaption(){
     let res=await this.api.getCaptionCode();
      if (res.code == 0) {
            this.captionCodeImg =res.data;
         }
   },
  async login(){
     let param="account=1710187335&password=123465&captionCode=" + this.captionCode;
    //  let param='account='+this.account+'&password='+this.password+'&captionCode='+this.captionCode;
     console.log(param)
     let res=await this.api.login(param);
       console.log(res)
     if(res.code == 0){
        this.$router.push('employee');
     }
   }
  }

};
</script>

