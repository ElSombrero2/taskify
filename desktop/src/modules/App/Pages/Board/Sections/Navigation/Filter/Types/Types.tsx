import clsx from "clsx"
import { Item } from "../../Item/Item"
import { SpecificTag } from "../../../../../../../../utils/find-level-and-type"
import { useFilter } from "@/store/filters/filters"

export const Types = ({ tags: types }: {tags: SpecificTag[]}) => {
  const { tags } = useFilter();
	return (
    <>
      {types.map((type, index) => (
        <Item
					value={type.key}
					key={`item-${type}-${index}`}
					type='checkbox'
          name="tags"
					defaultChecked={tags.includes(type.key ?? '')}
        >
          <small className="flex gap-2">
            <span className={clsx(
              type?.background,
              'block text-white text-xs w-[20px] h-[20px] rounded-sm',
              'flex items-center justify-center'
              )}
            >
              <i className={type?.icon}></i>
            </span>
            <span>{type.label}</span>
          </small>
        </Item>
      ))}
    </>
  )
}
