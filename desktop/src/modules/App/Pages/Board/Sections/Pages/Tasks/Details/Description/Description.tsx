import Markdown from "react-markdown"
import { InfoText } from "../InfoText/InfoText"
import remarkGfm from "remark-gfm"

export const TaskDescription = ({description}: {description: string}) => {
  return (
    <InfoText icon="fa-regular fa-file-lines" vertical title="Description">
      <div className="p-3 border border-gray-500 border-opacity-20 rounded-lg">
        <Markdown
          remarkPlugins={[remarkGfm]}
          className="prose dark:text-gray-100 dark:prose-invert text-sm"
        >
          {description}
        </Markdown>
      </div>
    </InfoText>
  )
}