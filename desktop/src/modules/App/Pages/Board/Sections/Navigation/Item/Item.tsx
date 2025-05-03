import React, { InputHTMLAttributes } from "react"
import './Item.scss'

type ItemProps = {
  children: React.ReactElement,
  type: 'checkbox' | 'radio'
} & InputHTMLAttributes<HTMLInputElement>;

export const Item = ({children, type, ...props}: ItemProps) => {
  return (
    <label className="radio">
      <input type={type} {...props} />
      {children}
    </label>
  )
}
