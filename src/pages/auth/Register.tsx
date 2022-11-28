import { Button } from "../../components/Button"
import { InputLabel } from "../../components/Label"
import { useAuth } from "../../components/UserAuth"
import { AuthBox } from "./components/AuthBox"
import { RememberPassword } from "./components/RememberPassword"
import { useParams } from "./Login"

export const Register = () => {
    const [params, setParams] = useParams();
    const { register } = useAuth();

    return (<div>
        <AuthBox>
            <InputLabel text="手机号(+86)" value={params.phone} onChange={(val) => {
                setParams({ phone: val })
            }} />
            <InputLabel text="校验码" value={params.checkCode} onChange={(val) => {
                setParams({ checkCode: val })
            }} />
            <InputLabel text="验证码" value={params.verifyCode} onChange={(val) => {
                setParams({ verifyCode: val })
            }} right={<div className="text-xs rounded-full text-white text-center" style={{
                backgroundColor: "black",
                padding: "4px 8px",
                minWidth: 60
            }}>验证码</div>} />
            <InputLabel text="密码" value={params.passwork} onChange={(val) => {
                setParams({ passwork: val })
            }} />
            <InputLabel text="邀请码" value={params.inviteCode} onChange={(val) => {
                setParams({ inviteCode: val })
            }} />
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