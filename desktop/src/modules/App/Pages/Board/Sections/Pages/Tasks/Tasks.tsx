import { useBoard } from "@/store/board/board"
import { Pills } from "@/ui/components/Badges/Pills/Pills"
import { Title } from "./Cards/Title/Title"
import { Column } from "./Column/Column"
import './Tasks.scss'
import { States } from "@/utils/states"
import { If } from "@/shared/components/Operators/If/If"
import { Loader } from "./Loader/Loader"
import { Details } from "./Details/Details"

export const Tasks = () => {
  const { tasks, loading } = useBoard()

  return (
    <div className="flex p-4 flex-col gap-8 overflow-auto scrollable" data-dnd onDragOver={(e) => e.preventDefault()}>
      <div className="flex w-full gap-10 h-[calc(100vh-266px)]">
        {States.map((state, index) => (
          <If condition={!loading} key={`${state}-${index}`} fallback={<Loader />} >
            <Column state={state.type} tasks={tasks?.[state.type]}>
              <Title className={state.className}>
                <div className="flex items-center w-full justify-between">
                  {state.label}
                  <Pills size="xs" theme={state.theme}>3</Pills>
                </div>
              </Title>
            </Column>
          </If>
        ))}
      </div>
      <Details />
    </div>
  )
}