import clsx from "clsx";
import { variants } from "./Alert.variants";
import { useEffect } from "react";

type AlertProps = {
	type?: 'info' | 'warning' | 'error' | 'success',
	title: string,
	id: string,
	children: string,
	position?: { top?: string, left?: string, bottom?: string, right?: string };
	duration?: number,
	onTimeout?: (id: string) => void,
	onCloseClick?: (id: string) => void,
}

export const Alert = ({ id, title, children, position, type, duration, onTimeout, onCloseClick }: AlertProps) => {
	useEffect(() => {
		if (duration && id) {
			setTimeout(() => onTimeout && onTimeout(id), duration);
		}
	}, [id, duration]);

	return (
		<div 
			className={clsx(
				'items-center w-[320px] gap-1 flex justify-between',
				'shadow-2xl rounded-md bg-gray-100 pr-5',
				'dark:bg-gray-700 p-2 border-l-[20px]',
				variants.type[type ?? 'info'].container,
			)}
			style={position}
		>
		<div className="flex items-center">
			<div 
				className={clsx(
					'ml-[-22px] absolute flex justify-center items-center',
					'w-[30px] h-[30px] border-[4px] rounded-full',
					'text-white dark:border-gray-700 border-gray-100',
					variants.type[type ?? 'info'].iconContainer
				)}>
				<i className={clsx(
					'fa text-[10px]',
					variants.type[type ?? 'info'].icon,
				)}></i>
			</div>
			<div className="ml-4 gap-[2px] flex flex-col max-w-52">
					<small className="font-bold">
						{title}
					</small>
					<small className="opacity-70">
						{children}
					</small>	
			</div>
		</div>
		<div>
			<button onClick={() => onCloseClick && onCloseClick(id)}>
				<i className="fa fa-close"></i>
			</button>
		</div>
		</div>
	)
}
