import { useAvatar } from "../../../../../../../hooks/avatar"
import { Task } from "../../../../../../../types/task"
import { Badge } from "../../../../../../../ui/components/Badges/Badge/Badge"
import { Card } from "../../../../../../../ui/components/Cards/Card/Card"

export const TaskCard = ({task}: {task: Task}) => {
  const {color, initial} = useAvatar(task.info.author?.name);

  return (
    <Card className="min-w-[320px] max-w-[320px] flex flex-col gap-3 bg-gray-100 dark:bg-gray-800 dark:bg-opacity-60">
      {!!task.tags.length && <div className="flex gap-2">
        {task?.tags?.slice(0, 2).map((tag) => (
          <Badge theme="primary" size="xs" key={tag}>
            <p className="flex gap-1 items-center">
              <i className="fa-solid fa-tag"></i>
              {tag}
            </p>
          </Badge>
        ))}
      </div>}
      <div className="flex flex-col gap-1">
        <p className="font-bold">
          {task.title}
        </p>
        {!!task.description && <p className="text-xs line-clamp-1 opacity-60">
          {task?.description
        }</p>}
      </div>
      <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-700 dark:bg-opacity-50"></div>
      <div className="flex items-center justify-between">
        <div className="text-[10px]">
          <p>
            Updated by {' '}
            <span className="font-bold">
              {task.info.author?.name || 'Unknown'}
            </span>
          </p>
          <span className="opacity-50">
            {task.info.date}
          </span>
        </div>
        <div className="text-xs text-white font-extrabold w-[28px] h-[28px] flex items-center justify-center rounded-full"
          style={{backgroundColor: color}} 
        >
          {initial}
        </div>
      </div>
    </Card>
  )
}