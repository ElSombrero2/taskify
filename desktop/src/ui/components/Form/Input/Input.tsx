import { InputHTMLAttributes, ReactNode } from "react"
import { Size } from "../../../types/size"
import clsx from "clsx"
import { variants } from "./Input.variants"

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: Size,
  containerClass?: string,
  icon?: ReactNode,
  iconPosition?: 'left' | 'right',
}

export const Input = ({icon, size, containerClass, iconPosition, ...props}: InputProps) => {
  return (
    <div className={clsx(
      'p-1 px-4 border flex items-center gap-3 rounded-md',
      containerClass,
      variants.size[size || 'md'],
      iconPosition === 'right' ? 'flex-row-reverse' : 'flex-row'
    )}>
      {icon}
      <input 
        {...props}
        type="text" 
        className={clsx(
          'bg-transparent outline-none',
        )}
      />
    </div>
  )
}