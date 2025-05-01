import { useBoard } from "@/store/board/board"
import { Button } from "@/ui/components/Buttons/Button/Button"
import { Skeleton } from "@/ui/components/Skeleton/Skeleton";
import { Switch } from "@/shared/components/Operators/Switch/Switch";
import { save } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api";

export const Options = () => {
  const {loading, board, load} = useBoard();
  
  const saveBoard = async () => {
    const path = await save({ 
      filters: [{
        name: `${board?.name}-${Date.now()}`,
        extensions: ['json'],
      }],
    });
    if (path) {
      alert (path);
      load(true);
      await invoke('save', {path, board});
      load(false);
    }
  }

  return (
    <div className="flex justify-between border-b p-4 px-6">
      <div>
        <Switch condition={!loading} fallback={<Skeleton className="h-full w-[350px]" />}>
          <p className="text-2xl font-bold">{board?.name}</p>
        </Switch>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={saveBoard} size="sm" theme="secondary">
          <i className="fa fa-upload"></i>
          Export
        </Button>
      </div>
    </div>
  )
}