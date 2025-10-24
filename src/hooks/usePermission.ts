import { useAppSelector } from '@/stores/hooks.ts';

interface UsePermissionOptions {
    /**
     * 匹配模式：'some' 表示任意一个权限存在即可；
     *         'every' 表示必须全部权限都存在。
     * @default 'some'
     */
    mode?: 'some' | 'every';
    /**
     * 是否在组件挂载后立即进行权限检查
     * 可用于延迟加载场景控制
     * @default true
     */
    immediate?: boolean;
}

/**
 * 权限钩子函数：检查当前用户是否拥有指定权限码
 *
 * 支持单个权限字符串或多个权限数组，并可通过选项配置匹配逻辑。
 *
 * @param key - 权限码，可以是单个字符串或字符串数组
 * @param options - 配置选项（匹配模式、是否立即执行等）
 * @returns {boolean} 是否具有所需权限
 *
 * @example
 * const hasEdit = usePermission('user.edit');
 * const hasAny = usePermission(['user.create',  'user.delete']);
 * const hasAll = usePermission(['admin', 'audit'], { mode: 'every' });
 */
const usePermission = (key: string | string[], options: UsePermissionOptions = {}): boolean => {
    const { mode = 'some', immediate = true } = options;
    const requiredPermissions = useMemo(() => (Array.isArray(key) ? key : [key]), [key]);

    const permissionCode = useAppSelector(state => state.permissionStore.permissionCode);
    const [hasPermission, setHasPermission] = useState(false);
    useEffect(() => {
        if (!immediate) return;

        const result =
            mode === 'every' ? requiredPermissions.every(p => permissionCode.includes(p)) : requiredPermissions.some(p => permissionCode.includes(p));

        setHasPermission(result);
    }, [permissionCode, requiredPermissions, mode, immediate]);
    return hasPermission;
};

export default usePermission;
