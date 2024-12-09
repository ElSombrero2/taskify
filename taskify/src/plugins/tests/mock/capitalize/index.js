
export function apply (board) {
  const name = board.name;
  return {
    ...board,
    name: name.charAt(0).toUpperCase() + name.substring(1, name.length),
  };
}