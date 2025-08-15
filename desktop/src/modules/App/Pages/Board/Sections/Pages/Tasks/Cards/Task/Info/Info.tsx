import { useAvatar } from "@/hooks/avatar";
import { Avatar } from "@/shared/components/Avatar/Avatar";
import { Info as TInfo } from "@/types/task";
import { toISO } from "@/utils/to-iso";
import { DateTime } from "luxon";

export const Info = ({ info }: {info: TInfo}) => {
  const avatar = useAvatar(info?.author?.name || 'Unknown User');

  const getDate = (date: DateTime) => {
    if (date && date.isValid) {
      return date.toFormat('dd LLL yyyy - HH:mm')
    }
  }

  return (
    <div className="flex items-center justify-between">
    <div className="text-[10px]">
      <p>
        Updated by{" "}
        <span className="font-bold">
          {info?.author?.name || "Unknown"}
        </span>
      </p>
      <span className="dark:text-gray-400 text-gray-500">{getDate(DateTime.fromISO(toISO(info.date)))}</span>
    </div>
		<Avatar avatar={avatar} />
  </div>
  )
}
