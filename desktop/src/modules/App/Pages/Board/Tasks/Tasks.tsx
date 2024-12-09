import { useState } from "react"
import { GroupedTasks } from "../../../../../types/task"
import { Pills } from "../../../../../ui/components/Badges/Pills/Pills"
import { Modal } from "../../../../../ui/components/Modal/Modal"
import { Title } from "./Cards/Title/Title"
import { Column } from "./Column/Column"
import './Tasks.scss'

export const Tasks = ({tasks}: {tasks?: GroupedTasks}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex p-4 flex-col gap-8 overflow-auto">
      <button onClick={() => setShow(true)}>Open</button>
      <div className="flex w-full gap-10 max-h-[calc(100vh-255px)]">
        <Column tasks={tasks?.['TODO']}>
          <Title className="text-blue-500">
            <div className="flex items-center w-full justify-between">
              To do
              <Pills size="xs">3</Pills>
            </div>
          </Title>
        </Column>

        <Column tasks={tasks?.['READY']}>
          <Title className="text-green-500">
            <div className="flex items-center w-full justify-between">
              Ready
              <Pills theme="success" size="xs">3</Pills>
            </div>
          </Title>
        </Column>

        <Column tasks={tasks?.['WIP']}>
          <Title className="text-rose-500">
            <div className="flex items-center w-full justify-between">
              Work in Progress
              <Pills theme="danger" size="xs">3</Pills>
            </div>
          </Title>
        </Column>

        <Column tasks={tasks?.['TESTING']}>
          <Title className="text-orange-500">
            <div className="flex items-center w-full justify-between">
              Testing
              <Pills theme="warning" size="xs">3</Pills>
            </div>
          </Title>
        </Column>

        <Column tasks={tasks?.['DONE']}>
          <Title className="text-green-500">
            <div className="flex items-center w-full justify-between">
              Done
              <Pills theme="success" size="xs">3</Pills>
            </div>
          </Title>
        </Column>

        <Modal open={show} onBackDropClick={() => setShow(false)} className="w-[530px] h-full float-right shadow-lg bg-gray-100 p-20 rounded-lg">
          
        </Modal>
      </div>
    </div>
  )
}