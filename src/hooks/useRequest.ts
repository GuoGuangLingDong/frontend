import { useEffect, useState } from 'react';
const useRequest = (service: any, options: any) => {
  const [list, setList] = useState([]);
  const [error, setError] = useState({});
  const getList = async () => {
    // 发接口请求
    let res = await service(options?.data);
    if (res.data?.statusCode == 200) {
      // 请求成功
      setList(res.data?.data || []);
    } else {
      // 失败
      setError(res.data?.error);
    }
  };
  const run = () => {
    // 定义了一个 run 函数, 当run 函数调用的时候，才会发送接口请求
    getList();
  };
  useEffect(() => {
    // 判断是否默认请求
    if (!options?.manual) {
      // 默认
      getList();
    }
  }, []);
  return {
    list,
    error,
    run,
  };
};

export default useRequest;
