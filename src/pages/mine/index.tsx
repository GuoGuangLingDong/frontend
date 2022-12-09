import { BodyBox } from "../../components/BodyBox";
import { bgColor, secondColor } from "../../theme";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LoadImage } from "../../components/Image";
import { CardBackground, IconTextRightCard } from "../../components/Card";
import { PersonBackground } from "../auth/components/PersonBackground";
import back from "../../assets/image/back.svg";
import { IPoap } from "../poap";
import { Holder, Star } from "../poap/components/ListItem";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { IUserInfo, useAuth } from "../../components/UserAuth";
import { Header } from "../../components/Header";
import { useAutoRequest, useRequest } from "../../hooks/useRequest";
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
  const [ userInfo, setData ] = useState<IUserInfo>();

  const getUserInfo = useCallback(async (page: number) => {
    await getUserInfoFun({
      did: params.did,
      from: page,
      count: 4
    });
  }, [getUserInfoFun, params.did])

  useEffect(() => {
    if (!params.did) return
    getUserInfo(0);
  }, [getUserInfo, params.did])

  console.log(userInfo)
  useEffect(()=>{
    if(!userInfoData) return
    setData(userInfoData)
  }, [userInfoData])

  return (<>
    <Header css={{ boxShadow: "none", background: "transparent" }} />
    <MineBaseInfo userInfo={userInfo as any} />
    <BodyBox>
      {
        userInfo?.links?.map((item: TSocialItemParams, index: number) => {
          return (<SocialItem text={item.linkTitle || ""} logo={socialIcon[(item.linkType || 1) - 1]} url={item.link || ""} />)
        })
      }
      <div>
        <div className="flex mt-6 flex-wrap">
          {/* <LoadPage getList={getUserInfo} setData={setData}>
            {userInfo?.poap_list?.map((item: IPoap, i: number) => {
              return (<CardBackground className="p-0 m-0" key={i}>
                <LoadImage
                  src={item?.minerIcon}
                  className="rounded-t-3xl cursor-pointer h-96 w-full"
                  style={{ padding: 2 }}
                  onClick={() => {
                    navigate(`/detail/${item?.poapId}`)
                  }} />
                <div className="p-4" onClick={() => {
                  navigate(`/detail/${item?.poapId}`)
                }}>
                  <div className="text-sm">
                    {item.poapName}
                  </div>
                  <div className="text-sm flex items-center justify-between mt-2" style={{ color: secondColor }}>
                    <div className="flex items-center">
                      <Holder amount={item.poapSum} className="mr-4" />
                      <Star amount={item.like_num} />
                    </div>
                    <Button
                      className="w-16 py-1 text-xs transform scale-75 origin-right"
                      onClick={() => {
                        // 此处调用限时领取接口函数
                        // navigate(`/detail/${item?.poapId}`)
                      }}>
                      限时领取
                    </Button>
                  </div>
                </div>
              </CardBackground>)
            })}
          </LoadPage> */}
        </div>
      </div>
    </BodyBox>
  </>
  );
}