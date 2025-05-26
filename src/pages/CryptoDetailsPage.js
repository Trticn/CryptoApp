import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowsRightLeftIcon,
  ClockIcon,
  ArrowLeftIcon,
  FireIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FiTrendingUp, FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { formatNumber, formatDateTime } from '../helpers';
import { useFetchCryptoDetailsQuery } from '../store';
import MetricCard from '../components/cryptoDetails/MetricCard';
import PerformanceItem from '../components/cryptoDetails/PerformanceItem';
import StatItem from '../components/cryptoDetails/StatItem';
import ErrorScreen from '../components/ErrorScreen';
import CryptoDescription from '../components/cryptoDetails/CryptoDescription';

function CryptoDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: crypto, error, isFetching } = useFetchCryptoDetailsQuery(id);
  console.log(crypto);
  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };
  if (isFetching)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Učitavanje...</p>
        </div>
      </div>
    );

  if (error) return <ErrorScreen />;

  const marketData = crypto.market_data || {};
  const links = crypto.links || {};

  const priceChangeClass =
    marketData.price_change_percentage_24h >= 0
      ? 'text-green-500 dark:text-green-400'
      : 'text-red-500 dark:text-red-400';

  const athChangeClass =
    marketData.ath_change_percentage?.usd >= 0
      ? 'text-green-500 dark:text-green-400'
      : 'text-red-500 dark:text-red-400';
  const atlChangeClass =
    marketData.atl_change_percentage?.usd >= 0
      ? 'text-green-500 dark:text-green-400'
      : 'text-red-500 dark:text-red-400';

  // Podaci o društvenim mrežama
  const socialLinks = [
    links.subreddit_url && {
      name: 'Reddit',
      url: links.subreddit_url,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2-14h4v10h-4V8z" />
        </svg>
      ),
      color: 'bg-red-100 dark:bg-red-900/50 text-red-500 dark:text-red-400',
    },
    links.homepage && {
      name: 'Vebsajt',
      url: links.homepage[0] || links.homepage,
      icon: (
        <img
          src={crypto.image?.thumb || crypto.image?.small}
          alt={crypto.name}
          className="w-5 h-5 rounded-full"
        />
      ),
      color: 'bg-gray-100 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400',
    },
    links.twitter_screen_name && {
      name: 'Twitter',
      url: `https://twitter.com/${links.twitter_screen_name}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
        </svg>
      ),
      color: 'bg-blue-100 dark:bg-blue-900/50 text-blue-500 dark:text-blue-400',
    },
    links.telegram_channel_identifier && {
      name: 'Telegram',
      url: `https://t.me/${links.telegram_channel_identifier}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.534.26l.213-3.053 5.56-5.023c.24-.213-.054-.333-.373-.12l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.57-4.458c.538-.196 1.006.128.832.941z" />
        </svg>
      ),
      color: 'bg-blue-100 dark:bg-blue-900/50 text-blue-500 dark:text-blue-400',
    },
    links.youtube && {
      name: 'YouTube',
      url: links.youtube,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z" />
        </svg>
      ),
      color: 'bg-red-100 dark:bg-red-900/50 text-red-500 dark:text-red-400',
    },
    links.blockchain_site?.filter(Boolean)[0] && {
      name: 'Blockchain',
      url: links.blockchain_site.filter(Boolean)[0],
      icon: <LinkIcon className="w-5 h-5" />,
      color: 'bg-purple-100 dark:bg-purple-900/50 text-purple-500 dark:text-purple-400',
    },
  ].filter(Boolean);

  return (
    <div className="p-6 md:p-10 ">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 rounded-lg  hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Nazad na listu"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>

          <div className="flex items-center gap-3">
            <img
              loading="lazy"
              src={crypto.image?.large}
              alt={crypto.name}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                {crypto.name}
                <span className="text-gray-500 dark:text-gray-400 font-medium text-lg">
                  {crypto.symbol.toUpperCase()}
                </span>
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <ClockIcon className="h-4 w-4" />
                <span>Ažurirano: {formatDateTime(crypto.last_updated)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
          <span className="text-gray-500 dark:text-gray-300 text-sm">Rang:</span>
          <span className="font-bold text-gray-800 dark:text-white">#{crypto.market_cap_rank}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-600 dark:text-blue-300 font-medium flex items-center gap-2">
              <CurrencyDollarIcon className="h-5 w-5" />
              Trenutna cena
            </h3>
          </div>
          <div className="flex items-center flex-wrap gap-3 mb-2">
            <p className="text-3xl font-bold text-gray-800 dark:text-white">
              ${formatNumber(marketData.current_price?.usd)}
            </p>
            <div className={`px-2 py-1 rounded-md text-sm font-medium ${priceChangeClass}`}>
              {marketData.price_change_percentage_24h >= 0 ? (
                <FiArrowUp className="inline w-4 h-4 mr-1" />
              ) : (
                <FiArrowDown className="inline w-4 h-4 mr-1" />
              )}
              {marketData.price_change_percentage_24h?.toFixed(2)}%
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <StatItem
              label="Tržišna kapitalizacija"
              value={`$${formatNumber(marketData.market_cap?.usd)}`}
            />
            <StatItem
              label="Volumen (24h)"
              value={`$${formatNumber(marketData.total_volume?.usd)}`}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-purple-600 dark:text-purple-300 font-medium flex items-center gap-2 mb-4">
            <ChartBarIcon className="h-5 w-5" />
            Tržišna statistika
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <StatItem
              label="U opticaju"
              value={`${formatNumber(
                marketData.circulating_supply,
              )} ${crypto.symbol.toUpperCase()}`}
            />
            <StatItem
              label="Ukupna ponuda"
              value={
                marketData.total_supply
                  ? `${formatNumber(marketData.total_supply)} ${crypto.symbol.toUpperCase()}`
                  : '∞'
              }
            />
            <StatItem
              label="Potpuno razređena"
              value={
                marketData.fully_diluted_valuation?.usd
                  ? `$${formatNumber(marketData.fully_diluted_valuation.usd)}`
                  : 'N/A'
              }
            />
            <StatItem
              label="Maksimalna ponuda"
              value={
                marketData.max_supply
                  ? `${formatNumber(marketData.max_supply)} ${crypto.symbol.toUpperCase()}`
                  : '∞'
              }
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-amber-600 dark:text-amber-300 font-medium flex items-center gap-2 mb-4">
            <FiTrendingUp className="h-5 w-5" />
            Performanse
          </h3>
          <div className="space-y-4">
            <PerformanceItem
              label="Istorijski maksimum"
              value={`$${formatNumber(marketData.ath?.usd)}`}
              change={marketData.ath_change_percentage?.usd}
              date={formatDateTime(marketData.ath_date?.eur)}
              changeClass={athChangeClass}
            />
            <PerformanceItem
              label="Istorijski minimum"
              value={`$${formatNumber(marketData.atl?.usd)}`}
              change={marketData.atl_change_percentage?.usd}
              date={formatDateTime(marketData.atl_date?.eur)}
              changeClass={atlChangeClass}
            />
          </div>
        </div>
      </div>

      {/* Dodatne metrike */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <FireIcon className="h-5 w-5 text-orange-500" />
          Metrike cena
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Promena cene (24h)"
            value={`$${formatNumber(marketData.price_change_24h)}`}
            change={marketData.price_change_percentage_24h}
            icon={
              <ArrowsRightLeftIcon
                className={`h-5 w-5 ${
                  marketData.price_change_percentage_24h >= 0
                    ? 'text-green-500 dark:text-green-400'
                    : 'text-red-500 dark:text-red-400'
                }`}
              />
            }
          />
          <MetricCard
            title="Promena kapitalizacije (24h)"
            value={`$${formatNumber(marketData.market_cap_change_24h)}`}
            change={marketData.market_cap_change_percentage_24h}
            icon={
              <ChartBarIcon
                className={`h-5 w-5 ${
                  marketData.market_cap_change_percentage_24h >= 0
                    ? 'text-green-500 dark:text-green-400'
                    : 'text-red-500 dark:text-red-400'
                }`}
              />
            }
          />
          <MetricCard
            title="Maksimum (24h)"
            value={`$${formatNumber(marketData.high_24h?.usd)}`}
            icon={
              <ArrowTrendingUpIcon
                className={`h-5 w-5 ${
                  marketData.current_price?.usd >= marketData.high_24h?.usd
                    ? 'text-green-500 dark:text-green-400'
                    : 'text-amber-500 dark:text-amber-400'
                }`}
              />
            }
            change={
              ((marketData.current_price?.usd - marketData.high_24h?.usd) /
                marketData.high_24h?.usd) *
              100
            }
          />
          <MetricCard
            title="Minimum (24h)"
            value={`$${formatNumber(marketData.low_24h?.usd)}`}
            change={
              ((marketData.current_price?.usd - marketData.low_24h?.usd) /
                marketData.low_24h?.usd) *
              100
            }
            icon={
              <ArrowTrendingDownIcon
                className={`h-5 w-5 ${
                  marketData.current_price?.usd <= marketData.low_24h?.usd
                    ? 'text-red-500 dark:text-red-400'
                    : 'text-amber-500 dark:text-amber-400'
                }`}
              />
            }
          />
        </div>
      </div>

      {/* Sekcija o kriptovaluti */}
      {crypto.description?.en && <CryptoDescription crypto={crypto} />}

      {/* Sekcija društvenih mreža */}
      {socialLinks.length > 0 && (
        <div className="bg-white dark:bg-gray-800  p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg text-center font-semibold text-gray-800 dark:text-white mb-4">
            Linkovi zajednice
          </h3>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${link.color} hover:opacity-90 transition-opacity`}
              >
                <span className="flex-shrink-0">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CryptoDetailsPage;
