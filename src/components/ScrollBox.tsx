import { ReactNode, useEffect, useRef, useState } from "react";
import { isMobile } from "../helpers/utilities";
import { secondColor, textColor } from "../theme";

export const ArrowImg = ({ color, handle, css }: { color?: string, handle?: () => void, css?: string }) => {
    return (
        <svg width="43" height="42" viewBox="0 0 43 42" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-all duration-500 transform ${css}`} onClick={() => {
            handle && handle()
        }}>
            <path d="M5.34759 2.96976L39.4134 18.9929C41.1659 19.8172 41.1659 22.3101 39.4134 23.1345L5.34759 39.1576C3.57311 39.9923 1.63942 38.3543 2.1708 36.4667L6.25262 21.9669C6.4189 21.3763 6.4189 20.7511 6.25262 20.1604L2.1708 5.66064C1.63942 3.77304 3.57312 2.13512 5.34759 2.96976Z" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}

export const ScrollBox = ({ data, children, isShowBar, rowCount }: { data: any[], children: ReactNode, isShowBar?: boolean, rowCount: number }) => {
    const mobile = isMobile();
    const ref = useRef<HTMLDivElement>(null);
    let timer: any;

    useEffect(() => {
        const dom = ref?.current;
        if (!dom) return
        dom.scrollLeft = 0;
    }, [ref]);

    const [currentTab, setTab] = useState(0);

    const move = (tab: number, diff: number, right?: boolean) => {
        const dom = ref?.current;
        if (!dom) return
        const listNode = dom.childNodes?.[0] as any;
        const listW = listNode?.clientWidth || listNode?.offsetWidth;
        const width = listW / listNode?.childNodes?.length;
        const viewW = dom.clientWidth || dom.offsetWidth;
        let targetScrollLeft = tab / listNode?.childNodes?.length * (listW - viewW);
        if (tab === listNode?.childNodes?.length - 1) {
            targetScrollLeft = listW - width
        }
        let sourceScrollLeft = dom.scrollLeft;
        clearInterval(timer);
        timer = setInterval(() => {
            sourceScrollLeft = sourceScrollLeft + 20 * diff * (right ? 1 : -1)
            dom.scrollLeft = sourceScrollLeft;
            if ((right && sourceScrollLeft >= targetScrollLeft) || (!right && targetScrollLeft >= sourceScrollLeft)) {
                dom.scrollLeft = targetScrollLeft;
                clearInterval(timer);
            }
        }, 16);
    };

    useEffect(() => {
        const dom = ref.current;
        if (!dom) return
        let timer: NodeJS.Timeout | null = null;

        dom.addEventListener("scroll", () => {
            if (timer) return
            timer = setTimeout(() => {
                const listNode = dom.childNodes?.[0] as any;
                const listW = listNode?.clientWidth || listNode?.offsetWidth;
                const viewW = dom.clientWidth || dom.offsetWidth;
                const ratio = dom.scrollLeft / (listW - viewW) * listNode?.childNodes?.length;
                const index = Math.floor(ratio) + (ratio - Math.floor(ratio) > 0.5 ? 1 : 0);
                const sort = index >= listNode?.childNodes?.length ? listNode?.childNodes?.length - 1 : index;
                setTab(sort);
                clearTimeout(timer as any);
                timer = null
            }, 10)
        })
    }, [setTab])

    return (<>
        <div className="flex items-center w-full relative">
            {((data?.length > 1 && mobile) || data?.length > rowCount) && <ArrowImg
                css={`absolute ${mobile ? "scale-50 -left-12 -ml-1" : "scale-75 -left-20"} origin-right rotate-180 ${currentTab === 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
                color={currentTab !== 0 ? "#AC9F9F" : secondColor}
                handle={() => {
                    if (currentTab !== 0) {
                        move(currentTab - 1, 1, false);
                    }
                }}
            />}
            <div className="m-auto overflow-scroll w-11/12 md:w-full" ref={ref}>
                {children}
            </div>
            {((data?.length > 1 && mobile) || data?.length > rowCount) && <ArrowImg
                css={`absolute ${mobile ? "scale-50 -right-8" : "scale-75 -right-12"} origin-left rotate-9 ${currentTab === data.length - 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
                color={currentTab !== data?.length - 1 ? "#AC9F9F" : secondColor}
                handle={() => {
                    if (currentTab <= data?.length - 1) {
                        move(currentTab + 1, 1, true);
                    }
                }}
            />}
        </div>
        {(mobile || data?.length > rowCount) && isShowBar && <div className="flex justify-center">
            {data?.map((_, i) => {
                return (
                    <div
                        key={i}
                        className="w-2 h-2 rounded-full mx-1 cursor-pointer"
                        style={{ background: currentTab === i ? textColor : secondColor }}
                        onClick={() => {
                            move(i, Math.abs(currentTab - i), currentTab < i);
                        }}></div>
                )
            })}
        </div>}
    </>
    );
};