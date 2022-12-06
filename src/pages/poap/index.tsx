import { Header, hearderBoxCss, hearderIconCss } from "../../components/Header";
import search from "../../assets/image/search.svg";
import { secondColor } from "../../theme";
import { useCallback, useRef, useState } from "react";
import { BodyBox } from "../../components/BodyBox";
import { ListItem } from "./components/Item";
import { isMobile } from "../../helpers/utilities";
import api from "../../api/index";
import { Banner } from "./components/Banner";
import { useSwitch } from "../../components/Loading";
import { LoadPage } from "../../components/LoadPage";
import { useRequest } from "../../hooks/useRequest";

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
  const [searchValue, setSearchValue] = useState("");
  const [isOpenSearch, openSearch, closeSearch] = useSwitch();
  const [data, setData] = useState<IPoap[]>([]);
  const [, getPoapList] = useRequest(api.getPoapList);
  const getList = useCallback(async (pageNo: number) => {
    await getPoapList({
      from: pageNo,
      count: 10
    });
  }, [getPoapList])

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
        <LoadPage setData={setData} getList={getList}>
          <List data={data} />
        </LoadPage>
      </main>
    </>
  );
};