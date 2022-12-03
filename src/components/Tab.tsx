import { ReactNode, useState } from "react";
import { textColor } from "../theme";

export type TTabItem = {
  text: string,
  children: ReactNode
}

export const Tabs = ({ tabs }: { tabs: TTabItem[] }) => {
  const [select, setSelect] = useState(0);
  return (
    <div className="mt-4 flex items-center font-medium text-lg mb-4 overflow-scroll">
      {tabs.map((item: TTabItem, index: number) => {
        const isActive = select === index;
        return (<div
          key={index}
          style={{ color: isActive ? textColor : "#99A7B5", background: isActive ? "#ffffff" : "#EEEFF4" }}
          className={`font-black cursor-pointer h-12 border-b-2 flex items-center justify-center px-4 transition duration-500 ease-in-out transform ${isActive ? "" : "hover:scale-110"}`}
          onClick={() => {
            setSelect(index);
          }}
        >{item} </div>)
      })}
      {tabs[select].children}
    </div>
  )
}