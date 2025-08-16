import { useBoard } from "@/store/board/board"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm";
import { Code } from "./Code/Code";

export const Docs = () => {
    const { readme } = useBoard();

    return (
        <div className="overflow-y-auto h-[calc(100vh-266px)] scrollable w-full">
            {readme && 
							<Markdown
								components={{ code: Code}}
								rehypePlugins={[remarkGfm]}
                className="prose dark:text-gray-100 dark:prose-invert min-w-full"
							>
                {readme}
							</Markdown>
						}
        </div>
    )
}
