
  let baseUrl='http://doctorman-dev.doctorwork.com/';

  function request(method,paramUrl,param){
    return new Promise(function(resolve,reject){
      let url=baseUrl+paramUrl;
      let xhr=new XMLHttpRequest();
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
      login:ajax('POST','admin/login')
    }

    export default api; 
