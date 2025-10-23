import { Layout } from 'antd';
import type { FC } from 'react';
import { Outlet } from 'react-router';

import Sidebar from '@/layout/Sidebar.tsx';

const { Header, Sider, Content } = Layout;

const MyLayout: FC = () => (
    <Layout className="size-full">
        <Header className="text-white!">Header</Header>
        <Layout>
            <Sider className="text-white" width="200" collapsible collapsedWidth={0}>
                <Sidebar />
            </Sider>
            <Content>
                <Outlet />
            </Content>
        </Layout>
    </Layout>
);

export default MyLayout;
