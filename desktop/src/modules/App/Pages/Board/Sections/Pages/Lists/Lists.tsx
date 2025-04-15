import { Avatar } from "@/shared/components/Avatar/Avatar";
import { useBoard } from "@/store/board/board"
import { TaskState } from "@/types/task";
import { Badge } from "@/ui/components/Badges/Badge/Badge";
import { createAvatar } from "@/utils/avatar";
import { States } from "@/utils/states";

export const Lists = () => {
  const { board } = useBoard();
  const getStates = (state: TaskState) => States.find((s) => s.type === state);

  return (
    <div className="p-4 overflow-y-auto h-[calc(100vh-266px)] scrollable">
      <table className="w-full">
        <thead className="border-b-2 text-left bg-slate-800">
          <tr>
            <th className="p-2">Summary</th>
            <th className="p-2">Date</th>
            <th className="p-2">Tags</th>
            <th className="p-2">State</th>
          </tr>
        </thead>
        <tbody>
          {board?.tasks.map((task) => (
            <tr key={task.id} className="border-b">
              <td className="p-2">
                <div className="flex flex-row gap-4">
                  {!!task?.info?.author?.name && <Avatar avatar={createAvatar(task.info.author.name)} />}
                  <span>{task.title}</span>
                </div>
              </td>
              <td className="p-2">{task.info.date || '-'}</td>
              <td className="p-2 flex gap-2">
                {task.tags.slice(0, 2).map((t) => (
                  <Badge key={`badge-${t}`}>
                    {t}
                  </Badge>
                ))}
              </td>
              <td className="p-2 gap-4">
                <div className="flex items-center gap-4">
                  <i className={`${getStates(task.state)?.className} fa fa-circle text-[10px]`}></i>
                  <span className={getStates(task.state)?.className}>{getStates(task.state)?.label}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}