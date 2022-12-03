import React from "react";

export const SmallLoading = (props: { size?: number, color?: string }) => {
    const { size = 20, color = "white" } = props;

    return (<div className="small-loading" style={{
        width: size,
        height: size,
        background: `conic-gradient(from 114.04deg at 50% 50%, ${color} -3.75deg, rgba(22, 93, 255, 0) 331.83deg, ${color} 339.88deg, ${color} 356.25deg, rgba(22, 93, 255, 0) 691.83deg)`
    }}></div>)
}

export const useSwitch = () => {
    const [isOpen, setRequesting] = React.useState(false)
    const open = () => {
        setRequesting(true)
    };
    const close = () => {
        setRequesting(false)
    };
    return [isOpen, open, close] as const
}