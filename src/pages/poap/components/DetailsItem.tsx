import { useLocation, useNavigate } from "react-router-dom";
import { secondColor, textColor } from "../../../theme";
import { CardBackground } from "../../../components/Card";
import { LoadImage } from "../../../components/Image";
import { Holder, Star } from "../components/ListItem";
import starDeep from "../../../assets/image/starDeep.svg";
import stared from "../../../assets/image/select-on.svg";
import { ClaimButton } from "../components/ClaimButton";
import { DropDown } from "../../../components/Select";
import QRCode from "qrcode.react";
import { useCallback, useRef } from "react";
import { downloadImg } from "../../mine/Share";
import { useMessage } from "../../../components/Message";
import { SmallLoading, useSwitch } from "../../../components/Loading";
import { ellipseAddress } from "./PoapBaseInfo";
import { useRequest } from "../../../hooks/useRequest";
import api from "../../../api";
import { BodyBox } from "../../../components/BodyBox";
import { isMobile } from "../../../helpers/utilities";

export interface IHolderItem {
    "did": string//用户的did
    "uid": string//用户的uid
    "username": string//用户名
    "avatar": string//用户头像url
}

export interface IPoapDetailsItem {
    "poap_id": string,
    "miner": string,//发行人did
    "poap_name": string,
    "poap_number": number,
    "receive_cond": string,
    "cover_img": string,
    "poap_intro": string,
    "favour_number": number,
    "holder_num": number,//持有人数量
    "miner_name": string,//发行人用户名
    "avatar": string,//发行人头像url
    "collectable": number //# 是否可领取，未持有，未被领完
    "favoured": boolean,//是否已点赞
    "poap_sum": number,
    "chain": {
        plat_name: string,
        publish_time: string,
        contract_no: string,
        contract_addr: string,
    }
}

