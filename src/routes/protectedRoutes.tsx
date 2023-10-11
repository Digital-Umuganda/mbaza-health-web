import AdminRoute from '@/routes/AdminRoute';
import Secure from '../helpers/secureLS';
import { RouteObject } from 'react-router-dom';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import AccountsPage from '@/pages/accounts/AccountsPage';
import AccountDetailPage from '@/pages/accounts/AccountDetailPage';

export const protectedRoutes = (
  role = Secure.getProfile()?.role,
): RouteObject => {
  const commonRoutes: RouteObject[] = [
    {
      path: 'profile',
      element: <ProfilePage />,
    },
  ];
  switch (role) {
    case 'ADMIN':
      return {
        path: '/admin',
        element: <AdminRoute />,
        children: [
          ...commonRoutes,
          {
            path: 'home',
            element: <AdminDashboardPage />,
          },
          {
            path: 'accounts',
            element: <AccountsPage />,
          },
          {
            path: 'accounts/:id',
            element: <AccountDetailPage />,
          },
        ],
      };
    case 'LINGUIST':
      return {
        path: '/linguist',
        element: <AdminRoute />,
        children: [...commonRoutes],
      };
    case 'PROFESSIONAL_HEALTH_WORKER':
      return {
        path: '/professional-health-worker',
        element: <AdminRoute />,
        children: [...commonRoutes],
      };
    default:
      return {};
  }
};
