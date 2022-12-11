import { BodyBox } from "../../components/BodyBox";
import { secondColor } from "../../theme";
import { useCallback, useState } from "react";
import { Header } from "../../components/Header";
import { CardBackground, IconTextRightCard } from "../../components/Card";
import api from "../../api/index";
import { Tabs } from "../../components/Tab";
import { IDIVProps } from "../poap/components/ListItem";
import { Button } from "../../components/Button";
import follow from "../../assets/image/follow.svg";
import nft from "../../assets/image/nft.svg";
import { useRequest } from "../../hooks/useRequest";
import { LoadPage } from "../../components/LoadPage";
import { NoData } from "../poap/Details";

interface IFollowItem {
  username: string
  uid: string
  did: string
  follow_count: number
  poap_count: number
  avatar: string
}

export const FollowLink = ({ item, ...props }: { item: IFollowItem } & IDIVProps) => {
  return (
    <div {...props} className={`flex item-center justify-center cursor-pointer flex-1 ${props.className || ""}`}>
      <img src={follow} className="w-4" alt="follow" />
      &nbsp;
      <div>{item.follow_count || 0}</div>
    </div>
  )
}

export const NFTAmountLink = ({ item, ...props }: { item: IFollowItem } & IDIVProps) => {
  return (
    <div {...props} className={`flex item-center justify-center cursor-pointer flex-1 ${props.className || ""}`}>
      <img src={nft} className="w-4" alt="nft" />
      &nbsp;
      <div>{item.poap_count || 0}</div>
    </div>
  )
}

export const useFollow = (getData?: () => void, rely: any[] = []) => {
  const [, followFun] = useRequest(api.follow);
  const [, unFollowFun] = useRequest(api.cancelFollow);
  const follow = useCallback(async (uid: string) => {
    // 连接接口调用函数
    await followFun({ uid });
    await getData?.();
    // eslint-disable-next-line
  }, [followFun, getData, ...rely])

  const unFollow = useCallback(async (uid: string) => {
    // 取消连接接口调用函数
    await unFollowFun({ uid });
    await getData?.();
    // eslint-disable-next-line
  }, [unFollowFun, getData, ...rely])

  return {
    follow,
    unFollow
  }
}

const FollowItem = ({ item, handle, isFollow }: { item: IFollowItem, handle: () => void, isFollow?: boolean }) => {

  return (<div className="border rounded-3xl mb-2">
    <IconTextRightCard className="p-2 mb-0" style={{ backgroundColor: "transparent" }} icon={item.avatar} uid={item?.uid}>
      <div className="ml-2">
        <div className="font-bold">{item.username}</div>
        <div className="text-xs">{item.did}</div>
      </div>
    </IconTextRightCard>
    <div className="text-sm flex items-center justify-between border-t pl-12 pr-2 h-12" style={{ color: secondColor }}>
      <div className="flex items-center">
        <FollowLink item={item} className="mr-4" />
        <NFTAmountLink item={item} />
      </div>
      <Button
        className="w-20 py-2 text-xs transform scale-75 origin-right"
        style={{ background: "#99A7B5" }}
        onClick={() => {
          handle()
        }}>
        {isFollow ? "取消连接" : "建立连接"}
      </Button>
    </div>
  </div>)
}

export const Follow = () => {
  const [dataFoolowers, setFollowersData] = useState<IFollowItem[]>([]);
  const [dataFoolowees, setFooloweesData] = useState<IFollowItem[]>([]);

  const [, getFollowersFun] = useRequest(api.getFollowers);
  const [, getFolloweesFun] = useRequest(api.getFollowees);

  const getFollowers = useCallback(async (pageNo: number) => {
    const data = await getFollowersFun({
      from: pageNo,
      count: 10
    });
    return data
  }, [getFollowersFun]);

  const getFollowees = useCallback(async (pageNo: number) => {
    const data = await getFolloweesFun({
      from: pageNo,
      count: 10
    });
    return data
  }, [getFolloweesFun])

  const { unFollow } = useFollow(() => {
    getFollowers(0);
  }, [setFollowersData]);

  const { follow } = useFollow(() => {
    getFollowees(0);
  }, [getFollowers]);

  return (<>
    <Header title={"我的链接"}></Header>
    <BodyBox css={{
      paddingTop: 100,
    }}>
      <Tabs tabs={[
        {
          text: "我的连接",
          children: (<CardBackground className="mt-0" style={{ marginTop: 0 }}>
            <LoadPage setData={setFollowersData} getList={getFollowers} id="follower" path={"list"} dataLength={dataFoolowers?.length}>
              {dataFoolowers?.length
                ? dataFoolowers?.map((item: IFollowItem, i: number) => {
                  return (<FollowItem key={`${i}-follower`} item={item} isFollow handle={() => {
                    unFollow(item.uid);
                  }} />)
                })
                : <NoData />
              }
            </LoadPage>
          </CardBackground>)
        },
        {
          text: "与我连接",
          children: (<CardBackground className="mt-0" style={{ marginTop: 0 }}>
            <LoadPage setData={setFooloweesData} getList={getFollowees} id="followee" path={"list"} dataLength={dataFoolowees?.length}>
              {
                dataFoolowees?.map((item: IFollowItem, i: number) => {
                  return (<FollowItem key={`${i}-followee`} item={item} handle={() => {
                    follow(item.did);
                  }} />)
                })
              }
            </LoadPage>
          </CardBackground>)
        }
      ]} />
    </BodyBox>
  </>
  );
}