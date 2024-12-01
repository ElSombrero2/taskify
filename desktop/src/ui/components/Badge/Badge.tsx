import clsx from "clsx"
import { Theme } from "../../types/theme"
import { Size } from "../../types/size"
import { variants } from "./Badge.variants"

type BadgeProps = {
  children: string | number,
  theme?: Theme,
  size?: Size,
  className?: string,
}

export const Badge = ({children, size, theme, className}: BadgeProps) => {
  return (
    <p className={clsx([
      'rounded-full text-center flex items-center py-[1px]',
      variants.theme[theme || 'primary'],
      variants.size[size || 'md'],
      className,
    ])}>
      {children}
    </p>
  )
}