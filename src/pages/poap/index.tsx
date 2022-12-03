import { Header, hearderBoxCss, hearderIconCss } from "../../components/Header";
import { PersonBackground } from "../auth/components/PersonBackground";
import search from "../../assets/image/search.svg";
import { secondColor } from "../../theme";
import { useCallback, useEffect, useRef, useState } from "react";
import { BodyBox } from "../../components/BodyBox";
import { ListItem } from "./components/Item";
import { isMobile } from "../../helpers/utilities";
import person from "../../assets/image/person.png"
import api from "../../api/index";
import { useAuth } from "../../components/UserAuth";

export interface IPoap {
  "poap_id": string,
  "miner": string,
  "poap_name": string,
  "poap_number": number,
  "receive_condition": string,
  "cover_pic": string,
  "poap_intro": string,
  "favour_number": number
}

export const List = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mobile = isMobile();
  const { userInfo } = useAuth();
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

  const getList = useCallback(async (arg: any) => {
    const data = await api.getPoapList(arg);
    setData(data);
  }, [setData])

  useEffect(() => {
    getList({
      from: userInfo?.username,
      count: 10,
    });
  // eslint-disable-next-line
  }, [])

  return (data?.length > 0 ?
    <BodyBox>
      <div className="flex mt-6 flex-wrap" ref={ref}>
        {data?.map((item, i) => {
          return (<ListItem
            key={i}
            item={item}
            className="relative p-0 m-0"
            style={{
              width: mobile ? "49%" : 300,
              marginLeft: i % 2 === 0 ? "0px" : "1%",
              marginRight: i % 2 === 1 ? "0px" : "1%",
            }} />)
        })}
      </div>
    </BodyBox> : <div className="w-full h-32 flex justify-center items-center font-bold" style={{ color: secondColor, height: "calc(100vh - 40px)" }}>No Data</div>
  );
};

export const Home = () => {
  const { setUserInfo } = useAuth();

  const getList = useCallback(async () => {
    const data = await api.getUserInfo();
    setUserInfo(data);
  }, [setUserInfo])

  useEffect(() => {
    getList();
    //eslint-disable-next-line
  }, [])

  return (
    <>
      <Header right={<div className={hearderBoxCss}>
        <img className={hearderIconCss} src={search} alt="logo" />
      </div>} />
      <main className="mx-auto mb-8 sm:mb-16 pt-16">
        <PersonBackground image={person}>
          {/* <div className="relative h-full">
            <div className="absolute flex justify-center items-center bg-white rounded-full" style={{
              bottom: "-8.8%",
              width: `${w}vw`,
              height: `${w}vw`,
              left: `calc(50% - ${w / 2}vw)`
            }}>
              <img src={logo} className="w-20 h-16" alt="" />
            </div>
          </div> */}
        </PersonBackground>
        <List />
      </main>
    </>
  );
};