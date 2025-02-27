import AdminRoute from '@/routes/AdminRoute';
import Secure from '../helpers/secureLS';
import { RouteObject } from 'react-router-dom';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import AccountsPage from '@/pages/accounts/AccountsPage';
import AccountDetailPage from '@/pages/accounts/AccountDetailPage';
import LinguistRoute from './LinguistRoute';
import LinguistHomePage from '@/pages/linguist/LinguistHomePage';
import HealthWorkerHomePage from '@/pages/health-worker/HealthWorkerHomePage';
import VoiceAnnotatorHomePage from '@/pages/voice-annotator/VoiceAnnotatorHomePage';
import ViewRatings from '@/pages/admin/ViewRatings';

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
          {
            path: ':role/home',
            element: <ViewRatings />,
          },
        ],
      };
    case 'LINGUIST':
      return {
        path: '/linguist',
        element: <LinguistRoute />,
        children: [
          ...commonRoutes,
          {
            path: 'home',
            element: <LinguistHomePage />,
          },
          {
            path: 'dashboard',
            element: <AccountDetailPage />,
          },
        ],
      };
    case 'PROFESSIONAL_HEALTH_WORKER':
      return {
        path: '/professional-health-worker',
        element: <LinguistRoute />,
        children: [
          ...commonRoutes,
          {
            path: 'home',
            element: <HealthWorkerHomePage />,
          },
          {
            path: 'dashboard',
            element: <AccountDetailPage />,
          },
        ],
      };
    case 'VOICE_ANNOTATOR':
      return {
        path: '/voice-annotator',
        element: <LinguistRoute />,
        children: [
          ...commonRoutes,
          {
            path: 'home',
            element: <VoiceAnnotatorHomePage />,
          },
          {
            path: 'dashboard',
            element: <AccountDetailPage />,
          },
        ],
      };
    default:
      return {};
  }
};
