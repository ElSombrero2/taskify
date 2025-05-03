import { SpecificTag } from "@/utils/find-level-and-type";
import { Item } from "../../Item/Item";
import clsx from "clsx";

export const Priorities = ({ tags }: {tags: SpecificTag[]}) => {
  return (
    <>
      {tags.map((priority) => (
        <Item
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