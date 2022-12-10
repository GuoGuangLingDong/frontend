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
            width: mobile ? "49%" : 300,
            marginLeft: i % 2 === 0 ? "0px" : "1%",
            marginRight: i % 2 === 1 ? "0px" : "1%",
          }} />)
      })}
    </div>
  </BodyBox>
  );
};

export const Home = () => {
  const { searchString } = useQueryString();
  const [searchValue, setSearchValue] = useState(searchString?.condition || "");
  const value = useRef(searchString?.condition || "");
  const [isOpenSearch, openSearch, closeSearch] = useSwitch();
  const [loading, openLoading, closeLoading] = useSwitch();
  const [data, setData] = useState<IPoap[]>([]);
  const [listData, getPoapList] = useRequest(api.getPoapList);
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
      {isOpenSearch
        ? <div className="flex items-center fixed w-full h-16 px-4 z-50">
          <input type="text" placeholder="请输入搜索内容" value={searchValue}
            className="bg-white outline-none rounded-l-3xl w-full pl-4 py-2 h-10"
            onChange={(val) => {
              setSearchValue(val.target.value);
            }}
          />
          <div className={`cursor-pointer w-8 bg-white flex items-center h-10 rounded-r-3xl`} onClick={() => {
            searchFun(0);
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
        <LoadPage setData={setData} getList={getList} path={"list"} dataLength={data?.length}>
          {loading ? <DetailsPulse /> : (!listData?.list?.length && !data?.length ? <NoData /> : <List data={data} />)}
        </LoadPage>
      </main>
    </>
  );
};