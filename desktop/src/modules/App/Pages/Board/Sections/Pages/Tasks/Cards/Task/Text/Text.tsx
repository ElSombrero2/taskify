
export const Text = ({title, description}: {title: string; description?: string}) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-bold">{title}</p>
      {!!description && (
        <p className="text-xs line-clamp-1 opacity-60">
          {description}
        </p>
      )}
    </div>
  )
}