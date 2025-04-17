import { LinkPlugin } from "@/plugins/markdown/link/link";
import { TagPlugin } from "@/plugins/markdown/tags/tags";
import Markdown from "react-markdown"

export const Text = ({title, description}: {title: string; description?: string}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="font-bold">
        <Markdown
            rehypePlugins={[LinkPlugin, TagPlugin]}
            className="prose dark:text-gray-100 dark:prose-invert"
          >
        {title}
        </Markdown>
      </div>
      {!!description && (
        <p className="text-xs line-clamp-1 opacity-60">
          {description}
        </p>
      )}
    </div>
  )
}