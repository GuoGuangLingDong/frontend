import { CSSProperties, ReactNode } from 'react'
import { bgColor } from '../theme';
import selectOn from "../assets/image/select-on.svg";

export const DropDown = ({ children, isOpen, css, direction }: { children: ReactNode, isOpen: boolean, css?: CSSProperties, direction?: "right" | "left" | "none" }) => {

    return (
        isOpen ? <div className="fixed top-20 w-32 bg-white shadow-2xl rounded-md cursor-default" style={css}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <div className={`-top-4 ${direction === "right" ? "right-0 select-right" : (direction === "left" ? "left-0 select-left" : "right-0 left-0")} shadow-2xl`}></div>
            {children}
        </div> : null
    )
}

export const Radio = ({ isSelect }: { isSelect?: boolean }) => {
    return (<div className="w-6 h-6 rounded-full mr-1 flex justify-center items-center" style={{ backgroundColor: bgColor }}>
        {isSelect && <img className="w-4 h-4 rounded-full" src={selectOn} alt="" />}
    </div>
    )
}
