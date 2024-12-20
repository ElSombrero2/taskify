import clsx from "clsx"
import { HTMLAttributes } from "react"
import { Size } from "../../../types/size"
import { Theme } from "../../../types/theme"
import { variants } from "./Button.variants"

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: Size,
  theme?: Theme,
  type?: 'default' | 'link' | 'outline'
}

export const Button = ({type, children, size, theme, ...props}: ButtonProps) => {
  return (
    <button {...props} className={clsx(
      'border flex items-center gap-2 rounded-md py-1 px-4 transition-all duration-100',
      variants.type[type || 'default'][theme || 'primary'],
      variants.size[size || 'md'],
      props.className,
    )}>
      {children}
    </button>
  )
}