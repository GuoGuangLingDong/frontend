import { useNavigate, useParams } from "react-router-dom";
import { BodyBox } from "../../components/BodyBox";
import { secondColor, textColor } from "../../theme";
import { useCallback, useState } from "react";
import { Header } from "../../components/Header";
import { CardBackground, IconTextRightCard } from "../../components/Card";
import { Button } from "../../components/Button";
import { LoadImage } from "../../components/Image";
import { Holder, Star } from "./components/Item";
import starDeep from "../../assets/image/starDeep.svg";
import stared from "../../assets/image/select-on.svg";
import { Tabs } from "../../components/Tab";
import { useRequest } from "../../hooks/useRequest";
import api from "../../api/index";
import { useFollow } from "../mine/Follow";
import { useSwitch } from "../../components/Loading";
import { useMessage } from "../../components/Message";

export const ClaimButton = ({ item, text }: { item: IPoapDetailsItem, text?: string }) => {
  const [loading, openLoading, closeLoading] = useSwitch();
  const { message } = useMessage();
  const claim = useCallback(async (item: IPoapDetailsItem) => {
    openLoading();
    await api.claim({ poap_id: item.poap_id });
    closeLoading();
    message("领取成功！", "success")
  }, [message, openLoading, closeLoading])

  return (
    <Button className="mt-6" loading={loading} disabled={loading} onClick={() => {
      // 此处调用立即领取接口函数
      claim(item)
    }}>
      {text || "立即领取"}
    </Button>
  )
}

export const DetailItem = ({ item }: { item: IPoapDetailsItem }) => {
  const navigate = useNavigate();
  const isStar = false;

  return (<CardBackground className="p-0 m-0">
    <LoadImage
      src={item?.cover_img}
      className="rounded-t-3xl cursor-pointer h-96 w-full"
      style={{ padding: 2 }}
      onClick={() => {
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
        <ClaimButton item={item} />
        <div className="w-6"></div>
        <button className="mt-6 p-0 select-none w-full sm:px-6 font-bold text-sm rounded-full text-white border-0" style={{
          padding: 2,
          background: "linear-gradient(90deg, #F6BF75, #D77185, #8766AC, #4150B1)",
        }} onClick={() => {
          // 此处调用点赞接口函数
          if (!isStar) {

          }
        }}>
          <div className="bg-white w-full h-10 rounded-full flex justify-center items-center" style={{ color: textColor }}>
            <img src={isStar ? stared : starDeep} className="w-4" alt="share" />&nbsp;{isStar ? "已点赞" : "点赞"}
          </div>
        </button>
      </div>
    </div>
  </CardBackground>
  )
};

export interface IPoapDetailsItem {
  "poap_id": string,
  "miner": string,//发行人did
  "poap_name": string,
  "poap_number": number,
  "receive_cond": string,
  "cover_img": string,
  "poap_intro": string,
  "favour_number": number,
  "holder_num"?: number,//持有人数量
  "miner_name"?: string,//发行人用户名
  "avatar"?: string,//发行人头像url
  "collectable"?: number //# 是否可领取，未持有，未被领完
  "favoured"?: boolean,//是否已点赞
  "chain": {
    plat_name: string,
    publish_time: string,
    contract_no: string,
    contract_addr: string,
  }
}

export const AnimatePulse = ({ loading }: { loading?: boolean }) => {
  return (
    loading ? <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-gray-400 rounded"></div>
        <div className="h-4 bg-gray-400 rounded"></div>
        <div className="h-4 bg-gray-400 rounded"></div>
        <div className="h-4 bg-gray-400 rounded"></div>
      </div>
    </div> : null
  )
}

const Label = ({ text, value }: { text: string, value: string }) => {
  return (
    <div className="flex justify-between items-center m-3 px-2 text-xs">
      <div style={{ color: secondColor }}>{text}</div>
      <div>{value}</div>
    </div>
  )
}

export const PoapBaseInfo = ({ chain }: { chain: any }) => {
  return (
    <>
      <Label text="发行平台" value={chain?.plat_name} />
      <Label text="发行时间" value={chain?.publish_time} />
      <Label text="合约编号" value={chain?.contract_no} />
      <Label text="合约地址" value={chain?.contract_addr} />
      {/* <div className="w-full border-t" style={{ borderColor: "#EEEFF4" }}></div>
      <Label text="师门" value="优版权" />
      <Label text="师傅" value="优版权" />
      <Label text="有效期" value="优版权" /> */}
    </>
  )
}

export const PoapDetail = () => {
  const param = useParams();
  const [details,] = useState<IPoapDetailsItem>({
    "poap_id": '1321321321321',
    "miner": '0x321312321',
    "poap_name": "国际青年徽章",
    "poap_number": 123,
    "receive_cond": "receive_condition",
    "cover_img": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images",
    "poap_intro": "poap_intro",
    "favour_number": 456,
    "chain": {
      plat_name: "string",
      publish_time: "string",
      contract_no: "string",
      contract_addr: "string",
    }
  },);
  const [, getPoapList] = useRequest(api.getPoapList);

  const getData = useCallback(async (pageNo: number) => {
    const id = (param as any)?.id;
    if (!id) return
    await getPoapList({
      from: id,
      count: pageNo
    });
  }, [getPoapList, param]);

  const { unFollow, follow } = useFollow(() => {
    getData(1);
  });

  return (
    <>
      <Header title={"POAP详情"} />
      <BodyBox css={{ marginBottom: 50, paddingTop: 80 }}>
        <DetailItem item={details} />
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
              <IconTextRightCard className="m-4 p-2 mb-6" icon={details.cover_img} right={<Button deep
                className="py-2 w-32 text-xs transform scale-75 origin-right"
                onClick={() => {
                  unFollow(details?.poap_id);
                  follow(details?.poap_id);
                }}
              >与发行方 建立连接</Button>}>
                <div className="ml-2">
                  <div className="font-bold">国际青年营</div>
                  <div className="text-xs">yong.did</div>
                </div>
              </IconTextRightCard>
              <PoapBaseInfo chain={details?.chain} />
            </CardBackground>)
          },
          {
            text: "持有者名单",
            children: (<CardBackground className="m-0 py-4 px-0 mt-0">
              <IconTextRightCard className="m-4 p-2" icon={details.cover_img} right={<Button deep
                className="py-2 w-24 text-xs transform scale-75 origin-right"
                onClick={() => {
                  unFollow(details?.poap_id);
                  follow(details?.poap_id);
                }}
              >建立连接</Button>}>
                <div className="ml-2">
                  <div className="font-bold">国际青年营</div>
                  <div className="text-xs">yong.did</div>
                </div>
              </IconTextRightCard>
            </CardBackground>)
          }
        ]} />

      </BodyBox>
    </>
  );
};