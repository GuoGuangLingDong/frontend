import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BodyBox } from "../../components/BodyBox"
import { Button } from "../../components/Button"
import { CardBackground } from "../../components/Card"
import { Header } from "../../components/Header"
import { InputLabel } from "../../components/Label"
import { useAuth } from "../../components/UserAuth"
import { isMobile } from "../../helpers/utilities"
import { RememberPassword } from "./components/RememberPassword"
import { ImageVerifyCode, TImageCode, useCheckInput, useParams, VerifyCode } from "./Register"

export const ResetPassword = () => {
    const [params, setParams] = useParams();
    const { resetPassword, loading } = useAuth();
    const checkValues = useCheckInput();
    const [imageData, setImageData] = useState<TImageCode>();
    const mobile = isMobile();
    const navigate = useNavigate();

    return (
        <>
            {mobile && <Header title={"忘记密码"} />}
            <CardBackground className="font-bold mx-4 md:w-1/3 md:m-auto md:mt-40 mt-20" >
                <InputLabel text="手机号(+86)" value={params.phonenumber} maxLength={11} onChange={(val) => {
                    setParams({ phonenumber: val })
                }} />
                <InputLabel text="校验码" value={params.imageVerify} onChange={(val) => {
                    setParams({ imageVerify: val })
                }} right={<ImageVerifyCode imageData={imageData} setImageData={setImageData} />} />
                <InputLabel
                    text="验证码"
                    value={params.verifycode}
                    onChange={(val) => {
                        setParams({ verifycode: val })
                    }}
                    right={<VerifyCode from="reset_pass" phone={params.phonenumber} imageData={imageData} imageVerify={params.imageVerify} />} />
                <InputLabel text="密码" type="password" value={params.password} onChange={(val) => {
                    setParams({ password: val })
                }} />
                <InputLabel text="确认密码" type="password" value={params.password2} onChange={(val) => {
                    setParams({ password2: val })
                }} />
                <div className="flex justify-between items-center text-sm">
                    <RememberPassword />
                    <div className="cursor-pointer" onClick={() => {
                        navigate("/login")
                    }}>想起密码</div>
                </div>
                <Button className="mt-10" disabled={loading} loading={loading} onClick={() => {
                    // 此处调用重置密码接口函数
                    if (checkValues(params, "resetPassword")) {
                        resetPassword({ ...params, from: "reset_pass" });
                    }
                }}>
                    提交
                </Button>
            </CardBackground>
        </>)
}