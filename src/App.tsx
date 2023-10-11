import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/auth/LoginPage';
import AuthRoute from './routes/AuthRoute';
import { webAuthPaths } from './constants/path';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import { protectedRoutes } from './routes/protectedRoutes';
import { authLoader } from './helpers/isAuth';
import NotFoundPage from './pages/auth/NotFoundPage';
import TwoFactorPage from './pages/auth/TwoFactorPage';
import VerifyAccountPage from './pages/auth/VerifyAccountPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute />,
    loader: () => authLoader(true),
    children: [
      {
        path: webAuthPaths.login,
        element: <LoginPage />,
      },
      {
        path: webAuthPaths.forgotPassword,
        element: <ForgotPasswordPage />,
      },
      {
        path: webAuthPaths.resetPassword,
        element: <ResetPasswordPage />,
      },
      {
        path: webAuthPaths.sendTwoFactorCode,
        element: <TwoFactorPage />,
      },
      {
        path: webAuthPaths.verifyTwoFactorCode,
        element: <VerifyAccountPage />,
      },
    ],
  },
  {
    ...protectedRoutes(),
    loader: () => authLoader(false),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
