import { BodyBox } from "../../components/BodyBox";
import { secondColor, textColor } from "../../theme";
import { useEffect, useMemo } from "react";
import { IconImage } from "../../components/Image";
import { Header } from "../../components/Header";
import { CardBackground } from "../../components/Card";
import { TextLabel } from "../../components/Label";
import huizhang from "../../assets/image/huizhang.png";
import api from "../../api/index";
import { useRequest } from "../../hooks/useRequest";

interface IDIDScoreItem {
  "opt": string,
  "score": string | number,
  "opt_time": string | number,
}
interface IDIDScore {
  "score": string | number,
  "oprations": IDIDScoreItem[]
}

export const DIDScore = () => {
  const [value, getScoreFun] = useRequest(api.getScore);

  useEffect(() => {
    getScoreFun({
      from: 0,
      count: 20
    })

    // eslint-disable-next-line
  }, []);

  const data = useMemo(() => value as unknown as IDIDScore, [value])

  return (<>

    <BodyBox css={{
      background: "linear-gradient(360deg, transparent 60%, #EEEFF4, #F6BF75, #D77185, #8766AC, #4150B1)",
      paddingTop: 100,
      position: "relative"
    }}>
      <Header title={<span className="text-white">DID积分</span>} css={{ background: "transparent", boxShadow: "none", position: "absolute", zIndex: 50, top: 10, left: 0 }}></Header>
      <CardBackground className="m-0 p-4">
        <div className="text-center -mt-12 mb-10">
          <div className="m-auto w-24 h-24 rounded-full flex justify-center items-center mb-4" style={{ background: "#EEEFF4", border: "3px solid white" }}>
            <IconImage className="h-12 w-12 rounded-none" src={huizhang} />
          </div>
          <div style={{ color: textColor }}>我的积分</div>
          <div className="font-bold text-2xl">{data?.score}</div>
        </div>
        {data?.oprations?.map((item: IDIDScoreItem, i: number) => {
          return (<TextLabel className="h-12" text={item.opt} right={<div>{item.opt_time}</div>}>
            <span>{item.score}</span>
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
    </BodyBox>
  </>
  );
}