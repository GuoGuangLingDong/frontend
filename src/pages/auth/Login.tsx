import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { InputLabel } from "../../components/Label"
import { useAuth } from "../../components/UserAuth"
import { AuthBox } from "./components/AuthBox"
import { RememberPassword } from "./components/RememberPassword"
import { ImageVerifyCode, TImageCode, useCheckInput, useParams, VerifyCode } from "./Register"

export const Login = () => {
    const [params, setParams] = useParams();
    const navigate = useNavigate();
    const { login, loading } = useAuth();
    const checkValues = useCheckInput();
    const [imageData, setImageData] = useState<TImageCode>();

    return (<div>
        <AuthBox>
            <InputLabel text="手机号(+86)" value={params.phone_number} maxLength={11} onChange={(val) => {
                setParams({ phone_number: val })
            }} />
            <InputLabel text="校验码" value={params.image_code} onChange={(val) => {
                setParams({ image_code: val })
            }} right={<ImageVerifyCode imageData={imageData} setImageData={setImageData} />} />
           
            <InputLabel text="登录密码" type="password" value={params.password} onChange={(val) => {
                setParams({ password: val })
            }} />
            <div className="flex justify-between items-center text-sm">
                <RememberPassword />
                <div onClick={()=>{
                    navigate("/reset-password")
                }}>忘记密码</div>
            </div>
            <Button className="mt-10" disabled={loading} loading={loading} onClick={() => {
                // 此处调用登录接口函数
                if (checkValues(params, "login")) {
                    login(params);
                }
            }}>
                登陆
            </Button>
        </AuthBox>
    </div>)
}