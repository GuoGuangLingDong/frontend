import { BodyBox } from "./BodyBox"
import { secondColor } from "../theme"
import { useRef } from "react"
import { hashClick } from "../helpers/utilities"

const Backtop = () => {
  return (
    <div className="text-lg sm:text-base sm:my-0 my-8 flex justify-center items-center cursor-pointer" onClick={(e) => {
      hashClick(e, "app-head")
    }}>
      <span>Back To TOP</span>
    </div>
  )
}

export const Footer = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="py-4 relative z-40" ref={ref} style={{ background: "#F2F4F8" }}>
      <BodyBox css={{ marginTop: 0 }}>
        <div className="flex sm:justify-between justify-center" style={{ color: secondColor }}>
          <div className="sm:text-left text-center" style={{ color: secondColor }}>
            Copyright ©2022 Produced by Ant Finance Experience Technology Department
          </div>
          <div className="hidden sm:block"><Backtop /></div>
        </div >
        <div className="sm:hidden block" style={{ color: secondColor }}><Backtop /></div>
      </BodyBox >
    </div >
  )
}