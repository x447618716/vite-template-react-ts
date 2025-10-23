import { createSelector, type PayloadAction } from '@reduxjs/toolkit';
import { lazy } from 'react';
import type { RouteObject } from 'react-router';

import { createAppSlice } from '@/stores/createAppSlice.ts';

const Error = () => import('@/views/ErrorView.tsx');

interface PermissionState {
    permissionRouter: PermissionRouterVo[];
    permissionCode: string[];
}

interface MenusRouter {
    key: string;
    label: string;
    icon?: string;
    path: string;
    children?: MenusRouter[];
}

const initialState: PermissionState = {
    permissionRouter: [],
    permissionCode: []
};

// 匹配views里面所有的.tsx文件
const modules = import.meta.glob('./../../views/**/*.tsx');
const selectRawRouter = (state: PermissionState) => state.permissionRouter;

export const permissionSlice = createAppSlice({
    name: 'permissionStore',
    initialState,
    reducers: create => ({
        setPermission: create.reducer((state, action: PayloadAction<PermissionState>) => {
            state.permissionRouter = action.payload.permissionRouter;
            state.permissionCode = action.payload.permissionCode;
        })
    }),
    selectors: {
        sidebarMenu: createSelector(selectRawRouter, router => (router.length ? generateTreeStructure(router) : [])),
        dynamicRoutes: createSelector(selectRawRouter, router => (router.length ? generateRouter(router) : []))
    }
});

export const { setPermission } = permissionSlice.actions;
export const { sidebarMenu, dynamicRoutes } = permissionSlice.selectors;

/**
 * 生成树结构数据
 * */
const generateTreeStructure = (router: PermissionRouterVo[]) => {
    const map = new Map<string, MenusRouter>();
    const tree: MenusRouter[] = [];

    router.forEach(node => {
        map.set(node.id, { key: node.id, label: node.title, path: node.path, icon: node.icon });
    });
    router.forEach(node => {
        const { parentId } = node;
        const currentNode = map.get(node.id);
        if (!currentNode) return;
        if (parentId === '') {
            tree.push(currentNode);
        } else {
            const parent = map.get(parentId);
            if (parent) {
                parent.children ??= [];
                parent.children.push(currentNode);
            }
        }
    });
    return tree;
};

/**
 * 生成路由
 * */
const generateRouter = (router: PermissionRouterVo[]) => {
    const dynamicRoutes: RouteObject[] = [];
    router.forEach(item => {
        const component = loadComponent(item.component);
        dynamicRoutes.push({
            path: item.path,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            Component: lazy(component)
        });
    });
    return dynamicRoutes;
};

/**
 * 加载组件
 * */
const loadComponent = (componentPath: string) => {
    for (const [filePath, loader] of Object.entries(modules)) {
        const [_, name] = filePath.match(/\.\/views\/(.*)\.tsx$/) ?? [];
        if (name === componentPath) {
            return loader;
        }
    }
    return Error;
};
