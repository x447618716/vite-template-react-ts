import type { createBrowserRouter, NavigateOptions } from 'react-router';

type Route = ReturnType<typeof createBrowserRouter>;

let navigateFn: Route | undefined;

export const setNavigator = (navigate: Route) => {
    navigateFn = navigate;
};

export const navigate = (to: string, options?: NavigateOptions) => {
    if (navigateFn) void navigateFn.navigate(to, options);
};
