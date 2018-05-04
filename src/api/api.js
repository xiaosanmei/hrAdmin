
  let baseUrl='http://doctorman-dev.doctorwork.com/';

  function api(method,paramUrl,param){
    return new Promise(function(resolve,reject){
      console.log(method,paramUrl,param)
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
  export default api;



  // let promise=new Promise( function(resolve,reject){
  //   let url='admin/70/37/login-caption';
  //   let xhr=new XMLHttpRequest();
  //     xhr.open('GET',baseUrl+url);
  //     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  //     xhr.onload=function(res){
  //       let resultObject=JSON.parse(res.currentTarget.responseText);
  //       resolve(resultObject)
  //     }
  //     xhr.send();

  //     });
      
  //   //   promise.then(function(res){
  //   //     console.log(res)
  //   //   });
  //   export default promise;

