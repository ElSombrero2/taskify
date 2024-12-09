import { Button } from "../../../../../ui/components/Buttons/Button/Button"

export const Options = ({name}: {name: string}) => {
  return (
    <div className="flex justify-between border-b p-4 px-6">
      <p className="text-2xl font-bold">{name}</p>
      <div className="flex items-center gap-2">
        <Button size="sm" theme="secondary">
          <i className="fa fa-upload"></i>
          Export
        </Button>
        <Button size="sm" theme="secondary">
          <i className="fa-solid fa-ellipsis"></i>
        </Button>
      </div>
    </div>
  )
}