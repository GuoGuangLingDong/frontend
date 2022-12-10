import { BodyBox } from "../../components/BodyBox";
import { bgColor, secondColor } from "../../theme";
import { useCallback, useEffect, useState } from "react";
import { LoadImage } from "../../components/Image";
import { CardBackground, IconTextRightCard } from "../../components/Card";
import back from "../../assets/image/back.svg";
import { Holder, Star } from "../poap/components/ListItem";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { useRequest } from "../../hooks/useRequest";
import api from "../../api";
import { MineBaseInfo } from "./components/ProfileInfo";
import { socialIcon, TSocialItemParams } from "./components/SocialItem";
import { LoadPage } from "../../components/LoadPage";

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
  const navigate = useNavigate();
  const params: any = useParams();
  const [userInfoData, getUserInfoFun] = useRequest(api.getUserInfo);
  const [userInfo, setData] = useState<any[]>([]);

  const getUserInfo = useCallback(async (page: number) => {
    const data = await getUserInfoFun({
      did: params.did,
      from: page,
      count: 6
    });
    return data
  }, [getUserInfoFun, params.did])

  useEffect(() => {
    if (!params.did) return
    getUserInfoFun({
      did: params.did,
      from: 0,
      count: 1
    })
    //eslint-disable-next-line
  }, [getUserInfo, params.did])

  return (<>
    <Header css={{ boxShadow: "none", background: "transparent" }} />
    <MineBaseInfo userInfo={userInfoData as any} />
    <BodyBox>
      {
        userInfoData?.links?.map((item: TSocialItemParams, index: number) => {
          return (<SocialItem key={index} text={item.linkTitle || ""} logo={socialIcon[(item.linkType || 1) - 1]} url={item.link || ""} />)
        })
      }
      <div>
        <div className="flex mt-6 flex-wrap w-full">
          <LoadPage getList={getUserInfo} setData={setData} dataLength={userInfo?.length} path="poap_list">
            {userInfo?.map((item: any, i: number) => {
              return (<CardBackground className="p-0 m-0" key={i}>
                <LoadImage
                  src={item?.minerIcon}
                  className="rounded-t-3xl cursor-pointer h-96 w-full"
                  style={{ padding: 2 }}
                  onClick={() => {
                    navigate(`/detail/${item?.poap_id}`)
                  }} />
                <div className="p-4" onClick={() => {
                  navigate(`/detail/${item?.poap_id}`)
                }}>
                  <div className="text-sm">
                    {item.poapName}
                  </div>
                  <div className="text-sm flex items-center justify-between mt-2" style={{ color: secondColor }}>
                    <div className="flex items-center">
                      <Holder amount={item.holder_num} className="mr-4" />
                      <Star amount={item.favour_number} />
                    </div>
                    {item?.collectable && <Button
                      className="w-16 py-1 text-xs transform scale-75 origin-right"
                      onClick={() => {
                        // 此处调用限时领取接口函数
                        navigate(`/detail/${item?.poap_id}`)
                      }}>
                      限时领取
                    </Button>}
                  </div>
                </div>
              </CardBackground>)
            })}
          </LoadPage>
        </div>
      </div>
    </BodyBox>
  </>
  );
}