import className from 'classnames';
import { GoSync } from 'react-icons/go';

function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  modal,
  outline,
  rounded,
  loading,
  ...rest
}) {
  const classes = className(
    rest.className,
    'flex items-center px-4 py-2 border h-8',
    {
      'opacity-80': loading,
      "justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm font-medium whitespace-nowrap":primary,
      "justify-center gap-2  py-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm font-medium whitespace-nowrap":modal,

      'border-gray-900 bg-gray-900 text-white': secondary,
      'bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm': success,
      'border-yellow-400 bg-yellow-400 text-white': warning,
      'bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-sm': danger,
      'rounded-full': rounded,
      'bg-white': outline,
      'text-blue-500': outline && primary,
      'text-gray-900': outline && secondary,
      'text-green-500': outline && success,
      'text-yellow-400': outline && warning,
      'text-red-500': outline && danger,
    }
  );

  return (
    <button {...rest} disabled={loading} className={classes}>
      {loading ? <GoSync className="animate-spin" /> : children}
    </button>
  );
}

Button.propTypes = {
  checkVariationValue: ({ primary, secondary, success, warning, danger,modal }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!warning) +
      Number(!!success) +
      Number(!!modal) +
      Number(!!danger);


    if (count > 1) {
      return new Error(
        'Only one of primary, secondary, success, warning, danger can be true'
      );
    }
  },
};

export default Button;
