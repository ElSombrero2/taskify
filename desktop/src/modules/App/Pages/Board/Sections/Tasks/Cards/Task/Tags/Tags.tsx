import { Badge } from "@/ui/components/Badges/Badge/Badge"

export const Tags = ({tags}: {tags: string[]}) => {
  return (
    <>
      {!!tags.length && (
        <div className="flex gap-2">
          {tags?.slice(0, 2).map((tag) => (
            <Badge theme="primary" size="xs" key={tag}>
              <p className="flex gap-1 items-center">
                <i className="fa-solid fa-tag"></i>
                {tag}
              </p>
            </Badge>
          ))}
        </div>
      )}
    </>
  )
}