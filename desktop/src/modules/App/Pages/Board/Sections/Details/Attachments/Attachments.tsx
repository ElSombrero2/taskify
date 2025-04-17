import { Button } from "@/ui/components/Buttons/Button/Button"
import { InfoText } from "../InfoText/InfoText"
import { AttachedFile } from "@/types/task"
import { FileCard } from "./FileCard/FileCard"

export const Attachments = ({ files }: {files: AttachedFile[]}) => {
  return (
    <InfoText
      icon="fa-regular fa-file-lines"
      vertical
      title="Attachments"
      action={(
        <Button size="sm" type="link">
          <i className="fa fa-download"></i>
          Download all
        </Button>
      )}
    >
      <div className="flex overflow-auto gap-5 scrollable pb-4">
        {files.map((file, index) => (
          <FileCard
            key={`${file.name}-${index}`}
            file={file}
          />
        ))}
      </div>
    </InfoText>
  )
}