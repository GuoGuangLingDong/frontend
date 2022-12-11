import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { IDIVProps } from "../pages/poap/components/ListItem";
import { IconImage } from "./Image";
import { BackgroundLabel } from "./Label";

export const CardBackground = ({ children, ...props }: { children: ReactNode } & IDIVProps) => {
  return (
    <div {...props} className={`p-6 rounded-3xl bg-white mt-4 ${props.className}`}>
      {children}
    </div>
  )
}

export const IconTextRightCard = ({ right, icon, uid, children, ...props }: {
  right?: ReactNode,
  icon: string,
  uid?: string,
  children?: ReactNode,
} & IDIVProps) => {
  const navigator = useNavigate();

  return (
    <BackgroundLabel {...props} className={`flex justify-between items-center ${props.className || ""}`}>
      <div className="flex items-center">
        <IconImage src={icon}
          onClick={(e) => {
            e.stopPropagation();
            uid && navigator(`/profile/${uid}`)
          }} />
        {children}
      </div>
      {right}
    </BackgroundLabel>
  )
}