import { useLocation, useNavigate } from "react-router-dom";
import { secondColor, textColor } from "../../../theme";
import { CardBackground } from "../../../components/Card";
import { LoadImage } from "../../../components/Image";
import { Holder, Star } from "../components/ListItem";
import starDeep from "../../../assets/image/starDeep.svg";
import stared from "../../../assets/image/select-on.svg";
import { ClaimButton } from "../components/ClaimButton";

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

export const DetailItem = ({ item, getDetails }: { item: IPoapDetailsItem, getDetails: (id: string) => void }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (<CardBackground className="p-0 m-0">
        <LoadImage
            src={item?.cover_img}
            className="rounded-t-3xl cursor-pointer h-96 w-full"
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