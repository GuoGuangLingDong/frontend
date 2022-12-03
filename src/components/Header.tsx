import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { CSSProperties, memo, ReactNode } from "react";
import logo from "../assets/image/logo.png";
import menu from "../assets/image/menu.svg";
import back from "../assets/image/back.svg";
import { bgColor, secondColor } from "../theme";
import { IDIVProps } from "../pages/poap/components/Item";

export const nav = [
  { label: "Home", path: "/home" },
  { label: "login", path: "/login" },
]

export const ArrowImg = ({ color, cursor, handle, css }: { color?: string, cursor?: string, handle?: () => void, css?: string }) => {
  return (
    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => {
      handle && handle()
    }} className={`${cursor || "cursor-pointer"} transition-all duration-500 transform ${css}`}>
      <path fillRule="evenodd" clipRule="evenodd" d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8.70711 7.29289C9.09763 7.68342 9.09763 8.31658 8.70711 8.70711L1.70711 15.7071C1.31658 16.0976 0.683417 16.0976 0.292893 15.7071C-0.0976311 15.3166 -0.0976311 14.6834 0.292893 14.2929L6.58579 8L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill={color || secondColor} />
    </svg>
  )
}

export const useQueryParams = () => {
  const { search } = useLocation();
  const parmasString = search.substring(1);
  const params = new URLSearchParams(parmasString);
  return params
}

const HearderTitle: any = {
  "did": "DID积分",
  "detail": "POAP详情",
  "details1": "定制个人主页",
  "details2": "编辑内容",
  "details3": "我的链接",
  "details4": "星座联盟紫金徽章",
  "detail4s": "铸造POAP"
}

export const hearderBoxCss = "cursor-pointer w-8 h-8 bg-white rounded-full flex justify-center items-center"
export const hearderIconCss = "select-none cursor-pointer w-4 md:z-50 z-0"

export const Header = memo(({ title, right, css }: { title?: string | ReactNode, right?: ReactNode, css?: CSSProperties }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const backTop = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  return (
    <div className="flex px-4 lg:px-16 items-center justify-between text-lg fixed w-full h-16 md:h-16 bg-gray-50 md:bg-opacity-90 text-black text-opacity-70 shadow-sm z-50" style={{ background: pathname === "/home" ? bgColor : "white", ...(css || {}) }}>
      {pathname === "/home" ? <div className={hearderBoxCss} onClick={() => {
      }}>
        <img className={hearderIconCss} src={menu} alt="menu" />
      </div> : <div className={hearderBoxCss} style={{ backgroundColor: bgColor }} onClick={() => {
        navigate(-1);
        backTop();
      }}>
        <img className={`${hearderIconCss} w-6`} src={back} alt="back" />
      </div>}
      {pathname === "/home"
        ? <img className="select-none cursor-pointer w-14 md:z-50 z-0" src={logo} alt="logo" />
        : <div>{title || HearderTitle[pathname?.split("/")?.[1]]}</div>}
      {right || <div className="w-8"></div>}
    </div>
  );
});