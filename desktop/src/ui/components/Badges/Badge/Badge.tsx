import clsx from "clsx"
import { variants } from "./Badge.variants"
import { ReactNode } from "react"
import { Size } from "../../../types/size"
import { Theme } from "../../../types/theme"

type BadgeProps = {
  children: ReactNode,
  size?: Size,
  theme?: Theme | 'danger' | 'success' | 'warning',
}

export const Badge = ({children, theme, size}: BadgeProps) => {
  return (
    <div className={clsx(
      'w-fit py-[2px] px-2 font-bold rounded-sm border border-opacity-40',
      variants.size[size || 'md'],
      variants.theme[theme || 'primary'],
    )}>
      {children}
    </div>
  )
}