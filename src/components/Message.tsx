import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

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

    const message = useCallback((text: string, type?: TMessageType) => {
        setText(text);
        setType(type || "info");
    }, []);

    useEffect(() => {
        if (!text) return
        const timer = setTimeout(() => {
            // setText("")
        }, 3000)
        return () => {
            clearTimeout(timer)
        }
    }, [text])

    const backgroundColor = useMemo(() => {
        return {
            info: "gray",
            warn: "orange",
            error: "red",
            success: "green",
        }[type]
    }, [type])

    return (
        <MessageContext.Provider value={{ message }}>
            {text && <div className="fixed w-full z-50 bottom-32">
                <div className="absolute w-full flex justify-center px-6">
                    <div className="bg-gray-400 rounded-md px-4 py-3 text-white transform ease-in-out duration-500"
                        style={{
                            backgroundColor,
                            zIndex: 1000,
                        }}>{text}</div>
                </div>
            </div>}
            {children}
        </MessageContext.Provider>
    )
}