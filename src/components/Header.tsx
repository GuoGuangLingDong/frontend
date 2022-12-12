import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { CSSProperties, memo, ReactNode, useMemo, useState } from "react";
import logo from "../assets/image/logo.png";
import menu from "../assets/image/menu.svg";
import back from "../assets/image/back.svg";
import closeImg from "../assets/image/close.svg";
import baidu from "../assets/image//cast-platform/baidu.png";
import mayi from "../assets/image//cast-platform/mayi.png";
import qu from "../assets/image//cast-platform/qu.png";
import guoguanglian from "../assets/image//cast-platform/guoguanglian.png";
import yitaifang from "../assets/image//cast-platform/yitaifang.png";
import bsn from "../assets/image//cast-platform/bsn.png";
import { bgColor, secondColor } from "../theme";
import { useSwitch } from "./Loading";
import { DropDown, Radio } from "./Select";
import { Button } from "./Button";
import { useMessage } from "./Message";
import { useAuth } from "./UserAuth";

export const navs = [
  { label: "发现POAP", path: "home" },
//  { label: "铸造POAP", path: "cast" },
  { label: "我的连接", path: "follow" },
  { label: "DID积分", path: "did-score" },
  { label: "我的主页", path: "profile" },
  { label: "退出登录", path: "login" }
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


const Memu = ({ isOpen, close, handle }: { isOpen: boolean, close: () => void, handle?: () => void }) => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const { pathname } = useLocation();
  const isNeedLogin = useMemo(() => {
    if (["/login", "/register", "reset-password"].includes(pathname)) return false
    if (!userInfo?.did) return true
  }, [userInfo, pathname])

  return (
    <DropDown isOpen={isOpen} direction="left" css={{
      left: 30,
      top: 65,
      right: "none"
    }}>
      <div className="text-center" style={{ fontWeight: 600 }}>
        {navs?.map((item: any, index: number) => {
          if (pathname.includes(item.path)) return null
          if (isNeedLogin && ["cast", "follow", "did-score", "profile"].includes(item.path)) return null

          return <div key={index} className="py-2" onClick={() => {
            if (handle && item.path.includes("cast")) {
              handle();
            } else if (item.path === "profile") {
              navigate(`/${item.path}/${userInfo?.uid}`);
            } else if (item.path === "login") {
              window.localStorage.setItem("sessionId", "");
              navigate(`/login`);
            } else {
              navigate(`/${item.path}`);
            }
            close();
          }} style={{
            borderTop: index !== 0 ? "1px solid #EEEFF4" : "none"
          }}>{isNeedLogin && item.path === "login" ? "立即登录" : item.label}</div>
        })}
      </div>
    </DropDown>
  )
}

const platforms = [
  {
    text: "国广链",
    icon: guoguanglian,
    isSupport: true
  },
  {
    text: "BSN联盟链",
    icon: bsn,
    isSupport: false
  },
  {
    text: "趣链",
    icon: qu,
    isSupport: false
  },
  {
    text: "蚂蚁链",
    icon: mayi,
    isSupport: false
  },
  {
    text: "百度超级链",
    icon: baidu,
    isSupport: false
  },
  {
    text: "以太坊",
    icon: yitaifang,
    isSupport: false
  }
]

const Diglog = ({ isOpen, close }: { isOpen: boolean, close: () => void }) => {
  const navigate = useNavigate();
  const [select, setSelect] = useState(0);
  const { message } = useMessage();

  return (
    <DropDown isOpen={isOpen} direction="none" css={{
      right: "0",
      left: "0",
      top: "0",
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.5)"
    }}>
      <div className="relative">
        <div className="bg-white absolute" style={{
          right: "10vw",
          left: "10vw",
          top: "15vh",
          width: "80vw",
          borderRadius: "30px"
        }}>
          <div className="text-center" style={{ fontWeight: 600 }}>
            <div className="h-16 flex items-center justify-center relative" style={{
              background: bgColor,
              borderTopRightRadius: "30px",
              borderTopLeftRadius: "30px"
            }}>选择铸造平台
              <img src={closeImg} alt="" className="absolute right-2 w-6" onClick={close} />
            </div>
            {platforms?.map((item, index: number) => {
              return <div key={index} className="py-3 flex justify-between items-center px-6" onClick={() => {
                if (!item.isSupport) {
                  message(`暂不支持${item.text}`, "warn")
                  return
                }
                setSelect(index);
              }}><div className="flex items-center">
                  <img src={item.icon} alt="" className="w-8 mr-2" />
                  {item.text}
                </div>  <Radio isSelect={index === select} /></div>
            })}
            <Button className="my-6 w-5/6" onClick={() => {
              // 此处调用立即领取接口函数
              navigate(`/cast/${select + 1}`);
            }}>
              确定
            </Button>
          </div>
        </div>
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
  const [isOpenDiglog, openDiglog, closeDiglog] = useSwitch();

  const backTop = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  return (
    <div className="flex px-4 lg:px-16 items-center justify-between text-lg fixed w-full h-16 md:h-16 bg-gray-50 md:bg-opacity-90 text-black text-opacity-70 shadow-sm z-50" style={{ background: pathname === "/home" ? bgColor : "white", ...(css || {}) }}>
      {(["/home"]?.includes(pathname) || pathname.includes("profile")) ? <div className={hearderBoxCss} onClick={() => {
        isOpenMenu ? closeMenu() : openMenu();
      }}>
        {isOpenDiglog && <Diglog isOpen={isOpenDiglog} close={closeDiglog} />}
        <img className={hearderIconCss} src={menu} alt="menu" />
        <Memu isOpen={isOpenMenu} close={closeMenu} handle={openDiglog} />
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