export const SharePOAP = ({ isOpen, close, details }: { isOpen: boolean, close: () => void, details: any }) => {
    const ref = useRef<HTMLDivElement>(null);
    // let timeout: any = useRef(null);
    const { message } = useMessage();
    const mobile = isMobile();
    const [loading, openLoading, closeLoading] = useSwitch();

    const save = () => {
        const dom = ref.current;
        if (!dom) return
        openLoading()
        downloadImg(dom, `poap-${details?.poap_id}`, () => {
            message("保存成功！", "success");
            closeLoading()
        }).catch(() => {
            message("保存失败！", "error");
            closeLoading()
        })
    }

    return (
        <DropDown isOpen={isOpen} direction="none" css={{
            right: "0",
            left: "0",
            top: "0",
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            zIndex: 1000
        }}>
            <div className="relative">
                <div className="bg-transparetn absolute" style={{
                    right: mobile ? "10vw" : "37vw",
                    left: mobile ? "10vw" : "37vw",
                    top: mobile ? "16vh" : "10vh",
                    width: mobile ? "80vw" : "26vw",
                    borderRadius: "30px"
                }}>
                    {/* <div className="absolute -top-10 text-center text-white w-full font-bold">长按保存至相册</div> */}
                    <div ref={ref}>
                        <CardBackground className="p-0 m-0 mt-0">
                            <LoadImage
                                src={details?.cover_img}
                                className="rounded-3xl cursor-pointer w-full"
                                style={{ padding: 2, width: mobile ? "80vw" : "26vw", height: mobile ? "80vw" : '26vw' }}
                            />
                            {/* <div className="absolute px-3 pt-2 w-full top-0 left-0">
                                <div className="rounded-full w-full flex items-center text-white" style={{
                                    background: "rgba(0,0,0,0.5)",
                                    padding: 2,
                                    minHeight: "2.5rem"
                                }}>
                                    <LoadImage
                                        className="rounded-full h-8 w-8 mr-1"
                                        src={details?.holders?.[0]?.avatar}
                                    />
                                    <div className="flex justify-between items-center w-full pr-2">
                                        <div>{details?.holders?.[0]?.username}</div>
                                        <div>{details?.holders?.[0]?.did}</div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="h-32 flex justify-between items-center p-4 font-bold">
                                <div>
                                    <div>{details?.poap_name}</div>
                                    <div>ID: {details?.poap_id?.length <= 16 ? details?.poap_id : `${details?.poap_id.slice(0, 6)}...${details?.poap_id.slice(-6)}`}</div>
                                </div>
                                <QRCode
                                    id="qrCode"
                                    value={window.location.href} //value参数为生成二维码的链接
                                    size={80} //二维码的宽高尺寸
                                    fgColor="#000000"//二维码的颜色
                                />
                            </div>
                        </CardBackground>
                    </div>

                    <div className="m-auto mt-4 rounded-full border h-10 flex justify-between items-center text-white" style={{ background: "linear-gradient(90deg, #F6BF75, #D77185, #8766AC, #4150B1)", }} >
                        <button className="flex-1 border-r h-full" onClick={save} style={{ borderColor: "white" }}>
                            <div className="bg-transparent w-full h-10 rounded-full flex justify-center items-center">
                                {loading && <><SmallLoading />&nbsp;</>}保存图片
                            </div>
                        </button>
                        <button className="flex-1 h-full" onClick={close}>关闭</button>
                    </div>
                </div>
            </div>
        </DropDown>
    )
}

export const DetailsPulse = () => {
    return (
        <BodyBox>
            <div className="rounded-md max-w-sm w-full mx-auto mt-4">
                <div className="animate-pulse">
                    <div className="rounded-3xl bg-gray-400 h-60 w-full my-2"></div>
                    <div className="py-1 space-y-2">
                        <div className="h-10 bg-gray-400 rounded"></div>
                        <div className="flex justify-between items-center">
                            <div className="h-4 bg-gray-400 rounded w-20"></div>
                            <div className="h-4 bg-gray-400 rounded w-20"></div>
                        </div>
                        <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-400 rounded"></div>
                    </div>
                </div>
            </div>
        </BodyBox>
    )
}

export const DetailItem = ({ item, getDetails, openShare }: { item: IPoapDetailsItem, getDetails: (arg: any) => void, openShare: () => void }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [, favourFun] = useRequest(api.favour);
    const mobile = isMobile();

    const favour = useCallback(async () => {
        await favourFun({
            poap_id: item.poap_id
        });
        await getDetails({
            poap_id: item.poap_id
        })
    }, [item, getDetails, favourFun])

    return (<CardBackground className="p-0 m-0 md:flex items-center">
        <LoadImage
            src={item?.cover_img}
            className="rounded-3xl cursor-pointer h-96 w-full"
            style={{ padding: 2, width: mobile ? "100%" : "24rem" }}
            onClick={() => {
                if (pathname?.includes("detail")) return
                navigate(`/detail/${item?.poap_id}`)
            }} />
        <div className="p-4 md:flex-1 md:h-96 md:flex md:flex-col md:justify-between">
            <div>
                <div className="text-sm md:text-2xl md:font-bold md:py-4">
                    {item?.poap_name}
                </div>
                <div className="hidden md:block text-xs pb-4">
                    {item?.poap_intro}
                </div>
                <div className="text-xs flex items-center mt-2" style={{ color: secondColor }}>
                    <Holder amount={item?.holder_num} style={{ justifyContent: "start" }} />
                    <div className="w-4"></div>
                    <Star amount={item?.favour_number} />
                    {!mobile && <><div className="w-4"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.98 41.97" onClick={() => {
                            openShare();
                        }} className="h-3 cursor-pointer"><defs><style></style></defs><g id="图层_2" data-name="图层 2"><g id="图层_1-2" data-name="图层 1"><path className="cls-1" d="M35.11,15.8a7.82,7.82,0,0,1-6-2.82l-9.81,4.71a10.11,10.11,0,0,1-.06,7.86L27,29.6A8,8,0,0,1,38.11,27a8.13,8.13,0,0,1,2.56,11.15,8,8,0,0,1-11.08,2.58A8.12,8.12,0,0,1,26,32.36L17.68,28A10,10,0,0,1,3.57,29.26a10.13,10.13,0,0,1-1.22-14.2,10,10,0,0,1,14.11-1.22,10.36,10.36,0,0,1,1.35,1.38l9.9-4.75a7.92,7.92,0,0,1,4.86-10,7.89,7.89,0,0,1,5.11,14.94A7.75,7.75,0,0,1,35.11,15.8Z" fill="#99A7B5" /></g></g></svg>
                    </>}
                    <div style={{ flex: 4, textAlign: "right" }} >
                        限量发行
                        <span style={{ color: textColor }}>{item?.poap_sum || 0}</span>
                        张
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center align-bottom">
                {item?.collectable && <><ClaimButton poap_id={item?.poap_id} getDetails={getDetails} />
                    <div className="w-6"></div></>}
                <button className="mt-6 p-0 select-none w-full sm:px-6 font-bold text-sm rounded-full text-white border-0" style={{
                    padding: 2,
                    background: "linear-gradient(90deg, #F6BF75, #D77185, #8766AC, #4150B1)",
                }} onClick={() => {
                    // 此处调用点赞接口函数
                    if (!item?.favoured) {
                        favour()
                    }
                }}>
                    <div className="bg-white w-full h-10 rounded-full flex justify-center items-center" style={{ color: textColor }}>
                        <img src={item?.favoured ? stared : starDeep} className="w-4" alt="share" />&nbsp;{item?.favoured ? "已点赞" : "点赞"}
                    </div>
                </button>
            </div>
        </div>
    </CardBackground>
    )
};