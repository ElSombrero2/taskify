import { useBoard } from "@/store/board/board"
import { Button } from "@/ui/components/Buttons/Button/Button"
import { Skeleton } from "@/ui/components/Skeleton/Skeleton";
import { Switch } from "@/shared/components/Operators/Switch/Switch";

export const Options = () => {
  const {loading, board} = useBoard();
  return (
    <div className="flex justify-between border-b p-4 px-6">
      <div>
        <Switch condition={!loading} fallback={<Skeleton className="h-full w-[350px]" />}>
          <p className="text-2xl font-bold">{board?.name}</p>
        </Switch>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" theme="secondary">
          <i className="fa fa-upload"></i>
          Export
        </Button>
        <Button size="sm" theme="secondary">
          <i className="fa-solid fa-ellipsis"></i>
        </Button>
      </div>
    </div>
  )
}