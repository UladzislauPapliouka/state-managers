import { RouteProps } from 'react-router';
import { Redirect } from '../ui/Redirect';
import { Page404 } from '@/pages/Page404.tsx';
import { ReduxPage } from '@/pages/redux-page.tsx';
import { Provider } from 'react-redux';
import { ReduxStore } from '@/stores/redux';
import { MobXPage, Todos } from '@/pages/MobXPage.tsx';
import { ZustandPage } from '@/pages/ZustandPage.tsx';
import { JotaiPage } from '@/pages/JotaiPage.tsx';
import { LoginPage } from '../../pages/Login';
import { ProtectedRoute } from '@/entities/ProtectedRoute.tsx';
export const PROTECTED_ROUTES: Array<RouteProps> = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Redirect to={'/redux'} />
      </ProtectedRoute>
    )
  },
  {
    path: 'redux',
    element: (
      <ProtectedRoute>
        <Provider store={ReduxStore}>
          <ReduxPage />
        </Provider>
      </ProtectedRoute>
    )
  },
  {
    path: 'mobx',
    element: (
      <ProtectedRoute>
        <MobXPage store={new Todos()} />
      </ProtectedRoute>
    )
  },
  {
    path: 'zustand',
    element: (
      <ProtectedRoute>
        <ZustandPage />
      </ProtectedRoute>
    )
  },
  {
    path: 'jotai',
    element: (
      <ProtectedRoute>
        <JotaiPage />
      </ProtectedRoute>
    )
  },
  {
    path: '*',
    element: (
      <ProtectedRoute>
        <Page404 />
      </ProtectedRoute>
    )
  }
];

export const PUBLIC_ROUTES: Array<RouteProps> = [
  { path: 'login', element: <LoginPage /> }
];
