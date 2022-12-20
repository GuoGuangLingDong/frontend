import { CSSProperties, ReactNode } from "react";

export const BodyBox = ({ children, css, id }: { children: ReactNode, css?: CSSProperties, id?: string }) => {
  return (
    <div id={id} className={"md:w-1000 sm:px-0 px-4 m-auto"} style={{ ...(css || {}) }}>
      {children}
    </div>
  );
}
