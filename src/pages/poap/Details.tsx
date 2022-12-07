import { useParams } from "react-router-dom";
import { BodyBox } from "../../components/BodyBox";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { CardBackground, IconTextRightCard } from "../../components/Card";
import { Button } from "../../components/Button";
import { Tabs } from "../../components/Tab";
import { useAutoRequest } from "../../hooks/useRequest";
import api from "../../api/index";
import { useFollow } from "../mine/Follow";
import { PoapBaseInfo } from "./components/PoapBaseInfo";
import { DetailItem, IHolderItem, IPoapDetailsItem } from "./components/DetailsItem";

export const PoapDetail = () => {
  const param: any = useParams();
  const [detail, getDetails] = useAutoRequest(api.getDetails, { arg: { poap_id: param?.id } });
  const [holders, getHolders] = useAutoRequest(api.getHolders, { arg: { poap_id: param?.id, from: 1, count: 10 } });

  const [data, setData] = useState<IPoapDetailsItem>({
    "poap_id": '1321321321321',
    "miner": '0x321312321',
    "poap_name": "国际青年徽章",
    "poap_number": 123,
    "receive_cond": "receive_condition",
    "cover_img": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images",
    "poap_intro": "poap_intro",
    "favour_number": 456,
    "holder_num": 123,
    "miner_name": "miner_name",
    "avatar": "https://0.soompi.io/wp-content/uploads/2018/04/20170556/IU-140x140.jpg",
    "collectable": 1,
    "favoured": true,
    "chain": {
      plat_name: "plat_name",
      publish_time: "publish_time",
      contract_no: "contract_no",
      contract_addr: "contract_addr",
    }
  });
  useEffect(() => {
    if (!detail) return
    setData(detail)
  }, [detail]);

  const { unFollow: unFollowMinter, follow: followMinter } = useFollow(() => {
    getDetails({ poap_id: (param as any)?.id });
  }, [param]);

  const { unFollow: unFollowHolder, follow: followHolder } = useFollow(() => {
    getHolders({ poap_id: (param as any)?.id });
  }, [param]);

  return (
    <>
      <Header title={"POAP详情"} />
      <BodyBox css={{ marginBottom: 50, paddingTop: 80 }}>
        <DetailItem item={data} getDetails={getDetails} />
        <div className="h-10"></div>
        <Tabs tabs={[
          {
            text: "基本信息",
            children: (<CardBackground className="m-0 py-4 px-0 mt-0">
              {/* <IconTextRightCard className="m-4 p-2" icon={details.cover_pic} right={<Button deep
                className="py-2 w-32 text-xs transform scale-75 origin-right"
                onClick={() => {

                }}
              >与所有者 建立连接</Button>}>
                <div className="ml-2">
                  <div className="font-bold">国际青年营</div>
                  <div className="text-xs">yong.did</div>
                </div>
              </IconTextRightCard> */}
              <IconTextRightCard className="m-4 p-2 mb-6" icon={data.cover_img} right={<Button deep
                className="py-2 w-32 text-xs transform scale-75 origin-right"
                onClick={() => {
                  //根据返回值判断是否关注，但是现在没有返回值，所以随便写了data?.miner
                  data?.miner ? followMinter(data?.miner) : unFollowMinter(data?.miner);
                }}
              >与发行方 建立连接</Button>}>
                <div className="ml-2">
                  <div className="font-bold">{data?.miner_name}</div>
                  <div className="text-xs">{data?.miner}</div>
                </div>
              </IconTextRightCard>
              <PoapBaseInfo chain={data?.chain} />
            </CardBackground>)
          },
          {
            text: "持有者名单",
            children: (<CardBackground className="m-0 py-4 px-0 mt-0">
              {
                (holders as unknown as IHolderItem[])?.map((item, index) => {
                  return (
                    <IconTextRightCard key={index} className="m-4 p-2" icon={item.avatar} right={<Button deep
                      className="py-2 w-24 text-xs transform scale-75 origin-right"
                      onClick={() => {
                        //根据返回值判断是否关注，但是现在没有返回值，所以随便写了item.uid
                        item.uid ? followHolder(item.uid) : unFollowHolder(item.uid);
                      }}
                    >建立连接</Button>}>
                      <div className="ml-2">
                        <div className="font-bold">{item.username}</div>
                        <div className="text-xs">{item.did}</div>
                      </div>
                    </IconTextRightCard>)
                })
              }
            </CardBackground>)
          }
        ]} />
      </BodyBox>
    </>
  );
};