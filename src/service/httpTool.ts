import axios from 'axios';
// 1.请求超时 2.区分环境 3.开发环境 4.测试环境 5.生产环境
const httpTool = ({
  timeout = 100,
  failMesage = (msg: string) => {
    alert(msg);
  },
}) => {
  const httpAxios = axios.create({
    timeout: timeout * 100,
    baseURL: process.env.REACT_APP_BASE_URL,
    // retry: 3, // 设置最大次数
    // retryDelay: 1000, // 设置重新请求等待的时间
  });

  // Add a request interceptor
  httpAxios.interceptors.request.use(
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
  httpAxios.interceptors.response.use(
    function (response) {
      // Do something with response data
      return response;
    },
    function (err) {
      let config = err.config; // 如果config不存在或未设置重试选项，请拒绝
      // console.log(config, 'config');
      if (!config || !config.retry) return Promise.reject(err); // 设置变量跟踪重试次数
      config.__retryCount = config.__retryCount || 0; // 检查是否已经达到最大重试总次数
      if (config.__retryCount >= config.retry) {
        // 抛出错误信息
        // 给用户一个友好提示
        failMesage('请求超时');
        return Promise.reject(err);
      } // 增加请求重试次数
      config.__retryCount += 1; // 创建新的异步请求

      let backoff = new Promise(function (resolve) {
        setTimeout(function () {
          resolve({});
        }, config.retryDelay || 1);
      }); // 返回axios信息，重新请求
      return backoff.then(function () {
        return httpAxios(config);
      });
    }
  );
  return httpAxios;
};

export default httpTool;


