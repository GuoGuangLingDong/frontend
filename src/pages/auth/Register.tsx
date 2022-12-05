import { useCallback, useEffect, useState } from "react"
import { Button } from "../../components/Button"
import { InputLabel } from "../../components/Label"
import { useMessage } from "../../components/Message"
import { useAuth } from "../../components/UserAuth"
import { AuthBox } from "./components/AuthBox"
import { RememberPassword } from "./components/RememberPassword"
import api from "../../api/index";
import { useAutoRequest, useRequest } from "../../hooks/useRequest"

export type TAuthParams = {
    phone_number?: string,
    image_code?: string,
    password?: string,
    password2?: string,
    verify_code?: string,
    invite_code?: string,
    username?: string,
}

export type TImageCode = {
    id: string,
    base64: string
}

export const useParams = () => {
    const [values, setValues] = useState<TAuthParams>({
        phone_number: "",
        username: "",
        image_code: "",
        password: "",
        password2: "",
        verify_code: "",
        invite_code: ""
    });
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
    const { message } = useMessage();
    return useCallback((params: TAuthParams, type?: "resetPassword" | "login" | "register") => {
        console.log(type)
        if (!params.phone_number) {
            message("请输入手机号", "warn")
            return
        }
        if (!params.verify_code) {
            message("请输入验证码", "warn")
            return
        }
        if (!params.password) {
            message("请输入密码", "warn")
            return
        }
        save(params);
        return true
    }, [save, message])
}

export const VerifyCode = ({ phone, imageData, from, image_code }: { imageData?: TImageCode, phone?: string, from: "register" | "login", image_code?: string }) => {
    const [time, setTimt] = useState(0);
    const [, getCode] = useRequest(api.getVerifyCode, true);
    const { message } = useMessage();

    const getVerifyCode = async () => {
        if (!phone) {
            message("请输入手机号", "warn")
            return
        }

        if (!image_code) {
            message("请输入校验码", "warn")
            return
        }

        // 传给获取手机验证码的接口的参数
        const params = {
            phone,
            from,
            imageVerifyId: imageData?.id,
            imageVerify: image_code
        }

        // 获取手机验证码逻辑
        await getCode(params);
        setTimt(60);
    };

    useEffect(() => {
        if (time <= 0) return
        const timer = setTimeout(() => {
            setTimt(time - 1)
        }, 1000)
        return () => {
            clearTimeout(timer);
        }
    }, [time])

    return <div className="text-xs rounded-full text-white text-center"
        style={{
            backgroundColor: "black",
            padding: "4px 8px",
            minWidth: 60
        }}
        onClick={() => {
            !time && getVerifyCode();
        }}>{time ? `${time}s` : "验证码"}</div>
}

export const ImageVerifyCode = ({ imageData, setImageData }: { imageData?: TImageCode, setImageData: React.Dispatch<React.SetStateAction<TImageCode | undefined>> }) => {
    const [data, getImageVerifyCode] = useAutoRequest(api.getImageCode);

    useEffect(() => {
        if (!data) return
        setImageData(data)
        // eslint-disable-next-line
    }, [data])

    return (<img src={imageData?.base64} alt="" style={{ width: 60, height: 30 }} onClick={() => { getImageVerifyCode() }} />)
}

export const Register = () => {
    const [params, setParams] = useParams();
    const { register, loading } = useAuth();
    const checkValues = useCheckInput();
    const [imageData, setImageData] = useState<TImageCode>();

    return (<div>
        <AuthBox>
            <InputLabel text="用户名" maxLength={11} value={params.username} onChange={(val) => {
                setParams({ username: val })
            }} />
            <InputLabel text="手机号(+86)" maxLength={11} value={params.phone_number} onChange={(val) => {
                setParams({ phone_number: val })
            }} />
            <InputLabel text="校验码" value={params.image_code} onChange={(val) => {
                setParams({ image_code: val })
            }} right={<ImageVerifyCode imageData={imageData} setImageData={setImageData} />} />
            <InputLabel text="验证码" value={params.verify_code} onChange={(val) => {
                setParams({ verify_code: val })
            }} right={<VerifyCode from="register" phone={params.phone_number || ""} imageData={imageData} image_code={params.image_code} />} />
            <InputLabel text="密码" type="password" value={params.password} onChange={(val) => {
                setParams({ password: val })
            }} />
            <InputLabel text="确认密码" type="password" value={params.password2} onChange={(val) => {
                setParams({ password: val })
            }} />
            <InputLabel text="邀请码" value={params.invite_code} onChange={(val) => {
                setParams({ invite_code: val })
            }} />
            <RememberPassword />
            <Button className="mt-10" disabled={loading} loading={loading} onClick={() => {
                // 此处调用注册接口函数
                const isChecked = checkValues(params, "register");
                if (isChecked) {
                    register(params);
                }
            }}>
                注册
            </Button>
        </AuthBox>
    </div>)
}