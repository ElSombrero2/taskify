import { ReactNode } from "react"
import { Card } from "../../../../../../../ui/components/Cards/Card/Card"

export const Title = ({children, className}: {children: ReactNode, className?: string}) => {
  return (
    <Card className="min-w-[320px] bg-gray-100 dark:bg-gray-800 shadow-none flex items-center gap-2">
      <i className={`${className} fa fa-circle text-[10px]`}></i>
      {children}
    </Card>
  )
}