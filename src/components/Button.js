import className from 'classnames';
import { GoSync } from 'react-icons/go';
import { FiArrowDownCircle, FiArrowUpCircle } from 'react-icons/fi';

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
  transaction,
  ...rest
}) {
  const classes = className(
    rest.className,
    'relative flex items-center justify-center  transition-all duration-500',
    {
      'opacity-80 cursor-not-allowed': loading,
      'px-8 py-3 text-base font-medium ': !modal,
      'h-8 px-4 py-2 text-sm': !modal && !transaction,

      // Primary - Modern 3D stretch effect
      'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-blue-500/30 hover:scale-x-105 hover:scale-y-95':
        primary && !outline,
      'rounded-full': primary && rounded,
      'rounded-lg': primary && !rounded,

      // Transaction - Ultra premium effect
      'px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:shadow-blue-500/30':
        transaction,

      // Modal - Subtle but elegant
      'py-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg': modal,

      // Secondary - Glass morphism effect
      'backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white shadow-sm hover:shadow-white/20':
        secondary,

      // Success - Organic grow effect
      'bg-green-500 text-white rounded-lg hover:bg-green-600 hover:scale-[1.03] shadow-sm': success,

      // Warning - Pulsing effect
      'border-yellow-400 bg-yellow-400 text-white hover:animate-pulse': warning,

      // Danger - Shake effect
      'bg-red-500 text-white rounded-lg hover:bg-red-600 hover:animate-shake shadow-sm': danger,

      // Outline variants
      'bg-transparent border': outline,
      'border-indigo-500 text-indigo-500 hover:bg-indigo-500/10': outline && primary,
      'border-gray-500 text-gray-500 hover:bg-gray-500/10': outline && secondary,
      'border-green-500 text-green-500 hover:bg-green-500/10': outline && success,
      'border-yellow-500 text-yellow-500 hover:bg-yellow-500/10': outline && warning,
      'border-red-500 text-red-500 hover:bg-red-500/10': outline && danger,
    },
  );

  // Liquid shine effect (for transaction and primary buttons)
  const liquidShine =
    (transaction || primary) && !outline ? (
      <>
        <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-all duration-1000 transform group-hover:scale-x-125 group-hover:scale-y-80 origin-left" />
        <span className="absolute top-0 left-0 w-10 h-full bg-white/30 -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[400%] transition-all duration-1000" />
      </>
    ) : null;

  // Transaction icon with special animation
  const transactionIcon = transaction ? (
    <span className="relative z-10 flex items-center gap-2 transition-all duration-500 group-hover:translate-x-1 group-hover:scale-110">
      {children.includes('Uplata') ? (
        <FiArrowUpCircle className="text-lg" />
      ) : (
        <FiArrowDownCircle className="text-lg" />
      )}
      {children.replace('Uplata / Isplata', '').trim()}
    </span>
  ) : null;

  return (
    <button {...rest} disabled={loading} className={classes}>
      {liquidShine}
      {transaction ? (
        transactionIcon
      ) : (
        <span className="relative z-10 flex items-center justify-center">
          <span className={loading ? 'invisible' : ''}>{children}</span>
          {loading &&  <GoSync className="absolute animate-spin text-indigo-300" />}
        </span>
      )}
    </button>
  );
}

// Dodajemo proptypes (možeš koristiti postojeći)
Button.propTypes = {
  checkVariationValue: ({ primary, secondary, success, warning, danger, modal, transaction }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!warning) +
      Number(!!success) +
      Number(!!modal) +
      Number(!!danger) +
      Number(!!transaction);

    if (count > 1) {
      return new Error(
        'Only one of primary, secondary, success, warning, danger, modal, transaction can be true',
      );
    }
  },
};

export default Button;
