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
            setText("")
        }, 2000)
        return () => {
            clearTimeout(timer)
        }
    }, [text])

    const backgroundColor = useMemo(() => {
        return {
            info: "gray",
            warn: "yellow",
            error: "red",
            success: "green",
        }[type]
    }, [type])

    return (
        <MessageContext.Provider value={{ message }}>
            {text && <div className="w-screen h-screen absolute" style={{ zIndex: 1000 }}>
                <div className="absolute bottom-20 w-full">
                    <div className="w-full flex justify-center">
                        <div className="bg-gray-400 rounded-md px-4 py-3 text-white transform ease-in-out duration-500"
                            style={{
                                backgroundColor
                            }}>{text}</div>
                    </div>
                </div>
            </div>}
            {children}
        </MessageContext.Provider>
    )
}