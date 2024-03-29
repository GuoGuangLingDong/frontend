import { Button } from "../../components/Button"
import { InputLabel } from "../../components/Label"
import { useAuth } from "../../components/UserAuth"
import { AuthBox } from "./components/AuthBox"
import { RememberPassword } from "./components/RememberPassword"
import { useCheckInput, useParams } from "./Register"

export const Login = () => {
    const [params, setParams] = useParams();
    const { login } = useAuth();
    const checkValues = useCheckInput();

    return (<div>
        <AuthBox>
            <InputLabel text="手机号(+86)" value={params.phone_number} maxLength={11} onChange={(val) => {
                setParams({ phone_number: val })
            }} />
            {/* <InputLabel text="校验码" value={params.verify_code} onChange={(val) => {
                setParams({ verify_code: val })
            }} /> */}
            {/* <InputLabel text="验证码" value={params.verify_code} onChange={(val) => {
                setParams({ verifyCode: val })
            }} right={<div className="text-xs rounded-full text-white text-center" style={{
                backgroundColor: "black",
                padding: "4px 8px",
                minWidth: 60
            }}>验证码</div>} /> */}
            <InputLabel text="登录密码" type="password" value={params.password} onChange={(val) => {
                setParams({ password: val })
            }} />
            <div className="flex justify-between items-center text-sm">
                <RememberPassword />
                <div>忘记密码</div>
            </div>
            <Button className="mt-10" onClick={() => {
                // 此处调用登录接口函数
                if (checkValues(params, false)) {
                    login(params);
                }
            }}>
                登陆
            </Button>
        </AuthBox>
    </div>)
}