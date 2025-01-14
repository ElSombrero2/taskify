import { Modal } from "@/ui/components/Modal/Modal"
import clsx from "clsx";
import { Header } from "./Header/Header";
import { Task } from "@/types/task";
import { TaskInfo } from "./TaskInfo/TaskInfo";
import { If } from "@/shared/components/Operators/If/If";
import { TaskDescription } from "./Description/Description";
import { Attachments } from "./Attachments/Attachments";

export const Details = ({open, onClickExit, task}: {task?: Task, open?: boolean, onClickExit?: () => void}) => {

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
    >
      <Header path={task?.info?.filename || ''} onClickExit={onClickExit} />
      <div className="max-h-[90vh] overflow-y-scroll">
        <div className="p-6 flex flex-col gap-8">
          <p className="text-3xl font-bold">
            {task?.title}
          </p>

          <div className="flex flex-col gap-5">
            <TaskInfo task={task} />
              <If condition={!!task?.description}>
                <TaskDescription description={task?.description!} />
              </If>
            <Attachments />
          </div>
        </div>
      </div>
    </Modal>
  )
}