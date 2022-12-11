import { BodyBox } from "../../components/BodyBox";
import { bgColor } from "../../theme";
import { useEffect } from "react";
import { IconTextRightCard } from "../../components/Card";
import back from "../../assets/image/back.svg";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { useRequest } from "../../hooks/useRequest";
import api from "../../api";
import { MineBaseInfo } from "./components/ProfileInfo";
import { socialIcon, TSocialItemParams } from "./components/SocialItem";
import { MinePOAPList } from "./components/POAPList";

const SocialItem = ({ logo, text, url }: { logo: string, text: string, url: string }) => {
  return (
    <IconTextRightCard className="mb-4 p-2 h-16" style={{ background: "white" }} icon={logo} right={<div
      className="h-8 w-8 rounded-full flex justify-center items-center"
      onClick={() => {
        window.open(url, "_target")
      }}
      style={{ background: bgColor }}>
      <img src={back} className="w-4 h-4 transform rotate-180" alt="" />
    </div>}>
      <div className="ml-2">
        <div className="font-bold">{text}</div>
      </div>
    </IconTextRightCard>
  )
}

export const Mine = () => {
  const params: any = useParams();
  const [userInfoData, getUserInfoFun] = useRequest(api.getUserInfo);

  useEffect(() => {
    if (!params.uid) return
    getUserInfoFun({
      uid: params.uid,
      from: 0,
      count: 1
    })
    //eslint-disable-next-line
  }, [params.uid])

  return (<>
    <Header css={{ boxShadow: "none", background: "transparent" }} />
    <MineBaseInfo userInfo={userInfoData as any} />
    <BodyBox>
      {
        userInfoData?.links?.map((item: TSocialItemParams, index: number) => {
          return (<SocialItem key={index} text={item.linkTitle || ""} logo={socialIcon[(item.linkType || 1) - 1]} url={item.link || ""} />)
        })
      }
      <MinePOAPList />
    </BodyBox>
  </>
  );
}