import { Card } from "@/ui/components/Cards/Card/Card"
import { Divider } from "@/ui/components/Separators/Divider/Divider"
import { Skeleton } from "@/ui/components/Skeleton/Skeleton"
import { Column } from "../Column/Column"
import { Repeat } from "../../../../../../../../shared/components/Operators/Repeat/Repeat"

export const Loader = () => {
  return (
    <Column>
      <Card className="min-w-[320px] flex justify-between items-center dark:bg-gray-800 bg-gray-100 p-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-[20px] h-[20px]" />
          <Skeleton className="w-[60px] h-[20px]" />
        </div>
        <Skeleton className="w-[20px] h-[20px]" />
      </Card>
      <Repeat times={4}>
        <Card className="min-w-[320px] dark:bg-gray-800 bg-gray-100 flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <Skeleton className="w-[40px]" />
            <Skeleton className="w-[40px]" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-[15px] w-[80px]" />
            <div className="flex flex-col gap-1">
              <Skeleton radius="xs" className="h-[10px]" />
              <Skeleton radius="xs" className="h-[10px]" />
            </div>
          </div>
          <Divider />
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-[12px] w-[140px]" />
              <Skeleton className="h-[8px] w-[140px]" />
            </div>
            <Skeleton className="w-[30px] h-[30px]" />
          </div>
        </Card>
      </Repeat>
    </Column>
  )
}