import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react"
import { Profile } from "../pages/trending/Profile"
import { Detail } from "../pages/trending/Detail"
import { Trending } from "../pages/trending"
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";

export const routes = [
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Register /> },
  { path: "/profile", component: <Profile /> },
  { path: "/detail/:id", component: <Detail /> },
  { path: "/home", component: <Trending /> },
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