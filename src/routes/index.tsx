import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react"
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { Test } from "../pages/test/Test"
import { Home } from "../pages/poap";
import { PoapDetail } from "../pages/poap/Details";
import { ClaimPOAP } from "../pages/poap/Claim";
import { DIDScore } from "../pages/mine/DIDScore";
import { Mine } from "../pages/mine";
import { Follow } from "../pages/mine/Follow";
import { Share } from "../pages/mine/Share";
import { CastPOAP } from "../pages/poap/Cast";
import { ResetPassword } from "../pages/auth/ResetPassword";

export const routes = [
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Register /> },
  { path: "/reset-password", component: <ResetPassword /> },
  { path: "/test", component: <Test /> },
  { path: "/mine", component: <Mine /> },
  { path: "/share", component: <Share /> },
  { path: "/cast/:id", component: <CastPOAP /> },
  { path: "/follow", component: <Follow /> },
  { path: "/share", component: <Share /> },
  { path: "/did-score", component: <DIDScore /> },
  { path: "/detail/:id", component: <PoapDetail /> },
  { path: "/claim/:id", component: <ClaimPOAP /> },
  { path: "/home", component: <Home /> },
]

const Redirect = ({ to }: { to: string }) => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

export const AppRouter = () => {

  return (
    <Routes>
      {routes?.map(item => {
        return <Route key={item.path} path={item?.path} element={item.component} />
      })}
      <Route path="*" element={<Redirect to={"/home"} />} />
    </Routes>
  )
}