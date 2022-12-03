import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export const Input = ({ ...prop }: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    return (
        <input type="text" className="border-none h-10 rounded-md mr-1 outline-none text-md bg-transparent font-medium" {...prop} style={{ ...prop.style }} />
    )
}