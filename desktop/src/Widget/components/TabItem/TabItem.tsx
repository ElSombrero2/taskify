import clsx from "clsx"

type TabItemProps = {
  children: string,
  size: number,
  active?: boolean
}

export const TabItem = ({children, size, active}: TabItemProps) => {
  return (
    <div className="flex gap-1 items-center">
      <p className={clsx([
        active && 'text-blue-500',
        'text-sm'
      ])}>{children}</p>
      <p className={clsx([
        'text-[9px] px-[6px] rounded-full text-center py-[1px]',
        !active && 'bg-zinc-600 text-white dark:bg-zinc-700 dark:text-zinc-300',
        'bg-blue-500 text-white',
      ])}>
        {size > 99 ? '+99' : size}
      </p>
    </div>
  )
}