/**
 * 响应体Vo
 */
export interface BaseResponse<T> {
    code: number;
    data: T;
    message: string;
}
