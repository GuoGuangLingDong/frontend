import { activeColor, secondColor, textColor } from "../../theme";
import { useEffect, useRef, useState } from "react";
import { BodyBox } from "../../components/BodyBox";
import { Search } from "./components/Search";
import { Item } from "./components/Item";

export const Profile = () => {

  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`./data.json`).then(res => {
      res.json().then((r: any[]) => {
        setData(r);
      })
    })
  }, [])

  const statistics = [{
    text: "Review",
    value: 123
  }, {
    text: "Likes",
    value: 2
  }, {
    text: "NFTs",
    value: 5
  }, {
    text: "Collections",
    value: 233
  }]

  const tabs = ["Reviews", "Activities"];
  const [select, setSelect] = useState("Reviews");

  return (data?.length > 0 ?
    <BodyBox css={{ marginBottom: 50 }}>
      <div className="bg-white rounded-md p-4">
        <div className="flex items-center cursor-pointer">
          <img className="rounded-full mr-4 w-32 lg:w-32 md:z-50 z-0 hidden lg:block" src={"https://0.soompi.io/wp-content/uploads/2018/04/20170556/IU-140x140.jpg"}
            alt="logo" />
          <div>
            <div className="text-2xl font-blakc">Rice</div>
            <div className="text-sm my-2">0xxxxxxxx...xxxxxxx</div>
            <button className="w-20 bg-gray-400 rounded-full text-white h-8">Logout</button>
          </div>
        </div>
        <div className="flex items-center mt-4" style={{ color: secondColor }}>
          {statistics.map((item: any, i: number) => {
            return <div key={i} className="text-center mr-4">
              <p>{item.value}</p>
              <p>{item.text}</p>
            </div>
          })}
        </div>
      </div>
      <div className="mt-4 flex items-center font-medium text-lg mb-4 overflow-scroll">
        {tabs.map(item => {
          const isActive = select === item;
          return (<div
            key={item}
            style={{ color: isActive ? textColor : secondColor, borderColor: isActive ? activeColor : "#f2f4f8" }}
            className={`font-black cursor-pointer h-12 border-b-2 flex items-center justify-center px-4 transition duration-500 ease-in-out transform ${isActive ? "" : "hover:scale-110"}`}
            onClick={() => {
              setSelect(item);
            }}
          >{item} </div>)
        })}
      </div>
      <Search />
      <div className="flex flex-col sm:flex-row mt-6 flex-wrap" ref={ref}>
        {data?.map((item, i) => {
          if (i >= 3) return null
          return (<Item key={i} i={i} item={item} />)
        })}
      </div>
    </BodyBox> : <div className="w-full h-32 flex justify-center items-center font-bold" style={{ color: secondColor, height: "calc(100vh - 40px)" }}>No Data</div>
  );
};