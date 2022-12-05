import { DetailedHTMLProps, HTMLAttributes, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { isMobile } from "../helpers/utilities";
import { bgColor, textColor } from "../theme";
import { Input } from "./Input";
import { SmallLoading } from "./Loading";

const mockdata = [
    {
        "poap_id": '1321321321321',
        "miner": '0x321312321',
        "poap_name": "国际青年徽章",
        "poap_number": 123,
        "receive_condition": "receive_condition",
        "cover_pic": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images",
        "poap_intro": "poap_intro",
        "favour_number": 456
    },
    {
        "poap_id": '1321321321321',
        "miner": '0x321312321',
        "poap_name": "国际青年徽章",
        "poap_number": 123,
        "receive_condition": "receive_condition",
        "cover_pic": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images",
        "poap_intro": "poap_intro",
        "favour_number": 456
    },
    {
        "poap_id": '1321321321321',
        "miner": '0x321312321',
        "poap_name": "国际青年徽章",
        "poap_number": 123,
        "receive_condition": "receive_condition",
        "cover_pic": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images",
        "poap_intro": "poap_intro",
        "favour_number": 456
    },
    {
        "poap_id": '1321321321321',
        "miner": '0x321312321',
        "poap_name": "国际青年徽章",
        "poap_number": 123,
        "receive_condition": "receive_condition",
        "cover_pic": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images",
        "poap_intro": "poap_intro",
        "favour_number": 456
    },
    {
        "poap_id": '1321321321321',
        "miner": '0x321312321',
        "poap_name": "国际青年徽章",
        "poap_number": 123,
        "receive_condition": "receive_condition",
        "cover_pic": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images",
        "poap_intro": "poap_intro",
        "favour_number": 456
    },
]

export const LoadPage = ({
    getList,
    setData,
    children
}: {
    getList: (pageNo: number) => Promise<void>,
    setData: React.Dispatch<React.SetStateAction<any[]>>
    children: ReactNode
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [pageNo, setPageNo] = useState(0);
    const [isVisible, setIsVisible] = useState(false)
    const getListFun = useCallback(async () => {
        console.log("请求");
        setIsVisible(true);
        await getList?.(pageNo);
        console.log("请求成功", pageNo);
        setIsVisible(false);
        setData((pre: any[]) => ([...pre, ...mockdata]));
    }, [setIsVisible, pageNo, getList])

    useEffect(() => {
        getListFun();
        //eslint-disable-next-line
    }, [pageNo])

    useEffect(() => {
        const dom = ref?.current;
        if (!dom) return
        const io = new IntersectionObserver((entries) => {
            entries.forEach(item => {
                if (item.isIntersecting) {
                    setPageNo((pre) => (pre + 1));
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