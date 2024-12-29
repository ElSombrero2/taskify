import { useAvatar } from "@/hooks/avatar";
import { Info as TInfo } from "@/types/task";

export const Info = ({ info }: {info: TInfo}) => {
    const { color, initial } = useAvatar(info.author?.name);

  return (
    <div className="flex items-center justify-between">
    <div className="text-[10px]">
      <p>
        Updated by{" "}
        <span className="font-bold">
          {info.author?.name || "Unknown"}
        </span>
      </p>
      <span className="opacity-50">{info.date}</span>
    </div>
    <div
      className="text-xs text-white font-extrabold w-[28px] h-[28px] flex items-center justify-center rounded-full"
      style={{ backgroundColor: color }}
    >
      {initial}
    </div>
  </div>
  )
}