import { useParams } from "react-router-dom";
import { BodyBox } from "../../components/BodyBox";
import { secondColor } from "../../theme";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { DetailItem } from "./components/Item";
import { IPoap } from ".";
import { CardBackground, IconTextRightCard } from "../../components/Card";
import { Button } from "../../components/Button";

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

export const PoapBaseInfo = () => {
  return (
    <>
      <Label text="发行平台" value="优版权" />
      <Label text="发行时间" value="优版权" />
      <Label text="合约编号" value="优版权" />
      <Label text="合约地址" value="优版权" />
      <div className="w-full border-t" style={{ borderColor: "#EEEFF4" }}></div>
      <Label text="师门" value="优版权" />
      <Label text="师傅" value="优版权" />
      <Label text="有效期" value="优版权" />
    </>
  )
}

export const PoapDetail = () => {
  const param = useParams();
  const [details] = useState<IPoap>({
    "poap_id": '1321321321321',
    "miner": '0x321312321',
    "poap_name": "国际青年徽章",
    "poap_number": 123,
    "receive_condition": "receive_condition",
    "cover_pic": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images",
    "poap_intro": "poap_intro",
    "favour_number": 456
  },);

  useEffect(() => {
    const id = (param as any)?.id;
    if (!id) return
  }, [param])

  return (
    <>
      <Header title={"POAP详情"} />
      <BodyBox css={{ marginBottom: 50, paddingTop: 80 }}>
        <DetailItem item={details} />
        <CardBackground className="m-0 py-4 px-0">
          <IconTextRightCard className="m-4 p-2" icon={details.cover_pic} right={<Button deep
            className="py-2 w-32 text-xs transform scale-75 origin-right"
            onClick={() => {

            }}
          >与所有者 建立连接</Button>}>
            <div className="ml-2">
              <div className="font-bold">国际青年营</div>
              <div className="text-xs">yong.did</div>
            </div>
          </IconTextRightCard>
          <IconTextRightCard className="m-4 p-2 mb-6" icon={details.cover_pic} right={<Button deep
            className="py-2 w-32 text-xs transform scale-75 origin-right"
            onClick={() => {

            }}
          >与发行方 建立连接</Button>}>
            <div className="ml-2">
              <div className="font-bold">国际青年营</div>
              <div className="text-xs">yong.did</div>
            </div>
          </IconTextRightCard>
          <PoapBaseInfo />
        </CardBackground>
      </BodyBox>
    </>
  );
};