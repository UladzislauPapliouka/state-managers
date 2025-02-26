import { RouteProps } from 'react-router';
import { Redirect } from '@/components/Redirect';
export const ROUTES: Array<RouteProps> = [
  { path: '/', element: <Redirect to={'/redux'} /> },
  { path: 'redux', element: <span>Redux</span> }
];
