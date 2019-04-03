
//封装axios
import axios from 'axios'
//创建axios实例
const fetch=axios.create({
    baseURL:'https://m.yaojunrong.com/'
})
//拦截器：在.then,.catch处理前拦截
//响应拦截
fetch.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;//返回后不需要再加.data
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  //导出案例
  const str='字符串'
  export{
      fetch,
      str 
  }
