import type { FC, ReactNode } from 'react';

import usePermission from '@/hooks/usePermission.ts';

interface PermissionProps {
    key: string | string[];
    children: (hasPermission: boolean) => ReactNode;
}

const Permission: FC<PermissionProps> = ({ key, children }) => {
    const hasPermission = usePermission(key);
    return <>{children(hasPermission)}</>;
};

export default memo(Permission);
