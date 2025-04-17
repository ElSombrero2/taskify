import "./Lists.scss";
import { Avatar } from "@/shared/components/Avatar/Avatar";
import { If } from "@/shared/components/Operators/If/If";
import { useBoard } from "@/store/board/board"
import { Badge } from "@/ui/components/Badges/Badge/Badge";
import { Theme } from "@/ui/types/theme";
import { createAvatar } from "@/utils/avatar";
import { findLevelAndType } from "@/utils/find-level-and-type";
import { StatesMap } from "@/utils/states";
import clsx from "clsx";
import { LinkPlugin } from "@/plugins/markdown/link/link";
import { TagPlugin } from "@/plugins/markdown/tags/tags";
import Markdown from "react-markdown"

/*
  [DONE]: Change the design of the list
  A new #improvment to priority #high: change the design of the list because
  it's very bad now, so create a list based on this image:  
  ![image](https://cdn.dribbble.com/userupload/21952779/file/original-8a57756da186e0a0fbebc5e625e241dd.jpg?resize=752x564&vertical=center)
*/
export const Lists = () => {
  const { board } = useBoard();

   /*
    [READY]: Refactoring on the list page
    Make a refactoring on the list and create components for
    all list item to make changes easier
    #improvment #low
  */
  return (
    <div className="p-4 overflow-y-auto h-[calc(100vh-266px)] scrollable">
      <table className="w-full">
        <thead className="border-b-2 text-left">
          <tr>
            <th>Summary</th>
            <th colSpan={3}></th>
          </tr>
        </thead>
        <tbody>
          {
            /*
              [READY]: Make the list items clickable
              The list item must be clickable
              When the user click on the list item
              Then the details section will appear
              #high #improvment
            */
          board?.tasks.map((task) => (
            <tr key={task.id} className="border-b">
              <td>
                <div className="flex flex-row gap-4">
                  {(() => {
                    const { type, priority } = findLevelAndType(task.tags);
                    return (
                      <div className="flex gap-2 justify-center items-center">
                        <If condition={!!type}>
                          <span className={clsx(
                            type?.background,
                            'block text-white text-xs w-[20px] h-[20px] rounded-sm',
                            'flex items-center justify-center'
                          )}>
                            <i className={type?.icon}></i>
                          </span>
                        </If>
                        <If condition={!!priority}>
                          <span className={clsx(
                            priority?.color,
                            'block rounded-sm',
                          )}>
                            <i className={priority?.icon}></i>
                          </span>
                        </If>
                      </div>
                    )
                  })()}
                 <Markdown
                    rehypePlugins={[LinkPlugin, TagPlugin]}
                    className="prose dark:text-gray-100 dark:prose-invert"
                  >
                    {task.title}
                  </Markdown>
                </div>
              </td>
              <td className="flex flex-row-reverse gap-2">
                {task.info.author && <div className="flex items-center gap-3">
                  <Avatar avatar={createAvatar(task.info.author.name)} />
                </div>}
                {(() => {
                  const state = StatesMap[task.state];
                  return (
                    <Badge variant="ghost" size="sm" theme={state.theme as Theme}>
                      {state.label}
                    </Badge>
                  )
                })()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}