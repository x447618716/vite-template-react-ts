import type { FC } from 'react';

const NotPermissionView: FC = () => {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="text-5xl text-amber-400">403</div>
        </div>
    );
};

export default NotPermissionView;
