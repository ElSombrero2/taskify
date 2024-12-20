import clsx from 'clsx';
import './Skeleton.scss';
import { Size } from '../../types/size';
import { variants } from './Skeleton.variant';

type SkeletonProps = {
  className?: string,
  animated?: boolean,
  duration?: number,
  radius?: Size,
}

export const Skeleton = ({className, animated, radius, duration}: SkeletonProps) => {
  return (
    <div className={clsx(
      'dark:bg-gray-800 bg-gray-300 rounded-md',
      !animated && 'animated',
      className,
      variants.radius[radius || 'md'],
    )}
      style={{animationDuration: `${duration}ms`}}  
    >

    </div>
  )
}