import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';

enum AppRoutes {
  MAIN = '/',
  NOT_FOUND = '*',
}

interface RouteProps {
  path: AppRoutes;
  element: React.ReactNode;
}

export const routeConfig: Array<RouteProps> = [
  {
    path: AppRoutes.MAIN,
    element: <MainPage />,
  },
  {
    path: AppRoutes.NOT_FOUND,
    element: <NotFoundPage />,
  },
];
