
  let baseUrl='http://doctorman-dev.doctorwork.com/';

  function request(method,paramUrl,param){
    return new Promise(function(resolve,reject){
      let url=baseUrl+paramUrl;
      let xhr=new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open(method,url);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      xhr.onload=function(res){
              let resultObject=JSON.parse(res.currentTarget.responseText);
              resolve(resultObject)
            }
      xhr.send(param);
    })
  }

  function ajax(method,url){
      return function(param){
        return  request(method,url,param);
      }
  }
    let api={
      //获取验证码
      getCaptionCode:ajax('GET','admin/70/37/login-caption'),
      //登陆
      login:ajax('POST','admin/login'),
      //员工列表
      getEmployee:ajax('POST','staff/list'),
      //员工启用停用
      active:ajax('post','/staff/active'),
      //场馆列表
      venueList:ajax('post','venue/list'),
       //城市列表
       cityList:ajax('post','venue/city-list'),
       //大厦列表
       blockList:ajax('post','venue/block-list'),
       //新增场馆
       venueAdd:ajax('post','venue/add'),
       //所属大类
       categoryList:ajax('post','venue/category-list'),
      //删除场馆
        removeList:ajax('post','venue/delete'),
      //编辑场馆
      editVenue:ajax('post','venue/edit'),
      //开放时间
      set_Time:ajax('post','booking/set-time'),
      //维护列表
      maintainVenue:ajax('post','maintainVenue/list'),
      //公告记录列表
      announcement:ajax('post','announcement/list'),
    }
   



    export default api; 
