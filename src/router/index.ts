import { type FC, lazy } from 'react';
import { type RouteObject } from 'react-router';

// 使用动态导入延迟加载 AuthGuardComponent
const AuthGuardComponent = (WrappedComponent: FC) =>
    lazy(() => import('@/components/AuthGuardComponent').then(module => ({ default: module.default(WrappedComponent) })));
const Layout = lazy(() => import('@/layout/Layout'));
const Error = lazy(() => import('@/views/ErrorView.tsx'));
const NotFound = lazy(() => import('@/views/NotFoundView'));
const Login = lazy(() => import('@/views/LoginView'));
const NotPermission = lazy(() => import('@/views/NotPermissionView'));

const router: RouteObject[] = [
    {
        path: '/login',
        Component: AuthGuardComponent(Login)
    },
    {
        path: '/',
        Component: AuthGuardComponent(Layout),
        children: []
    },
    {
        path: '/error',
        Component: Error
    },
    {
        path: '/403',
        Component: NotPermission
    },
    {
        path: '*',
        Component: NotFound
    }
];

export default router;
