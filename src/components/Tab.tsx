import { ReactNode, useState } from "react";
import { textColor } from "../theme";

export type TTabItem = {
  text: string,
  children: ReactNode
}

export const Tabs = ({ tabs }: { tabs: TTabItem[] }) => {
  const [select, setSelect] = useState(0);

  return (
    <>
      <div className="flex items-center font-medium text-sm overflow-scroll justify-center">
        {tabs.map((item: TTabItem, index: number) => {
          const isActive = select === index;
          return (<div
            key={index}
            style={{ color: isActive ? textColor : "#99A7B5", background: isActive ? "#ffffff" : "#EEEFF4" }}
            className={`cursor-pointer rounded-t-xl h-10 flex items-center justify-center px-8 mx-1 border border-white`}
            onClick={() => {
              setSelect(index);
            }}
          >{item.text} </div>)
        })}
      </div>
      {tabs[select].children}
    </>
  )
}