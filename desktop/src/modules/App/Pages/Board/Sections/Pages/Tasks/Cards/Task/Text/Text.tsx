import { useTags } from "@/hooks/tag";
import { LinkPlugin } from "@/plugins/markdown/link/link";
import { Load } from "@/plugins/markdown/loader/loader";
import { TagPlugin } from "@/plugins/markdown/tags/tags";
import { If } from "@/shared/components/Operators/If/If";
import clsx from "clsx";
import Markdown from "react-markdown"

export const Text = ({title, description, tags}: {title: string; description?: string, tags?: string[]}) => {
  const { priority, type } = useTags(tags);
  
  return (
    <div className="flex flex-col gap-1">
      <div>
        <div className="flex gap-2 items-center float-start relative top-1 mr-1">
          <If condition={!!type}>
            <span className={clsx(
              type?.background,
              'block text-white text-[12px] w-[18px] h-[18px] rounded-sm',
              'flex items-center justify-center'
              )}>
              <i className={type?.icon}></i>
            </span>
          </If>
          <If condition={!!priority}>
            <span className={clsx(
              priority?.color,
              'rounded-sm text-sm',
              )}
            >
              <i className={priority?.icon}></i>
            </span>
          </If>
        </div>
        <Markdown
            rehypePlugins={[Load([LinkPlugin, TagPlugin])]}
            className="prose dark:text-gray-100 dark:prose-invert"
          >
        {title}
        </Markdown>
      </div>
      {!!description && (
        <p className="text-xs line-clamp-1 dark:text-gray-400 text-gray-500">
          {description}
        </p>
      )}
    </div>
  )
}