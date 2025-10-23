import { Toast } from '@/utils';

export const checkStatus = (status: number, msg?: string) => {
    let errMessage = msg;
    switch (status) {
        case ResultEnum.FAIL:
            errMessage = `${msg}`;
            break;
        case ResultEnum.UNAUTHORIZED:
            errMessage = '用户没有权限（令牌、用户名、密码错误），请重新登录!';
            break;
        case ResultEnum.FORBIDDEN:
            errMessage = '用户得到授权，但是访问是被禁止的!';
            break;
        case ResultEnum.NOTFOUND:
            errMessage = '网络请求错误,未找到该资源!';
            break;
        case ResultEnum.TIMEOUT:
            errMessage = '网络请求超时!';
            break;
        case ResultEnum.ERROR:
            errMessage = '服务器错误,请联系管理员!';
            break;
        case ResultEnum.BAD_GATEWAY:
            errMessage = '服务不可用，服务器暂时过载或维护!';
            break;
        case ResultEnum.SERVICE_UNAVAILABLE:
            errMessage = '服务不可用，服务器暂时过载或维护!';
            break;
    }
    if (errMessage) {
        Toast(errMessage);
    }
};
