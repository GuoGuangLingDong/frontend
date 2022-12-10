import { useState } from "react"
import { BodyBox } from "../../components/BodyBox"
import { Button } from "../../components/Button"
import { CardBackground } from "../../components/Card"
import { Header } from "../../components/Header"
import { InputLabel } from "../../components/Label"
import { useAuth } from "../../components/UserAuth"
import { RememberPassword } from "./components/RememberPassword"
import { ImageVerifyCode, TImageCode, useCheckInput, useParams, VerifyCode } from "./Register"

export const ResetPassword = () => {
    const [params, setParams] = useParams();
    const { resetPassword, loading } = useAuth();
    const checkValues = useCheckInput();
    const [imageData, setImageData] = useState<TImageCode>();

    return (
        <>
            <Header title={"忘记密码"} />
            <BodyBox css={{ marginTop: 100 }}>
                <CardBackground>
                    <InputLabel text="手机号(+86)" value={params.phonenumber} maxLength={11} onChange={(val) => {
                        setParams({ phonenumber: val })
                    }} />
                    <InputLabel text="校验码" value={params.imageVerify} onChange={(val) => {
                        setParams({ imageVerify: val })
                    }} right={<ImageVerifyCode imageData={imageData} setImageData={setImageData} />} />
                    <InputLabel
                        text="验证码"
                        value={params.verify_code}
                        onChange={(val) => {
                            setParams({ verify_code: val })
                        }}
                        right={<VerifyCode from="login" phone={params.phonenumber} imageData={imageData} imageVerify={params.imageVerify} />} />
                    <InputLabel text="密码" type="password" value={params.password} onChange={(val) => {
                        setParams({ password: val })
                    }} />
                    <InputLabel text="确认密码" type="password" value={params.password2} onChange={(val) => {
                        setParams({ password2: val })
                    }} />
                    <RememberPassword />
                    <Button className="mt-10" disabled={loading} loading={loading} onClick={() => {
                        // 此处调用重置密码接口函数
                        if (checkValues(params, "resetPassword")) {
                            resetPassword(params);
                        }
                    }}>
                        提交
                    </Button>
                </CardBackground>
            </BodyBox ></>)
}