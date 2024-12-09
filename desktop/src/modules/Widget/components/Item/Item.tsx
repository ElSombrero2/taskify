import clsx from "clsx"
import { Pills } from "../../../../ui/components/Badges/Pills/Pills"

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
      <Pills theme={active ? 'primary' : 'secondary'} size="xs">
        {count > 99 ? '+99' : count}
      </Pills>
    </div>
  )
}