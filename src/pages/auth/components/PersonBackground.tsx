import { ReactNode } from "react"
import { IDIVProps } from "../../poap/components/Item"

export const PersonBackground = ({ children, image, ...props }: { children?: ReactNode, image: string } & IDIVProps) => {
    return (
        <div { ...props } style={{
            height: 200,
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%"
        }}>
            {children}
        </div>
    )
}