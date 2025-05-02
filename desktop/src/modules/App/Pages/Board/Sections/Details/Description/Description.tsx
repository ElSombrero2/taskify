import Markdown from "react-markdown"
import { InfoText } from "../InfoText/InfoText"
import remarkGfm from "remark-gfm"
import { LinkPlugin } from "@/plugins/markdown/link/link"
import { TagPlugin } from "@/plugins/markdown/tags/tags"
import { Load } from "@/plugins/markdown/loader/loader"

/*
  [DONE]: Make tags bold
  Remove the "#" chracacter and make the
  text bold
  #improvement #trivial
*/
export const TaskDescription = ({description}: {description: string}) => {
  return (
    <InfoText icon="fa-regular fa-file-lines" vertical title="Description">
      <div className="p-3 border border-gray-500 border-opacity-20 rounded-lg">
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[Load([LinkPlugin, TagPlugin])]}
          className="prose dark:text-gray-100 dark:prose-invert text-sm"
        >
          {description}
        </Markdown>
      </div>
    </InfoText>
  )
}