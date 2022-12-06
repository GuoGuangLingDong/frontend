import { useCallback } from "react";
import { Button } from "../../components/Button";
import { useParams } from "react-router-dom";
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

export type TCastPoapParams = {
    poap_name?: string,
    poap_sum?: string,
    receive_cond?: number,
    cover_img?: string,
    poap_intro?: string
    collect_list?: string
}

const conditions = ["所有人可领取", "指定人可领取"]

const Select = ({ isOpen, close, handle }: { isOpen: boolean, close: () => void, handle: (index: number) => void }) => {

    return (
        <DropDown isOpen={isOpen} right css={{
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
    const [img, setImg] = useState<any>(null)

    const [values, setValues] = useState<TCastPoapParams>({
        poap_name: "",
        poap_sum: "",
        receive_cond: 1,
        cover_img: "",
        poap_intro: "",
        collect_list: ""
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

    const handleImage = (e: any) => {
        const file = e?.target?.files?.[0];
        if (!file?.size) return
        if (file?.size > 10 * 1024 * 1024) {
            message("图片尺寸太大！", "warn")
            return
        }

        const reads = new FileReader();
        reads.readAsDataURL(file as any);
        reads.onload = function (event) {
            let image = new Image();
            if (!event?.target?.result) return
            image.src = event?.target?.result as any;
            image.onload = function (e: any) {
                const w = e?.path?.[0]?.width;
                const h = e?.path?.[0]?.height;
                if (w > 0 && h > 0 && w === h) {
                    setImg(event?.target?.result);
                } else {
                    message("图片高宽比应为1:1", "warn")
                }
            }
        };
    }

    return (
        <>
            <Header title={"铸造POAP"} />
            <BodyBox css={{ marginBottom: 50, paddingTop: 80 }}>
                <div className="ml-4 mb-1 font-bold">Poap名称</div>
                <input type="text" placeholder="请输入名称" value={values.poap_name} className="bg-white outline-none rounded-3xl w-full px-4 py-2 mb-6" onChange={(val) => {
                    setParams({ poap_name: val.target.name })
                }} />

                <div className="ml-4 mb-1 font-bold" >铸造数量</div>
                <input type="text" placeholder="请输入数量" className="bg-white outline-none rounded-3xl w-full px-4 py-2 mb-6" value={values.poap_sum} onChange={(val) => {
                    setParams({ poap_name: val.target.name })
                }} />

                <div className="ml-4 mb-1 font-bold">领取条件</div>
                <div className="flex items-center w-full mb-6">
                    <input type="text" placeholder="请选择领取条件" readOnly value={conditions[Number(values.receive_cond || 1) - 1]}
                        className="bg-white outline-none rounded-l-3xl w-full px-4 py-2"
                    />
                    <div className={`cursor-pointer w-8 bg-white flex items-center h-10 rounded-r-3xl`} onClick={() => {
                        openSelect();
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
                        <textarea name="" value={values.collect_list} className="outline-none" id="" cols={36} rows={10}
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
                        <div className="absolute right-2 bottom-2">{values?.collect_list?.split("#")?.length} / 1000</div>
                    </CardBackground></>}

                <div className="ml-4 mb-1 font-bold">Poap封面图片</div>
                <div className="flex items-center font-bold mb-6" style={{ color: "#99A7B5" }}>
                    <CardBackground className="flex justify-center items-center mr-4 mt-0 p-0" style={{ minHeight: 180, minWidth: 180, maxHeight: 180, maxWidth: 180 }}>
                        <input type="file" className="h-0 w-0" name="image" id="image" onChange={handleImage} accept="image/png,image/jpg,image/gif" />
                        <label htmlFor="image">
                            <div>
                                {img ? <img src={img} className="rounded-3xl" style={{ width: 180, height: 180 }} alt=""/> : "点击上传"}
                            </div>
                        </label>
                    </CardBackground>
                    <div>
                        请上传1:1正方形图片，
                        图片大小10MB以内，
                        支持格式JPG、PNG、GIF。
                    </div>
                </div>

                <div className="ml-4 mb-1 font-bold">Poap简介</div>
                <CardBackground className="flex justify-center items-center px-2 relative mt-0" style={{ minHeight: 180, minWidth: 180 }}>
                    <textarea name="" value={values.poap_intro} className="outline-none" id="" cols={36} rows={10}
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

                <Button className="my-10" loading={loading} disabled={loading} onClick={cast}>
                    铸造POAP
                </Button>
            </BodyBox>
        </>
    );
};