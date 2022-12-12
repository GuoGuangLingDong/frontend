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
    from?: string,
    phonenumber?: string,
    imageVerify?: string,
    password?: string,
    password2?: string,
    verifycode?: string,
    invitecode?: string,
    imageVerifyId?: string
}

export type TImageCode = {
    id: string,
    base64: string
}

export const useParams = () => {
    const [values, setValues] = useState<TAuthParams>({
        phonenumber: "",
        imageVerify: "",
        password: "",
        password2: "",
        verifycode: "",
        invitecode: "",
        imageVerifyId: ""
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
        if (!params.phonenumber || !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(params.phonenumber)) {
            message("请输入11位手机号", "warn")
            return
        }

        if (!params.verifycode && type !== "login") {
            message("请输入验证码", "warn")
            return
        }

        if (!params.imageVerify) {
            message("请输入图片验证码", "warn")
            return
        }

        if (!params.password) {
            message("请输入密码", "warn")
            return
        }

        if (!params.password2 && type !== "login") {
            message("请再次输入密码", "warn")
            return
        }

        let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,18}$/
        if (!reg.test(params.password)) {
            message('密码请输入6-18位数字加字母的组合', 'warn')
            return
        }

        if (params.password !== params.password2 && type !== "login") {
            message('两次密码不一致', 'warn');
            return
        }

        save({
            password: params.password,
            phonenumber: params.phonenumber
        });
        return true
    }, [save, message])
}

export const VerifyCode = ({ phone, imageData, from, imageVerify }: { imageData?: TImageCode, phone?: string, from: "register" | "login" | "reset_pass", imageVerify?: string }) => {
    const [time, setTimt] = useState(0);
    const [, getCode] = useRequest(api.getVerifyCode);
    const { message } = useMessage();

    const getVerifyCode = async () => {
        if (!phone) {
            message("请输入手机号", "warn")
            return
        }

        if (!imageVerify) {
            message("请输入校验码", "warn")
            return
        }

        // 传给获取手机验证码的接口的参数
        const params = {
            phone,
            from,
            imageVerifyId: imageData?.id,
            imageVerify: imageVerify
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

    return (<img src={imageData?.base64} alt="" style={{ width: 100, height: 40, borderTopRightRadius: 40, borderBottomRightRadius: 40, marginRight: -10 }} onClick={() => { getImageVerifyCode() }} />)
}

export const Register = () => {
    const [params, setParams] = useParams();
    const { register, loading } = useAuth();
    const checkValues = useCheckInput();
    const [imageData, setImageData] = useState<TImageCode>();

    return (<div>
        <AuthBox>

            <InputLabel text="手机号(+86)" maxLength={11} value={params.phonenumber} onChange={(val) => {
                setParams({ phonenumber: val })
            }} />
            <InputLabel text="校验码" value={params.imageVerify} onChange={(val) => {
                setParams({ imageVerify: val })
            }} right={<ImageVerifyCode imageData={imageData} setImageData={setImageData} />} />
            <InputLabel text="验证码" value={params.verifycode} onChange={(val) => {
                setParams({ verifycode: val })
            }} right={<VerifyCode from="register" phone={params.phonenumber || ""} imageData={imageData} imageVerify={params.imageVerify} />} />
            <InputLabel text="密码" type="password" value={params.password} onChange={(val) => {
                setParams({ password: val })
            }} />
            <InputLabel text="确认密码" type="password" value={params.password2} onChange={(val) => {
                setParams({ password2: val })
            }} />
            <InputLabel text="邀请码" value={params.invitecode} onChange={(val) => {
                setParams({ invitecode: val })
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