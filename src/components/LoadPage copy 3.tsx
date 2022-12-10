import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { textColor } from "../theme";
import { SmallLoading } from "./Loading";

export const LoadPage = ({
    getList,
    setData,
    path,
    dataLength,
    children
}: {
    getList: (from: number) => Promise<void>,
    setData?: React.Dispatch<React.SetStateAction<any>>
    path: string,
    dataLength: number,
    children: ReactNode
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const from = useRef(0);
    const [isVisible, setIsVisible] = useState(false)
    const getListFun = useCallback(async () => {
        setIsVisible(true);
        const data: any = await getList?.(from.current);
        setIsVisible(false);
        if (!data?.[path]) return
        if(from.current === 0){
            setData?.(data);
        }else{
            setData?.((pre: any[]) => ([...pre, ...data[path]]));
        }
    }, [setIsVisible, from.current, getList, setData, path])

    useEffect(() => {
        from.current = dataLength;
    }, [dataLength])

    useEffect(() => {
        const dom = ref?.current;
        if (!dom) return
        const io = new IntersectionObserver((entries) => {
            entries.forEach(item => {
                if (item.isIntersecting) {
                    getListFun();
                }
            })
        }, {
            root: null,
            threshold: 0.3,
        })

        io.observe(dom)
    }, [ref])

    return (
        <div>
            {children}
            <div ref={ref} className="flex justify-center mt-10">
                {isVisible && <SmallLoading color={textColor} size={30} />}
            </div>
        </div>
    )
}