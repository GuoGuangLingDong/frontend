import { useEffect, useState } from 'react';
import { useMessage } from '../components/Message';

export const useRequest = (service: any, options?: any) => {
  const [data, setData] = useState(null);
  const { message } = useMessage();
  const [error, setError] = useState({});
  const requset = async (arg?: any) => {
    // 发接口请求
    let res = await service(arg ? arg : options?.arg);
    if (res.data?.code == 0) {
      // 请求成功
      setData(res.data?.data);
      return res.data?.data
    } else {
      // 失败
      setError(res.data?.message);
      message(res.data?.message, "error");
      return Promise.reject(error);
    }
  };

  return [
    data,
    requset,
    error,
  ] as const
}

export const useAutoRequest = (service: any, options?: any) => {
  const [data, requset, error] = useRequest(service, { manual: false, ...(options || {}) });

  useEffect(() => {
    // 判断是否默认请求
    if (!options?.manual) {
      // 默认
      requset(options?.arg);
    }
  }, [options]);

  return [
    data,
    requset,
    error,
  ] as const
}