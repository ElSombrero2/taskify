import { ReactNode } from "react"
import { Size } from "../../../types/size"
import { Theme } from "../../../types/theme"
import clsx from "clsx"
import { variant } from "./Item.variants"
import { Link } from "react-router"

type TabItemProps = {
  children: ReactNode,
  theme?: Theme,
  slider?: boolean,
  size?: Size,
  className?: string,
  to?: string,
}

export const TabItem = ({children, size, theme, className, to}: TabItemProps) => {
  console.log(to);
  return (
    <Link to={to || ''} className={clsx(
      variant.size[size || 'md'],
      variant.theme[theme || 'primary'],
      className,
    )}>
      {children}
    </Link>
  )
}