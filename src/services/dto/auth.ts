/**
 * 登录Dto
 */
export interface LoginDto {
    /**
     * 登录账号
     */
    account: string;
    /**
     * 登录密码
     */
    password: string;
}

/**
 * 刷新Dto
 * */
export interface RefreshDto {
    refreshToken: string;
}
