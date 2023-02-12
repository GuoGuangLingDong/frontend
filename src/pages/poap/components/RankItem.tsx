import { secondColor } from "../../../theme";
import { LoadImage } from "../../../components/Image";
import share1 from "../../../assets/image/share1.svg";
import like from "../../../assets/image/like.svg";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { useGoDetails } from "./NewListItem";
import { isMobile } from "../../../helpers/utilities";

export type IDIVProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLInputElement>

const RankNum = ({index}:{index: number}) => {
    return (
        <div className="absolute right-3 top-3">
            <svg width="35" height="34" viewBox="0 0 35 34" className="transform scale-75" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.8139 17C7.8139 11.4772 12.291 7.00002 17.8139 7.00002M33.6472 17C33.6472 25.7445 26.5584 32.8334 17.8139 32.8334C9.06939 32.8334 1.98056 25.7445 1.98056 17C1.98056 8.25551 9.06939 1.16669 17.8139 1.16669C26.5584 1.16669 33.6472 8.25551 33.6472 17Z" stroke="#161310" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="text-sm" style={{
                marginTop: -24,
                marginLeft: 14
            }}>{index}</div>
        </div>
    )
}

export const Like = ({ amount, ...props }: { amount: number } & IDIVProps) => {
    return (
        <div {...props} className={`flex item-center justify-center -ml-4 md:ml-0 ${props.className || ""}`}>
            <img src={like} className="w-4" alt="share" />
            &nbsp;
            <div className="text-xs" style={{ color: "#70ACD3", marginTop: -4 }}>{amount || 0}</div>
        </div>
    )
}

export const Share1 = ({ amount, ...props }: { amount: number } & IDIVProps) => {
    return (
        <div {...props} className={`flex item-center justify-center -mr-4 md:mr-0 ${props.className || ""}`}>
            <img src={share1} className="w-4" alt="share" />
            &nbsp;
            <div className="text-xs" style={{ color: "#70ACD3", marginTop: -4 }}>{amount || 0}</div>
        </div>
    )
}

export const RankItem = ({ item, index }: { item: any, index: number } & IDIVProps) => {
    const goDetails = useGoDetails();
    const mobile = isMobile();

    return (<div className="rectangle relative h-64 p-4 pt-10 md:p-10" style={{
        width: mobile ? 200 : "20%",
        minWidth: 200
    }} onClick={() => {
        goDetails(item?.poapId)
    }}>
        <RankNum index={index}/>
        <LoadImage
            src={item?.coverImg}
            className="rounded-3xl cursor-pointer w-28 h-28 md:h-28 md:w-28 m-auto"
        />
        <div className="text-xs transform scale-75 my-1 flex justify-center items-center h-8 md:h-10 md:my-2 text-center font-bold ellipsis-2">
            {item.poapName}
        </div>
        <div className="text-xs flex items-center" style={{ color: secondColor }}>
            <div className="flex-1"><Share1 amount={item.holder_num} /></div>
            <div className="flex-1"><Like amount={item.favour_number} /></div>
        </div>
    </div>
    )
};
