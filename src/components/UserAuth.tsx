import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TAuthParams } from "../pages/auth/Register";
import { useSwitch } from "./Loading";
import { useMessage } from "./Message";
import api from "../api/index";
import { IPoap } from "../pages/poap";
import { useRequest } from "../hooks/useRequest";
import { useCookies } from 'react-cookie'
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
  const [, registerFun] = useRequest(api.register);
  const [, resetpassFun] = useRequest(api.getRestPassword)
  const [userInfoData, getUserInfo] = useRequest(api.getUserInfo);
  const [cookies, setCookie] = useCookies(['gfsessionid'])
  // const { pathname } = useLocation();
  const isLogin = false;
  setCookie("gfsessionid", "1b64g2tmbrtl00cox68pcmfx12400i8u; Path=/; Expires=Sat, 10 Dec 2022 09:15:35 GMT")

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

    loginFun({
      phonenumber: arg.phonenumber,
      imageVerify: arg.imageVerify,
      imageVerifyId: arg.imageVerifyId,
      password: arg.password
    }).then(async () => {
      closeLoading();
      message("登录成功！", "success");
      await getUserInfo({
        did: "73686"
      });
      // navigate("/home");
    }).catch(() => {
      closeLoading();
    })

  }, [navigate, closeLoading, message, openLoading, loginFun, getUserInfo]);

  useEffect(() => {
    getUserInfo().then((res) => {
      setUserInfo(res);
    })
  }, [])

  const resetPassword = useCallback(async (arg: TAuthParams) => {
    openLoading();
    // 重置函数
    await resetpassFun({ ...arg })

    closeLoading();
    message("密码修改成功！", "success");
    navigate("/login");
  }, [navigate, closeLoading, message, openLoading]);

  const register = useCallback(async (arg: TAuthParams) => {
    openLoading();
    registerFun(arg).then(() => {
      closeLoading();
      message("注册成功！", "success");
      navigate("/login");
    }).catch(() => {
      closeLoading();
    })

  }, [navigate, closeLoading, message, openLoading]);

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo, isLogin, login, register, loading, openLoading, closeLoading, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}