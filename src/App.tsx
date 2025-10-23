import type { FC } from 'react';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import router from '@/router';
import { setNavigator } from '@/router/navigate.ts';
import { useAppDispatch, useAppSelector } from '@/stores/hooks.ts';
import { isLogin } from '@/stores/reducer/authSlice';
import { dynamicRoutes } from '@/stores/reducer/permissionSlice.ts';
import { getPermission } from '@/stores/thunk';

const App: FC = () => {
    const dispatch = useAppDispatch();
    const dynamic = useAppSelector(dynamicRoutes);
    const haveLogin = useAppSelector(isLogin);

    const routers = useMemo(() => {
        const route = router.find(item => ['/'].includes(item.path as string));
        if (route) {
            route.children = dynamic;
        }
        return createBrowserRouter(router, {
            basename: '/'
        });
    }, [dynamic]);

    useEffect(() => {
        if (haveLogin) {
            dispatch(getPermission());
        }
    }, [haveLogin]);

    useEffect(() => {
        setNavigator(routers);
    }, [routers]);

    return <RouterProvider router={routers} />;
};

export default App;
