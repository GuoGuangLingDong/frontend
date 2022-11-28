import { ReactNode } from "react";

export const CardBackground = ({ children }: { children: ReactNode }) => {
    return (
        <div className="p-6 rounded-3xl bg-white mt-4">
            {children}
        </div>
    )
}