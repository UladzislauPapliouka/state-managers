import { RouteProps } from 'react-router';
import { Redirect } from '@/components/Redirect';
import { Page404 } from '@/components/Pages/Page404.tsx';
import { ReduxPage } from '@/components/Pages/redux-page.tsx';
import { Provider } from 'react-redux';
import { ReduxStore } from '@/stores/redux';
export const ROUTES: Array<RouteProps> = [
  { path: '/', element: <Redirect to={'/redux'} /> },
  {
    path: 'redux',
    element: (
      <Provider store={ReduxStore}>
        <ReduxPage />
      </Provider>
    )
  },
  { path: '*', element: <Page404 /> }
];
