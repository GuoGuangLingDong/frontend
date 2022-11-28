import { useCallback, useState } from "react"
import { Button } from "../../components/Button"
import { InputLabel } from "../../components/Label"
import { useAuth } from "../../components/UserAuth"
import { AuthBox } from "./components/AuthBox"
import { RememberPassword } from "./components/RememberPassword"

export type TAuthParams = {
    phone?: string,
    checkCode?: string,
    passwork?: string,
    inviteCode?: string,
    verifyCode?: string
}

export const useParams = () => {
    const [values, setValues] = useState<TAuthParams>({});
    const setParams = useCallback((arg) => {
        setValues((pre: any) => ({ ...pre, ...arg }))
    }, [])
    return [values, setParams] as const
}

export const Login = () => {
    const [params, setParams] = useParams();
    const { login } = useAuth();

    return (<div>
        <AuthBox>
            <InputLabel text="手机号(+86)" value={params.phone} maxLength={11} onChange={(val) => {
                setParams({ phone: val })
            }} />
            <InputLabel text="校验码" value={params.checkCode} onChange={(val) => {
                setParams({ checkCode: val })
            }} />
            <InputLabel text="登录密码" value={params.passwork} onChange={(val) => {
                setParams({ passwork: val })
            }} />
            <div className="flex justify-between items-center text-sm">
                <RememberPassword />
                <div>忘记密码</div>
            </div>
            <Button className="mt-10" onClick={() => {
                // 此处调用登录接口函数
                login(params)
            }}>
                登陆
            </Button>
        </AuthBox>
    </div>)
}