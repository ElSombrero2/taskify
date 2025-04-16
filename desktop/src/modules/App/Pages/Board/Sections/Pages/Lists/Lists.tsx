import "./Lists.scss";
import { Avatar } from "@/shared/components/Avatar/Avatar";
import { useBoard } from "@/store/board/board"
import { TaskState } from "@/types/task";
import { Badge } from "@/ui/components/Badges/Badge/Badge";
import { createAvatar } from "@/utils/avatar";
import { findLevelAndType } from "@/utils/find-level-and-type";
import { States } from "@/utils/states";
import { toISO } from "@/utils/to-iso";
import clsx from "clsx";
import { DateTime } from "luxon";

/*
  [TODO]: Change the design of the list
  A new #improvment to priority #high: change the design of the list because
  it's very bad now, so create a list based on this image:  
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
            <th>Author</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {board?.tasks.map((task) => (
            <tr key={task.id} className="border-b dark:bg-slate-800">
              <td>
                <div className="flex flex-row gap-4">
                  {(() => {
                    const { priority, type } = findLevelAndType(task.tags);
                    return (
                      <div className="flex gap-2 justify-center items-center">
                        {type && <span className={clsx(
                          type.background,
                          'block text-white text-xs w-[20px] h-[20px] rounded-sm',
                          'flex items-center justify-center'
                        )}>
                          <i className={type.icon}></i>
                        </span>}
                        {priority && <span className={clsx(
                          priority?.color,
                          'block rounded-sm',
                        )}>
                          <i className={priority.icon}></i>
                        </span>}
                      </div>
                    )
                  })()}
                  <span>{task.title}</span>
                </div>
              </td>
              <td>
                {task.info.author && <div className="flex items-center gap-3">
                  <Avatar avatar={createAvatar(task.info.author.name)} />
                  <span>{task.info.author.name}</span>
                </div>}
              </td>
              <td>{
                (
                  task.info.date
                  && DateTime.fromISO(toISO(task.info.date)).toFormat('LLL dd yyyy - hh:mm')
                )
                || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}