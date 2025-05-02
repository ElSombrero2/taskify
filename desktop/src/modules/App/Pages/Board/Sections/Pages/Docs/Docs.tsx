import { LinkPlugin } from "@/plugins/markdown/link/link";
import { Load } from "@/plugins/markdown/loader/loader";
import { TagPlugin } from "@/plugins/markdown/tags/tags";
import { useBoard } from "@/store/board/board"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm";

export const Docs = () => {
    const { readme } = useBoard();

    return (
        <div className="overflow-y-auto h-[calc(100vh-266px)] scrollable w-full">
            {readme && <Markdown rehypePlugins={[Load([LinkPlugin, TagPlugin]), remarkGfm]}
                className="prose dark:text-gray-100 dark:prose-invert min-w-full"
            >
                {readme}
            </Markdown>}
        </div>
    )
}