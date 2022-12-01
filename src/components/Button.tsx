import { ButtonHTMLAttributes, ReactNode } from "react";

export const Button = ({ children, deep, ...props }: { children: ReactNode, deep?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`select-none w-full sm:px-6 font-bold text-sm py-3 rounded-full text-white border-0 ${props.disabled ? "cursor-not-allowed" : "cursor-pointer"} ${props.className}`}
      style={{
        background: deep ? "linear-gradient(-90deg, #0C2442, #4F7492)" : "linear-gradient(90deg, #F6BF75, #D77185, #8766AC, #4150B1)",
        ...(props.style || {})
      }}
    >
      {children}
    </button>
  );
}