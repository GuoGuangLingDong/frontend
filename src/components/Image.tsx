import { ReactNode, useEffect, useState } from "react"

export const LoadImage = ({ url, children }: { url: string, children: ReactNode }) => {
  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    if (!url) return
    const img = new Image();
    img.onload = () => {
      setIsLoad(true);
    }
    img.src = url;
  }, [url])

  return (
    isLoad
      ? <>{children}</>
      : <div className="animate-pulse bg-gray-400 rounded" style={{ height: 300 }}>
      </div>
  )
}