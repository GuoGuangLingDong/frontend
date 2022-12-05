import { BodyBox } from "../../components/BodyBox";
import { bgColor, secondColor } from "../../theme";
import { useCallback, useEffect } from "react";
import { LoadImage } from "../../components/Image";
import { CardBackground, IconTextRightCard } from "../../components/Card";
import { PersonBackground } from "../auth/components/PersonBackground";
import person from "../../assets/image/person.png"
import share from "../../assets/image/share.svg"
import edit from "../../assets/image/edit.svg"
import back from "../../assets/image/back.svg";
import { IPoap } from "../poap";
import { Holder, Star } from "../poap/components/Item";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { useAuth } from "../../components/UserAuth";
// import api from "../../api";

const SocialItem = ({ logo, text, handle }: { logo: string, text: string, handle?: () => void }) => {
  return (
    <IconTextRightCard className="mb-4 p-2 h-16" style={{ background: "white" }} icon={logo} right={<div
      className="h-8 w-8 rounded-full flex justify-center items-center"
      onClick={() => { handle?.() }}
      style={{ background: bgColor }}>
      <img src={back} className="w-4 h-4 transform rotate-180" alt="" />
    </div>}>
      <div className="ml-2">
        <div className="font-bold">{text}</div>
      </div>
    </IconTextRightCard>
  )
}

export const MineBaseInfo = () => {
  const w = 24;
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return <>
    <PersonBackground image={person} className={pathname === "/share" ? "rounded-t-3xl" : "rounded-none"}>
      <div className="relative h-full">
        <div className="absolute flex justify-center items-center rounded-full" style={{
          bottom: pathname === "/share" ? "17%" : "-5%",
          width: `${w}%`,
          left: `calc(50% - ${w / 2}%)`
        }}>
          <img className="w-24 rounded-full" src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images"} alt="" />
        </div>

        {pathname !== "/share" && <><div className="absolute flex justify-center items-center bg-white rounded-full" style={{
          bottom: "-14%",
          width: `14vw`,
          height: `14vw`,
          left: `6.5%`
        }}>
          <img src={edit} className="w-6 h-6" alt="" />
        </div>

          <div className="absolute flex justify-center items-center bg-white rounded-full"
            style={{
              bottom: "-14%",
              width: `14vw`,
              height: `14vw`,
              right: `6.5%`
            }}
            onClick={() => {
              navigate("/share")
            }}
          >
            <img src={share} className="w-6 h-6" alt="" />
          </div>
        </>}
      </div>
    </PersonBackground>
    <div className="mt-4 text-center">
      <div className="font-bold text-2xl">{userInfo?.username}</div>
      <div style={{
        color: "#989CB3"
      }}>@{userInfo?.uid}</div>
      <div className="font-bold text-sm">{userInfo?.user_desc}</div>
    </div>

    <BodyBox>
      <div className="flex justify-between items-center my-8">
        <div className="flex-1 bg-white h-12 rounded-full mr-2 flex items-center justify-between px-6">
          <div>Links</div>
          <div>{userInfo?.follow_count}</div>
        </div>
        <div className="flex-1 bg-white h-12 rounded-full ml-2 flex items-center justify-between px-6">
          <div>NFT</div>
          <div>{userInfo?.nft_count}</div>
        </div>
      </div>
    </BodyBox></>
}

export const Mine = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAuth();

  const getList = useCallback(async () => {
    // const data = await api.getUserInfo();
    setUserInfo({
      "username": "username",
      "uid": "uid",
      "user_desc": "user_desc",
      "follow_count": 12312,
      "nft_count": 22222,
      "dy_link": "string",
      "ins_link": "string",
      "weibo_link": "string",
      "poap_list": [
        {
          "poap_id": '1321321321321',
          "miner": '0x321312321',
          "poap_name": "国际青年徽章",
          "poap_number": 123,
          "receive_condition": "receive_condition",
          "cover_pic": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images",
          "poap_intro": "poap_intro",
          "favour_number": 456
        },
        {
          "poap_id": '1321321321321',
          "miner": '0x321312321',
          "poap_name": "国际青年徽章",
          "poap_number": 123,
          "receive_condition": "receive_condition",
          "cover_pic": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images",
          "poap_intro": "poap_intro",
          "favour_number": 456
        },
        {
          "poap_id": '1321321321321',
          "miner": '0x321312321',
          "poap_name": "国际青年徽章",
          "poap_number": 123,
          "receive_condition": "receive_condition",
          "cover_pic": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images",
          "poap_intro": "poap_intro",
          "favour_number": 456
        },
      ]
    });
  }, [setUserInfo])

  // @ts-ignore
  useEffect(() => {
    getList();

    // eslint-disable-next-line
  }, [])

  return (<>
    <MineBaseInfo />
    <BodyBox>
      <SocialItem text={"Abraham在北京"} logo="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images" handle={() => { }} />
      <SocialItem text={"Abraham在北京"} logo="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images" handle={() => { }} />
      <SocialItem text={"Abraham在北京"} logo="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images" handle={() => { }} />
      <div>
        <div className="flex mt-6 flex-wrap">
          {userInfo?.poap_list?.map((item: IPoap, i: number) => {
            return (<CardBackground className="p-0 m-0" key={i}>
              <LoadImage
                src={item?.cover_pic}
                className="rounded-t-3xl cursor-pointer h-96 w-full"
                style={{ padding: 2 }}
                onClick={() => {
                  navigate(`/detail/${item?.poap_id}`)
                }} />
              <div className="p-4">
                <div className="text-sm">
                  {item.poap_name}
                </div>
                <div className="text-sm flex items-center justify-between mt-2" style={{ color: secondColor }}>
                  <div className="flex items-center">
                    <Holder item={item} className="mr-4" />
                    <Star item={item} />
                  </div>
                  <Button
                    className="w-16 py-1 text-xs transform scale-75 origin-right"
                    onClick={() => {
                      // 此处调用限时领取接口函数
                      navigate(`/claim/${item?.poap_id}`)
                    }}>
                    限时领取
                  </Button>
                </div>
              </div>
            </CardBackground>)
          })}
        </div>
      </div>
    </BodyBox>
  </>
  );
}