import { Header, hearderBoxCss, hearderIconCss } from "../../components/Header";
import search from "../../assets/image/search.svg";
import { secondColor, textColor } from "../../theme";
import { useCallback, useEffect, useRef, useState } from "react";
import { BodyBox } from "../../components/BodyBox";
import { ListItem } from "./components/Item";
import { isMobile } from "../../helpers/utilities";
import api from "../../api/index";
import { Banner } from "./components/Banner";
import { SmallLoading, useSwitch } from "../../components/Loading";

interface IPoapSearchParams {
  from: number,
  count: number
}

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

export const List = ({ data }: { data: IPoap[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mobile = isMobile();

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
  const [from, setPageNo] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isOpenSearch, openSearch, closeSearch] = useSwitch();

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const dom = ref?.current;
    if (!dom) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(item => {
        setIsVisible(item.isIntersecting);
        setPageNo(1);
      })
    }, {
      root: null,
      threshold: 0.3,
    })

    io.observe(dom)
  }, [ref])

  console.log(from)

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

  const getList = useCallback(async (arg: IPoapSearchParams) => {
    const data = await api.getPoapList(arg);
    setIsVisible(false);
    setData(data);
  }, [setData, setIsVisible])

  useEffect(() => {
    getList({
      count: 10,
      from: 1
    });

    //eslint-disable-next-line
  }, [])

  return (
    <>
      {isOpenSearch
        ? <div className="flex items-center fixed w-full h-16 px-4 z-50">
          <input type="text" placeholder="请输入搜索内容" value={searchValue}
            className="bg-white outline-none rounded-l-3xl w-full pl-4 py-2 h-10"
            onChange={(val) => {
              setSearchValue(val.target.value);
            }}
          />
          <div className={`cursor-pointer w-8 bg-white flex items-center h-10 rounded-r-3xl`} onClick={() => {
            closeSearch();
          }}>
            <img className={hearderIconCss} src={search} alt="logo" />
          </div>
        </div>
        : <Header css={{ boxShadow: "none" }} right={<div className={hearderBoxCss} onClick={openSearch}>
          <img className={hearderIconCss} src={search} alt="logo" />
        </div>} />}
      <main className="mx-auto mb-8 sm:mb-16 pt-16">
        <Banner />
        <List data={data} />
        <div ref={ref} className="flex justify-center mt-10">
          {isVisible && <SmallLoading color={textColor} size={30} />}
        </div>
      </main>
    </>
  );
};