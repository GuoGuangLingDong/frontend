import { useCallback } from "react";
import { Button } from "../../../components/Button";
import { useSwitch } from "../../../components/Loading";
import { useMessage } from "../../../components/Message";
import { useRequest } from "../../../hooks/useRequest";
import api from "../../../api/index";

export const ClaimButton = ({ poap_id, text, getDetails }: { poap_id: string, text?: string, getDetails: (arg: any) => void }) => {
    const [loading, openLoading, closeLoading] = useSwitch();
    const { message } = useMessage();
    const [, claimFun] = useRequest(api.claim);

    const claim = useCallback(async (poap_id: string) => {
        openLoading();
        claimFun({ poap_id }).then(() => {
            closeLoading();
            message("领取成功！", "success");
            getDetails({ poap_id });
        }).catch(()=>{
            closeLoading();
        })
    }, [message, openLoading, closeLoading, claimFun, getDetails])

    return (
        <Button className="mt-6" loading={loading} disabled={loading} onClick={() => {
            // 此处调用立即领取接口函数
            claim(poap_id)
        }}>
            {text || "立即领取"}
        </Button>
    )
}