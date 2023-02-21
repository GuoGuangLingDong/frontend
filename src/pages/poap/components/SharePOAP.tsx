import { LoadImage } from "../../../components/Image";
import { DropDown } from "../../../components/Select";
import QRCode from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { downloadImg } from "../../mine/Share";
import { useMessage } from "../../../components/Message";
import { SmallLoading, useSwitch } from "../../../components/Loading";
import { isMobile } from "../../../helpers/utilities";
import CopyToClipboard from "react-copy-to-clipboard";
import NativeShare from 'nativeshare'

export const NewSharePOAP = ({ isOpen, close, details }: { isOpen: boolean, close: () => void, details: any }) => {
    const ref = useRef<HTMLDivElement>(null);
    const link = `${window.location.href}`;
    const { message } = useMessage();
    const mobile = isMobile();
    const [loading, openLoading, closeLoading] = useSwitch();
    const [nativeShare, setNativeShare] = useState<any>();
    const shareData = {
        title: '不咕BuGu',
        desc: '不咕BuGu是国光灵动开发的DAPP',
        link,
        icon: 'https://pic3.zhimg.com/v2-080267af84aa0e97c66d5f12e311c3d6_xl.jpg',
        // 不要过于依赖以下两个回调，很多浏览器是不支持的
        success: function () {
            message('share success', "success")
        },
        fail: function () {
            message('share fail', "error")
        }
    }
    useEffect(() => {
        if (nativeShare) return
        const nativeShare1 = new NativeShare();
        nativeShare1?.setShareData(shareData)
        setNativeShare(nativeShare1);
    // eslint-disable-next-line 
    }, [nativeShare, NativeShare])

    const save = () => {
        const dom = ref.current;
        if (!dom) return
        openLoading()
        downloadImg(dom, `poap-${details?.poapId}`, () => {
            message("保存成功！", "success");
            closeLoading()
        }).catch(() => {
            message("保存失败！", "error");
            closeLoading()
        })
    }

    return (
        <DropDown isOpen={isOpen} direction="none"
            css={{
                right: "0",
                left: "0",
                top: "0",
                width: "100vw",
                height: "100vh",
                background: "rgba(225,225,225,0.4)",
                zIndex: 1000
            }}>
            <div className="relative">
                <div className="bg-transparetn absolute flex justify-center flex-wrap md:justify-start share-bg items-center md:pl-0 pt-10 md:pt-0" style={{
                    right: mobile ? "4vw" : `calc(50vw - 400px)`,
                    left: mobile ? "4vw" : `calc(50vw - 400px)`,
                    top: mobile ? "16vh" : "20vh",
                    width: mobile ? "92vw" : 800,
                    height: mobile ? "auto" : 380
                }}>
                    <div className="absolute top-2 right-2 cursor-pointer transform scale-50 md:scale-75" onClick={close}>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.12848 14.1667L14.5161 5.78644C15.0966 5.29579 15.8471 5 16.6667 5H31.6667C33.5076 5 35 6.49238 35 8.33333V23.3333C35 24.2938 34.5938 25.1594 33.9438 25.7677L25.5382 34.1667M25.5382 14.1667L33.8715 5.83333M8.33333 35H23.3333C25.1743 35 26.6667 33.5076 26.6667 31.6667V16.6667C26.6667 14.8257 25.1743 13.3333 23.3333 13.3333H8.33333C6.49238 13.3333 5 14.8257 5 16.6667V31.6667C5 33.5076 6.49238 35 8.33333 35Z" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            <path d="M9.1665 30.8333L14.9998 25M14.9998 25L20.8332 19.1666M14.9998 25L20.8332 30.8333M14.9998 25L9.1665 19.1666" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div ref={ref} className="flex justify-center items-center md:py-0 py-4" style={{
                        width: mobile ? "92vw" : 560,
                        height: mobile ? "auto" : 320,
                        background: "#FFBEBE"
                    }}>
                        <div className="flex download-bg p-4 md:px-8 items-center" style={{
                            width: mobile ? "86vw" : 480,
                            height: mobile ? "auto" : 260
                        }}>
                            <LoadImage
                                src={details?.coverImg}
                                className="img-bg rounded-3xl cursor-pointer bg-transparent"
                                style={{ padding: 30, width: mobile ? "34vw" : 200, height: mobile ? "34vw" : 200 }}
                            />
                            <div className="ml-2" style={{ width: mobile ? "40vw" : 200 }}>
                                <div className="m-auto text-center mb-2 text-sm" style={{ color: "#606060" }}>{details?.poapName}</div>
                                <QRCode
                                    id="qrCode"
                                    value={window.location.href} //value参数为生成二维码的链接
                                    size={mobile ? 50 : 70} //二维码的宽高尺寸
                                    fgColor="#ffffff"//二维码的颜色
                                    bgColor="#000000"
                                    style={{
                                        border: `${mobile ? 2 : 4}px solid #000000`,
                                        margin: "auto"
                                    }}
                                />
                                <div className="text-xs text-bg mt-4">POAP ID: {details?.poapId?.length <= 16 ? details?.poapId : `${details?.poapId.slice(0, 6)}...${details?.poapId.slice(-6)}`}</div>
                                <div className="text-xs text-bg mt-1">链上ID: {details?.chain?.contract_addr?.length <= 16 ? details?.chain?.contract_addr : `${details?.chain?.contract_addr.slice(0, 6)}...${details?.chain?.contract_addr.slice(-6)}`}</div>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto text-white mb-4 mt-6 md:mt-0 md:mb-0">
                        <div className="bg-transparent cursor-pointer w-full h-8 rounded-full flex justify-center items-center" onClick={save}>
                            {loading ? <div className="flex justify-center" style={{ width: 32 }}><SmallLoading size={24} /></div> : <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform scale-75">
                                <path d="M26.7143 5.28571C29.0812 5.28571 31 7.20449 31 9.57143V26.7143C31 29.0812 29.0812 31 26.7143 31H5.28571C2.91878 31 1 29.0812 1 26.7143V9.57143C1 7.20449 2.91878 5.28571 5.28571 5.28571M15.9999 1L16.0002 18.1429M16.0002 18.1429L9.57143 12.0065M16.0002 18.1429L22.4286 12.0066" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>}
                            &nbsp;下载图片
                        </div>
                        <div className="bg-transparent md:my-2 cursor-pointer w-full rounded-full flex justify-center items-center">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform scale-75">
                                <path d="M6.6138 13.8625L3.3757 17.1006C0.208097 20.2682 0.208099 25.4039 3.37571 28.5715C6.54332 31.7391 11.679 31.7391 14.8466 28.5715L18.0847 25.3334M13.8626 6.61378L17.1007 3.37569C20.2683 0.208101 25.404 0.208103 28.5716 3.3757C31.7392 6.54329 31.7392 11.679 28.5716 14.8466L25.3335 18.0846M9.80659 21.9736L21.9733 9.80691" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>&nbsp;
                            <CopyToClipboard text={link}
                                onCopy={() => message("复制成功！", "success")}>
                                <div>复制链接</div>
                            </CopyToClipboard>
                        </div>
                        <div className={`bg-transparent cursor-pointer w-full rounded-full flex justify-center items-center ${mobile ? "" : "opacity-50"}`} onClick={() => {
                            mobile && nativeShare?.call()
                        }}>
                            <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform scale-75">
                                <path d="M29.3333 19.3333V26C29.3333 27.8409 27.841 29.3333 26 29.3333H19.3333M4.33333 29.3333H7.66667C9.50762 29.3333 11 27.8409 11 26V22.6667C11 20.8257 9.50762 19.3333 7.66667 19.3333H4.33333C2.49238 19.3333 1 20.8257 1 22.6667V26C1 27.8409 2.49238 29.3333 4.33333 29.3333ZM4.33333 11H7.66667C9.50762 11 11 9.50761 11 7.66667V4.33333C11 2.49238 9.50762 1 7.66667 1H4.33333C2.49238 1 1 2.49238 1 4.33333V7.66667C1 9.50761 2.49238 11 4.33333 11ZM22.6667 11H26C27.841 11 29.3333 9.50761 29.3333 7.66667V4.33333C29.3333 2.49238 27.841 1 26 1H22.6667C20.8257 1 19.3333 2.49238 19.3333 4.33333V7.66667C19.3333 9.50761 20.8257 11 22.6667 11ZM21.8333 24.3333C20.4526 24.3333 19.3333 23.214 19.3333 21.8333C19.3333 20.4526 20.4526 19.3333 21.8333 19.3333C23.214 19.3333 24.3333 20.4526 24.3333 21.8333C24.3333 23.214 23.214 24.3333 21.8333 24.3333Z" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </svg>&nbsp;手机分享
                        </div>
                    </div>
                </div>
            </div>
        </DropDown>
    )
}