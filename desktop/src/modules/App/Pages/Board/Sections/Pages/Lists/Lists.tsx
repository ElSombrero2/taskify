import "./Lists.scss";
import { Avatar } from "@/shared/components/Avatar/Avatar";
import { useBoard } from "@/store/board/board"
import { TaskState } from "@/types/task";
import { Badge } from "@/ui/components/Badges/Badge/Badge";
import { createAvatar } from "@/utils/avatar";
import { States } from "@/utils/states";

/*
  [TODO]: Change the design of the list #story
  Change the design of the list based on these image
  ![image](https://cdn.dribbble.com/userupload/21952779/file/original-8a57756da186e0a0fbebc5e625e241dd.jpg?resize=752x564&vertical=center)
*/
export const Lists = () => {
  const { board } = useBoard();
  const getStates = (state: TaskState) => States.find((s) => s.type === state);

  return (
    <div className="p-4 overflow-y-auto h-[calc(100vh-266px)] scrollable">
      <table className="w-full">
        <thead className="border-b-2 text-left dark:bg-slate-800">
          <tr>
            <th>Summary</th>
            <th>Date</th>
            <th>Tags</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {board?.tasks.map((task) => (
            <tr key={task.id} className="border-b dark:bg-slate-800">
              <td>
                <div className="flex flex-row gap-4">
                  {!!task?.info?.author?.name && <Avatar avatar={createAvatar(task.info.author.name)} />}
                  <span>{task.title}</span>
                </div>
              </td>
              <td>{task.info.date || '-'}</td>
              <td>
                <div className="flex gap-2">
                  {task.tags.slice(0, 2).map((t) => (
                    <Badge key={`badge-${t}`}>
                      {t}
                    </Badge>
                  ))}
                </div>
              </td>
              <td className="gap-4">
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