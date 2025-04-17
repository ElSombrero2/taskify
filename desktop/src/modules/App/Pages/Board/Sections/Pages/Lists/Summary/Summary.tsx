import { If } from "@/shared/components/Operators/If/If"
import { Task } from "@/types/task"
import clsx from "clsx"
import { LinkPlugin } from "@/plugins/markdown/link/link";
import { TagPlugin } from "@/plugins/markdown/tags/tags";
import Markdown from "react-markdown"
import { useTags } from "@/hooks/tag";

export const Summary = ({ task }: {task: Task}) => {
    const { type, priority } = useTags(task.tags);

    return (
         <div className="flex flex-row gap-2">
            <div className="flex gap-2 justify-center items-center">
                <If condition={!!type}>
                    <span className={clsx(
                        type?.background,
                        'block text-white text-xs w-[20px] h-[20px] rounded-sm',
                        'flex items-center justify-center'
                        )}>
                        <i className={type?.icon}></i>
                    </span>
                </If>
                <If condition={!!priority}>
                    <span className={clsx(
                    priority?.color,
                    'block rounded-sm',
                    )}>
                    <i className={priority?.icon}></i>
                    </span>
                </If>
            </div>
            <Markdown
            rehypePlugins={[LinkPlugin, TagPlugin]}
            className="prose dark:text-gray-100 dark:prose-invert"
            >
                {task.title}
            </Markdown>
        </div>
    )
}