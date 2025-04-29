import { RouteProps } from 'react-router';
import { Redirect } from '@/components/Redirect';
import { Page404 } from '@/components/Pages/Page404.tsx';
import { ReduxPage } from '@/components/Pages/redux-page.tsx';
import { Provider } from 'react-redux';
import { ReduxStore } from '@/stores/redux';
import { MobXPage, Todos } from '@/components/Pages/MobXPage';
import { ZustandPage } from '@/components/Pages/ZustandPage';
import { JotaiPage } from '@/components/Pages/JotaiPage';
import { LoginPage } from '@/components/Pages/Login';
import { ProtectedRoute } from '@/components/ProtectedRoute.tsx';
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
