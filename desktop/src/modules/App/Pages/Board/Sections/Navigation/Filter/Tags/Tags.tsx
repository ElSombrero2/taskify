import { Item } from "../../Item/Item"

export const Tags = ({tags}: { tags: string[] }) => {
  return (
    <>
      {tags.map((tag, index) => (
        <Item
          key={`tag-${tag}-${index}`}
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
    </>
  )
}
