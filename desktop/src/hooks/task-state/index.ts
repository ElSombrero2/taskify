import { TaskState } from "@/types/task";
import { States } from "@/utils/states";
import { useEffect, useState } from "react";

export const useTaskState = (taskState?: TaskState) => {
    const [state, setState] = useState(States[0]);
    useEffect(() => {
      taskState && setState(States.find((s) => s.type === taskState) || States[0]);
    }, [taskState]);

    return state;
}