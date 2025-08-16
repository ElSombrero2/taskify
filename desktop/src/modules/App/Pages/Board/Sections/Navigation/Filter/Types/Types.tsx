import clsx from "clsx"
import { Item } from "../../Item/Item"
import { SpecificTag } from "../../../../../../../../utils/find-level-and-type"

export const Types = ({ tags }: {tags: SpecificTag[]}) => {
  return (
    <>
      {tags.map((type, index) => (
        <Item
					key={`item-${type}-${index}`}
					type='checkbox'
          name="tags"
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
