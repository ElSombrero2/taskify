import { Button } from "@/ui/components/Buttons/Button/Button"
import { Dropdown } from "@/ui/components/Dropdown/Dropdown"
import { Input } from "@/ui/components/Form/Input/Input"
import { useState } from "react"
import { Item } from "../Item/Item"
import { States } from "../../../../../../../utils/states"
import { Badge } from "@/ui/components/Badges/Badge/Badge"
import { Divider } from "@/ui/components/Separators/Divider/Divider"

export const Filter = () =>  {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  
  const onSubmitText = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = e.target as HTMLInputElement;
      const value = input?.value?.trim()?.toLowerCase();
      value?.length && !tags.find(tag => tag === value) && setTags([value.split(' ').join('-'), ...tags]);
      input.value = '';
    }
  } 

  return (
    <Dropdown
      onClickOutside={() => setOpen(false)}
      open={open}
      position="right"
      button={
        <Button onClick={() => setOpen(!open)} size="sm" theme="secondary">
          <i className="fa-solid fa-filter"></i>
          More filters
        </Button>
      }
    >
      <div className="flex flex-col gap-2 p-1">
        <Input
          size="xs"
          onKeyDown={onSubmitText}
          icon={<i className="fa fa-solid fa-hashtag"></i>} 
          placeholder="Other tags" 
        />
        <Divider />
        <div className="flex flex-col gap-1 max-h-[350px] scrollable overflow-auto">
          {tags.map((tag) => (
            <Item
              defaultChecked
              type='checkbox'
              name="tags"
            >
              <div className="flex items-center gap-3">
                <i className="fa fa-solid fa-hashtag"></i>
                <small>
                  {tag}
                </small>
              </div>
            </Item>
          ))}
          {States.map((state) => (
            <Item
              type='checkbox'
              name="tags"
            >
              <Badge variant="ghost" size="sm" theme={state.theme}>
                {state.label}
              </Badge>
            </Item>
          ))}
        </div>
      </div>
    </Dropdown>
  )
}