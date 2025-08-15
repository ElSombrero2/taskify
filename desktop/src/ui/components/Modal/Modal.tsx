import clsx from "clsx";
import { CSSProperties, ReactNode } from "react"

type ModalProps = {
  children?: ReactNode,
  className?: string,
  open?: boolean,
  onBackDropClick?: () => void,
  backdropClassName?: string,
  backdropStyle?: CSSProperties,
}

export const Modal = ({children, className, open, onBackDropClick, backdropClassName, backdropStyle}: ModalProps) => {
  const stopPropagation = (e: unknown) => (e as Event).stopPropagation();

  return (
    <div
			role="dialog"
			aria-hidden="false"
			className={clsx(
				'transition-all duration-200 fixed w-full h-full border top-0 left-0 p-1 pt-[43px] overflow-hidden pointer-events-none',
				!open && 'opacity-0',
			)}
		>
      <div
        onClick={() => onBackDropClick && onBackDropClick()}
        style={backdropStyle}
        className={clsx(
          'w-full h-full rounded-lg overflow-hidden bg-black bg-opacity-45',
          open && 'pointer-events-auto',
          backdropClassName,
        )}>
        <div onClick={stopPropagation} className={className}>
          {children}
        </div>
      </div>
    </div>
  )
}
