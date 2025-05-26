import { useEffect, useState } from 'react';
import { translateText } from '../../config/Translate';
import Skeleton from '../Skeleton';
function CryptoDescription({ crypto }) {
  const [translatedDescription, setTranslatedDescription] = useState('');

  useEffect(() => {
    if (crypto?.description?.en) {
      translateText(crypto.description.en).then(setTranslatedDescription);
    }
  }, [crypto]);

  let content;

  if (translatedDescription) {
    content = <p>{translatedDescription}</p>;
  } else {
    content = (
      <div className="space-y-3">
        <Skeleton className="h-6 w-full rounded-2xl bg-gray-100 dark:bg-gray-800" times={5} />
      </div>
    );
  }
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
      <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-white mb-4">
        O {crypto.name}
      </h3>
      <div className="text-gray-600 dark:text-gray-300 mb-4">{content}</div>

      {crypto.categories?.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Kategorije</h4>
          <div className="flex flex-wrap gap-2">
            {crypto.categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CryptoDescription;
