import type { FC } from 'react';

const ErrorView: FC = () => (
    <div className="flex h-screen w-full items-center justify-center">
        <div className="text-5xl text-amber-400">路由配置错误</div>
    </div>
);

export default ErrorView;
