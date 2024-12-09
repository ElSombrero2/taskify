import { Button } from "../../../../../ui/components/Buttons/Button/Button"
import { Input } from "../../../../../ui/components/Form/Input/Input"

export const Header = ({name}: {name: string}) => {
  return (
    <div className="flex justify-between border-b p-4 px-6">
      <div className="text-md flex gap-3 items-center">
        <i className="fa fa-folder"></i>
        <span className="font-thin opacity-70">Folder /</span>
        <span className="font-thin opacity-70">Project /</span>
        <span className="font-semibold">{name}</span>
      </div>
      <div className="flex items-center gap-2">
        <Input
          size="sm"
          placeholder="Search"
          icon={<i className="text-sm fa fa-search"></i>}
        />
        <Button size="sm" type="outline" theme="secondary">
          <i className="fa fa-bell"></i>
        </Button>
        <Button size="sm" type="outline" theme="secondary">
          <i className="fa fa-message"></i>
        </Button>
      </div>
    </div>
  )
}