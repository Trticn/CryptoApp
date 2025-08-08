import { Provider } from 'react-redux';
import { store } from './store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthInitializer from './components/authComponents/AuthInitializer';
import AddTransaction from './components/transactionPageComponents/AddTransaction';
import ProtectedRoute from './components/authComponents/ProtectedRoute';
import PublicRoute from './components/authComponents/PublicRoute';
import Root from './pages/Root';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import TransactionsPage from './pages/TransactionsPage';
import NotFoundPage from './pages/NotFoundPage';
import WatchlistPage from './pages/WatchlistPage';
import CryptoDetailsPage from './pages/CryptoDetailsPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import UserVerifyPage from './pages/UserVerifyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
      { path: '/search/:id', element: <CryptoDetailsPage /> },
      {path: '/help', element: <HelpPage /> },
      {path:'/verify-email', element:<UserVerifyPage/>},


      {
        element: <ProtectedRoute />,
        children: [
          {path:'/account',element:<ProfilePage/>},
          { path: '/portfolio', element: <PortfolioPage /> },
          { path: '/transactions', element: <TransactionsPage /> },
          { path: '/watchlist', element: <WatchlistPage /> },
          { path: '/add-transaction', element: <AddTransaction /> },
          {path:'/settings', element:<SettingsPage/>
          }
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          { path: '/auth', element: <AuthPage /> },
          { path: '/reset-password', element: <ResetPasswordPage />}

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
