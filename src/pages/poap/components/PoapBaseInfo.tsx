import { secondColor } from "../../../theme"

export function ellipseAddress(
    address: string = "",
    width: number = 8
): string {
    return address?.length < width * 2 ? address : `${address.slice(0, width)}...${address.slice(-width)}`;
}

const Label = ({ text, value }: { text: string, value: string }) => {
    return (
        <div className="flex justify-between items-center m-3 px-2 text-xs">
            <div style={{ color: secondColor }}>{text}</div>
            <div>{value}</div>
        </div>
    )
}

export const PoapBaseInfo = ({ chain }: { chain: any }) => {
    return (
        <>
            <Label text="发行平台" value={chain?.plat_form} />
            <Label text="发行时间" value={chain?.publish_time?.slice(0, 10)} />
            <Label text="合约编号" value={ellipseAddress(chain?.contract_no)} />
            <Label text="合约地址" value={ellipseAddress(chain?.contract_addr)} />
            {/* <div className="w-full border-t" style={{ borderColor: "#EEEFF4" }}></div>
        <Label text="师门" value="优版权" />
        <Label text="师傅" value="优版权" />
        <Label text="有效期" value="优版权" /> */}
        </>
    )
}