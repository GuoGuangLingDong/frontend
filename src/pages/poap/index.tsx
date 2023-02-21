import { Header, hearderBoxCss, hearderIconCss } from "../../components/Header";
import search from "../../assets/image/search.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import { isMobile, useQueryString } from "../../helpers/utilities";
import api from "../../api/index";
import { Banner } from "./components/Banner";
import { useSwitch } from "../../components/Loading";
import { LoadPage } from "../../components/LoadPage";
import { useRequest } from "../../hooks/useRequest";
import { DetailsPulse } from "./components/DetailsItem";
import { NoData } from "./Details";
import { RankList } from "./components/Rank";
import { NewListItem, PoapList } from "./components/NewList";
import { Search } from "./components/Search";

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

export const Home = () => {
  const { searchString } = useQueryString();
  const [searchValue, setSearchValue] = useState(searchString?.condition || "");
  const value = useRef(searchString?.condition || "");
  const [isOpenSearch, openSearch, closeSearch] = useSwitch();
  const [loading, openLoading, closeLoading] = useSwitch();
  const [data, setData] = useState<IPoap[]>([]);
  const [data2, setData2] = useState<IPoap[]>([]);
  const [listData, getPoapList] = useRequest(api.getPoapList);
  const mobile = isMobile();

  //控制等级排名处的数量
  const rankCount = 10;
  const pageSize = rankCount % 2 === 0 ? rankCount : rankCount + 1;

  // 移动端一页一页的请求数据
  const getList = useCallback(async (pageNo: number) => {
    const data = await getPoapList({
      from: pageNo,
      count: pageSize,
      condition: value.current
    });
    return data
  }, [getPoapList, value, pageSize]);

  // web端一次性请求100条回来
  const getList2 = useCallback(async (pageNo: number) => {
    const data = await getPoapList({
      from: pageNo,
      count: 100,
      condition: value.current
    });
    setData2(data?.list)
  }, [getPoapList, value]);

  useEffect(() => {
    !mobile && getList2?.(0);
  }, [getList2, mobile])

  useEffect(() => {
    value.current = searchValue;
    //eslint-disable-next-line
  }, [searchValue])

  const searchFun = useCallback(async (pageNo: number) => {
    pageNo === 0 && openLoading();
    if (!mobile) {
      const data = await getPoapList({
        from: 0,
        count: 100,
        condition: value.current
      });
      closeLoading()
      setData2(data?.list);
      return
    }
    const data = await getPoapList({
      from: pageNo,
      count: pageSize,
      condition: value.current
    });
    pageNo === 0 && closeLoading()
    setData(data?.list)
  }, [getPoapList, value, setData, closeLoading, openLoading, mobile, pageSize]);

  const dataM = (mobile ? data : data2);

  return (
    <>
      {isOpenSearch && mobile
        ? <Search searchFun={searchFun} closeSearch={closeSearch} setSearchValue={setSearchValue} searchValue={searchValue} />
        : <Header css={{ boxShadow: "none" }} right={mobile ? <div className={hearderBoxCss} onClick={openSearch}>
          <img className={hearderIconCss} src={search} alt="logo" />
        </div> : <Search searchFun={searchFun} closeSearch={closeSearch} setSearchValue={setSearchValue} searchValue={searchValue} />} />}
      <main className="mx-auto mb-8 sm:mb-16 pt-16 bg-white">
        <Banner />
        {!!dataM?.length && <><RankList data={dataM?.slice(0, rankCount)} />
          <h4 className="w-36 mt-16 mb-6 text-center font-bold m-auto text-black" style={{ background: "#FFBEBE" }}>Badges</h4></>}
        {mobile
          ? <LoadPage setData={setData} getList={getList} id="home-list" path={"list"} dataLength={data?.length}>
            {loading ? <DetailsPulse /> : (!listData?.list?.length && !data?.length ? <NoData /> : <div
              className={`flex mt-6 pb-0 px-6 md:pb-12 flex-wrap md:flex-nowrap justify-between`}
              style={{ width: "100%" }}>
              {data?.map((item, i) => {
                return (<NewListItem
                  key={i}
                  item={item}
                />)
              })}
            </div>)}
          </LoadPage>
          : <PoapList data={data2} />}
      </main>
    </>
  );
};