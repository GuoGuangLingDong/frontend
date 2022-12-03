import { message } from "antd";
import { createContext, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TAuthParams } from "../pages/auth/Register";

export const AuthContext = createContext(
  {} as {
    userInfo: any;
    setUserInfo: React.Dispatch<any>;
    isLogin: boolean,
    login: (arg: TAuthParams) => void,
    register: (arg: TAuthParams) => void
  },
);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<any>({});
  const navigate = useNavigate();
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

  async function registerRequest(arg: TAuthParams) {
    const response = await fetch("http://did.crichain.cn:8000/user/sign-up", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({"username": arg.phone_number, "password": arg.password, "password2":arg.password, "phonenumber":arg.phone_number, "verifycode": arg.verify_code}) // body data type must match "Content-Type" header
    });
    
    return response.json();
  }

  const login = useCallback((arg: TAuthParams) => {
    console.log(arg)
    navigate("/home");
  }, [navigate]);

  const register = useCallback((arg: TAuthParams) => {
    console.log(arg)
    registerRequest(arg).then(()=>{
      message.success("注册成功！")
      window.open("http://did.crichain.cn:8080/")
    })
    // navigate("/login");
    
  }, []);

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo, isLogin, login, register }}>
      {children}
    </AuthContext.Provider>
  )
}