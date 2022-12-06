import { useState } from "react"
import { BodyBox } from "../../components/BodyBox"
import { Button } from "../../components/Button"
import { CardBackground } from "../../components/Card"
import { Header } from "../../components/Header"
import { InputLabel } from "../../components/Label"
import { useAuth } from "../../components/UserAuth"
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
                    <InputLabel text="手机号(+86)" value={params.phone_number} maxLength={11} onChange={(val) => {
                        setParams({ phone_number: val })
                    }} />
                    <InputLabel text="校验码" value={params.image_code} onChange={(val) => {
                        setParams({ image_code: val })
                    }} right={<ImageVerifyCode imageData={imageData} setImageData={setImageData} />} />
                    <InputLabel
                        text="验证码"
                        value={params.verify_code}
                        onChange={(val) => {
                            setParams({ verify_code: val })
                        }}
                        right={<VerifyCode from="login" phone={params.phone_number} imageData={imageData} image_code={params.image_code} />} />
                    <InputLabel text="密码" type="password" value={params.password} onChange={(val) => {
                        setParams({ password: val })
                    }} />
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