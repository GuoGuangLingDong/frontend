import { secondColor } from "../../theme";
import { useEffect, useRef, useState } from "react";
import { BodyBox } from "../../components/BodyBox";
import { Select } from "../../components/Select";
import { Item } from "./components/Item";
import { Search } from "./components/Search";

export const List = () => {
  const [selectIndex, setSelectCoin] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`./data.json`).then(res => {
      res.json().then((r: any[]) => {
        setData(r);
      })
    })
  }, [])


  return (data?.length > 0 ?
    <BodyBox>
      <h1 id="projects" className="font-semibold text-xl sm:text-2xl font-Poppins-Medium pt-4 pb-2">Trending</h1>
      <div className="flex items-center justify-between">
        <Search />
        <Select list={[{
          label: "Time"
        }, {
          label: "Price"
        }]} setSelectCoin={setSelectCoin} selectCoin={selectIndex} />
      </div>
      <div className="flex flex-col sm:flex-row mt-6 flex-wrap" ref={ref}>
        {data?.map((item, i) => {
          return (<Item key={i} i={i} item={item} />)
        })}
      </div>
    </BodyBox> : <div className="w-full h-32 flex justify-center items-center font-bold" style={{ color: secondColor, height: "calc(100vh - 40px)" }}>No Data</div>
  );
};