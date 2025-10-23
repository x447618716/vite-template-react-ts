/**
 * 请求结果设置
 */
export enum ResultEnum {
    /**请求成功*/
    SUCCESS = 200,
    /**请求语法错误（如参数格式错误）*/
    FAIL = 400,
    /**请求超时*/
    TIMEOUT = 408,
    /**资源不存在（URL错误或已删除）*/
    NOTFOUND = 404,
    /**请求未授权*/
    FORBIDDEN = 403,
    /**需身份验证（如未登录）*/
    UNAUTHORIZED = 401,
    /**服务器内部错误（如代码异常）*/
    ERROR = 500,
    /**网关/代理服务器收到无效响应*/
    BAD_GATEWAY = 502,
    /**服务不可用（服务器过载或维护）*/
    SERVICE_UNAVAILABLE = 503,
    /**网关超时（上游服务器未响应）*/
    GATEWAY_TIMEOUT = 504,
    /**AccessToken 过期*/
    ACCESS_TOKEN_EXPIRED = 10001,
    /**RefreshToken 过期*/
    REFRESH_TOKEN_EXPIRED = 10002
}

/**
 *  请求contentType
 */
export enum ContentTypeEnum {
    JSON = 'application/json;charset=UTF-8',
    FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    FORM_DATA = 'multipart/form-data;charset=UTF-8'
}
