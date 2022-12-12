import { useRef, useState } from "react";
import { Carousel } from 'antd';
import { BodyBox } from "../../../components/BodyBox";
import pic1 from "../../../assets/image/pic4.jpg"
import pic2 from "../../../assets/image/pic2.jpg"
import pic3 from "../../../assets/image/pic3.jpg"
export const Banner = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [data] = useState<{ src: string, link: string }[]>([{
    link: "http://60.205.229.57:3000/#/detail/a4394025ff7e4b02bd5695688d62695c",
    src: pic1
  },
  {
    link: "https://mp.weixin.qq.com/s/TlceZj-GLUJri3q3B6sOWw",
    src: pic2
  },
  {
    link: "https://mp.weixin.qq.com/s/cPg46md2dQzCRoF-XA6QWw",
    src: pic3
  }]);

  return (
    <BodyBox css={{
      flex: "relative",
      marginTop: 10
    }}>
      <div className="h-0"></div>
      <Carousel autoplay ref={ref as any} dots={false} pauseOnHover={false}>
        {data?.map((item, i) => {
          return (
            <img key={i} className={`w-full h-48 select-none rounded-3xl`} onClick={() => {
              window.open(item.link, "_target");
            }} src={item.src} alt="" />
          )
        })}
      </Carousel>
    </BodyBox>
  );
};
