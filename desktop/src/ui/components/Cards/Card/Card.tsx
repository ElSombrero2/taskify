import clsx from "clsx"
import { HTMLAttributes } from "react"

type CardProps = {
} & HTMLAttributes<HTMLDivElement>;

export const Card = (props: CardProps) => {
  return (
    <div {...props} className={clsx(
      'p-3 shadow-lg border w-fit rounded-md',
      props.className,
    )} />
  )
}