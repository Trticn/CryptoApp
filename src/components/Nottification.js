import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideNottification } from "../store";

function Notification({ onClose }) {
  const dispatch = useDispatch();
  const { show, message, type, duration } = useSelector(state => state.nottification);


  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose?.();
        dispatch(hideNottification());
      }, duration || 3000);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose, dispatch]);

  if (!show) return null;

  // ISPRAVKA: Definišite colorClasses kao objekat, a zatim pristupite vrednosti
  const colorClassesMap = {
    error: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700",
    success: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700",
    info: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700",
    warning: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700",
  };



  // Uzmi klase za tip ili fallback na error
  const colorClasses = colorClassesMap[type] || colorClassesMap.error;



  return (
    <div
      className={`fixed top-20 right-4 z-50 min-w-[220px] max-w-xs px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 border ${colorClasses} animate-slide-in`}
      style={{ pointerEvents: "auto" }}
      role="alert"
    >
      <span className="flex-1">{message}</span>
      <button
        onClick={() => {
          onClose?.();
          dispatch(hideNottification());
        }}
        className="ml-2 opacity-70 hover:opacity-100 font-bold text-lg focus:outline-none"
        aria-label="Zatvori notifikaciju"
      >
        ×
      </button>
      <style>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(40px);}
          to { opacity: 1; transform: translateX(0);}
        }
        .animate-slide-in {
          animation: slide-in 0.3s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </div>
  );
}

export default Notification;