import { DetailedHTMLProps, useEffect, useState } from "react"

export const LoadImage = (props: DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    if (!props.src) return
    const img = new Image();
    img.onload = () => {
      setIsLoad(true);
    }
    img.src = props.src;
  }, [props.src])

  return (
    isLoad
      ? <img alt="img" {...props} style={props.style || {}} />
      : <div className={`animate-pulse bg-gray-400 ${props.className || ""}`} style={props.style || {}} onClick={props?.onClick}>
      </div>
  )
}

export const IconImage = (props: DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
  return (<LoadImage {...props} className={`w-8 h-8 rounded-full ${props.className || ""}`} />)
}