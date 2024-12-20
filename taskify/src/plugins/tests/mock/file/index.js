
export async function apply (board) {
  const { file } = taskify;
  board.extra = JSON.parse(file.readToString("../package.json"));
  return board;
}