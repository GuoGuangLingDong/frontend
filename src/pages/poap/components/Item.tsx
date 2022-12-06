import { bgColor, secondColor } from "../../../theme";
import { useNavigate } from "react-router-dom";
import { LoadImage } from "../../../components/Image";
import holder from "../../../assets/image/holder.svg";
import star from "../../../assets/image/star.svg";
import { Button } from "../../../components/Button";
import { CardBackground } from "../../../components/Card";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IPoap } from "..";

export type IDIVProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLInputElement>

export const Star = ({ amount, ...props }: { amount: number } & IDIVProps) => {
  return (
    <div {...props} className={`flex item-center justify-center cursor-pointer flex-1 ${props.className || ""}`}>
      <img src={star} className="w-3" alt="share" />
      &nbsp;
      <div>{amount || 0}</div>
    </div>
  )
}

export const Holder = ({ amount, ...props }: { amount: number } & IDIVProps) => {
  return (
    <div {...props} className={`flex item-center justify-center cursor-pointer flex-1 ${props.className || ""}`}>
      <img src={holder} className="w-4" alt="share" />
      &nbsp;
      <div>{amount || 0}</div>
    </div>
  )
}

export const ListItem = ({ item, ...props }: { item: IPoap } & IDIVProps) => {
  const navigate = useNavigate();

  return (<CardBackground {...props}>
    <LoadImage
      src={item?.cover_pic}
      className="rounded-t-3xl cursor-pointer h-44 w-full"
      style={{ padding: 2 }}
      onClick={() => {
        navigate(`/detail/${item?.poap_id}`)
      }} />
    <div className="absolute px-3 pt-2 w-full top-0 left-0">
      <div className="rounded-full w-full h-8 flex items-center text-white text-xs" style={{
        background: "rgba(0,0,0,0.3)",
        padding: 2
      }}>
        <LoadImage
          className="rounded-full h-full mr-1"
          style={{ width: "calc(2rem - 4px)" }}
          src={"https://0.soompi.io/wp-content/uploads/2018/04/20170556/IU-140x140.jpg"}
        />
        {item.miner}
      </div>
    </div>
    <div className="flex items-center justify-between px-2 my-2 text-xs">
      <div className="text-xs transform scale-90 origin-left" onClick={() => {
        navigate(`/detail/${item?.poap_id}`)
      }}>
        {item.poap_name}
      </div>
      <Button
        className="w-16 py-1 text-xs transform scale-75 origin-right"
        onClick={() => {
          // 此处调用限时领取接口函数
          navigate(`/claim/${item?.poap_id}`)
        }}>
        限时领取
      </Button>
    </div>
    <div className="text-xs flex items-center border-t h-10" style={{ color: secondColor }}>
      <Holder amount={item.poap_number} />
      <div style={{ width: 1, height: "100%", backgroundColor: bgColor }}></div>
      <Star amount={item.favour_number} />
    </div>
  </CardBackground>
  )
};