import { ReactNode } from "react"

export const If = ({condition, children}: {condition?: boolean, children: ReactNode}) => {
  if (condition) return children;
}