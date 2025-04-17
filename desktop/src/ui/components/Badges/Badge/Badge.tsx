import clsx from "clsx"
import { variants } from "./Badge.variants"
import { ReactNode } from "react"
import { Size } from "../../../types/size"
import { Theme } from "../../../types/theme"

type BadgeProps = {
  children: ReactNode,
  size?: Size,
  theme?: Theme | 'danger' | 'success' | 'warning' | 'disabled',
  variant?: 'default' | 'ghost',
}

/*
  [DONE]: Add variant for badge
  Create Badge variant Light like on this following
  picture but with the same radius as now and name that
  variant ghost #ui #improvment #low
  ![badge](https://dds.dell.com/site/production/be/d2/Badge_Color_Emphasis_3281022bee.png)
*/

export const Badge = ({children, theme, size, variant}: BadgeProps) => {
  return (
    <div className={clsx(
      'w-fit py-[2px] px-2 font-bold',
      'flex justify-center items-center',
      variants.style[variant || 'default'],
      variants.size[size || 'md'],
      variants.theme.variants[variant || 'default'][theme || 'primary'],
    )}>
      {children}
    </div>
  )
}