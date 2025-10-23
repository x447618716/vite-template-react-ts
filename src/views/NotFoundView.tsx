import type { FC } from 'react';

const NotFoundView: FC = () => {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="text-5xl text-amber-400">404</div>
        </div>
    );
};

export default NotFoundView;
