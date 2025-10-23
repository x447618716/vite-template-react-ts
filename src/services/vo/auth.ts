/**
 * 登录响应Vo
 * */
export interface LoginVo {
    /**认证token*/
    accessToken: string;
    /**刷新token*/
    refreshToken: string;
    /**过期时间*/
    expiresAt: string;
}

/**
 * 权限响应Vo
 * */
export interface PermissionVo {
    /**菜单路由表*/
    permissionRouter: PermissionRouterVo[];
    /**授权码*/
    permissionCode: string[];
}

/**
 * 权限路由Vo
 * */
export interface PermissionRouterVo {
    /**路由标识*/
    id: string;
    /**父路由标识*/
    parentId: string;
    /**路由地址*/
    path: string;
    /**路径记录的名称。必须是唯一的*/
    name?: string;
    /***/
    title: string;
    /**路由图标*/
    icon?: string;
    /**组件路径*/
    component: string;
}
