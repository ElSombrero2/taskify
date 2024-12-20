import clsx from "clsx"
import { Theme } from "../../../types/theme"
import { Size } from "../../../types/size"
import { variants } from "./Pills.variants"

type PillsProps = {
  children: string | number,
  theme?: Theme | 'success' | 'danger' | 'warning',
  size?: Size,
  className?: string,
}

export const Pills = ({children, size, theme, className}: PillsProps) => {
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