import { HTMLAttributes, ReactNode } from "react"

type RepeatProps = {
	children: ReactNode;
	times: number;
} & HTMLAttributes<HTMLDivElement>;

export const Repeat = ({children, times, ...props}: RepeatProps) => {
  
  return (
    <div {...props}>
			{Array.from(Array(times).keys()).map((i) => (
				<div key={`repeat-${i}`}>
					{children}
				</div>
			))}
    </div>
  )
}
