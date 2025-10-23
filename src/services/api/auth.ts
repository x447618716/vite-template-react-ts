import request from '@/http';

/**
 * 刷新token
 */
export const refreshAccessToken = (data: RefreshDto) => request.Post<BaseResponse<LoginVo>>('/customers/refresh/token', data);

/**
 * 登录
 * */
export const login = (data: LoginDto) => request.Post<BaseResponse<LoginVo>>('/customers/login', data);

/**
 * 退出
 * */
export const logout = () => request.Post<BaseResponse<boolean>>('/customers/logout');

/**
 * 获取用户权限
 * */
export const permission = () => request.Get<BaseResponse<PermissionVo>>('/customers/permission');
