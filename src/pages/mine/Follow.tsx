import { BodyBox } from "../../components/BodyBox";
import { secondColor } from "../../theme";
import { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { CardBackground, IconTextRightCard } from "../../components/Card";
import api from "../../api/index";
import { Tabs } from "../../components/Tab";
import { IDIVProps } from "../poap/components/ListItem";
import { Button } from "../../components/Button";
import follow from "../../assets/image/follow.svg";
import nft from "../../assets/image/nft.svg";
import { useRequest } from "../../hooks/useRequest";

interface IFollowItem {
  username: string
  uid: string
  follow_count: number
  poap_count: number
}

interface IFollow {
  followee: IFollowItem[]
  follower: IFollowItem[]
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

const FollowItem = ({ item }: { item: IFollowItem }) => {
  const { unFollow } = useFollow();

  return (<div className="border rounded-3xl mb-2">
    <IconTextRightCard className="p-2 mb-0" style={{ backgroundColor: "transparent" }} icon={item.username}>
      <div className="ml-2">
        <div className="font-bold">{item.username}</div>
        <div className="text-xs">{item.uid}</div>
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
          unFollow(item?.uid);
        }}>
        取消连接
      </Button>
    </div>
  </div>)
}

export const Follow = () => {
  const [data, setData] = useState<IFollow>({
    followee: [
      {
        username: "username1",
        uid: "uid",
        follow_count: 100,
        poap_count: 200,
      },
      {
        username: "username2",
        uid: "uid",
        follow_count: 100,
        poap_count: 200,
      },
      {
        username: "username3",
        uid: "uid",
        follow_count: 100,
        poap_count: 200,
      },
    ],
    follower: [
      {
        username: "username4",
        uid: "uid",
        follow_count: 100,
        poap_count: 200,
      },
      {
        username: "username5",
        uid: "uid",
        follow_count: 100,
        poap_count: 200,
      },
      {
        username: "username6",
        uid: "uid",
        follow_count: 100,
        poap_count: 200,
      },
    ]
  });

  const getList = useCallback(async () => {
    const data = await api.getFollow();
    setData(data);
  }, [])

  useEffect(() => {
    getList();
    // eslint-disable-next-line
  }, [])

  return (<>
    <Header title={"我的链接"}></Header>
    <BodyBox css={{
      paddingTop: 100,
    }}>
      <Tabs tabs={[
        {
          text: "我的连接",
          children: (<CardBackground className="mt-0" style={{ marginTop: 0 }}>
            {
              data?.follower?.map((item: IFollowItem, i: number) => {
                return (<FollowItem key={`${i}-follower`} item={item} />)
              })
            }
          </CardBackground>)
        },
        {
          text: "与我连接",
          children: (<CardBackground className="mt-0" style={{ marginTop: 0 }}>
            {
              data?.followee?.map((item: IFollowItem, i: number) => {
                return (<FollowItem key={`${i}-followee`} item={item} />)
              })
            }
          </CardBackground>)
        }
      ]} />
    </BodyBox>
  </>
  );
}