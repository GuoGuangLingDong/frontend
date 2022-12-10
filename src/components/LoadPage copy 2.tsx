import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useQueryString } from "../helpers/utilities";
import { textColor } from "../theme";
import { SmallLoading } from "./Loading";

const getLocationSearch = () => {
    let path = window.location.hash?.slice(1);
    let index = path?.indexOf("?");
    let search = index >= 0 ? path?.slice(index + 1) : "";
    let queryArray = search.split('&');
    const obj: any = {};
    queryArray.map((query) => {
        let temp = query.split('=');
        if (temp.length > 1) {
            obj[temp[0]] = temp[1];
        }
        return query
    })
    return obj
}

export const LoadPage = ({
    getList,
    setData,
    path,
    listID,
    children
}: {
    getList: (params: any) => Promise<void>,
    setData?: React.Dispatch<React.SetStateAction<any>>
    path: string,
    listID: string,
    children: ReactNode
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isEnter = useRef(true);
    const { searchString, setSearchString } = useQueryString();

    const search = useRef({});
    const [isVisible, setIsVisible] = useState(false)
    const getListFun = useCallback(async (arg: any) => {
        setIsVisible(true);
        const data: any = await getList?.(arg);
        setIsVisible(false);
        let list = data?.[path] || [];
        if (arg?.from === 0) {
            setData?.(list);
            window.localStorage.setItem(listID, JSON.stringify(list));
        } else {
            let data = window.localStorage.getItem(listID) || "[]";
            data = JSON.parse(data);
            data?.slice(0, (arg.from + 1) * arg.count);
            data = data.concat(list);
            window.localStorage.setItem(listID, JSON.stringify(data));
            setData?.(data);
        }
    }, [setIsVisible, search.current, getList, setData, path, listID])

    useEffect(() => {
        getListFun({
            ...searchString,
            from: Number(searchString.from || 0),
            count: Number(searchString.count || 10),
        }).then(() => {
            isEnter.current = false
        })
    }, [searchString])

    useEffect(() => {
        const dom = ref?.current;
        if (!dom) return
        const io = new IntersectionObserver((entries) => {
            entries.forEach(item => {
                if (item.isIntersecting && !isEnter.current) {
                    const params = getLocationSearch();
                    setSearchString({ ...params, from: String((Number(params.from || 0)) + (Number(params.count || 10))) });
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