import { ButtonHTMLAttributes, ReactNode } from "react";

export const Button = ({ children, ...props }: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
    {...props}
      className={`select-none sm:m-0 w-full sm:w-auto sm:px-6 font-bold text-sm py-3 rounded-full text-white border-0 ${props.disabled ? "cursor-not-allowed" : "cursor-pointer"} ${props.className}`}
      style={{
        background: "linear-gradient(131.21deg, rgba(0, 255, 0, 0) -0.11%, #fb3b1a 76.97%)",
        ...(props.style || {})
      }}
    >
      {children}
    </button>
  );
}