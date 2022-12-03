import { BodyBox } from "../../components/BodyBox";
import { bgColor, secondColor, textColor } from "../../theme";
import { useState } from "react";
import { IconImage, LoadImage } from "../../components/Image";
import { Header } from "../../components/Header";
import { CardBackground, IconTextRightCard } from "../../components/Card";
import { BackgroundLabel, TextLabel } from "../../components/Label";
import { PersonBackground } from "../auth/components/PersonBackground";
import person from "../../assets/image/person.png"
import logo from "../../assets/image/logo.png"
import share from "../../assets/image/share.svg"
import edit from "../../assets/image/edit.svg"
import back from "../../assets/image/back.svg";
import { IPoap } from "../poap";
import { DetailItem, ListItem, Share, Star } from "../poap/components/Item";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

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

export const Mine = () => {
  const w = 24;
  const navigate = useNavigate();
  const [data, setData] = useState<IPoap[]>([
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
  ]);

  return (<>
    <PersonBackground image={person}>
      <div className="relative h-full">
        <div className="absolute flex justify-center items-center rounded-full" style={{
          bottom: "-5%",
          width: `${w}vw`,
          height: `${w}vw`,
          left: `calc(50% - ${w / 2}vw)`
        }}>
          <img className="w-24 h-24 rounded-full" src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images"} />
        </div>

        <div className="absolute flex justify-center items-center bg-white rounded-full" style={{
          bottom: "-14%",
          width: `14vw`,
          height: `14vw`,
          left: `6.5%`
        }}>
          <img src={edit} className="w-6 h-6" />
        </div>

        <div className="absolute flex justify-center items-center bg-white rounded-full" style={{
          bottom: "-14%",
          width: `14vw`,
          height: `14vw`,
          right: `6.5%`
        }}>
          <img src={share} className="w-6 h-6" />
        </div>
      </div>
    </PersonBackground>
    <div className="mt-4 text-center">
      <div className="font-bold text-2xl">Abraham</div>
      <div style={{
        color: "#989CB3"
      }}>@did.ren/5566.DID</div>
      <div className="font-bold text-sm">国际创新青年协会常务理事</div>
    </div>
    <BodyBox>
      <div className="flex justify-between items-center my-8">
        <div className="flex-1 bg-white h-12 rounded-full mr-2 flex items-center justify-between px-6">
          <div>Links</div>
          <div>168888</div>
        </div>
        <div className="flex-1 bg-white h-12 rounded-full ml-2 flex items-center justify-between px-6">
          <div>NFT</div>
          <div>242</div>
        </div>
      </div>
      <SocialItem text={"Abraham在北京"} logo="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images" handle={() => { }} />
      <SocialItem text={"Abraham在北京"} logo="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images" handle={() => { }} />
      <SocialItem text={"Abraham在北京"} logo="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images" handle={() => { }} />
      <div>
        <div className="flex mt-6 flex-wrap">
          {data?.map((item, i) => {
            return (<CardBackground className="p-0 m-0">
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
                    <Share item={item} className="mr-4" />
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