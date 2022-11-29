import axios from 'axios';

//抽离axios
const request = axios.create({
  timeout: 2000,
});

// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response.status;
    switch (status) {
      case '100':
        console.log('信息响应');
        break;
      case '200':
        console.log('成功响应');
        break;
      case '300':
        console.log('重定向消息');
        break;
      case '400':
        console.log('客户端错误响应');
        break;
      case '403':
        console.log('客户无权访问');
        break;
      case '404':
        console.log('找不到页面');
        break;
      case '500':
        console.log('服务器错误响应');
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

export default request;
