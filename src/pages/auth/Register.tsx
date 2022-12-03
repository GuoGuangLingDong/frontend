import { message } from "antd"
import { timeStamp } from "console"
import { useCallback, useEffect, useState } from "react"
import { Button } from "../../components/Button"
import { InputLabel } from "../../components/Label"
import { useAuth } from "../../components/UserAuth"
import { AuthBox } from "./components/AuthBox"
import { RememberPassword } from "./components/RememberPassword"

export type TAuthParams = {
    phone_number?: string,
    // checkCode?: string,
    password?: string,
    verify_code?: string,
    invite_code?: string
}

export const useParams = () => {
    const [values, setValues] = useState<TAuthParams>({});
    const setParams = useCallback((arg: TAuthParams) => {
        setValues((pre: TAuthParams) => ({ ...pre, ...arg }))
    }, [])

    const [fill] = useRememberPassword();

    useEffect(() => {
        fill(setParams);
    }, [setParams, fill]);

    return [values, setParams] as const
}

export const useRememberPassword = () => {
    const fill = useCallback((setParams: (arg: TAuthParams) => void) => {
        let data: any = localStorage.getItem("auth") || "{}";
        let remember: any = localStorage.getItem("remember");
        if (!data) return
        data = JSON.parse(data);
        if (remember === "true") {
            setParams(data)
        }
    }, [])

    const save = useCallback((params: TAuthParams) => {
        let remember = localStorage.getItem("remember");

        if (remember === "true") {
            localStorage.setItem("auth", JSON.stringify(params))
        } else {
            localStorage.setItem("auth", JSON.stringify({}))
        }
    }, [])

    return [fill, save] as const
}

export const useCheckInput = () => {
    const [, save] = useRememberPassword();
    return useCallback((params: TAuthParams, idReister?: boolean) => {
        if (!params.phone_number) {
            message.warning("请输入手机号")
            return
        }
        if (!params.verify_code && idReister) {
            message.warning("请输入验证码")
            return
        }
        if (!params.password) {
            message.warning("请输入密码")
            return
        }
        save(params);
        return true
    }, [save])
}

export const VerifyCode = ({ phone }: { phone: string }) => {
    const getVerifyCode = async () => {
        var timestamp=new Date().getTime();
        const response = await fetch("http://did.crichain.cn:8000/code/send", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({"phone":phone, "from":timestamp}) // body data type must match "Content-Type" header
        });
        console.log(phone)
    };

    return <div className="text-xs rounded-full text-white text-center"
        style={{
            backgroundColor: "black",
            padding: "4px 8px",
            minWidth: 60
        }}
        onClick={() => {
            getVerifyCode();
        }}>验证码</div>
}

export const Register = () => {
    const [params, setParams] = useParams();
    const { register } = useAuth();
    const checkValues = useCheckInput();

    return (<div>
        <AuthBox>
            <InputLabel text="手机号(+86)" maxLength={11} value={params.phone_number} onChange={(val) => {
                setParams({ phone_number: val })
            }} />
            {/* <InputLabel text="校验码" value={params.verify_code} onChange={(val) => {
                setParams({ verify_code: val })
            }} /> */}
            <InputLabel text="验证码" value={params.verify_code} onChange={(val) => {
                setParams({ verify_code: val })
            }} right={<VerifyCode phone={params.phone_number || ""} />} />
            <InputLabel text="密码" type="password" value={params.password} onChange={(val) => {
                setParams({ password: val })
            }} />
            <InputLabel text="邀请码" value={params.invite_code} onChange={(val) => {
                setParams({ invite_code: val })
            }} />
            <RememberPassword />
            <Button className="mt-10" onClick={() => {
                // 此处调用注册接口函数
                if (checkValues(params, true)) {
                    register(params);
                }
            }}>
                注册
            </Button>
        </AuthBox>
    </div>)
}