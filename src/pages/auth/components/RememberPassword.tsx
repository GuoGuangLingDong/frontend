import { useState } from "react"
import { Radio } from "../../../components/Select";

export const RememberPassword = () => {
    const [remember, setRemember] = useState<boolean>(localStorage.getItem("remember") === "true");

    return (
        <div className="flex items-center text-sm" onClick={() => {
            setRemember(!remember);
            localStorage.setItem("remember", `${!remember}`)
        }}>
            <Radio isSelect={remember} />
            记住密码
        </div>
    )
}