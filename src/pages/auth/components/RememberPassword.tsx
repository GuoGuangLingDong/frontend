import { useState } from "react"
import { bgColor } from "../../../theme"

export const RememberPassword = () => {
    const [remeber, setRemeber] = useState<boolean>(false);

    return (
        <div className="flex items-center text-sm" onClick={() => {
            setRemeber(!remeber)
        }}>
            <div className="w-6 h-6 rounded-full mr-1 flex justify-center items-center" style={{ backgroundColor: bgColor }}>
                {remeber && <div className="w-4 h-4 rounded-full" style={{ background: "green" }}></div>}
            </div>
            记住密码
        </div>
    )
}