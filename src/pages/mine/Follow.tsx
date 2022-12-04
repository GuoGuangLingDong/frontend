import { BodyBox } from "../../components/BodyBox";
import { secondColor } from "../../theme";
import { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { CardBackground, IconTextRightCard } from "../../components/Card";
import api from "../../api/index";
import { Tabs } from "../../components/Tab";
import { IDIVProps } from "../poap/components/Item";
import { Button } from "../../components/Button";
import { useMessage } from "../../components/Message";

interface IFollowItem {
  username: string
  uid: string
  follow_count: number
  poap_count: number
}

interface IFollow {
  "followee": IFollowItem[]
  "follower": IFollowItem[]
}

export const FollowLink = ({ item, ...props }: { item: IFollowItem } & IDIVProps) => {
  return (
    <div {...props} className={`flex item-center justify-center cursor-pointer flex-1 ${props.className || ""}`}>
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9550" width="16" height="16">
        <path d="M171.712 571.648l0.352 0.32 287.904 252.8a64 64 0 0 0 82.912 1.344l296.832-244.544a215.584 215.584 0 1 0-301.824-300.576L512 316.672l-25.888-35.616a215.584 215.584 0 1 0-314.4 290.624zM32 407.584a279.584 279.584 0 0 1 480-194.944 279.584 279.584 0 0 1 480 194.944 278.144 278.144 0 0 1-113.024 224.512l-295.36 243.392a128 128 0 0 1-165.888-2.592L129.984 620.16A278.976 278.976 0 0 1 32 407.584z" fill="#858891">
        </path>
      </svg>&nbsp;
      <div>{item.follow_count || 0}</div>
    </div>
  )
}

const FollowItem = ({ item }: { item: IFollowItem }) => {
  const { message } = useMessage();

  const cancel = useCallback(async (uid: string) => {
    // 取消连接接口调用函数
    await api.cancelFollow(uid);
    message("取消成功！", "success");
  }, [message])

  return (<div className="border rounded-3xl mb-2">
    <IconTextRightCard className="p-2 mb-0" style={{ backgroundColor: "transparent" }} icon={item.username} right={<div
      className="py-2 text-xs"
    >连接: {item.follow_count}人</div>}>
      <div className="ml-2">
        <div className="font-bold">{item.username}</div>
        <div className="text-xs">{item.uid}</div>
      </div>
    </IconTextRightCard>
    <div className="text-sm flex items-center justify-between border-t pl-12 pr-2 h-12" style={{ color: secondColor }}>
      <div className="flex items-center">
        <FollowLink item={item} className="mr-4" />
        <FollowLink item={item} />
      </div>
      <Button
        className="w-20 py-2 text-xs transform scale-75 origin-right"
        style={{ background: "#99A7B5" }}
        onClick={() => {
          cancel(item?.uid);
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