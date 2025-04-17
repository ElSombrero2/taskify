
export const variants = {
  theme: {
    variants: {
      default: {
        primary: 'bg-sky-200 text-sky-800 border-sky-900',
        secondary: 'bg-gray-700 text-white',
        danger: 'bg-rose-200 text-rose-800 border-rose-900',
        success: 'bg-green-200 text-green-800 border-green-900',
        warning: 'bg-orange-200 text-orange-800 border-orange-900',
        disabled: 'dark:bg-gray-600 bg-gray-200 dark:border-gray-600 border-gray-200',
      },
      ghost: {
        primary: 'bg-sky-200 text-sky-800 dark:text-sky-200 dark:bg-sky-900',
        secondary: 'bg-gray-700 text-white',
        danger: 'bg-rose-200 text-rose-800 dark:text-rose-200 dark:bg-rose-900',
        success: 'bg-green-200 text-green-800 dark:text-green-200 dark:bg-green-900',
        warning: 'bg-orange-200 text-orange-800 dark:text-orange-200 dark:bg-orange-900',
        disabled: 'dark:bg-gray-600 bg-gray-200',
      }
    },
  },
  style: {
    ghost: 'rounded-md bg-opacity-40 dark:bg-opacity-25',
    default: 'rounded-sm border border-opacity-40',
  },
  size: {
    xs: 'text-[10px]',
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
  }
}