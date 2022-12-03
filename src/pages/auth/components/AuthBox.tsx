import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BodyBox } from "../../../components/BodyBox";
import { CardBackground } from "../../../components/Card";
import { PersonBackground } from "./PersonBackground";
import login from "../../../assets/image/login.png"
import logo from "../../../assets/image/logo.png"

export const AuthBox = ({ children }: { children: ReactNode }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const w = 28

    return (
        <div className="font-bold">
            <PersonBackground image={login}>
                <div className="relative h-full">
                    <div className="absolute flex justify-center items-center bg-white rounded-full" style={{
                        bottom: "-8.8%",
                        width: `${w}vw`,
                        height: `${w}vw`,
                        left: `calc(50% - ${w / 2}vw)`
                    }}>
                        <img src={logo} className="w-20 h-16" alt="" />
                    </div>
                </div>
            </PersonBackground>
            {pathname === "/login" && <div className="mb-4 text-center mt-6 font-bold">
                创造你的DID主页，开放聚合元宇宙
            </div>}
            <BodyBox css={{ marginTop: 40 }}>
                <CardBackground>
                    {children}
                    <div className="text-center text-sm mt-6">{pathname === "/login" ? "没" : "已"}有账户？<span className="underline"
                        onClick={() => {
                            if (pathname === "/login") {
                                navigate("/register")
                            } else {
                                navigate("/login")
                            }
                        }}
                    >去{pathname === "/login" ? "注册" : "登陆"}</span></div>
                </CardBackground>
            </BodyBox>
        </div>
    )
}