import { useCallback, useEffect } from "react";
import { Button } from "../../components/Button";
import { PersonBackground } from "../auth/components/PersonBackground";
import { useNavigate, useParams } from "react-router-dom";
import { BodyBox } from "../../components/BodyBox";
import { secondColor, textColor } from "../../theme";
import { useState } from "react";
import { isMobile } from "../../helpers/utilities";
import { LoadImage } from "../../components/Image";
import { Header } from "../../components/Header";
import { DetailItem, Share, Star } from "./components/Item";
import { CardBackground, IconTextRightCard } from "../../components/Card";
import { PoapInfoLabels } from "./Details";
import { BackgroundLabel } from "../../components/Label";
import share from "../../assets/image/share.svg";
import { IPoap } from ".";

export const useClaim = () => {
    return useCallback((item: IPoap) => {
        console.log(item)
    }, [])
}

export const ClaimButton = ({ item, text }: { item: IPoap, text?: string }) => {
    const claim = useClaim();

    return (
        <Button className="mt-6" onClick={() => {
            // 此处调用立即领取接口函数
            claim(item)
        }}>
            {text || "立即领取"}
        </Button>
    )
}

export const ClaimPOAP = () => {
    const navigate = useNavigate();
    const param = useParams();
    const [details, setDetails] = useState<IPoap>({
        "poap_id": '1321321321321',
        "miner": '0x321312321',
        "poap_name": "国际青年徽章",
        "poap_number": 123,
        "receive_condition": "receive_condition",
        "cover_pic": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images",
        "poap_intro": "poap_intro",
        "favour_number": 456
    },);
    const mobile = isMobile();

    useEffect(() => {
        const id = (param as any)?.id;
        if (!id) return
    }, [param])

    return (
        <>
            <Header title={"领取POAP"} />
            <BodyBox css={{ marginBottom: 50, paddingTop: 80 }}>
                <DetailItem item={details} />
                <CardBackground className="m-0 py-4 px-0">
                    <IconTextRightCard className="m-4 p-2" icon={details.cover_pic} right={<BackgroundLabel
                        className="py-2 px-3 text-xs mb-0"
                        backgroundColor="white"
                        onClick={() => {

                        }}
                    >连接: 12345人</BackgroundLabel>}>
                        <div className="ml-2">
                            <div className="font-bold">国际青年营</div>
                            <div className="text-xs">yong.did</div>
                        </div>
                    </IconTextRightCard>
                    <div className="flex justify-between items-center px-4">
                        <Button className="flex-1 bg-white h-10 rounded-full mr-2" deep>
                            <div className="flex items-center justify-center">
                                <img src={share} alt="" className="w-4" />
                                &nbsp;
                                建立连接
                            </div>
                        </Button>
                        <button className="flex-1 h-10 border rounded-full ml-2">
                            <div className="flex items-center justify-center">
                                <img src={share} alt="" className="w-4" />
                                &nbsp;
                                持有人名单
                            </div>
                        </button>
                    </div>
                    <PoapInfoLabels />
                </CardBackground>
            </BodyBox>
        </>
    );
};