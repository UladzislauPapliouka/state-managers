import { RouteProps } from 'react-router';
import { Redirect } from '@/components/Redirect';
import { Page404 } from '@/components/Pages/Page404.tsx';
import { ReduxPage } from '@/components/Pages/redux-page.tsx';
import { Provider } from 'react-redux';
import { ReduxStore } from '@/stores/redux';
import { MobXPage, Todos } from '@/components/Pages/MobXPage';
import { ZustandPage } from '@/components/Pages/ZustandPage';
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
  {
    path: 'mobx',
    element: <MobXPage store={new Todos()} />
  },
  {
    path: 'zustand',
    element: <ZustandPage />
  },
  { path: '*', element: <Page404 /> }
];
