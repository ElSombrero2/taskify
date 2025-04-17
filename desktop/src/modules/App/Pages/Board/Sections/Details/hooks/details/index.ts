import { Board } from "@/types/board";
import { Task } from "@/types/task";
import { useState } from "react";

export const useDetails = (board?: Board) => {
    const [showDetail, setShowDetail] = useState(false);
    const [id, setId] = useState<string | undefined>();

    const onCardClicked = (task: Task) => {
        setShowDetail(true);
        setId(task?.id);
    }
    
    // Allow to get realtime update because the board is refreshed
    // when file are changing
    const task = () => board?.tasks.find((t) => t.id.startsWith(id || ' '));

    return { onCardClicked, task, showDetail, setShowDetail }
}