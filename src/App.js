import { Provider } from 'react-redux';
import { store } from './store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import HomePage from './pages/HomePage';
import AddTransaction from './components/AddTransaction';
import PortfolioPage from './pages/PortfolioPage';
import TransactionsPage from './pages/TransactionsPage';
import NotFoundPage from './pages/NotFoundPage';
import WatchlistPage from './pages/WatchlistPage';
import CryptoDetailsPage from './pages/CryptoDetailsPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },

      { path: '/add-transaction', element: <AddTransaction /> },
      { path: '/portfolio', element: <PortfolioPage /> },
      { path: '/transactions', element: <TransactionsPage /> },
      { path: '/watchlist', element: <WatchlistPage /> },
      { path: '/crypto/:id', element: <CryptoDetailsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
