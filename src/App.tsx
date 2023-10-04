import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/login/LoginPage';
import AuthRoute from './routes/AuthRoute';
import { webAuthPaths } from './constants/path';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute />,
    children: [
      {
        path: webAuthPaths.login,
        element: <LoginPage />,
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
