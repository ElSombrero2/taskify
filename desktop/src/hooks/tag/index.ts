import { findLevelAndType, SpecificTag } from "@/utils/find-level-and-type";
import { useEffect, useState } from "react";

export const useTags = (tags?: string[]) => {
    const [type, setType] = useState<SpecificTag | undefined>();
    const [priority, setPriority] = useState<SpecificTag | undefined>();

    useEffect(() => {
        if (tags) {
            const levelAndType = findLevelAndType(tags);
            setType(levelAndType.type);
            setPriority(levelAndType.priority);
        }   
    }, [tags]);

    return { type, priority };
}