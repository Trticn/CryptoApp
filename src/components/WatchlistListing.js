import CryptoListingItem from './CryptoListingItem';
import Skeleton from './Skeleton';
import Pagination from './Pagination';
import usePagination from '../hooks/usePagination';
import { useFetchCryptoFromWatchlistQuery, useFetchWatchlistQuery } from '../store';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

function WatchlistListing({ showThead }) {
  const { data, error, isFetching } = useFetchWatchlistQuery();

  const {
    data: watchlistCollection,
    error: watchlistError,
    isFetching: isFetchingWatchlist,
  } = useFetchCryptoFromWatchlistQuery(
    data?.map((cr) => cr.id),
    {
      skip: !data,
      pollingInterval: 120000,
    },
  );

  const dataWithWatchlist = watchlistCollection?.map((crypto) => ({
    ...crypto,
    isWatchlist: true,
  }));

  const { currentPage, setCurrentPage, paginationData, totalPages } =
    usePagination(dataWithWatchlist);

  let content;
  console.log(dataWithWatchlist)

  if (isFetching || isFetchingWatchlist) {
    content = (
      <>
        {[...Array(10)].map((_, i) => (
          <tr key={i}>
            {[...Array(9)].map((_, j) => (
              <td key={j} className="p-4">
                <Skeleton className="h-4 w-full rounded" times={1} />
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  } else if (error || watchlistError) {
    content = (
      <tr>
        <td colSpan="9" className="p-4">
          <div className="rounded-2xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 shadow-sm">
            <div className="flex items-center gap-3 p-3">
              <InformationCircleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
              <p className="text-sm text-red-800 dark:text-red-300">
                Došlo je do greške prilikom učitavanja liste praćenja. Pokušaj ponovo kasnije.
              </p>
            </div>
          </div>
        </td>
      </tr>
    );
  } else if (paginationData.length === 0) {
    content = (
      <tr>
        <td colSpan="9" className="p-4">
          <div className="rounded-2xl border border-blue-300 dark:border-blue-800 shadow-sm">
            <div className="flex items-start items-center gap-3 p-3">
              <InformationCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 sm:mt-0" />
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Tvoja lista praćenja je trenutno prazna.
              </p>
            </div>
          </div>
        </td>
      </tr>
    );
  } else {
    content = paginationData.map((crypto) => <CryptoListingItem key={crypto.id} crypto={crypto} />);
  }

  return (
    <div className='flex flex-col'>
      <div className="flex-1 overflow-x-auto bg-white dark:bg-gray-800 rounded-xl">
        <table className="w-full min-w-[1000px] table-auto text-sm">
          {showThead && (
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
              <tr>
                <th className="p-4 text-left font-semibold"></th>
                <th className="p-4 text-left font-semibold">Naziv</th>
                <th className="p-4 text-left font-semibold">Cena</th>
                <th className="p-4 text-left font-semibold">24h%</th>
                <th className="p-4 text-left font-semibold">Tržišna kap.</th>
                <th className="p-4 text-left font-semibold">Obim (24h)</th>
                <th className="p-4 text-left font-semibold">U opticaju</th>
                <th className="p-4 text-left font-semibold">ATH</th>
                <th className="p-4 text-left font-semibold">ATL</th>
              </tr>
            </thead>
          )}
          <tbody>{content}</tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}

export default WatchlistListing;
