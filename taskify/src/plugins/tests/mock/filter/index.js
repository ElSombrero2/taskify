
export function apply (board) {
  return {
    ...board,
    tasks: board.tasks.filter((task) => task.state !== 'TODO'),
  };
}