
export const useSort = () => {
  const sort = [
    {
      label: 'Highest to lowest',
      value: 'DESC',
    },
    {
      label: 'Lowest to highest',
      value: 'ASC',
    }
  ]

  return { sort };
}