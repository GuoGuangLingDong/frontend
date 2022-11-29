import { Button } from "../../components/Button"
import { InputLabel, TextLabel } from "../../components/Label"
import { useAuth } from "../../components/UserAuth"
import { AuthBox } from "./components/AuthBox"
import { RememberPassword } from "./components/RememberPassword"
import { useParams } from "./Login"

export const Register = () => {
    const [params, setParams] = useParams();
    const { register } = useAuth();

    return (<div>
        <AuthBox>
            <InputLabel text="手机号(+86)" value={params.phone_number} onChange={(val) => {
                setParams({ phone_number: val })
            }} />
            <InputLabel text="校验码" value={params.verify_code} onChange={(val) => {
                setParams({ verify_code: val })
            }} />
            <InputLabel text="验证码" value={params.verify_code} onChange={(val) => {
                setParams({ verify_code: val })
            }} right={<div className="text-xs rounded-full text-white text-center" style={{
                backgroundColor: "black",
                padding: "4px 8px",
                minWidth: 60
            }}>验证码</div>} />
            <InputLabel text="密码" value={params.password} onChange={(val) => {
                setParams({ password: val })
            }} />
            <InputLabel text="邀请码" value={params.invite_code} onChange={(val) => {
                setParams({ invite_code: val })
            }} />
            {/* <TextLabel className="h-12" text="铸造POAP" right={<div>11.21 22:22</div>}>
                <span>-222</span>
            </TextLabel> */}
            <RememberPassword />
            <Button className="mt-10" onClick={() => {
                // 此处调用注册接口函数
                register(params)
            }}>
                注册
            </Button>
        </AuthBox>
    </div>)
}