import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { CSSProperties, memo, ReactNode } from "react";
import logo from "../assets/image/logo.png";
import menu from "../assets/image/menu.svg";
import back from "../assets/image/back.svg";
import { bgColor, secondColor } from "../theme";
import { useSwitch } from "./Loading";
import { DropDown } from "./Select";

export const navs = [
  { label: "发现POAP", path: "/home" },
  { label: "铸造POAP", path: "/cast" },
  { label: "我的链接", path: "/follow" },
  { label: "DID积分", path: "/did-score" },
  { label: "定制主页", path: "/mine" }
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

const Memu = ({ isOpen, close }: { isOpen: boolean, close: () => void }) => {
  const navigate = useNavigate();
  return (
    <DropDown isOpen={isOpen} css={{
      left: 30,
      top: 65,
      right: "none"
    }}>
      <div className="text-center" style={{ fontWeight: 600 }}>
        {navs?.map((item: any, index: number) => {
          return <div key={index} className="py-2" onClick={() => {
            navigate(item.path);
            close();
          }} style={{
            borderTop: index !== 0 ? "1px solid #EEEFF4" : "none"
          }}>{item.label}</div>
        })}
      </div>
    </DropDown>
  )
}

export const hearderBoxCss = "cursor-pointer w-8 h-8 bg-white rounded-full flex justify-center items-center"
export const hearderIconCss = "select-none cursor-pointer w-4 md:z-50 z-0"

export const Header = memo(({ title, right, css }: { title?: string | ReactNode, right?: ReactNode, css?: CSSProperties }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpenMenu, openMenu, closeMenu] = useSwitch();

  const backTop = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  return (
    <div className="flex px-4 lg:px-16 items-center justify-between text-lg fixed w-full h-16 md:h-16 bg-gray-50 md:bg-opacity-90 text-black text-opacity-70 shadow-sm z-50" style={{ background: pathname === "/home" ? bgColor : "white", ...(css || {}) }}>
      {["/home", "/mine"]?.includes(pathname) ? <div className={hearderBoxCss} onClick={() => {
        isOpenMenu ? closeMenu() : openMenu();
      }}>
        <img className={hearderIconCss} src={menu} alt="menu" />
        <Memu isOpen={isOpenMenu} close={closeMenu} />
      </div> : <div className={hearderBoxCss} style={{ backgroundColor: bgColor }} onClick={() => {
        navigate(-1);
        backTop();
      }}>
        <img className={`${hearderIconCss} w-6`} src={back} alt="back" />
      </div>}
      {pathname === "/home"
        ? <img className="select-none cursor-pointer w-14 md:z-50 z-0" src={logo} alt="logo" />
        : <div>{title}</div>}
      {right || <div className="w-8"></div>}
    </div>
  );
});