import { ReactNode } from "react"

export const PersonBackground = ({ children, image }: { children?: ReactNode, image: string }) => {
    return (
        <div style={{
            height: 200,
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%"
        }}>
            {children}
        </div>
    )
}