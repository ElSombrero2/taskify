import { TabItem } from "../../../../ui/components/Tabs/Item/Item"

export const Board = () => {
  return (
    <div>
      <div className="flex justify-between border-b p-4 px-6">
        <div className="text-md flex gap-3 items-center">
          <i className="fa fa-folder"></i>
          <span className="font-thin opacity-70">Folder /</span>
          <span className="font-thin opacity-70">Project /</span>
          <span className="font-semibold">Project Name</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm min-h-[34px] p-1 px-4 border flex items-center gap-2 rounded-md">
            <i className="fa fa-search"></i>
            <input 
              type="text" 
              className="bg-transparent outline-none"
              placeholder="Search"
            />
          </div>
          
          <button className="text-sm min-h-[34px] p-1 px-4 border flex items-center gap-2 rounded-md">
            <i className="fa fa-bell"></i>
          </button>
          <button className="text-sm min-h-[34px] p-1 px-4 border flex items-center gap-2 rounded-md">
            <i className="fa fa-message"></i>
          </button>
        </div>
      </div>
      <div className="flex justify-between border-b p-4 px-6">
        <p className="text-2xl font-bold">Project Name</p>

        <div className="flex items-center gap-2">
          <button className="text-sm min-h-[34px] p-1 px-4 border flex items-center gap-2 rounded-md dark:bg-gray-800 bg-gray-300 bg-opacity-60">
            <i className="fa fa-upload"></i>
            Export
          </button>
          <button className="text-xs min-h-[34px] p-1 px-4 border flex items-center gap-2 rounded-md dark:bg-gray-800 bg-gray-300 bg-opacity-60">
            <i className="fa-solid fa-ellipsis"></i>
          </button>
        </div>
      </div>

      <div className="flex justify-between border-b p-2 px-6">
        <div className="flex gap-8 text-sm items-center">
          <TabItem className="flex items-center gap-2">
            <i className="fa-solid fa-table"></i>
            Board
          </TabItem>
          <TabItem theme="secondary" className="flex items-center gap-2">
            <i className="fa-solid fa-timeline"></i>
            Timeline
          </TabItem>
          <TabItem theme="secondary" className="flex items-center gap-2">
            <i className="fa-solid fa-list-check"></i>
            List
          </TabItem>
          <TabItem theme="secondary" className="flex items-center gap-2">
            <i className="fa-brands fa-markdown"></i>
            Docs
          </TabItem>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs min-h-[34px] p-1 px-4 border flex items-center gap-2 rounded-md dark:bg-gray-800 bg-gray-300 bg-opacity-60">
            <i className="fa-solid fa-arrow-down-short-wide"></i>
            Sort
          </button>
          <button className="text-xs min-h-[34px] p-1 px-4 border flex items-center gap-2 rounded-md dark:bg-gray-800 bg-gray-300 bg-opacity-60">
            <i className="fa-solid fa-filter"></i>
            More filters
          </button>
        </div>
      </div>
    </div>
  )
}