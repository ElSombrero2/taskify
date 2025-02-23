import { useBoard } from "@/store/board/board"
import { TaskState } from "@/types/task";
import { Badge } from "@/ui/components/Badges/Badge/Badge";
import { States } from "@/utils/states";

export const Lists = () => {
  const { board } = useBoard();
  const getStates = (state: TaskState) => States.find((s) => s.type === state);

  return (
    <div className="p-4">
      <table className="w-full">
        <thead className="border-b-2 text-left">
        <tr>
          <th className="p-3">State</th>
          <th className="p-3">Summary</th>
          <th className="p-3">Author</th>
          <th className="p-3">Date</th>
          <th className="p-3">Tags</th>
        </tr>
        </thead>
        <tbody>
          {board?.tasks.map((task) => (
            <tr key={task.id} className="border-b">
              <td className="p-3 flex items-center gap-4">
                <i className={`${getStates(task.state)?.className} fa fa-circle text-[10px]`}></i>
                <span className={getStates(task.state)?.className}>{getStates(task.state)?.label}</span>
              </td>
              <td className="p-3">{task.title}</td>
              <td className="p-3">{task.info.author?.name || '-'}</td>
              <td className="p-3">{task.info.date || '-'}</td>
              <td className="p-3 flex gap-2">{task.tags.slice(0, 2).map((t) => (
                <Badge key={`badge-${t}`}>
                  {t}
                </Badge>
              ))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}