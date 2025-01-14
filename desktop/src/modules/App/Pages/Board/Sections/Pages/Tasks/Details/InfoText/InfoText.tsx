import clsx from "clsx"
import { ReactNode } from "react"

type InfoTextProps = {
    title: string,
    icon: string,
    children: ReactNode,
    vertical?: boolean,
    action?: ReactNode
}

export const InfoText = ({ title, children, icon, vertical, action }: InfoTextProps) => {

    return (
        <div className={clsx(
            'flex gap-4',
            !vertical && 'items-center',
            vertical && 'flex-col',
        )}>
            <div className={clsx(
                vertical && 'flex items-center justify-between w-full'
            )}>
                <div className="flex items-center gap-3 w-[130px] opacity-50">
                    <i className={icon}></i>
                    <p>{title}</p>
                </div>
                {action}
            </div>
            {children}
        </div>
    )
}