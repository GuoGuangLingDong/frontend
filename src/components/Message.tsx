import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { isMobile } from "../helpers/utilities";

export type TMessageType = "error" | "warn" | "success" | "info"

export const MessageContext = createContext(
    {} as {
        message: (text: string, type?: TMessageType) => void
    },
);

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
    const [text, setText] = useState("");
    const [type, setType] = useState<TMessageType>("info");
    const { pathname } = useLocation();
    const mobile = isMobile();

    const message = useCallback((text: string, type?: TMessageType) => {
        setText(text);
        setType(type || "info");
    }, []);

    useEffect(() => {
        if (!text) return
        const timer = setTimeout(() => {
            setText("")
        }, 3000)
        return () => {
            clearTimeout(timer)
        }
    }, [text])

    const backgroundColor = useMemo(() => {
        return {
            info: "#EEEFF4",
            warn: "#F41263",
            error: "#2E334E",
            success: "#0DD570",
        }[type]
    }, [type])

    return (
        <MessageContext.Provider value={{ message }}>
            {text && <div className={`fixed w-full z-50 ${ mobile ? "bottom-32" : "top-16" }`} style={{ zIndex: pathname?.includes("home") ? 1000 : 0 }}>
                <div className="absolute w-full flex justify-center px-6">
                    <div className="bg-gray-400 rounded-md px-4 py-3 text-white transform ease-in-out duration-500"
                        style={{
                            backgroundColor,
                            zIndex: 1000
                        }}>{text}</div>
                </div>
            </div>}
            {children}
        </MessageContext.Provider>
    )
}