import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(
  {} as {
    userInfo: any;
    setUserInfo: React.Dispatch<any>;
    isLogin: boolean
  },
);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<any>({});
  // const navigate = useNavigate();
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

  // const login = useCallback(() => { }, []);
  // const register = useCallback(() => { }, []);

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo, isLogin }}>
      {children}
    </AuthContext.Provider>
  )
}