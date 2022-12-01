import { bgColor, secondColor, textColor } from "../../../theme";
import { useNavigate } from "react-router-dom";
import { isMobile } from "../../../helpers/utilities";
import { IconImage, LoadImage } from "../../../components/Image";
import share from "../../../assets/image/share.svg";
import { Button } from "../../../components/Button";
import { CardBackground } from "../../../components/Card";
import { DetailedHTMLProps, HTMLAttributes, ReactNode, useCallback } from "react";
import { ClaimButton } from "../Claim";
import { IPoap } from "..";

export type IDIVProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLInputElement>

export const Star = ({ item, ...props }: { item: IPoap } & IDIVProps) => {
  return (
    <div {...props} className={`flex item-center justify-center cursor-pointer flex-1 ${props.className || ""}`}>
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9550" width="16" height="16">
        <path d="M171.712 571.648l0.352 0.32 287.904 252.8a64 64 0 0 0 82.912 1.344l296.832-244.544a215.584 215.584 0 1 0-301.824-300.576L512 316.672l-25.888-35.616a215.584 215.584 0 1 0-314.4 290.624zM32 407.584a279.584 279.584 0 0 1 480-194.944 279.584 279.584 0 0 1 480 194.944 278.144 278.144 0 0 1-113.024 224.512l-295.36 243.392a128 128 0 0 1-165.888-2.592L129.984 620.16A278.976 278.976 0 0 1 32 407.584z" fill="#858891">
        </path>
      </svg>&nbsp;
      <div>{item.poap_number || 0}</div>
    </div>
  )
}

export const Share = ({ item, ...props }: { item: IPoap } & IDIVProps) => {
  return (
    <div {...props} className={`flex item-center justify-center cursor-pointer flex-1 ${props.className || ""}`} onClick={() => {
      window.open(`https://twitter.com/intent/tweet?text=XXXXXXXXXXXXX`, "_blank")
    }}>
      <img src={share} className="w-3" alt="share" />
      &nbsp;
      <div>{item.poap_number || 0}</div>
    </div>
  )
}

export const DetailItem = ({ item }: { item: IPoap }) => {
  const navigate = useNavigate();

  return (<CardBackground className="p-0 m-0">
    <LoadImage
      src={item?.cover_pic}
      className="rounded-t-3xl cursor-pointer h-96 w-full"
      style={{ padding: 2 }}
      onClick={() => {
        navigate(`/detail/${item?.poap_id}`)
      }} />
    <div className="p-4">
      <div className="text-sm">
        {item.poap_name}
      </div>
      <div className="text-xs flex items-center mt-2" style={{ color: secondColor }}>
        <Share item={item} style={{ justifyContent: "start" }} />
        <Star item={item} />
        <div style={{ flex: 4, textAlign: "right" }} >
          限量发行
          <span style={{ color: textColor }}>{item.poap_number || 0}</span>
          张
        </div>
      </div>
      <ClaimButton item={item} />
    </div>
  </CardBackground>
  )
};

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
      <div className="text-xs transform scale-90 origin-left">
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
      <Share item={item} />
      <div style={{ width: 1, height: "100%", backgroundColor: bgColor }}></div>
      <Star item={item} />
    </div>
  </CardBackground>
  )
};