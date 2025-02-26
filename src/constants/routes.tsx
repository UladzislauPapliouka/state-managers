import { RouteProps } from 'react-router';
import { Redirect } from '@/components/Redirect';
import { Page404 } from '@/components/Pages/Page404.tsx';
import { ReduxPage } from '@/components/Pages/redux-page.tsx';
export const ROUTES: Array<RouteProps> = [
  { path: '/', element: <Redirect to={'/redux'} /> },
  { path: 'redux', element: <ReduxPage /> },
  { path: '*', element: <Page404 /> }
];
