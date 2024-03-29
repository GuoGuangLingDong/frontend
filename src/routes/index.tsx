import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react"
import { Profile } from "../pages/trending/Profile"
import { Detail } from "../pages/trending/Detail"
import { Trending } from "../pages/trending"
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { Home } from "../pages/poap";
import { PoapDetail } from "../pages/poap/Details";
import { ClaimPOAP } from "../pages/poap/Claim";
import { DIDScore } from "../pages/mine/DIDScore";
import { Mine } from "../pages/mine";

export const routes = [
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Register /> },
  { path: "/profile", component: <Profile /> },
  { path: "/mine", component: <Mine /> },
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