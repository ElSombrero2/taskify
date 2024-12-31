import { Button } from "@/ui/components/Buttons/Button/Button"
import { InfoText } from "../InfoText/InfoText"

export const Attachments = () => {
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
      <div className="flex overflow-auto gap-5 scrollable pb-2">
        <div className="flex items-center gap-3 p-4 border border-gray-500 border-opacity-40 w-[250px] rounded-lg">
          <i className="fa-regular fa-file-pdf text-rose-500 text-4xl"></i>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-bold line-clamp-1">my-long-file-name.pdf</p>
            <div className="flex text-xs items-center gap-3">
              <p>
                1.2 mb
              </p>
              <i className="fa fa-circle text-[5px]"></i>
              <a href="" className="flex items-center gap-2 text-blue-500">
                <i className="fa fa-download"></i>
                {' '}
                Download
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 border border-gray-500 border-opacity-40 w-[250px] rounded-lg">
          <i className="fa-regular fa-file-powerpoint text-orange-500 text-4xl"></i>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-bold line-clamp-1">slide.pptx</p>
            <div className="flex text-xs items-center gap-3">
              <p>
                4.6 mb
              </p>
              <i className="fa fa-circle text-[5px]"></i>
              <a href="" className="flex items-center gap-2 text-blue-500">
                <i className="fa fa-download"></i>
                {' '}
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </InfoText>
  )
}