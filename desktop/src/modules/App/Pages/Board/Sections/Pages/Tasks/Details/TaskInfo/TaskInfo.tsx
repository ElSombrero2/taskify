import { Task } from "@/types/task"
import { InfoText } from "../InfoText/InfoText"
import { Badge } from "@/ui/components/Badges/Badge/Badge";
import { useAvatar } from "@/hooks/avatar";
import { If } from "@/shared/components/Operators/If/If";
import { useTaskState } from "@/hooks/task-state";
import { DateTime } from 'luxon'
import { toISO } from "@/utils/to-iso";

export const TaskInfo = ({ task }: { task?: Task }) => {
    const state = useTaskState(task?.state);
    const {color, initial} = useAvatar(task?.info?.author?.name);

    return (
        <>
            <InfoText icon="fa-solid fa-bullseye" title="Status">
                <div className="flex items-center gap-3">
                    <i className={`${state.className} fa fa-circle text-[10px]`}></i>
                    <p>{state.label}</p>
                </div>
            </InfoText>
            <If condition={!!task?.info?.date}>
                <InfoText icon="fa-solid fa-calendar" title="Date">
                    <p className="text-sm">{DateTime.fromISO(toISO(task?.info.date)).toFormat('dd LLLL yyyy - HH:mm')}</p>
                </InfoText>
            </If>

            <If condition={!!task?.info.author?.name}>
                <InfoText icon="fa-regular fa-user" title="Author">
                    <div className="flex items-center">
                        <div style={{background: color}} className="w-[30px] z-10 h-[30px] text-white text-xs rounded-full flex justify-center items-center font-extrabold">
                            {initial}
                        </div>
                        <div className="-translate-x-5 p-1 pr-2 pl-7 text-xs dark:bg-gray-700 bg-gray-300 rounded-full">
                            {task?.info.author?.name}
                        </div>
                    </div>
                </InfoText>
            </If>

            <If condition={!!task?.tags?.length}>
                <InfoText icon="fa-solid fa-hashtag" title="Tags">
                    <div className="flex items-center gap-2 flex-wrap">
                        {task?.tags.map((tag, index) => (
                            <Badge size="xs" key={`detail-tag-${tag}-${index}`}>
                                <div className="flex gap-2 items-center">
                                    <i className="fa-solid fa-tag"></i>
                                    {tag}
                                </div>
                            </Badge>
                        ))}
                    </div>
                </InfoText>
            </If>
        </>
    )
}