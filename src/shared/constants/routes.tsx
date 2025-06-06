import { RouteProps } from 'react-router';
import { Redirect } from '../ui/Redirect';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ReduxPage } from '@/pages/ReduxPage';
import { Provider } from 'react-redux';
import { ReduxStore } from '@/pages/ReduxPage/stores/redux';
import { MobXPage, Todos } from '@/pages/MobXPage';
import { ZustandPage } from '@/pages/ZustandPage';
import { JotaiPage } from '@/pages/JotaiPage';
import { LoginPage } from '../../pages/Login';
import { ProtectedRoute } from '../ui/ProtectedRoute';
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
        <NotFoundPage />
      </ProtectedRoute>
    )
  }
];

export const PUBLIC_ROUTES: Array<RouteProps> = [
  { path: 'login', element: <LoginPage /> }
];
