import { useCallback } from "react";
import { Button } from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { BodyBox } from "../../components/BodyBox";
import { useState } from "react";
import { Header, hearderIconCss } from "../../components/Header";
import { CardBackground } from "../../components/Card";
import { useSwitch } from "../../components/Loading";
import api from "../../api";
import { useMessage } from "../../components/Message";
import { DropDown } from "../../components/Select";
import back from "../../assets/image/back.svg";
import { bgColor } from "../../theme";
import { useRequest } from "../../hooks/useRequest";
import { Upload } from "../../components/Upload";

export type TCastPoapParams = {
    poap_name?: string,
    poap_sum?: string,
    receive_cond?: number,
    mint_plat?: number,
    cover_img?: string,
    poap_intro?: string
    collect_list?: string
}

const conditions = ["所有人可领取", "指定人可领取"]

const Select = ({ isOpen, close, handle }: { isOpen: boolean, close: () => void, handle: (index: number) => void }) => {

    return (
        <DropDown isOpen={isOpen} direction="right" css={{
            right: 10,
            top: -10,
            position: "absolute",
            zIndex: 50
        }}>
            <div className="text-center" style={{ fontWeight: 600 }}>
                {conditions?.map((item: string, index: number) => {
                    return <div key={index} className="py-2" onClick={() => {
                        close();
                        handle(index + 1);
                    }} style={{
                        borderTop: index !== 0 ? "1px solid #EEEFF4" : "none"
                    }}>{item}</div>
                })}
            </div>
        </DropDown>
    )
}

