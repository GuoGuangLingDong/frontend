import { useParams } from "react-router-dom";
import { Button } from "../../../components/Button";
import { CardBackground, IconTextRightCard } from "../../../components/Card";
import { useCallback, useState } from "react";
import { ellipseAddress } from "./PoapBaseInfo";
import { useRequest } from "../../../hooks/useRequest";
import api from "../../../api/index";
import { useFollow } from "../../mine/Follow";
import { LoadPage } from "../../../components/LoadPage";
import { NoData } from "../Details";

export const Holders = () => {
  const param: any = useParams();
  const [, getHolders] = useRequest(api.getHolders);
  const [holdersData, setData] = useState<any[]>([]);

  const { unFollow: unFollowHolder, follow: followHolder } = useFollow(() => {
    getHolders({ poapId: (param as any)?.id });
  }, [param]);

  const getList = useCallback(async (pageNo: number) => {
    const data = await getHolders({
      from: pageNo,
      count: 10,
      poapId: param?.id
    });
    return data
  }, [param?.id, getHolders]);

  return (<CardBackground className="m-0 py-4 px-0 mt-0">
    <LoadPage setData={setData} getList={getList} id="holder-list" path={"list"} dataLength={holdersData?.length}>
      {
        holdersData?.length ? (holdersData as unknown as any[])?.map((item, index) => {
          return (
            <IconTextRightCard key={index} className="m-4 p-2" icon={item?.avatar} uid={item?.uid} right={<Button deep
              className="py-2 w-24 text-xs transform scale-75 origin-right"
              onClick={() => {
                //根据返回值判断是否关注，但是现在没有返回值，所以随便写了item.uid
                item?.follow ? unFollowHolder(item?.uid) : followHolder(item?.uid);
              }}
            >建立连接</Button>}>
              <div className="ml-2">
                <div className="font-bold">{ellipseAddress(item?.username)}</div>
                <div className="text-xs">{ellipseAddress(item?.uid)}</div>
              </div>
            </IconTextRightCard>)
        }) : <NoData />
      }
    </LoadPage>
  </CardBackground>)
};