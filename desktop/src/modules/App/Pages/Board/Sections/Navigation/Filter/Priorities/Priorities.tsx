import { SpecificTag } from "@/utils/find-level-and-type";
import { Item } from "../../Item/Item";
import clsx from "clsx";
import { useFilter } from "@/store/filters/filters";

/*
	[TODO]: Create new UI v2 task 
	It's a new V2 task with an image
	![image](https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg)
	#v2 #ui #feature #low
*/

export const Priorities = ({ tags: priorities }: {tags: SpecificTag[]}) => {
	const { tags } = useFilter();

	return (
    <>
      {priorities.map((priority, index) => (
        <Item
					value={priority.key}
					key={`priority-${priority.key}-${index}`}
					defaultChecked={tags.includes(priority.key ?? '')}
					type='checkbox'
          name="tags"
        >
          <small className="flex gap-2">
            <span className={clsx(
                priority?.color,
                'block rounded-sm',
              )}
            >
              <i className={priority?.icon}></i>
            </span>
            <span>{priority.label}</span>
          </small>
        </Item>
      ))}
    </>
  )
}