// 铸造POAP
export const CastPOAP = () => {
    const param = useParams();
    const [loading, openLoading, closeLoading] = useSwitch();
    const [isOpenSelect, openSelect, closeSelect] = useSwitch();
    const { message } = useMessage();
    const [, createPoap] = useRequest(api.mint);
    const navigate = useNavigate();

    const [values, setValues] = useState<TCastPoapParams>({
        poap_name: "",
        poap_sum: "",
        receive_cond: 1,
        cover_img: "",
        poap_intro: "",
        mint_plat: 1,
        collect_list: ""
    });

    const setParams = useCallback((arg: TCastPoapParams) => {
        setValues((pre: TCastPoapParams) => ({ ...pre, ...arg }))
    }, [])

    const cast = useCallback(async () => {
        if (!values.poap_name || values.poap_name?.length < 4 || values?.poap_name?.length > 30) {
            message("请输入4～30位的POAP名称", "warn")
            return
        }
        if (!values.poap_sum || Number(values.poap_sum) < 0 || Number(values.poap_sum) > 10000) {
            message("请输入10000以内的数量", "warn")
            return
        }
        if (!values.cover_img) {
            message("请上传封面图片", "warn")
            return
        }
        if (!values.poap_intro) {
            message("请输入POAP简介", "warn")
            return
        }
        if (values.receive_cond === 2 && !values.collect_list) {
            message("请输入领取的名单", "warn")
            return
        }
        if (values.receive_cond === 2 && ((values.collect_list?.split("#")?.length || 0) > Number(values.poap_sum))) {
            message("领取的名单数量超过POAP总量", "warn")
            return
        }

        openLoading();
        createPoap(values).then(() => {
            closeLoading();
            message("铸造成功！", "success");
            navigate("/home");
        }).catch(() => {
            closeLoading();
        })

        //eslint-disable-next-line
    }, [param, createPoap, values])

    return (
        <>
            <Header title={"铸造POAP"} />
            <BodyBox css={{ marginBottom: 50, paddingTop: 80 }}>
                <div className="ml-4 mb-1 font-bold">POAP名称</div>
                <input type="text" placeholder="请输入4～30位的POAP名称" value={values.poap_name} maxLength={30} className="bg-white outline-none rounded-3xl w-full px-4 py-2 mb-6" onChange={(val) => {
                    setParams({ poap_name: val.target.value })
                }} />

                <div className="ml-4 mb-1 font-bold" >铸造数量</div>
                <input placeholder="请输入10000以内的数量" className="bg-white outline-none rounded-3xl w-full px-4 py-2 mb-6" value={values.poap_sum} onChange={(val) => {
                    const value = val.target.value;
                    if (Number(value) <= 10000 && Number(value) >= 0) {
                        setParams({ poap_sum: val.target.value })
                    }
                }} />

                <div className="ml-4 mb-1 font-bold">领取条件</div>
                <div className="flex items-center w-full mb-6">
                    <input type="text" placeholder="请选择领取条件" readOnly value={conditions[Number(values.receive_cond || 1) - 1]}
                        className="bg-white outline-none rounded-l-3xl w-full px-4 py-2"
                    />
                    <div className={`cursor-pointer w-8 bg-white flex items-center h-10 rounded-r-3xl`} onClick={() => {
                        isOpenSelect ? closeSelect() : openSelect();
                    }}>
                        <div className="rounded-full flex justify-center items-center" style={{ background: bgColor, width: 20, height: 20, }}>
                            <img className={`${hearderIconCss} transform -rotate-90`} src={back} alt="logo" />
                        </div>
                    </div>
                </div>
                <div className="relative">
                    {isOpenSelect && <Select isOpen={isOpenSelect} close={closeSelect} handle={(index) => {
                        setParams({ receive_cond: index })
                    }} />}
                </div>

                {values.receive_cond === 2 && <><div className="ml-4 mb-1 font-bold">领取人名单</div>
                    <CardBackground className="flex justify-center items-center px-2 relative mt-0 mb-6" style={{ minHeight: 180, minWidth: 180 }}>
                        <textarea name="" value={values.collect_list} className="outline-none" cols={36} rows={10}
                            placeholder="请输入领取人的手机号或did，以#号分割开，例如： 17712345678#wodedid.did#18812345678，最多输入1000个名单！"
                            onChange={(val) => {
                                let content = val?.target?.value;
                                content = content?.replace(/[#.]/g, "");
                                if (!/^[a-zA-Z0-9]+$/.test(content) && content) return

                                const value = val?.target?.value?.split("#");
                                if (value?.length > 1000) return
                                setParams({ collect_list: val?.target?.value })
                            }}
                        ></textarea>
                        <div className="absolute right-2 bottom-2">{(values?.collect_list || "")?.length >= 1 ? values?.collect_list?.split("#")?.length : 0} / 1000</div>
                    </CardBackground></>}

                <div className="ml-4 mb-1 font-bold">POAP封面图片</div>
                <div className="flex items-center font-bold mb-6" style={{ color: "#99A7B5" }}>
                    <Upload closeLoading={closeLoading} openLoading={openLoading} width={180} height={180} onChange={(url) => {
                        setParams({ cover_img: url })
                    }} />
                    <div>
                        请上传1:1正方形图片，图片大小10MB以内，支持格式JPG、PNG、GIF。
                    </div>
                </div>

                <div className="ml-4 mb-1 font-bold">POAP简介</div>
                <CardBackground className="flex justify-center items-center px-2 relative mt-0" style={{ minHeight: 180, minWidth: 180 }}>
                    <textarea name="" value={values.poap_intro} className="outline-none" cols={36} rows={10}
                        placeholder="文字描述最多200字"
                        onChange={(val) => {
                            const value = val?.target?.value;
                            if (/[<>]/g.test(value)) return
                            if (value?.length > 200) return
                            setParams({ poap_intro: value })
                        }}
                    ></textarea>
                    <div className="absolute right-2 bottom-2">{values?.poap_intro?.length} / 200</div>
                </CardBackground>

                <Button className="my-10" loading={loading} disabled={loading} onClick={() => {
                    cast();
                }}>
                    {loading ? "上传图片..." : "铸造POAP"}
                </Button>
            </BodyBox>
        </>
    );
};