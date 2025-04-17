import { useBoard } from "@/store/board/board"
import { Pills } from "@/ui/components/Badges/Pills/Pills"
import { Title } from "./Cards/Title/Title"
import { Column } from "./Column/Column"
import { States } from "@/utils/states"
import { Switch } from "@/shared/components/Operators/Switch/Switch"
import { Loader } from "./Loader/Loader"
import { Details } from "../../Details/Details"
import { useDetails } from "../../Details/hooks/details"
import './Tasks.scss'

export const Tasks = () => {
  const { tasks, board, loading } = useBoard()
  const { onCardClicked, task, showDetail, setShowDetail } = useDetails(board);

  return (
    <div className="flex p-4 flex-col gap-8 overflow-auto scrollable" data-dnd onDragOver={(e) => e.preventDefault()}>
      <div className="flex w-full gap-10 h-[calc(100vh-266px)]">
        {States.map((state, index) => (
          <Switch condition={!loading} key={`${state}-${index}`} fallback={<Loader />} >
            <Column onCardClicked={onCardClicked} state={state.type} tasks={tasks?.[state.type]}>
              <Title className={state.className}>
                <div className="flex items-center w-full justify-between">
                  {state.label}
                  <Pills
                    size="xs"
                    theme={state.theme}
                  >
                    {tasks?.[state.type]?.length || 0}
                  </Pills>
                </div>
              </Title>
            </Column>
          </Switch>
        ))}
      </div>
      <Details
        task={task()}
        onClickExit={() => setShowDetail(false)}
        open={showDetail}
      />
    </div>
  )
}