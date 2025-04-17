import { Avatar } from "@/shared/components/Avatar/Avatar";
import { If } from "@/shared/components/Operators/If/If";
import { Task } from "@/types/task";
import { Badge } from "@/ui/components/Badges/Badge/Badge";
import { Theme } from "@/ui/types/theme";
import { createAvatar } from "@/utils/avatar";
import { StatesMap } from "@/utils/states";

export const Extra = ({ task }: {task: Task}) => {
    const state = StatesMap[task.state];

    return (
        <div className="flex flex-row-reverse gap-2">
            <If condition={!!task.info.author}>
                <div className="flex items-center gap-3">
                    <Avatar avatar={createAvatar(task?.info?.author?.name)} />
                </div>
            </If>
            <If condition={!!state}>
                <Badge variant="ghost" size="sm" theme={state?.theme as Theme}>
                    {state.label}
                </Badge>
            </If>
        </div>
    )
}