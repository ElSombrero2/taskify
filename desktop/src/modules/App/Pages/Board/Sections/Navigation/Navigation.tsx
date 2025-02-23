import { TabItem } from "@/ui/components/Tabs/Item/Item"
import { Button } from "@/ui/components/Buttons/Button/Button"
import { useBoard } from "@/store/board/board";
import { useLocation } from "react-router";

export const Navigation = () => {
  const { path } = useBoard();
  const location = useLocation();

  const isActive = (path: string, name: string) => path.includes(name) ? 'primary' : 'secondary';

  return (
    <div className="flex justify-between border-b p-2 px-6">
      <div className="flex gap-8 text-sm items-center">
        <TabItem to={`main?path=${path}`} theme={isActive(location.pathname, 'main')} className="flex items-center gap-2">
          <i className="fa-solid fa-table"></i>
          Board
        </TabItem>
        <TabItem to={`list?path=${path}`} theme={isActive(location.pathname, 'list')} className="flex items-center gap-2">
          <i className="fa-solid fa-list-check"></i>
          List
        </TabItem>
        <TabItem to={`docs?path=${path}`} theme={isActive(location.pathname, 'docs')} className="flex items-center gap-2">
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