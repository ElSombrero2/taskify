import { ReactNode } from "react"
import { Size } from "../../../types/size"
import { Theme } from "../../../types/theme"
import clsx from "clsx"
import { variant } from "./Item.variants"

type TabItemProps = {
  children: ReactNode,
  theme?: Theme,
  slider?: boolean,
  size?: Size,
  className?: string,
}

export const TabItem = ({children, size, theme, className}: TabItemProps) => {
  return (
    <div className={clsx(
      variant.size[size || 'md'],
      variant.theme[theme || 'primary'],
      className,
    )}>
      {children}
    </div>
  )
}