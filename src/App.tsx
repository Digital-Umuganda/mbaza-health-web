import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/login/LoginPage';
import AuthRoute from './routes/AuthRoute';
import { webAuthPaths } from './constants/path';
import ForgotPasswordPage from './pages/login/ForgotPasswordPage';
import ResetPasswordPage from './pages/login/ResetPasswordPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute />,
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
    ],
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
