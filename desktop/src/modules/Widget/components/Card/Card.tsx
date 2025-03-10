import clsx from "clsx"

type CardProps = {
  onClick: () => void,
  open?: boolean,
  active?: boolean,
}

export const Card = (props: CardProps) => {
  const { open, active } = props;
  return (
    <div onClick={props.onClick} className={
      clsx(
        'flex flex-col justify-between w-full p-4 border border-gray-300 rounded-lg h-full transition-all duration-300',
        !open && 'bg-gray-100 dark:bg-gray-800 shadow-sm border-opacity-20',
        !open && !active && 'hover:bg-gray-200 hover:dark:bg-gray-700 cursor-pointer',
        open && 'cursor-pointer border-opacity-0'
      )
    }>
      <div className="flex justify-between items-center">
        <div>
          <p className={clsx(
            'title font-medium',
            !open && 'line-clamp-1 max-w-[250px]',
            open && 'mb-2'
          )}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit
          </p>
          <p className={clsx(
            'description text-xs text-gray-600 dark:text-gray-400',
            !open && 'line-clamp-2 max-w-[200px]',
            open && 'h-[100px] overflow-scroll'
          )}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel harum in fuga quos reiciendis laudantium? Suscipit qui modi rem sit in reiciendis beatae a, sequi eveniet, laboriosam facilis, dolores praesentium?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel harum in fuga quos reiciendis laudantium? Suscipit qui modi rem sit in reiciendis beatae a, sequi eveniet, laboriosam facilis, dolores praesentium?
          </p>
        </div>
        <div className={clsx(
          'w-[25px] h-[25px] rounded-full flex justify-center items-center',
          open && 'hidden',
          active && 'bg-blue-500',
          !active && 'bg-white border border-gray-400 dark:opacity-35 opacity-60 dark:bg-gray-700'
        )}>
          <i className={clsx(
            'fa fa-check text-sm relative top-[1px]',
            active && 'text-white',
            !active && 'text-gray-400'
          )}></i>
        </div>
      </div>
      <div>
        <div className="w-full bg-gray-500 opacity-10 h-[1px] my-2"></div>
        <div className="flex text-sm justify-between">
          <div className="opacity-90">
            Wednesday 14 feb 2024
          </div>
          <div className="text-white text-xs w-[25px] h-[25px] bg-orange-500 font-bold rounded-full flex justify-center items-center">
            XX
          </div>
        </div>
      </div>
    </div>
  )
}