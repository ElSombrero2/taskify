import { Badge } from "@/ui/components/Badges/Badge/Badge";
import { Button } from "@/ui/components/Buttons/Button/Button";
import { Modal } from "@/ui/components/Modal/Modal"
import { States } from "@/utils/states"

export const Details = () => {
  const state = States[0];
  return (
    <Modal open className="w-[565px] h-full float-right shadow-lg dark:bg-gray-900 bg-gray-200 rounded-l-lg">
      <div className="w-full border-b flex items-center justify-between p-4 px-6">
        <div className="flex gap-2 items-center">
          <button className="text-lg">
            <i className="fa fa-xmark"></i>
          </button>
          <span className="opacity-40">|</span>
          <div className="flex items-center gap-2">
            <span className="font-bold">file</span>/ 
            <span className="font-bold">path</span>/ 
            <span className="font-bold">for</span>/ 
            <span className="font-bold">your</span>/
            <span className="font-bold">file.rs</span>
          </div>
        </div>

        <div className="flex gap-8 items-center">
          <button>
            <i className="fa-solid fa-share-nodes"></i>
          </button>

          <button>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </div>
      </div>
      <div className="max-h-[90vh] overflow-y-scroll">
        <div className="p-6 flex flex-col gap-8">
          <p className="text-3xl font-bold">
            A long long long title
          </p>

          <div className="flex flex-col gap-5">
            <div className="flex items-center">
              <div className="flex items-center gap-3 w-[130px] opacity-50">
                <i className="fa-solid fa-bullseye"></i>
                <p>Status</p>
              </div>
              {/*------------------------------------------------------------*/}
              <div className="flex items-center gap-3">
                <i className={`${state.className} fa fa-circle text-[10px]`}></i>
                <p>{state.label}</p>
              </div>
            </div>
            {/*------------------------------------------------------------*/}
            <div className="flex items-center">
              <div className="flex items-center gap-3 w-[130px] opacity-50">
                <i className="fa-solid fa-calendar"></i>
                <p>Date</p>
              </div>

              <p className="text-sm">28 December 2024 - 11:32</p>
            </div>
            {/*------------------------------------------------------------*/}
            <div className="flex items-center">
              <div className="flex items-center gap-3 w-[130px] opacity-50">
              <i className="fa-regular fa-user"></i>
                <p>Author</p>
              </div>

              <div className="flex items-center">
                <div className="w-[30px] z-10 h-[30px] text-white bg-orange-700 text-xs rounded-full flex justify-center items-center font-extrabold">
                  NR
                </div>
                <div className="-translate-x-5 p-1 pr-2 pl-7 text-xs dark:bg-gray-700 bg-gray-300 rounded-full">
                  Rakotondrasoa Nirilala
                </div>
              </div>
            </div>
            {/*------------------------------------------------------------*/}
            <div className="flex items-start">
              <div className="flex items-center gap-3 w-[130px] opacity-50">
                <i className="fa-solid fa-hashtag"></i>
                <p>Tags</p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge size="xs">
                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-tag"></i>
                    Tag
                  </div>
                </Badge>
                <Badge size="xs" theme="secondary">
                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-tag"></i>
                    Tag
                  </div>
                </Badge>
                <Badge size="xs" theme="warning">
                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-tag"></i>
                    Tag
                  </div>
                </Badge>
              </div>
            </div>
            {/*------------------------------------------------------------*/}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 w-[130px] opacity-50">
                <i className="fa-regular fa-file-lines"></i>
                <p>Description</p>
              </div>
              <p className="p-3 border border-gray-500 border-opacity-20 rounded-lg">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Libero tenetur voluptas voluptatum deleniti architecto accusantium soluta saepe quos,
                sed sint beatae recusandae magni placeat sunt dignissimos labore earum fuga iure?
              </p>
            </div>
            {/*------------------------------------------------------------*/}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 w-[130px] opacity-50">
                  <i className="fa-solid fa-paperclip"></i>
                  <p>Attachments</p>
                </div>
                <Button size="sm" type="link">
                  <i className="fa fa-download"></i>
                  Download all
                </Button>
              </div>
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
            </div>
          </div>
        </div>

        {/*------------------------------------------------------------*/}
        <div className="flex items-center p-4 px-6 border-b">
          <p className="text-lg font-bold">
            Subtasks
          </p>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p><p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p><p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p>
          <p>Text Subtext</p><p>Text Subtext</p>
          <p>Text Subtext</p>
          <p className="bg-red-200">Text Subtext</p>

        </div>
      </div>
      {/*------------------------------------------------------------*/}
      
    </Modal>
  )
}