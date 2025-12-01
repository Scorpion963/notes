import { ReactNode } from "react";


export default function Option <T>({value, children, onClick} : {value: T, children: ReactNode, onClick: () => void}) {
    return <li onClick={onClick}>
        {children}
    </li>
}