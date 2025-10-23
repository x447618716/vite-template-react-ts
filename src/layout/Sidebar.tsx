import { Menu, type MenuProps } from 'antd';
import type { FC } from 'react';
import { useNavigate } from 'react-router';

import { useAppSelector } from '@/stores/hooks.ts';
import { sidebarMenu } from '@/stores/reducer/permissionSlice.ts';

const Sidebar: FC = () => {
    const navigate = useNavigate();
    const menu = useAppSelector(sidebarMenu);

    const onClick: MenuProps['onClick'] = e => {
        const route = menu.find(item => item.key === e.key);
        if (route) {
            void navigate(route.path);
        }
    };

    return <Menu onClick={onClick} items={menu as never} />;
};

export default Sidebar;
