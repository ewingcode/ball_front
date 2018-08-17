import axios from 'axios'
import md5 from 'js-md5'
import router from "@/tools/router.js"
import store from "@/tools/store.js"

// axios 配置
axios.defaults.timeout = 10000;
//axios.defaults.baseURL = 'http://127.0.0.1:8090';
axios.defaults.baseURL =process.env.API_ROOT
//axios.defaults.baseURL ='http://39.108.88.149:8090'
axios.defaults.headers.post['Content-Type'] = 'application/json';
let clientId = "unity-client";
let secretKey ="123321";
axios.interceptors.request.use(
  config => {
    let requestJson={
      "sign": "",
      "id": "14071402800120",
      "clientId": clientId,
      "encrypt": "MD5",
      "data":""
    };
    let datastr = JSON.stringify(config.data);
    let content = clientId + encodeURIComponent(datastr) + secretKey;
    let sign =  md5(content.trim());
    requestJson['data']=config.data;
    requestJson['sign']=sign;
    requestJson['id']=Date.parse(new Date())/1000;
    config.data = requestJson;
    return config;
  },function(error){
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(function (response) {
  // token 已过期，重定向到登录页面
  if (response.data.code != 200){
    if(response.data.message=="uid不能为空！" || response.data.message=="error@doubleLogin"){
        alert('账号重复登陆，请重新登入！');
        localStorage.clear();
        store.commit("hideNavBar");
        router.push({
          name: 'login'
        });
    }
  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default axios;
