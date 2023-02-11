import { Header, hearderBoxCss, hearderIconCss } from "../../components/Header";
import search from "../../assets/image/search.svg";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { BodyBox } from "../../components/BodyBox";
import { isMobile, useQueryString } from "../../helpers/utilities";
import api from "../../api/index";
import { Banner } from "./components/Banner";
import { useSwitch } from "../../components/Loading";
import { LoadPage } from "../../components/LoadPage";
import { useRequest } from "../../hooks/useRequest";
import { DetailsPulse } from "./components/DetailsItem";
import { NoData } from "./Details";
import { RankItem } from "./components/RankItem";
import { NewList } from "./components/NewListItem";
import { secondColor } from "../../theme";

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

export const ArrowImg = ({ color, cursor, handle, css }: { color?: string, cursor?: string, handle?: () => void, css?: string }) => {
  return (
    <svg width="43" height="42" viewBox="0 0 43 42" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-all duration-500 transform ${css}`} onClick={() => {
      handle && handle()
    }}>
      <path d="M5.34759 2.96976L39.4134 18.9929C41.1659 19.8172 41.1659 22.3101 39.4134 23.1345L5.34759 39.1576C3.57311 39.9923 1.63942 38.3543 2.1708 36.4667L6.25262 21.9669C6.4189 21.3763 6.4189 20.7511 6.25262 20.1604L2.1708 5.66064C1.63942 3.77304 3.57312 2.13512 5.34759 2.96976Z" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  )
}

export const List = ({ data }: { data: IPoap[] }) => {
  const mobile = isMobile();
  const ref = useRef<HTMLDivElement>(null);
  let timer: any;

  useEffect(() => {
    const dom = ref?.current;
    if (!dom) return
    // dom.scrollLeft = dom.scrollWidth;
  }, [ref]);

  const [currentTab, setTab] = useState(0);

  const move = (ref: RefObject<HTMLDivElement>, data: any[], timer: any, right?: boolean) => {
    const dom = ref?.current;
    if (!dom) return
    console.log(dom.scrollWidth)
    const width = 260;
    let offset = 0;
    if (right) {
      offset = (dom.scrollWidth - dom.scrollLeft - dom.offsetWidth) % width;
    } else {
      offset = dom.scrollLeft % width;
    }
    offset = Math.abs(offset) < 5 ? width : offset;

    let left = dom.scrollLeft + offset * (right ? 1 : -1);
    if (dom.offsetWidth + left >= dom.scrollWidth) {
      left = dom.scrollWidth - dom.offsetWidth;
    }
    if (left <= 0) left = 0;
    let scrollLeft = dom.scrollLeft;
    clearInterval(timer);

    timer = setInterval(() => {
      scrollLeft = scrollLeft + 20 * (right ? 1 : -1)
      dom.scrollLeft = scrollLeft;
      if ((right && scrollLeft >= left) || (!right && scrollLeft <= left)) {
        dom.scrollLeft = left;
        clearInterval(timer);
      }
    }, 16);
  };

  return (<BodyBox>
    <div className="flex items-center w-full relative">
      {data?.length > 4 && <ArrowImg
        css={`absolute scale-75 rotate-180 -left-12 ${currentTab === 0 ? "cursor-not-allowed" : "hover:scale-100 cursor-pointer"}`}
        color={currentTab !== 0 ? "#AC9F9F" : secondColor}
        handle={() => {
          if (currentTab !== 0) {
            move(ref, data, timer)
            setTab(currentTab - 1)
          }
        }}
      />}
      {!mobile ? <div className="overflow-scroll m-auto" ref={ref}>
        <NewList data={data} />
      </div> : <NewList data={data} />}
      {data?.length > 4 && <ArrowImg
        css={`absolute scale-75 rotate-9 -right-12 ${currentTab === data.length - 4 ? "cursor-not-allowed" : "hover:scale-100 cursor-pointer"}`}
        color={currentTab !== data?.length - 4 ? "#AC9F9F" : secondColor}
        handle={() => {
          if (currentTab !== data?.length - 4) {
            move(ref, data, timer, true);
            setTab(currentTab + 1)
          }
        }}
      />}
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
  const [data2, setData2] = useState<IPoap[]>([]);
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
      count: 4,
      condition: value.current
    });
    pageNo === 0 && closeLoading()
    setData(data?.list)
  }, [getPoapList, value, setData, closeLoading, openLoading, mobile]);

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
        {dataM?.length && <><BodyBox>
          <h4 className="w-36 mt-16 mb-6 text-center font-bold m-auto text-black" style={{ background: "#D6EDF7" }}>Weekly Rankings</h4>
          <div className="flex justify-center flex-wrap">
            {dataM?.slice(0, 5)?.map((item, i) => {
              return (<RankItem key={i} item={item} index={i + 1} />)
            })}
          </div>
        </BodyBox>
          <h4 className="w-36 mt-16 mb-6 text-center font-bold m-auto text-black" style={{ background: "#FFBEBE" }}>Badges</h4></>}
        {mobile ? <LoadPage setData={setData} getList={getList} id="home-list" path={"list"} dataLength={data?.length}>
          {loading ? <DetailsPulse /> : (!listData?.list?.length && !data?.length ? <NoData /> : <List data={data} />)}
        </LoadPage> : <List data={data2} />}
      </main>
    </>
  );
};