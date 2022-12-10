import { useCallback, useEffect } from "react";
import { Button } from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { BodyBox } from "../../components/BodyBox";
import { useState } from "react";
import { Header } from "../../components/Header";
import { CardBackground } from "../../components/Card";
import { useSwitch } from "../../components/Loading";
import api from "../../api";
import { useMessage } from "../../components/Message";
import { useRequest } from "../../hooks/useRequest";
import { Upload } from "../../components/Upload";
import edit from "../../assets/image/edit.svg"
import { SocialItem, TEditParams, TSocialItemParams } from "./components/SocialItem";
import { useAuth } from "../../components/UserAuth";


// 铸造POAP
export const Edit = () => {
    const param = useParams();
    const [loading, openLoading, closeLoading] = useSwitch();
    const { message } = useMessage();
    const { userInfo, getUserInfo } = useAuth();
    const navigator = useNavigate();
    const [, setUserInfoFun] = useRequest(api.setUserInfo);
    const [isEdit, openEdit, closeEdit] = useSwitch();

    const [links, setLinks] = useState<TSocialItemParams[]>([])

    const [values, setValues] = useState<TEditParams>({
        username: "",
        introduction: "",
        links: links,
        avatar: ""
    });

    useEffect(() => {
        if (!userInfo) return
        setLinks(userInfo.links || []);
        setValues({
            username: userInfo.username,
            introduction: userInfo.introduction,
            links: userInfo.links || [],
            avatar: userInfo.avatar
        })
        // setLinks();
    }, [userInfo])

    const setParams = useCallback((arg: Partial<TEditParams>) => {
        setValues((pre: TEditParams) => ({ ...pre, ...arg }))
    }, [])

    const submit = useCallback(async () => {
        const params = { ...values, links: links }
        if (!params.username || params.username?.length < 4 || params?.username?.length > 30) {
            message("请输入4～30位的用户名", "warn")
            return
        }
        if (!params.introduction) {
            message("请输入用户简介", "warn")
            return
        }
        if (!params.avatar) {
            message("请上传用户头像", "warn")
            return
        }

        openLoading();
        setUserInfoFun(params).then(async () => {
            await getUserInfo()
            closeLoading();
            navigator(-1);
        }).catch(() => {
            closeLoading();
        })

        //eslint-disable-next-line
    }, [param, setUserInfoFun, links, values, message, navigator, getUserInfo])

    const add = useCallback(() => {
        setLinks((pre: TSocialItemParams[]) => ([...pre, {
            linkTitle: "",
            link: "",
            linkType: pre?.length + 1,
        }]))
    }, [])

    return (
        <>
            <Header title={"定制个人主页"} />
            <BodyBox css={{ marginBottom: 50, paddingTop: 100 }}>
                <div className="flex justify-center">
                    <Upload width={180} height={180} closeLoading={closeLoading} openLoading={openLoading} src={userInfo?.avatar} onChange={(url) => {
                        setParams({ avatar: url })
                    }} />
                </div>
                <div className="flex justify-center items-center mt-4 mb-6">
                    <input type="text" value={values.username} onChange={(val) => {
                        setParams({ username: val.target.value })
                    }} maxLength={30} className="outline-none p-2 text-center" placeholder="请输入用户名" readOnly={!isEdit} onBlur={() => {
                        closeEdit();
                    }} /> {!isEdit && <img src={edit} onClick={openEdit} className="w-4 ml-2" alt="" />}
                </div>

                <CardBackground className="flex justify-center items-center px-2 relative mt-0" style={{ minHeight: 180, minWidth: 180 }}>
                    <textarea name="" value={values.introduction} className="outline-none" id="" cols={36} rows={6}
                        placeholder="请输入个人简介"
                        onChange={(val) => {
                            const value = val?.target?.value;
                            if (/[<>]/g.test(value)) return
                            if (value?.length > 160) return
                            setParams({ introduction: value })
                        }}
                    ></textarea>
                    <div className="absolute right-2 bottom-2">{values?.introduction?.length} / 160</div>
                </CardBackground>

                <div className="font-bold mt-10 flex justify-between items-center">
                    展示社交信息
                    <Button className="w-16 py-1" deep onClick={add}>
                        添加
                    </Button>
                </div>
                {
                    links?.map((item, index) => {
                        return (<SocialItem
                            key={`${index}_${item.linkType}`}
                            link={links[index]}
                            setLinks={setLinks}
                            index={index}
                        />)
                    })
                }

                <div style={{ color: "#99A7B5", textAlign: "center", marginTop: 50 }}>已为您自动导入部分开放平台数据</div>

                <Button className="my-6" loading={loading} disabled={loading} onClick={submit}>
                    提交并预览效果
                </Button>
            </BodyBox>
        </>
    );
};