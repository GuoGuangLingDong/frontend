import { ReactNode } from "react";
import { IDIVProps } from "../pages/poap/components/Item";
import { IconImage } from "./Image";
import { BackgroundLabel } from "./Label";

export const CardBackground = ({ children, ...props }: { children: ReactNode } & IDIVProps) => {
  return (
    <div {...props} className={`p-6 rounded-3xl bg-white mt-4 ${props.className}`}>
      {children}
    </div>
  )
}

export const IconTextRightCard = ({ right, icon, children, ...props }: {
  right?: ReactNode,
  icon: string,
  children?: ReactNode,
} & IDIVProps) => {

  return (
    <BackgroundLabel {...props} className={`flex justify-between items-center ${props.className || ""}`}>
      <div className="flex items-center">
        <IconImage src={icon} />
        {children}
      </div>
      {right}
    </BackgroundLabel>
  )
}