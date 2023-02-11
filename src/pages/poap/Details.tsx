import { useParams } from "react-router-dom";
import { BodyBox } from "../../components/BodyBox";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GoBack, Header } from "../../components/Header";
import { CardBackground, IconTextRightCard } from "../../components/Card";
import { Button } from "../../components/Button";
import { Tabs } from "../../components/Tab";
import api from "../../api/index";
import { useFollow } from "../mine/Follow";
import { ellipseAddress, PoapBaseInfo } from "./components/PoapBaseInfo";
import { DetailItem } from "./components/DetailsItem";
import share from "../../assets/image/share.svg"
import { useSwitch } from "../../components/Loading";
import { secondColor } from "../../theme";
import { useAuth } from "../../components/UserAuth";
import { useRequest } from "../../hooks/useRequest";
import { LoadPage } from "../../components/LoadPage";
import { isMobile } from "../../helpers/utilities";
import { NewSharePOAP } from "./components/SharePOAP";

export const NoData = () => {
  return <div className="h-40 flex justify-center items-center" style={{ color: secondColor }}>
    暂无数据
  </div>
}

export const PoapDetail = () => {
  const param: any = useParams();
  const [isShare, openShare, closeShare] = useSwitch();
  const [detail, getDetails] = useRequest(api.getDetails);
  const detailsData = useMemo(() => detail as unknown as any, [detail]);
  const [, getHolders] = useRequest(api.getHolders);
  const [holdersData, setData] = useState<any[]>([]);
  const mobile = isMobile();
  // const { searchString } = useQueryString();

  const { unFollow: unFollowHolder, follow: followHolder } = useFollow(async () => {
    const data = await getHolders({ poapId: (param as any)?.id, from: 0 });
    setData(data?.list);
  }, [param, setData]);

  const getList = useCallback(async (pageNo: number) => {
    const data = await getHolders({
      from: pageNo,
      count: 10,
      poapId: param?.id
    });
    return data
  }, [param?.id, getHolders]);

  const { userInfo } = useAuth();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [])

  useEffect(() => {
    if (!param?.id) return
    getDetails({ poapId: param?.id });
    //eslint-disable-next-line
  }, [param?.id])

  const { unFollow: unFollowMinter, follow: followMinter } = useFollow(() => {
    getDetails({ poapId: (param as any)?.id });
  }, [param]);

  const isMinerIsUser = useMemo(() => {
    if (userInfo?.uid === detailsData?.minerUid && userInfo?.uid) return true
    else return false
  }, [userInfo, detailsData])

  return (
    <>
      <Header title={"POAP详情"} right={userInfo && mobile && <img src={share} className="w-4 h-4" onClick={() => {
        isShare ? closeShare() : openShare();
      }} alt="" />} />
      <NewSharePOAP isOpen={isShare} close={closeShare} details={detailsData} />
      <BodyBox css={{ marginBottom: 50, paddingTop: 80 }}>
        {!mobile && <GoBack /> }
        <DetailItem item={detailsData} getDetails={getDetails} openShare={openShare}/>
        <div className="h-10"></div>
        <Tabs tabs={[
          {
            text: "基本信息",
            children: (<CardBackground className="m-0 py-4 px-0 mt-0">
              {/* {searchString?.minerID && <IconTextRightCard className="m-4 p-2" icon={details.cover_pic} right={<Button deep
                className="py-2 w-32 text-xs transform scale-75 origin-right"
                onClick={() => {

                }}
              >与所有者 建立连接</Button>}>
                <div className="ml-2">
                  <div className="font-bold">国际青年营</div>
                  <div className="text-xs">yong.did</div>
                </div>
              </IconTextRightCard>} */}
              <IconTextRightCard className="m-4 p-2 mb-6" icon={detailsData?.minerIcon} uid={detailsData?.minerUid} right={<Button deep
                className="py-2 w-32 md:w-40 text-xs transform scale-75 origin-right"
                onClick={() => {
                  //根据返回值判断是否关注，但是现在没有返回值，所以随便写了data?.miner
                  !isMinerIsUser && (!detailsData?.follow_miner ? followMinter(detailsData?.minerUid) : unFollowMinter(detailsData?.minerUid));
                }}
              >{!isMinerIsUser ? (!detailsData?.follow_miner ? "与发行方 建立连接" : "取消连接发行方") : "当前用户"}</Button>}>
                <div className="ml-2">
                  <div className="font-bold">{ellipseAddress(detailsData?.minerName)}</div>
                  <div className="text-xs">{ellipseAddress(detailsData?.minerUid)}</div>
                </div>
              </IconTextRightCard>
              <PoapBaseInfo chain={detailsData?.chain} />
            </CardBackground>)
          },
          {
            text: "持有者名单",
            children: (
              <CardBackground className="m-0 py-4 px-0 mt-0">
                <LoadPage setData={setData} getList={getList} id="holder-list" path={"list"} dataLength={holdersData?.length}>
                  {
                    holdersData?.length ? (holdersData as unknown as any[])?.map((item, index) => {
                      let isCurrentUser = false;
                      if (userInfo?.uid === item?.uid && userInfo?.uid) {
                        isCurrentUser = true
                      }
                      return (
                        <IconTextRightCard key={index} className="m-4 p-2" icon={item?.avatar} uid={item?.uid} right={<Button deep={item?.follow === 1 || isCurrentUser}
                          className="py-2 w-24 text-xs transform scale-75 origin-right"
                          onClick={() => {
                            //根据返回值判断是否关注，但是现在没有返回值，所以随便写了item.uid
                            !isCurrentUser && (item?.follow === 1 ? unFollowHolder(item?.uid) : followHolder(item?.uid));
                          }}
                        >{!isCurrentUser ? (item?.follow === 1 ? "取消连接" : "建立连接") : "当前用户"}</Button>}>
                          <div className="ml-2">
                            <div className="font-bold">{ellipseAddress(item?.username)}</div>
                            <div className="text-xs">{ellipseAddress(item?.uid)}</div>
                          </div>
                        </IconTextRightCard>)
                    }) : <NoData />
                  }
                </LoadPage>
              </CardBackground>
            )
          }
        ]} />
      </BodyBox>
    </>
  );
};