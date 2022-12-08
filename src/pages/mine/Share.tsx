import { BodyBox } from "../../components/BodyBox";
import { Header } from "../../components/Header";
import { CardBackground } from "../../components/Card";
import { Tabs } from "../../components/Tab";
import { Button } from "../../components/Button";
import { useMessage } from "../../components/Message";
import { BackgroundLabel } from "../../components/Label";
import follow from "../../assets/image/follow.svg";
import { useAuth } from "../../components/UserAuth";
import QRCode from "qrcode.react";
import { MineBaseInfo } from ".";
import CopyToClipboard from "react-copy-to-clipboard";
import html2canvas from 'html2canvas'
import { useRef } from "react";
import { useSwitch } from "../../components/Loading";

export const downloadImg = async (dom: any, afterHandle?: () => void) => {
    await html2canvas(dom, {
        useCORS: true
    }).then(canvas => {
        const url = canvas.toDataURL("image/png");

        let a = document.createElement("a");
        a.style.display = "none";
        a.setAttribute("href", url);

        a.setAttribute("download", "did.png");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        afterHandle?.();
    });
}

export const Share = () => {
    const { userInfo } = useAuth();
    const { message } = useMessage();
    const link = `did.ren/${userInfo?.uid || "fdsa"}`

    const refL = useRef<HTMLDivElement>(null);
    const refR = useRef<HTMLDivElement>(null);
    const [loading, openLoading, closeLoading] = useSwitch();

    const handle = async (right?: boolean) => {
        // 获取想要转换的 DOM 节点
        let dom;
        if (right) {
            dom = refR.current;
        } else {
            dom = refL.current;
        }
        if (!dom) return
        openLoading()
        await downloadImg(dom, closeLoading)
    };

    return (<>
        <Header title={"分享"}></Header>
        <BodyBox css={{
            paddingTop: 80,
        }}>
            <BackgroundLabel className={`flex justify-between items-center h-12 px-2`} style={{ background: "white" }}>
                <div className="flex items-center">
                    <img src={follow} className="w-4 mr-2" alt="" />
                    <div>{link}</div>
                </div>
                <CopyToClipboard text={link}
                    onCopy={() => message("复制成功！", "success")}>
                    <Button
                        className="w-16 py-2 text-xs "
                        style={{ background: "#2E334E" }}
                    >
                        复制
                    </Button>
                </CopyToClipboard>
            </BackgroundLabel>
            <div className="mb-6 text-xs text-center" style={{ color: "#99A7B5" }}>Tips：可粘贴在微博置顶、社交平台个人主页等地方哦</div>
            <Tabs tabs={[
                {
                    text: "永久二维码",
                    children: (<><CardBackground className="mt-0 text-center" style={{ marginTop: 0, paddingTop: 30 }}>
                        <div className="mx-6 py-6" ref={refL}>
                            <div className="flex justify-center items-center w-full" style={{ height: 200 }}>
                                <QRCode
                                    id="qrCode"
                                    value={link} //value参数为生成二维码的链接
                                    size={180} //二维码的宽高尺寸
                                    fgColor="#000000"//二维码的颜色
                                // imageSettings={{
                                //     src: "https://0.soompi.io/wp-content/uploads/2018/04/20170556/IU-140x140.jpg",
                                //     height: 50,
                                //     width: 50,
                                //     excavate: true
                                // }}
                                />
                            </div>
                            <div>{link}</div>
                        </div>
                        <div className="text-xs" style={{ color: "#99A7B5" }}>您的专属二维码  方便分享给你的好友哦</div>
                    </CardBackground>
                        <Button className="my-10" loading={loading} disabled={loading} onClick={() => {
                            // 此处
                            handle();
                        }}>
                            保存图片
                        </Button>
                    </>)
                },
                {
                    text: "图片分享",
                    children: (<>
                        <div ref={refR}>
                            <CardBackground className="mt-0 text-center" style={{ marginTop: 0 }}>
                                <MineBaseInfo />
                                <div className="flex justify-center items-center w-full" style={{ height: 160 }}>
                                    <QRCode
                                        value={link} //value参数为生成二维码的链接
                                        size={160} //二维码的宽高尺寸
                                        fgColor="#000000"//二维码的颜色
                                    // imageSettings={{
                                    //     src: "https://0.soompi.io/wp-content/uploads/2018/04/20170556/IU-140x140.jpg",
                                    //     height: 50,
                                    //     width: 50,
                                    //     excavate: true
                                    // }}
                                    />
                                </div>
                            </CardBackground>
                        </div>
                        <Button className="my-10" loading={loading} disabled={loading} onClick={() => {
                            // 此处
                            handle(true);
                        }}>
                            保存图片
                        </Button>
                    </>)
                }
            ]} />
        </BodyBox>
    </>
    );
}