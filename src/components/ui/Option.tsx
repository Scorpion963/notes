import cn from "@/lib/cn";
import { ReactNode } from "react";


export default function Option <T>({value, children, onClick, className} : {value: T, children: ReactNode, onClick: () => void, className?: string}) {
    return <li className={cn("w-full outline-none bg-background border border-transparent hover:border-primary focus:ring-3 focus:ring-primary px-4 py-2 rounded-lg transition-all cursor-pointer", className)} onClick={onClick}>
        {children}
    </li>
}