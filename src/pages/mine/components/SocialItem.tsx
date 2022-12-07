import { CardBackground } from "../../../components/Card";
import { useSwitch } from "../../../components/Loading";
import { DropDown } from "../../../components/Select";
import tiktok from "../../../assets/image/social-platform/tiktok.png";
import weibo from "../../../assets/image/social-platform/weibo.png";
import xiaohongshu from "../../../assets/image/social-platform/xiaohongshu.png";
import weixin from "../../../assets/image/social-platform/weixin.png";
import telegram from "../../../assets/image/social-platform/telegram.png";
import instagram from "../../../assets/image/social-platform/instagram.png";
import twitter from "../../../assets/image/social-platform/twitter.png";
import facebook from "../../../assets/image/social-platform/facebook.png";
import linkedin from "../../../assets/image/social-platform/linkedin.png";
import deleteImg from "../../../assets/image/delete.png";

import { bgColor } from "../../../theme";

export type TSocialItemParams = {
    title?: string,
    link?: string,
    platform?: number
}

export type TEditParams = {
    username?: string //用户名
    user_desc?: string//用户描述
    links: TSocialItemParams[]
    avatar?: string//用户头像的url
}

// tiktok_link 抖音链接 0
// sina_link 微博链接 1 
// red_link 小红书链接 2 
// wechat_link 微信链接 3 
// tel_link 电报链接 4 
// ins_link ins链接 5 
// tweet_link 推特链接 6 
// facebook_link 脸书链接 7
// linkedin_link 领英链接 8
// other_links 其他链接 9 
export const socialIcon = [tiktok, weibo, xiaohongshu, weixin, telegram, instagram, twitter, facebook, linkedin]

const SelectIcon = ({ isOpen, close, handle }: { isOpen: boolean, close: () => void, handle: (index: number) => void }) => {

    return (
        <DropDown isOpen={isOpen} direction="none" css={{
            left: 10,
            top: 10,
            position: "absolute",
            zIndex: 50,
            width: "16rem",
            background: bgColor,
            padding: 8
        }}>
            <div className="flex flex-wrap">
                {socialIcon?.map((item: string, index: number) => {
                    return <img key={index} className="m-1 w-8 h-8" onClick={() => {
                        close();
                        handle(index);
                    }} src={item} alt="" />
                })}
            </div>
        </DropDown>
    )
}

export const SocialItem = ({ link, index, setLinks }: { link: TSocialItemParams, index: number, setLinks: React.Dispatch<React.SetStateAction<TSocialItemParams[]>> }) => {
    const [isOpenSelect, openSelect, closeSelect] = useSwitch();
    const setParams = (arg: Partial<TSocialItemParams>) => {
        setLinks((pre: TSocialItemParams[]) => {
            const data = JSON.parse(JSON.stringify(pre));
            data[index] = { ...data[index], ...arg }
            return data
        })
    }

    return (
        <CardBackground className="px-2 relative mt-4 py-4">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center" style={{ color: "#99A7B5" }} onClick={() => {
                    isOpenSelect ? closeSelect() : openSelect();
                }}>
                    <img src={socialIcon[link.platform || 0]} className="w-8 h-8 mr-2" alt="" />
                    选择图标
                </div>
                <img src={deleteImg} alt="" className="w-6" onClick={() => {
                    setLinks((pre: TSocialItemParams[]) => {
                        const data = JSON.parse(JSON.stringify(pre));
                        data[index] = null
                        return data.filter((ite: TSocialItemParams) => ite)
                    })
                }} />
            </div>
            <div className="relative">
                {isOpenSelect && <SelectIcon isOpen={isOpenSelect} close={closeSelect} handle={(index) => {
                    setParams({ platform: index })
                }} />}
            </div>
            <input type="text" placeholder="请输入标题" value={link.title} maxLength={30}
                className="outline-none rounded-3xl w-full px-4 py-3 my-2"
                style={{ background: bgColor }}
                onChange={(val) => {
                    setParams({ title: val.target.value })
                }} />

            <input type="text" placeholder="请输入链接" value={link.link} 
            style={{ background: bgColor }}
            className="bg-white outline-none rounded-3xl w-full px-4 py-4" onChange={(val) => {
                setParams({ link: val.target.value })
            }} />
        </CardBackground>
    )
}