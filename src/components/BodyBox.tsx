import { CSSProperties, ReactNode } from "react";
import { bgColor } from "../theme";

export const BodyBox = ({ children, css, id }: { children: ReactNode, css?: CSSProperties, id?: string }) => {
  return (
    <div id={id} className={"sm:w-1000 sm:px-0 px-6 m-auto"} style={{ background: bgColor, padding: 20, marginTop: 100, borderRadius: 10, ...(css || {}) }}>
      {children}
    </div>
  );
}
