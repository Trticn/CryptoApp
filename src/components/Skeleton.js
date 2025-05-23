import classNames from 'classnames';

function Skeleton({ times, className }) {
  const outerClassNames = classNames(
    'relative',
    'overflow-hidden',
    'bg-gray-300 dark:bg-gray-700', // tamnija pozadina u light i dark modu
    'rounded',
    'mb-2.5',
    className,
  );

  const innerClassNames = classNames(
    'animate-shimmer',
    'absolute',
    'inset-0',
    '-translate-x-full',
    'bg-gradient-to-r',
    'from-gray-300 via-gray-400 to-gray-300',
    'dark:from-gray-600 dark:via-gray-500 dark:to-gray-600', // shimmer u dark modu
    'opacity-30',
    'transition-opacity duration-1000 ease-in-out',
  );

  const boxes = Array(times)
    .fill(0)
    .map((_, i) => (
      <div key={i} className={outerClassNames}>
        <div className={innerClassNames} />
      </div>
    ));

  return boxes;
}

export default Skeleton;
