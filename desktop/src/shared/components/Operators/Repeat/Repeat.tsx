import { ReactNode } from "react"

export const Repeat = ({children, times}: {children: ReactNode, times: number}) => {
  
  return (
    <>
    {Array.from(Array(times).keys()).map((i) => (
      <div key={`repeat-${i}`}>
        {children}
      </div>
    ))}
    </>
  )
}