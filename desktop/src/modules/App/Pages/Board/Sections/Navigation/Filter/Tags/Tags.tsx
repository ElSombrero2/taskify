import { useFilter } from "@/store/filters/filters"
import { Item } from "../../Item/Item"

export const Tags = ({tags}: { tags: string[] }) => {
  const { tags: filterTags } = useFilter();
	return (
    <>
      {tags.map((tag, index) => (
        <Item
					value={tag}
          key={`tag-${tag}-${index}`}
					defaultChecked={filterTags.includes(tag)}
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
    </>
  )
}
