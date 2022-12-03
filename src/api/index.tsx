import { useCallback, useMemo } from 'react';
import { useMessage } from '../components/Message';
import httpTool from '../service/httpTool';

const httpAxios = httpTool({
  timeout: 3,
  failMesage: (msg: string) => {
    console.log(msg)
    // message.warn(msg);
  },
});

// context(路径, 是否递归, 规则)
const context = require.context('./modules', false, /\.ts$/);

// 批量导入，合并对象
const dataObj = context.keys().reduce((prev: any, cur: any) => {
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


const useHttpAxios = () => {
  const { message } = useMessage();

  return useCallback(() => {
    return httpTool({
      timeout: 3,
      failMesage: (msg: string) => {
        message(msg, "warn");
      },
    });
  }, [message])
}

export const useAPI = () => {
  const httpAxios: any = useHttpAxios();

  return useMemo(() => {
    return Object.keys(dataObj).reduce((prev: any, cur) => {
      prev[cur] = (data: any, id: any) => {
        return httpAxios({
          ...dataObj[cur],
          // url:id ? dataObj[cur].url+id : dataObj[cur],
          [dataObj[cur].method === 'get' ? 'params' : 'data']: data,
        });
      };

      return prev;
    }, {});
  }, [httpAxios])
}

export default api;
