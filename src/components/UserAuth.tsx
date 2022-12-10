import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TAuthParams } from "../pages/auth/Register";
import { useSwitch } from "./Loading";
import { useMessage } from "./Message";
import api from "../api/index";
import { IPoap } from "../pages/poap";
import { useRequest } from "../hooks/useRequest";
import { TSocialItemParams } from "../pages/mine/components/SocialItem";

export interface IUserInfo {
  "username": string
  "uid": string
  "introduction": string
  "follow_count": string | number
  "poap_count": string | number
  "poap_list": IPoap[]
  "links": TSocialItemParams[]
  "avatar": string
  "did": string
}


export const AuthContext = createContext(
  {} as {
    userInfo?: IUserInfo;
    setUserInfo: React.Dispatch<IUserInfo>;
    login: (arg: TAuthParams) => void,
    register: (arg: TAuthParams) => void,
    resetPassword: (arg: TAuthParams) => void,
    loading: boolean,
    openLoading: () => void,
    closeLoading: () => void,
    getUserInfo: () => Promise<void>
  },
);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [loading, openLoading, closeLoading] = useSwitch();
  const navigate = useNavigate();
  const { message } = useMessage();
  const [, loginFun] = useRequest(api.login);
  const [, registerFun] = useRequest(api.register);
  const [, resetpassFun] = useRequest(api.reset)
  const [, getUserInfoFun] = useRequest(api.getUserInfo);

  const getUserInfo = useCallback(async () => {
    const data = await getUserInfoFun({
      from: 0,
      count: 1
    })
    setUserInfo(data);
  }, [getUserInfoFun, setUserInfo])

  const login = useCallback(async (arg: TAuthParams) => {
    openLoading();

    loginFun({
      phonenumber: arg.phonenumber,
      imageVerify: arg.imageVerify,
      imageVerifyId: arg.imageVerifyId,
      password: arg.password
    }).then(async (res) => {
      window.localStorage.setItem("sessionId", res?.sessionId)
      await getUserInfo();
      closeLoading();
      message("登录成功！", "success");
      navigate("/home");
    }).catch(() => {
      closeLoading();
    })
  }, [navigate, closeLoading, message, openLoading, loginFun, getUserInfo]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("login") || hash?.includes("register")) return
    getUserInfo()
  //eslint-disable-next-line
  }, [])

  const resetPassword = useCallback(async (arg: TAuthParams) => {
    openLoading();
    // 重置函数
    resetpassFun({ ...arg }).then(() => {
      closeLoading();
      message("密码修改成功！", "success");
      navigate("/login");
    }).catch(() => {
      closeLoading();
    })
  }, [navigate, closeLoading, message, openLoading, resetpassFun]);

  const register = useCallback(async (arg: TAuthParams) => {
    openLoading();
    registerFun(arg).then(() => {
      closeLoading();
      message("注册成功！", "success");
      navigate("/login");
    }).catch(() => {
      closeLoading();
    })

  }, [navigate, closeLoading, message, openLoading, registerFun]);

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo, getUserInfo, login, register, loading, openLoading, closeLoading, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}