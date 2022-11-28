import { createContext, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TAuthParams } from "../pages/auth/Login";

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

  const login = useCallback((arg: TAuthParams) => {
    console.log(arg)
    navigate("/home");
  }, [navigate]);
  const register = useCallback((arg: TAuthParams) => {
    console.log(arg)
    navigate("/login");
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo, isLogin, login, register }}>
      {children}
    </AuthContext.Provider>
  )
}