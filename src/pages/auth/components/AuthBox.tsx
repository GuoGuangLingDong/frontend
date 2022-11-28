import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BodyBox } from "../../../components/BodyBox";
import { CardBackground } from "../../../components/Card";
import { PersonBackground } from "./PersonBackground";

export const AuthBox = ({ children }: { children: ReactNode }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <div>
            <PersonBackground />
            { pathname === "/login" && <div className="mb-10 text-center mt-4">
                创造你的DID主页，开放聚合元宇宙
            </div> }
            <BodyBox>
                <CardBackground>
                    {children}
                    <div className="text-center text-sm mt-6">{ pathname === "/login" ? "没" : "已" }有账户？<span className="underline"
                        onClick={()=>{
                            if(pathname === "/login"){
                                navigate("/register")
                            }else{
                                navigate("/login")
                            }
                        }}
                    >去{ pathname === "/login" ? "注册" : "登陆" }</span></div>
                </CardBackground>
            </BodyBox>
        </div>
    )
}