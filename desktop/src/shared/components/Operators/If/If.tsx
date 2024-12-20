import { ReactNode } from "react"

export type IfProps = {
  children: ReactNode, fallback: ReactNode, condition?: boolean
};

export const If = ({children, fallback, condition}: IfProps) => {
  return (
    <>
      {condition ? children : fallback}
    </>
  );
}