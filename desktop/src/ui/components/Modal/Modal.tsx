import { ReactNode } from "react"

type ModalProps = {
  children?: ReactNode,
  className?: string,
  open?: boolean,
  onBackDropClick?: () => void
}

export const Modal = ({children, className, open, onBackDropClick}: ModalProps) => {
  const stopPropagation = (e: unknown) => (e as Event).stopPropagation(); 

  return (
    open && <div className="fixed w-full h-full border top-0 left-0 p-1 pt-[34px] overflow-hidden pointer-events-none">
      <div onClick={() => onBackDropClick && onBackDropClick()} className="w-full h-full rounded-lg overflow-hidden bg-black bg-opacity-45 pointer-events-auto">
        <div onClick={stopPropagation} className={className}>
          {children}
        </div>
      </div>
    </div>
  )
}