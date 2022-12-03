import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { isMobile } from "../helpers/utilities";
import { bgColor } from "../theme";
import { Input } from "./Input";

export const BackgroundLabel = ({
    backgroundColor,
    children,
    ...props
}: {
    backgroundColor?: string,
    children: ReactNode
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLInputElement>) => {

    return (
        <div
            {...props}
            className={`flex items-center rounded-full mb-2 pl-3 text-sm ${props.className}`}
            style={{
                backgroundColor: backgroundColor || bgColor,
                ...(props.style || {})
            }}>
            {children}
        </div>
    )
}

export const InputLabel = ({ text, onChange, type, placeholder, right, value, maxLength }: {
    text: string,
    value?: string,
    onChange: (value: string) => void,
    type?: string,
    placeholder?: string,
    right?: ReactNode,
    maxLength?: number
}) => {

    return (
        <TextLabel text={text} right={right}>
            <Input type={type || "text"} maxLength={maxLength} style={{ width: isMobile() ? "100%" : 550, padding: "auto 10px auto 0px" }} value={value || ""} onChange={(e) => {
                const val: string = e.target.value;
                if (type === "number") {
                    const index = val?.indexOf(".");
                    if (val?.slice(index)?.length > 3) return
                    if (Number(val) > 15 || Number(val) < 0) return
                }
                onChange(val)
            }} placeholder={placeholder || `请输入${text}`} />
        </TextLabel>
    )
}

export const TextLabel = ({ text, right, children, ...props }: {
    text: string,
    right?: ReactNode,
    children?: ReactNode,
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLInputElement>) => {

    return (
        <BackgroundLabel {...props}>
            <div style={{
                minWidth: 90
            }}>{text}</div>
            <div className="flex items-center justify-between" style={{ width: "calc(100% - 100px)" }}>
                {children}
                {right}
            </div>
        </BackgroundLabel>
    )
}