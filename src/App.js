import { Provider } from 'react-redux';
import { store } from './store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthInitializer from './components/AuthInitializer';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Root from './pages/Root';
import HomePage from './pages/HomePage';
import AddTransaction from './components/AddTransaction';
import PortfolioPage from './pages/PortfolioPage';
import TransactionsPage from './pages/TransactionsPage';
import NotFoundPage from './pages/NotFoundPage';
import WatchlistPage from './pages/WatchlistPage';
import CryptoDetailsPage from './pages/CryptoDetailsPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';





// Router setup (ostaje isto)
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          {path:'/account',element:<ProfilePage/>},
          { path: '/portfolio', element: <PortfolioPage /> },
          { path: '/transactions', element: <TransactionsPage /> },
          { path: '/watchlist', element: <WatchlistPage /> },
          { path: '/search/:id', element: <CryptoDetailsPage /> },
          { path: '/add-transaction', element: <AddTransaction /> },
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          { path: '/auth', element: <AuthPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <AuthInitializer>
      <RouterProvider router={router} />
      </AuthInitializer>
    </Provider>
  );
}

export default App;
