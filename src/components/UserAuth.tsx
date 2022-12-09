import { createContext, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TAuthParams } from "../pages/auth/Register";
import { useSwitch } from "./Loading";
import { useMessage } from "./Message";
import api from "../api/index";
import { IPoap } from "../pages/poap";
import { useRequest } from "../hooks/useRequest";

export interface IUserInfo {
  // "username": string
  "uid": string
  "user_desc": string
  "follow_count": string | number
  "nft_count": string | number
  "dy_link": string
  "ins_link": string
  "weibo_link": string
  "poap_list": IPoap[]
}


export const AuthContext = createContext(
  {} as {
    userInfo?: IUserInfo;
    setUserInfo: React.Dispatch<IUserInfo>;
    isLogin: boolean,
    login: (arg: TAuthParams) => void,
    register: (arg: TAuthParams) => void,
    resetPassword: (arg: TAuthParams) => void,
    loading: boolean,
    openLoading: () => void,
    closeLoading: () => void
  },
);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [loading, openLoading, closeLoading] = useSwitch();
  const navigate = useNavigate();
  const { message } = useMessage();
  const [, loginFun] = useRequest(api.login);
  const [, registerFUn] = useRequest(api.register);
  const [,resetpassFun] = useRequest(api.getRestPassword)
  // const { pathname } = useLocation();
  const isLogin = false;

  // useEffect(() => {
  //   if (isLogin) return
  //   if (pathname === "/register") {
  //     navigate("/register");
  //   } else {
  //     navigate("/login");
  //   }
  // }, [isLogin]);

  const login = useCallback(async (arg: TAuthParams) => {
    openLoading();
    console.log(arg,'arg....');
    
    await loginFun({
      // ...phonenumber
      // ...password 
      // ...imageVerify
      ...arg
    });
    closeLoading();
    message("登录成功！", "success");
    navigate("/home");
  }, [navigate, closeLoading, message, openLoading]);

  const resetPassword = useCallback(async (arg: TAuthParams) => {
    openLoading();
    // 重置函数
    await resetpassFun({...arg})

    closeLoading();
    message("密码修改成功！", "success");
    navigate("/login");
  }, [navigate, closeLoading, message, openLoading]);

  const register = useCallback(async (arg: TAuthParams) => {
    openLoading();
    await registerFUn({...arg });
    closeLoading();
    message("注册成功！", "success");
    // window.open("http://did.crichain.cn:8080/")
    navigate("/login");
  }, [navigate, closeLoading, message, openLoading]);

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo, isLogin, login, register, loading, openLoading, closeLoading, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}