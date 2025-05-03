
export const useField = () => {
  const fields = [
    {
      label: 'Update date',
      value: 'date',
    },
    {
      label: 'Priority level',
      value: 'priority',
    },
    {
      label: 'Task id',
      value: 'id',
    },
    {
      label: 'Task title',
      value: 'title',
    },
    {
      label: 'Username',
      value: 'username',
    },
  ]

  return { fields };
}