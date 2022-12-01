import { BodyBox } from "../../components/BodyBox";
import { secondColor, textColor } from "../../theme";
import { useState } from "react";
import { IconImage, LoadImage } from "../../components/Image";
import { Header } from "../../components/Header";
import { CardBackground, IconTextRightCard } from "../../components/Card";
import { BackgroundLabel, TextLabel } from "../../components/Label";

export const DIDScore = () => {
  const [data, setData] = useState<any[]>([
    {
      text: "铸造POAP",
      amount: -123,
      time: "11.21 17:38"
    },
    {
      text: "兑换DID",
      amount: -123,
      time: "11.21 17:38"
    },
    {
      text: "点赞",
      amount: -123,
      time: "11.21 17:38"
    },
    {
      text: "建立链接",
      amount: -123,
      time: "11.21 17:38"
    },
    {
      text: "领取POAP",
      amount: -123,
      time: "11.21 17:38"
    },
    {
      text: "新用户赠送",
      amount: -123,
      time: "11.21 17:38"
    }
  ]);

  return (<>
    <Header title={<span className="text-white">DID积分</span>} css={{ background: "transparent", boxShadow: "none" }} right={<div className="text-xs text-white">规则</div>} ></Header>
    {data?.length > 0 ?
      <BodyBox css={{
        background: "linear-gradient(360deg, transparent 60%, #EEEFF4, #F6BF75, #D77185, #8766AC, #4150B1)",
        paddingTop: 100,
      }}>
        <CardBackground className="m-0 p-4">
          <div className="text-center -mt-8 mb-10">
            <IconImage className="m-auto h-16 w-16" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images" />
            <div>我的积分</div>
            <div>1232131</div>
          </div>
          {data?.map((item, i) => {
            return (<TextLabel className="h-12" text={item.text} right={<div>{item.time}</div>}>
              <span>{item.amount}</span>
            </TextLabel>)
          })}
        </CardBackground>
        <CardBackground className="m-0 p-4 py-6 mt-6 text-xs" style={{ color: secondColor }}>
          积分规则：
          <br />
          <br />
          1.积分可用于铸造POAP、点赞、兑换DID靓号域名等平台权益；
          <br />
          <br />
          2.每次铸造POAP消耗积分根据铸造数量计算，最低200积分；
          <br />
          <br />
          3.每次点赞消耗5积分，每天赠送20积分有效期24小时；
          <br />
          <br />
          4.新用户第一次建立链接双方各获得200积分有效期90天；
          <br />
          <br />
          5.新用户第一次领取POAP获得200积分有效期90天；
          <br />
          <br />
          6.创世活动期间新用户注册即可获得6位数DID域名及800积分；
        </CardBackground>
      </BodyBox> : <div className="w-full h-32 flex justify-center items-center font-bold" style={{ color: secondColor, height: "calc(100vh - 40px)" }}>No Data</div>}
  </>
  );
}