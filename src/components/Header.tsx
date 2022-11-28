import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { memo, useCallback } from "react";
import { secondColor } from "../theme";

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

export const Header = memo(() => {
  const navigate = useNavigate();

  const backTop = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  const goPath = useCallback((path: string) => {
    navigate(`${path}`);
    backTop();
  }, [navigate])

  return (
    <div className="flex px-4 lg:px-16 items-center  justify-between text-l fixed w-full h-16 md:h-16 bg-gray-50 md:bg-opacity-90 text-black text-opacity-70 shadow-sm z-50">
      <img className="cursor-pointer mr-20 w-32 lg:w-10 md:z-50 z-0 hidden lg:block" src={"https://0.soompi.io/wp-content/uploads/2018/04/20170556/IU-140x140.jpg"} onClick={() => {
        goPath("/home")
      }} alt="logo" />
      <img className="select-none cursor-pointer mr-20 w-10 md:z-50 z-0 block lg:hidden" src={"https://0.soompi.io/wp-content/uploads/2018/04/20170556/IU-140x140.jpg"} onClick={() => {
        goPath("/home")
      }} alt="logo" />

      <div className="flex items-center cursor-pointer " onClick={() => {
        navigate(`/profile`)
      }}>
        <img
          className="rounded-full mr-1 -mt-1 w-32 lg:w-8 md:z-50 z-0 hidden lg:block"
          src={"https://0.soompi.io/wp-content/uploads/2018/04/20170556/IU-140x140.jpg"}
          alt="logo" />
        Serati Me
      </div>
    </div>
  );
});