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
import { BackgroundLabel } from "../../components/Label";
import share from "../../assets/image/share.svg";
import { useAuth } from "../../components/UserAuth";
import QRCode from "qrcode.react";

interface IFollowItem {
    username: string
    uid: string
    follow_count: number
    poap_count: number
}

interface IFollow {
    followee: IFollowItem[],
    follower: IFollowItem[]
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


export const Share = () => {
    const { userInfo } = useAuth();
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

    const link = `did.ren/${userInfo?.uid || "fdsa"}`

    return (<>
        <Header title={"分享"}></Header>
        <BodyBox css={{
            paddingTop: 80,
        }}>
            <BackgroundLabel className={`flex justify-between items-center h-12 px-2`} style={{ background: "white" }}>
                <div className="flex items-center">
                    <img src={share} className="w-4 mr-2" alt="" />
                    <div>{link}</div>
                </div>
                <Button
                    className="w-20 py-2 text-xs transform scale-75 origin-right"
                    style={{ background: "#2E334E" }}
                    onClick={() => {
                        window.navigator.clipboard.writeText(link)
                    }}>
                    复制
                </Button>
            </BackgroundLabel>
            <div className="mb-6 text-xs text-center" style={{ color: "#99A7B5" }}>Tips：可粘贴在微博置顶、社交平台个人主页等地方哦</div>
            <Tabs tabs={[
                {
                    text: "永久二维码",
                    children: (<CardBackground className="mt-0 text-center" style={{ marginTop: 0 }}>
                        <div className="flex justify-center items-center w-full mt-10" style={{ height: 200 }}>
                            <QRCode
                                value={link} //value参数为生成二维码的链接
                                size={160} //二维码的宽高尺寸
                                fgColor="#000000"//二维码的颜色
                                imageSettings={{
                                    src: "https://0.soompi.io/wp-content/uploads/2018/04/20170556/IU-140x140.jpg",
                                    height: 50,
                                    width: 50,
                                    excavate: true
                                }}
                            />
                        </div>
                        <div className="">{link}</div>
                        <div className="text-xs mt-4" style={{ color: "#99A7B5" }}>您的专属二维码  方便分享给你的好友哦</div>
                    </CardBackground>)
                },
                {
                    text: "图片分享",
                    children: (<CardBackground className="mt-0" style={{ marginTop: 0 }}>
                        {
                            data?.followee?.map((item: IFollowItem, i: number) => {
                                return (<FollowItem key={`${i}-followee`} item={item} />)
                            })
                        }
                    </CardBackground>)
                }
            ]} />
            <Button className="my-10" onClick={() => {
                // 此处
            }}>
                保存图片
            </Button>
        </BodyBox>
    </>
    );
}