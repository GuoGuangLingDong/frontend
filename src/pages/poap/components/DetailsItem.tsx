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
import { useEffect, useRef } from "react";
import { downloadImg } from "../../mine/Share";
import { useMessage } from "../../../components/Message";
import { SmallLoading, useSwitch } from "../../../components/Loading";

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
    "chain": {
        plat_name: string,
        publish_time: string,
        contract_no: string,
        contract_addr: string,
    }
}

export const SharePOAP = ({ isOpen, close, details }: { isOpen: boolean, close: () => void, details: IPoapDetailsItem }) => {
    const ref = useRef<HTMLDivElement>(null);
    // let timeout: any = useRef(null);
    const { message } = useMessage();
    const [loading, openLoading, closeLoading] = useSwitch();
    useEffect(() => {
        const dom = ref.current;
        if (!dom) return
        // dom.addEventListener('touchstart', () => {
        //     timeout.current = setTimeout(() => {
        //         downloadImg(dom, () => {
        //             message("保存成功！", "success");
        //             clearTimeout(timeout.current);
        //         }).catch(() => {
        //             message("保存失败！", "error");
        //         })
        //     }, 800); // 长按时间超过800ms，则执行传入的方法 
        // }, false);
        // dom.addEventListener('touchend', () => {
        //     clearTimeout(timeout.current); // 长按时间少于800ms，不会执行传入的方法
        // }, false);
        // eslint-disable-next-line
    }, [ref])

    const save = () => {
        const dom = ref.current;
        if (!dom) return
        openLoading()
        downloadImg(dom, details?.poap_id, () => {
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
            background: "rgba(0,0,0,0.5)"
        }}>
            <div className="relative">
                <div className="bg-transparetn absolute" style={{
                    right: "10vw",
                    left: "10vw",
                    top: "16vh",
                    width: "80vw",
                    borderRadius: "30px"
                }}>
                    {/* <div className="absolute -top-10 text-center text-white w-full font-bold">长按保存至相册</div> */}
                    <div ref={ref}>
                        <CardBackground className="p-0 m-0 mt-0">
                            <LoadImage
                                src={details?.cover_img}
                                className="rounded-3xl cursor-pointer w-full"
                                style={{ padding: 2, width: "80vw", height: "80vw" }}
                            />
                            <div className="absolute px-3 pt-2 w-full top-0 left-0">
                                <div className="rounded-full w-full flex items-center text-white" style={{
                                    background: "rgba(0,0,0,0.5)",
                                    padding: 2,
                                    minHeight: "2.5rem"
                                }}>
                                    <LoadImage
                                        className="rounded-full h-8 w-8 mr-1"
                                        src={"https://0.soompi.io/wp-content/uploads/2018/04/20170556/IU-140x140.jpg"}
                                    />
                                    <div className="flex justify-between items-center w-full pr-2">
                                        <div>{details.miner_name}</div>
                                        <div>{details.miner}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-32 flex justify-between items-center p-4 font-bold">
                                <div>
                                    <div>{details.poap_name}</div>
                                    <div>ID: {details.poap_id}</div>
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

export const DetailItem = ({ item, getDetails }: { item: IPoapDetailsItem, getDetails: (id: string) => void }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (<CardBackground className="p-0 m-0">
        <LoadImage
            src={item?.cover_img}
            className="rounded-3xl cursor-pointer h-96 w-full"
            style={{ padding: 2 }}
            onClick={() => {
                if (pathname?.includes("detail")) return
                navigate(`/detail/${item?.poap_id}`)
            }} />
        <div className="p-4">
            <div className="text-sm">
                {item.poap_name}
            </div>
            <div className="text-xs flex items-center mt-2" style={{ color: secondColor }}>
                <Holder amount={item.poap_number} style={{ justifyContent: "start" }} />
                <Star amount={item.favour_number} />
                <div style={{ flex: 4, textAlign: "right" }} >
                    限量发行
                    <span style={{ color: textColor }}>{item.poap_number || 0}</span>
                    张
                </div>
            </div>
            <div className="flex justify-between items-center">
                <ClaimButton poap_id={item.poap_id} getDetails={getDetails} />
                <div className="w-6"></div>
                <button className="mt-6 p-0 select-none w-full sm:px-6 font-bold text-sm rounded-full text-white border-0" style={{
                    padding: 2,
                    background: "linear-gradient(90deg, #F6BF75, #D77185, #8766AC, #4150B1)",
                }} onClick={() => {
                    // 此处调用点赞接口函数
                    if (!item?.favoured) {

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