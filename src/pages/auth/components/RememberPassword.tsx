import { useState } from "react"
import { bgColor } from "../../../theme"

export const RememberPassword = () => {
    const [remember, setRemember] = useState<boolean>(localStorage.getItem("remember") === "true");

    return (
        <div className="flex items-center text-sm" onClick={() => {
            setRemember(!remember);
            localStorage.setItem("remember", `${!remember}`)
        }}>
            <div className="w-6 h-6 rounded-full mr-1 flex justify-center items-center" style={{ backgroundColor: bgColor }}>
                {remember && <div className="w-4 h-4 rounded-full" style={{ background: "linear-gradient(90deg, #F6BF75, #4150B1)" }}></div>}
            </div>
            记住密码
        </div>
    )
}