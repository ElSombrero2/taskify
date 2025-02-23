
export const variants = {
  size: {
    xs: 'h-[30px] text-xs',
    sm: 'h-[32px] text-sm',
    md: 'h-[35px] text-md',
    lg: 'h-[40px] text-lg'
  },
  type: {
    default: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
      secondary: 'bg-opacity-60 dark:bg-gray-800 disabled:opacity-50 bg-gray-300 hover:bg-gray-400 not:disabled:hover:bg-opacity-40 active:bg-opacity-60 dark:hover:bg-opacity-20 dark:active:bg-opacity-10',
    },
    link: {
      primary: 'text-blue-600 hover:underline border-none p-0',
      secondary: 'border-none hover:underline p-0',
    },
    outline: {
      primary: 'text-blue-600 border-blue-600 border-opacity-60 hover:bg-blue-600 hover:text-white active:bg-blue-700',
      secondary: 'hover:bg-gray-800 hover:text-white active:bg-gray-900 dark:hover:bg-white dark:hover:text-gray-800 dark:active:bg-gray-200',
    },
  }
}