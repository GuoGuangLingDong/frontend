import { useCallback } from "react";
import { Button } from "../../components/Button";
import { useParams } from "react-router-dom";
import { BodyBox } from "../../components/BodyBox";
import { useState } from "react";
import { Header } from "../../components/Header";
import { CardBackground } from "../../components/Card";
import { useSwitch } from "../../components/Loading";
import api from "../../api";
import { useMessage } from "../../components/Message";

export type TCastPoapParams = {
    poap_name?: string,
    poap_sum?: string,
    receive_cond?: string,
    cover_img?: string,
    poap_intro?: string
}

// 铸造POAP
export const CastPOAP = () => {
    const param = useParams();
    const [loading, openLoading, closeLoading] = useSwitch();
    const { message } = useMessage();
    const [values, setValues] = useState<TCastPoapParams>({
        poap_name: "",
        poap_sum: "",
        receive_cond: "",
        cover_img: "",
        poap_intro: ""
    });
    const setParams = useCallback((arg: TCastPoapParams) => {
        setValues((pre: TCastPoapParams) => ({ ...pre, ...arg }))
    }, [])

    const cast = useCallback(async () => {
        if (!values.poap_name) {
            message("请输入POAP名称", "warn")
            return
        }
        if (!values.poap_sum) {
            message("请输入铸造数量", "warn")
            return
        }
        if (!values.cover_img) {
            message("请上传封面图片", "warn")
            return
        }

        openLoading();
        await api.mint(param);
        closeLoading();
        message("铸造成功！", "success");
        //eslint-disable-next-line
    }, [param])

    return (
        <>
            <Header title={"铸造POAP"} />
            <BodyBox css={{ marginBottom: 50, paddingTop: 80 }}>
                <div className="ml-4 mb-1 font-bold">Poap名称</div>
                <input type="text" placeholder="请输入名称" value={values.poap_name} className="bg-white outline-none rounded-3xl w-full px-4 py-2 mb-6" />

                <div className="ml-4 mb-1 font-bold" >铸造数量</div>
                <input type="text" placeholder="请输入数量" className="bg-white outline-none rounded-3xl w-full px-4 py-2 mb-6" value={values.poap_sum} />

                <div className="ml-4 mb-1 font-bold">领取条件</div>
                <input type="text" placeholder="请选择条件" disabled className="bg-white outline-none rounded-3xl w-full px-4 py-2 mb-6" value={values.receive_cond} />

                <div className="ml-4 mb-1 font-bold">Poap封面图片</div>
                <div className="flex items-center font-bold mb-6" style={{ color: "#99A7B5" }}>
                    <CardBackground className="flex justify-center items-center mr-4 mt-0" style={{ minHeight: 160, minWidth: 160 }}>
                        <div>点击上传</div>
                    </CardBackground>
                    <div>
                        请上传1:1正方形图片，
                        图片大小10MB以内，
                        支持格式JPG、PNG、GIF。
                    </div>
                </div>

                <div className="ml-4 mb-1 font-bold">Poap简介</div>
                <CardBackground className="flex justify-center items-center px-2 relative mt-0" style={{ minHeight: 160, minWidth: 160 }}>
                    <textarea name="" value={values.poap_intro} className="outline-none" id="" cols={36} rows={10}
                        placeholder="文字描述最多200字"
                        onChange={(val) => {
                            const value = val?.target?.value;
                            if (value?.length > 200) return
                            setParams({ poap_intro: value })
                        }}
                    ></textarea>
                    <div className="absolute right-2 bottom-2">{values?.poap_intro?.length} / 200</div>
                </CardBackground>

                <Button className="my-10" loading={loading} disabled={loading} onClick={cast}>
                    铸造POAP
                </Button>
            </BodyBox>
        </>
    );
};