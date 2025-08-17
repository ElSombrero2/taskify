import { Button } from "@/ui/components/Buttons/Button/Button"
import { Dropdown } from "@/ui/components/Dropdown/Dropdown"
import { Input } from "@/ui/components/Form/Input/Input"
import { FormEvent, useState } from "react"
import { Divider } from "@/ui/components/Separators/Divider/Divider"
import { useToggler } from "@/hooks/toggler"
import { PriorityLevels, TicketTypes } from "@/utils/find-level-and-type"
import { Tags } from "./Tags/Tags"
import { Priorities } from "./Priorities/Priorities"
import { Types } from "./Types/Types"
import { useFilter } from "@/store/filters/filters"

export const Filter = () =>  {
  const { toggle, hide, open } = useToggler(false);
  const [tags, setTags] = useState<string[]>([]);
	const { addTag, removeTag } = useFilter();

  const onSubmitText = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = e.target as HTMLInputElement;
      const value = input?.value?.trim()?.toLowerCase();
			const tag = value.length ? value.split(' ').join('-') : '';
			if (tag.length && !tags.find(t => t === tag)) {
				setTags([tag, ...tags]);
				addTag(tag);
			}
      input.value = '';
    }
  }

	const onFilterChange = (e: FormEvent) => {
		const input = e.target as HTMLInputElement;
		if (input.type === 'checkbox') {
			if (input.checked) {
				addTag(input.value);
			} else {
				removeTag(input.value);
			}
		}
	}

  const types = TicketTypes();
  const priorities = PriorityLevels();

  return (
    <Dropdown
      onClickOutside={hide}
      open={open}
      position="right"
      button={
        <Button onClick={toggle} size="sm" theme="secondary">
          <i className="fa-solid fa-filter"></i>
          More filters
        </Button>
      }
    >
      <form
				onSubmit={(e) => e.preventDefault()}
				onChange={onFilterChange}
				className="flex flex-col gap-2 p-1"
			>
        <Input
          size="xs"
          onKeyDown={onSubmitText}
          icon={<i className="fa fa-solid fa-hashtag"></i>} 
          placeholder="Other tags" 
        />
        <Divider />
        <div className="flex flex-col gap-1 max-h-[350px] scrollable overflow-auto">
          <Tags tags={tags} />
          <Types tags={types} />
          <Priorities tags={priorities} />
        </div>
      </form>
    </Dropdown>
  )
}
