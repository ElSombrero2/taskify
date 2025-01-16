import { MimeTypes, useFileIcon } from "@/hooks/files-icon"
import { AttachedFile } from "@/types/task"

export const FileCard = ({ file }: {file: AttachedFile}) => {
  const icon = useFileIcon(file.mime_type as MimeTypes);

  return (
    <div className="flex items-center gap-3 p-4 border border-gray-500 border-opacity-40 min-w-[250px] rounded-lg">
      <i className={`fa-regular ${icon} text-5xl`}></i>
      <div className="flex flex-col gap-3 w-full">
        <p className="text-sm font-bold line-clamp-1">{file.name}</p>
        <div className="flex text-xs items-center gap-1 justify-between">
          <p>
            {(file.size/ 1000000).toFixed(2)} mb
          </p>
          <i className="fa fa-circle text-[5px]"></i>
          <a className="flex items-center gap-2 text-blue-500">
            <i className="fa fa-download"></i>
            {' '}
            Download
          </a>
        </div>
      </div>
    </div>
  )
}