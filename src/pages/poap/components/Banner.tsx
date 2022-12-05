import { useRef, useState } from "react";
import { Carousel } from 'antd';
import { BodyBox } from "../../../components/BodyBox";

export const Banner = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [data] = useState<{ src: string, link: string }[]>([{
    link: "https://www.baidu.com",
    src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images"
  },
  {
    link: "https://www.baidu.com",
    src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images"
  },
  {
    link: "https://www.baidu.com",
    src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images"
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