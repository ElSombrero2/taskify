import clsx from "clsx"
import { ReactNode } from "react"

type CardProps = {
  children: ReactNode,
  className?: string,
}

export const Card = ({className, children}: CardProps) => {
  return (
    <div className={clsx(
      'p-3 shadow-lg border w-fit rounded-md',
      className,
    )}>
      {children}
    </div>
  )
}