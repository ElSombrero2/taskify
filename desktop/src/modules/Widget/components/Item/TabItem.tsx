import clsx from "clsx"
import { Badge } from "../../../../ui/components/Badge/Badge"

type TabItemProps = {
  children: string,
  count: number,
  active?: boolean
}

export const Item = ({children, count, active}: TabItemProps) => {
  return (
    <div className="flex gap-1 items-center">
      <p className={clsx([active && 'text-blue-500', 'text-sm'])}>
        {children}
      </p>
      <Badge theme={active ? 'primary' : 'secondary'} size="xs">
        {count > 99 ? '+99' : count}
      </Badge>
    </div>
  )
}