import { Header, hearderBoxCss, hearderIconCss } from "../../components/Header";
import search from "../../assets/image/search.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import { BodyBox } from "../../components/BodyBox";
import { ListItem } from "./components/ListItem";
import { isMobile, useQueryString } from "../../helpers/utilities";
import api from "../../api/index";
import { Banner } from "./components/Banner";
import { useSwitch } from "../../components/Loading";
import { LoadPage } from "../../components/LoadPage";
import { useRequest } from "../../hooks/useRequest";
import { DetailsPulse } from "./components/DetailsItem";
import { NoData } from "./Details";


export interface IPoap {
  "poapId": string,
  "poap_id": string,
  "minerUid": string,
  "minerIcon": string,
  "poapName": string,
  "poapSum": number,
  "receiveCond": number,
  "coverImg": string,
  "poapIntro": string,
  "like_num": number
}

export const List = ({ data }: { data: IPoap[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mobile = isMobile();

  return (<BodyBox>
    <div className="flex mt-6 flex-wrap" ref={ref}>
      {data?.map((item, i) => {
        return (<ListItem
          key={i}
          item={item}
          className="relative p-0 m-0"
          style={{
            width: mobile ? "49%" : "19.4rem",
            marginLeft: mobile && i % 2 === 0 ? "0px" : "1%",
            marginRight: mobile && i % 2 === 1 ? "0px" : "1%",
          }} />)
      })}
    </div>
  </BodyBox>
  );
};

const Search = ({ searchValue, setSearchValue, searchFun, closeSearch }: {
  searchValue: any,
  setSearchValue: React.Dispatch<any>,
  searchFun: (pageNo: number) => Promise<void>,
  closeSearch: () => void
}) => {
  return (
    <div className="flex items-center fixed md:relative md:w-80 w-full h-16 md:h-10 rounded-3xl px-4 z-50 md:shadow-xl md:border">
      <input type="text" placeholder="请输入搜索内容" value={searchValue}
        className="bg-white outline-none rounded-l-3xl w-full pl-4 pr-2 py-2 h-10 md:h-8"
        onChange={(val) => {
          setSearchValue(val.target.value);
        }}
      />
      <div className={`cursor-pointer w-8 bg-white flex items-center h-10 md:h-8 rounded-r-3xl`} onClick={() => {
        searchFun(0);
        closeSearch();
      }}>
        <img className={hearderIconCss} src={search} alt="logo" />
      </div>
    </div>
  )
}

export const Home = () => {
  const { searchString } = useQueryString();
  const [searchValue, setSearchValue] = useState(searchString?.condition || "");
  const value = useRef(searchString?.condition || "");
  const [isOpenSearch, openSearch, closeSearch] = useSwitch();
  const [loading, openLoading, closeLoading] = useSwitch();
  const [data, setData] = useState<IPoap[]>([]);
  const [listData, getPoapList] = useRequest(api.getPoapList);
  const mobile = isMobile();
  const getList = useCallback(async (pageNo: number) => {
    const data = await getPoapList({
      from: pageNo,
      count: 4,
      condition: value.current
    });
    return data
  }, [getPoapList, value]);

  useEffect(() => {
    value.current = searchValue;
    //eslint-disable-next-line
  }, [searchValue])

  const searchFun = useCallback(async (pageNo: number) => {
    pageNo === 0 && openLoading();
    const data = await getPoapList({
      from: pageNo,
      count: 4,
      condition: value.current
    });
    pageNo === 0 && closeLoading()
    setData(data?.list);
  }, [getPoapList, value, setData, closeLoading, openLoading]);

  return (
    <>
      {isOpenSearch && mobile
        ? <Search searchFun={searchFun} closeSearch={closeSearch} setSearchValue={setSearchValue} searchValue={searchValue} />
        : <Header css={{ boxShadow: "none" }} right={mobile ? <div className={hearderBoxCss} onClick={openSearch}>
          <img className={hearderIconCss} src={search} alt="logo" />
        </div> : <Search searchFun={searchFun} closeSearch={closeSearch} setSearchValue={setSearchValue} searchValue={searchValue} />} />}
      <main className="mx-auto mb-8 sm:mb-16 pt-16">
        <Banner />
        <LoadPage setData={setData} getList={getList} id="home-list" path={"list"} dataLength={data?.length}>
          {loading ? <DetailsPulse /> : (!listData?.list?.length && !data?.length ? <NoData /> : <List data={data} />)}
        </LoadPage>
      </main>
    </>
  );
};