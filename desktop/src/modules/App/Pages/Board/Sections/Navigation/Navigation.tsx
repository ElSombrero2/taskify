import { TabItem } from "@/ui/components/Tabs/Item/Item"
import { Button } from "@/ui/components/Buttons/Button/Button"

export const Navigation = () => {
  return (
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
        <Button size="sm" theme="secondary">
          <i className="fa-solid fa-arrow-down-short-wide"></i>
          Sort
        </Button>
        <Button size="sm" theme="secondary">
          <i className="fa-solid fa-filter"></i>
          More filters
        </Button>
      </div>
    </div>
  )
}