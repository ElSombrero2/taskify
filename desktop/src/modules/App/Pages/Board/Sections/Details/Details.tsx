import { Modal } from "@/ui/components/Modal/Modal"
import clsx from "clsx";
import { Header } from "./Header/Header";
import { Task } from "@/types/task";
import { TaskInfo } from "./TaskInfo/TaskInfo";
import { If } from "@/shared/components/Operators/If/If";
import { TaskDescription } from "./Description/Description";
import { Attachments } from "./Attachments/Attachments";
import { LinkPlugin } from "@/plugins/markdown/link/link"
import { TagPlugin } from "@/plugins/markdown/tags/tags"
import Markdown from "react-markdown"
import { Load } from "@/plugins/markdown/loader/loader";

/*
  [DONE]: Share details section to list and board
  The details section must be shared by the list and the board section
  and all the lists items must be clickable and must trigger the details
  side panel section
  #front #task #high
*/
export const Details = ({open, onClickExit, task}: {task?: Task, open?: boolean, onClickExit?: () => void}) => {
  task?.info
  return (
    <Modal
      onBackDropClick={onClickExit}
      open={open}
      className={clsx(
        'w-[565px] h-full float-right shadow-lg',
        'dark:bg-gray-900 bg-gray-200 rounded-l-lg',
        'transition-transform duration-200',
        !open && 'translate-x-[565px]',
      )}
      backdropClassName="backdrop-blur-md"
      backdropStyle={{WebkitBackdropFilter: 'blur(12px)'}}
    >
      <Header info={task?.info} onClickExit={onClickExit} />
      <div className="max-h-[90vh] overflow-y-scroll">
        <div className="p-4 flex flex-col gap-8">
          <Markdown
            rehypePlugins={[Load([LinkPlugin, TagPlugin])]}
            className="text-3xl font-bold"
          >
            {task?.title || ''}
          </Markdown>

          <div className="flex flex-col gap-5">
            <TaskInfo task={task} />
              <If condition={!!task?.description}>
                <TaskDescription description={task?.description!} />
              </If>
              {!!task && !!task?.info.attached_files.length && <Attachments files={task.info.attached_files} />}
          </div>
        </div>
      </div>
    </Modal>
  )
}