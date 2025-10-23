import { type FC, Suspense } from 'react';
import KeepAlive from 'react-activation';
import { useLocation, useNavigate } from 'react-router';

import { useAppSelector } from '@/stores/hooks';
import { isLogin } from '@/stores/reducer/authSlice';
import { dynamicRoutes } from '@/stores/reducer/permissionSlice.ts';

// 定义常量路径
const LOGIN_PATH = '/login';
const ROOT_PATH = '/';

/**
 * 认证守卫高阶组件
 * 负责登录状态校验 + 自动跳转 + 动态首页重定向
 */
export default function withAuthentication(WrappedComponent: FC) {
    return () => {
        const navigate = useNavigate();
        const location = useLocation();
        const haveLogin = useAppSelector(isLogin);
        const dynamic = useAppSelector(dynamicRoutes);

        // 判断当前路径是否为登录页
        const isLoginRoute = location.pathname === LOGIN_PATH;

        // 判断动态路由中是否有根路径 (/)
        const hasRootInDynamic = dynamic.some(route => [ROOT_PATH].includes(route.path as string));

        // 提取首个有效动态路由路径
        const getFirstDynamicPath = (): string | null => {
            const first = dynamic.length > 0 ? dynamic[0] : null;
            return first ? (first.path as string) || null : null;
        };

        useEffect(() => {
            // 若尚未登录且不在登录页 → 跳转至登录
            if (!haveLogin && !isLoginRoute) {
                void navigate(LOGIN_PATH, { replace: true });
                return;
            }

            // 若已登录且处于登录页 → 跳转至默认首页
            if (haveLogin && isLoginRoute) {
                void navigate(ROOT_PATH, { replace: true });
                return;
            }

            // 若已登录且访问根路径 '/'，但动态路由无根配置 → 跳转到第一个动态菜单项
            if (haveLogin && location.pathname === ROOT_PATH && !hasRootInDynamic) {
                const firstPath = getFirstDynamicPath();
                if (firstPath) {
                    void navigate(firstPath, { replace: true });
                }
                return;
            }
        }, [location,haveLogin,dynamic]);

        return (
            <KeepAlive>
                <Suspense fallback={<div>加载中···</div>}>
                    <WrappedComponent />
                </Suspense>
            </KeepAlive>
        );
    };
}
