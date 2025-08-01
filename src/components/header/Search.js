import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useFetchSearchedCryptoQuery } from '../../store';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { formatNumber } from '../../helpers';
import { changeQuery, changeDebouncedQuery, changeShowResults, clearSearch } from '../../store';
import Skeleton from '../Skeleton';

const DEBOUNCE_DELAY = 2000;

const Search = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);

  const dispatch = useDispatch();
  const { query, debouncedQuery, showResults } = useSelector((state) => state.search);

  const isMobile = windowWidth < 768;

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (query.trim() !== '') {
      timeoutRef.current = setTimeout(() => {
        dispatch(changeDebouncedQuery(query));
        dispatch(changeShowResults(true));
      }, DEBOUNCE_DELAY);
    } else {
      dispatch(changeDebouncedQuery(''));
      dispatch(changeShowResults(false));
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [query, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (query.trim() !== '') {
        dispatch(changeShowResults(true));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [query, dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        if (isMobile) {
          document.body.style.overflow = 'visible';
          setIsOpen(false);
        } else {
          if (e.target.closest('[data-search-result]')) {
            return; // Ako je klik na rezultat, ne radimo ništa
          }
          dispatch(changeShowResults(false));
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, dispatch]);

  useEffect(() => {
    if (isOpen && isMobile && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMobile]);

  const { data, isFetching, error } = useFetchSearchedCryptoQuery(debouncedQuery, {
    skip: debouncedQuery.trim() === '',
  });

  const handleSubmit = () => {
    dispatch(clearSearch());
    setIsOpen(false);
    document.body.style.overflow = 'visible';
  };

  const handleInputFocus = () => {
    if (query.trim() !== '') {
      dispatch(changeShowResults(true));
    }
  };

  const handleClearSearch = () => {
    dispatch(clearSearch());
  };

  let content;

  if (isFetching) {
    content = (
      <div className="space-y-3 p-4">
        <Skeleton className="h-10 w-full rounded-2xl bg-gray-100 dark:bg-gray-800" times={3} />
      </div>
    );
  } else if (error) {
    content = (
      <div className="p-4 m-2 rounded-2xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 shadow-sm">
        <div className="flex items-center gap-3">
          <InformationCircleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
          <p className="text-sm text-red-800 dark:text-red-300">
            Došlo je do greške prilikom pretrage. Pokušaj ponovo kasnije.
          </p>
        </div>
      </div>
    );
  } else if (!data || data.length === 0) {
    content = (
      <div className="p-4 sm:p-6 text-sm text-blue-800 dark:text-blue-300">
        Nema rezultata za <strong>{query}</strong>
      </div>
    );
  } else {
    content = (
      <div className="min-w-[500px] divide-y divide-gray-100 dark:divide-gray-700">
        {data?.map((coin) => (
          <Link data-search-result onClick={handleSubmit} key={coin.id} to={`/search/${coin.id}`}>
            <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer gap-4">
              {/* Levo: Ikonica + Ime + Symbol */}
              <div className="flex items-center gap-2 w-[130px] shrink-0">
                <img
                  src={coin?.thumb || coin?.image}
                  alt={coin.name}
                  className="w-6 h-6 rounded-full"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                    {coin.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase truncate">
                    {coin.symbol}
                  </p>
                </div>
              </div>

              {/* Sredina: Market Cap + Volume */}
              <div className="flex flex-col text-center min-w-[140px] flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  Market Cap: ${formatNumber(coin.market_cap)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  Vol 24h: ${formatNumber(coin.total_volume)}
                </p>
              </div>

              {/* Desno: Cena + Promena */}
              <div className="text-right w-[110px] shrink-0">
                <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                  ${formatNumber(coin.current_price)}
                </p>
                <p
                  className={`text-xs truncate ${
                    coin.price_change_percentage_24h >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {coin.price_change_percentage_24h >= 0 ? '▲' : '▼'}{' '}
                  {formatNumber(coin.price_change_percentage_24h)}%
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  const renderOverlay = () => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-start justify-center pt-24 px-4"
        >
          <motion.div
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
            ref={searchRef}
          >
            <form onSubmit={handleSubmit} className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <FiSearch className="w-5 h-5" />
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Pretraži kriptovalute..."
                className="w-full py-4 pl-12 pr-12 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-lg"
                value={query}
                onChange={(e) => dispatch(changeQuery(e.target.value))}
                onFocus={handleInputFocus}
                autoFocus
              />
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1"
              >
                <span className="text-sm text-gray-500 dark:text-gray-400">Očisti</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleClearSearch();
                  setIsOpen(false);
                  document.body.style.overflow = 'visible';
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </form>
            {showResults && query.trim() !== '' && (
              <div className="max-h-96 overflow-x-auto overflow-y-auto border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-2xl">
                {content}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!isMobile) {
    return (
      <div className="flex-1 max-w-2xl z-[10] mx-4 hidden md:block relative" ref={searchRef}>
        <form onSubmit={(e)=>e.preventDefault()}>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Pretraži kriptovalute..."
              className="w-full pl-10 pr-4 py-2 outline-none rounded-xl bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-blue-400 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 shadow-sm"
              value={query}
              onChange={(e) => dispatch(changeQuery(e.target.value))}
              onFocus={handleInputFocus}
              ref={inputRef}
            />
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 p-1"
            >
              <FiX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </form>
        {showResults && query.trim() !== '' && (
          <div className="absolute overflow-y-auto overflow-x-auto z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-h-96">
            {content}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
          document.body.style.overflow = 'hidden';
          if (query.trim() !== '') {
            dispatch(changeShowResults(true));
          }
        }}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <FiSearch className="text-gray-600 dark:text-gray-300" />
      </button>
      {createPortal(renderOverlay(), document.body)}
    </>
  );
};

export default Search;
