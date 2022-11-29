import httpTool from '../service/httpTool';
import { message } from 'antd';
const httpAxios = httpTool({
  timeout: 3,
  failMesage: (msg: string) => {
    message.warn(msg);
  },
});
// context(路径, 是否递归, 规则)
const context = require.context('./modules', false, /\.ts$/);

// 批量导入，合并对象
const dataObj = context.keys().reduce((prev: any, cur:any) => {
  // prev 上一次的值, cur 是当前项
  const def = { ...prev, ...context(cur).default };
  return def;
}, {});

const api = Object.keys(dataObj).reduce((prev: any, cur) => {
  prev[cur] = (data: any, id: any) => {
    return httpAxios({
      ...dataObj[cur],
      // url:id ? dataObj[cur].url+id : dataObj[cur],
      [dataObj[cur].method === 'get' ? 'params' : 'data']: data,
    });
  };

  return prev;
}, {});

export default api;
