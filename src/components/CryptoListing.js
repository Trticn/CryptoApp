import CryptoListingItem from "./CryptoListingItem";
import Skeleton from './Skeleton'
import { useFetchPopularCryptoQuery } from "../store";

function CryptoListing({showThead}){
const { data, error, isFetching } = useFetchPopularCryptoQuery()
  
    let content;

    if(error) content = ''
    if(isFetching)content=<Skeleton times={5}/>

    content= data?.map((crypto) => (
            <CryptoListingItem key={crypto.id} crypto={crypto} />
          ))

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl ">
      <table className="w-full min-w-[1000px] table-auto text-sm">

        {showThead? <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
        <tr>
  <th className="p-4 text-left font-semibold">Naziv</th>
  <th className="p-4 text-left font-semibold">Cena</th>
  <th className="p-4 text-left font-semibold">24h%</th>
  <th className="p-4 text-left font-semibold">Tržišna kap.</th>
  <th className="p-4 text-left font-semibold">Obim (24h)</th>
  <th className="p-4 text-left font-semibold">U opticaju</th>
  <th className="p-4 text-left font-semibold">ATH</th>
  <th className="p-4 text-left font-semibold">ATL</th>
</tr>

        </thead> : ''}
        
        <tbody>
        {content}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoListing;
