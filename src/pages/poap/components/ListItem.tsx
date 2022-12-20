import { bgColor, secondColor } from "../../../theme";
import { useNavigate } from "react-router-dom";
import { LoadImage } from "../../../components/Image";
import holder from "../../../assets/image/holder.svg";
import star from "../../../assets/image/star.svg";
import { Button } from "../../../components/Button";
import { CardBackground } from "../../../components/Card";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { ellipseAddress } from "./PoapBaseInfo";

export type IDIVProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLInputElement>

export const Star = ({ amount, ...props }: { amount: number } & IDIVProps) => {
  return (
    <div {...props} className={`flex item-center justify-center ${props.className || ""}`}>
      <img src={star} className="w-3" alt="share" />
      &nbsp;
      <div>{amount || 0}</div>
    </div>
  )
}

export const Holder = ({ amount, ...props }: { amount: number } & IDIVProps) => {
  return (
    <div {...props} className={`flex item-center justify-center ${props.className || ""}`}>
      <img src={holder} className="w-4" alt="share" />
      &nbsp;
      <div>{amount || 0}</div>
    </div>
  )
}

export const ListItem = ({ item, ...props }: { item: any } & IDIVProps) => {
  const navigate = useNavigate();

  return (<CardBackground {...props} onClick={() => {
    navigate(`/detail/${item?.poap_id}`)
  }}>
    <LoadImage
      src={item?.cover_img}
      className="rounded-t-3xl cursor-pointer h-44 w-full md:h-80 md:w-80 md:m-auto"
      style={{ padding: 2 }}
    />
    <div className="absolute px-3 pt-2 w-full top-0 left-0">
      <div className="rounded-full w-full h-8 flex items-center text-white text-xs" style={{
        background: "rgba(0,0,0,0.3)",
        padding: 2
      }}>
        <LoadImage
          className="rounded-full h-full mr-1"
          style={{ width: "calc(2rem - 4px)" }}
          src={item?.minerIcon}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/profile/${item?.minerUid}`)
          }}
        />
        <div>
          <div>{ellipseAddress(item.minerName, 8)}</div>
          <div className="text-xs">{ellipseAddress(item.minerUid, 6)}</div>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between px-2 my-2 text-xs" style={{ minHeight: 30 }}>
      <div className="text-xs transform scale-90 origin-left">
        {item.poap_name}
      </div>
      {item?.collectable && <Button className="w-16 md:w-24 py-1 text-xs transform scale-75 origin-right">
        限时领取
      </Button>}
    </div>
    <div className="text-xs flex items-center border-t h-10" style={{ color: secondColor }}>
      <div className="flex-1"><Holder amount={item.holder_num} /></div>
      <div style={{ width: 1, height: "100%", backgroundColor: bgColor }}></div>
      <div className="flex-1"><Star amount={item.favour_number} /></div>
    </div>
  </CardBackground>
  )
};
