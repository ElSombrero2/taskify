import { useBoard } from "@/store/board/board"
import { Button } from "@/ui/components/Buttons/Button/Button"
import { Input } from "@/ui/components/Form/Input/Input"
import { Skeleton } from "@/ui/components/Skeleton/Skeleton"
import { Switch } from "@/shared/components/Operators/Switch/Switch"
import { useNavigate, useSearchParams } from "react-router"
import { useFilter } from "../../../../../../store/filters/filters"

/*
  [READY]: Add sort
  The user can choose in what fields he want to sort all the items
  and can sort in ASC or DESC
  #high #improvement
*/
export const Header = () => {
  const { loading, board } = useBoard();
  const [ query ] = useSearchParams();
  const { setFilter } = useFilter();
  const navigate = useNavigate();

  const path = () => {
    let path = query.get('path')?.split('/') || [];
    if (navigator.userAgent.toLowerCase().includes('windows')) {
      path = query.get('path')?.split('\\') ||[];
    }
    path.pop();
    return path;
  }

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value?.trim();
    if (query?.length) {
      setFilter(query);
      navigate('list');
    } else { setFilter(null)}
  }

  return (
    <div className="flex justify-between border-b p-4 px-6">
      <Switch fallback={<Skeleton className="w-[460px]" />} condition={!loading}>
        <div className="text-md flex gap-3 items-center">
          <i className="fa fa-folder"></i>
          {path().map((path, index) => (
            <span key={`${path}-${index}`} className="font-light opacity-70 dark:text-zinc-100 text-gray-950">{path} /</span>
          ))}
          <span className="font-semibold">{board?.name}</span>
        </div>
      </Switch> 
      
      <div className="flex items-center gap-2">
        {
          /*
            [DONE]: Add search functionality
            An user can search some word inside the titles
            and description
            When the user tip in the search input, he will be redirected
            to list page and the list will be filtered by the value inside
            the input string
            #high #improvement
          */
        }
        <Input
          size="sm"
          placeholder="Search"
          onChange={search}
          icon={<i className="text-sm fa fa-search"></i>}
        />
        <Button size="sm" type="outline" theme="secondary">
          <i className="fa fa-bell"></i>
        </Button>
        <Button size="sm" type="outline" theme="secondary">
          <i className="fa fa-message"></i>
        </Button>
      </div>
    </div>
  )
}
