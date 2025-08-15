import "./Lists.scss";
import { useBoard } from "@/store/board/board";
import { Summary } from "./Summary/Summary";
import { Extra } from "./Extra/Extra";
import { Details } from "../../Details/Details";
import { useDetails } from "../../Details/hooks/details";
import { Task } from "../../../../../../../types/task";
import { useFilter } from "../../../../../../../store/filters/filters";

/*
  [DONE]: Change the design of the list
  A new #improvement to priority #high: change the design of the list because
  it's very bad now, so create a list based on this image:  
  ![image](https://cdn.dribbble.com/userupload/21952779/file/original-8a57756da186e0a0fbebc5e625e241dd.jpg?resize=752x564&vertical=center)
*/
export const Lists = () => {
  const { board } = useBoard();
  const { onCardClicked, task, showDetail, setShowDetail } = useDetails(board);
  const { query } = useFilter();

  const filter = (task: Task) => {
    if (query) {
      return (
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description?.toLowerCase()?.includes(query.toLowerCase())
      );
    }
    return true;
  };

  /*
    [DONE]: Refactoring on the list page
    Make a refactoring on the list and create components for
    all list item to make changes easier
    #improvement #low
  */
  return (
    <div className="overflow-y-auto h-[calc(100vh-266px)] scrollable">
      <table className="w-full">
        <thead className="border-b-2 text-left">
          <tr>
            <th>Summary</th>
            <th colSpan={3}></th>
          </tr>
        </thead>
        <tbody>
          {
            /*
            [DONE]: Make the list items clickable
            The list item must be clickable
            When the user click on the list item
            Then the details section will appear
            #high #improvement
          */
            board?.tasks.filter(filter).map((task) => (
              <tr
                key={task.id}
                className="item"
                onClick={() => onCardClicked(task)}
              >
                <td>
									<button>
										 <Summary task={task} />
									</button>
                </td>
                <td>
                  <Extra task={task} />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Details
        task={task()}
        onClickExit={() => setShowDetail(false)}
        open={showDetail}
      />
    </div>
  );
};
