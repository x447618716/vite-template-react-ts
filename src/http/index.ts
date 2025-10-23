import { axiosRequestAdapter } from '@alova/adapter-axios';
import { createAlova } from 'alova';
import type { AxiosError } from 'axios';
import { assign } from 'lodash-es';

import { checkStatus } from '@/http/checkStatus.ts';
import { navigate } from '@/router/navigate.ts';
import type { BaseResponse } from '@/services/vo/common.ts';
import { store } from '@/stores';
import { loginOut, refresh } from '@/stores/thunk';
import { Toast } from '@/utils';

/**
 * alova 请求实例
 * @link https://github.com/alovajs/alova
 */
const alovaInstance = createAlova({
    baseURL: import.meta.env.VITE_BASE_URL,
    requestAdapter: axiosRequestAdapter(),
    timeout: 10000,
    cacheFor: null, // 完全禁用缓存
    beforeRequest: async method => {
        const { accessToken } = store.getState().authStore.auth;
        const authorization = accessToken ? { Authorization: `Bearer ${accessToken}` } : null;
        method.config.headers = assign(authorization, { apifoxToken: 'zC_7kbY3_WeqXhxSog7ry' }, method.config.headers);
    },
    responded: {
        onSuccess: async (response, method) => {
            const { status, data } = response;
            if (status !== ResultEnum.SUCCESS) {
                checkStatus(status, '服务不可用,请稍后重试！');
                return Promise.reject(response);
            }
            const { code, message } = data as BaseResponse<null>;
            if (code === ResultEnum.ACCESS_TOKEN_EXPIRED) {
                const isSuccess = await refresh();
                if (isSuccess) {
                    const { accessToken } = store.getState().authStore.auth;
                    const authorization = accessToken ? { Authorization: `Bearer ${accessToken}` } : null;
                    method.config.headers = assign(method.config.headers, authorization);
                    await method.send();
                } else {
                    navigate('/login', { replace: true });
                }
                return Promise.reject();
            }
            if (code === ResultEnum.REFRESH_TOKEN_EXPIRED) {
                store.dispatch(loginOut());
                navigate('/login', { replace: true });
                return Promise.reject();
            }
            if (code !== ResultEnum.SUCCESS) {
                checkStatus(code, message);
                return Promise.reject(response);
            } else {
                return Promise.resolve(data as object);
            }
        },
        onError: (err: AxiosError, method) => {
            Toast(err.message);
            return Promise.reject({ err, method });
        }
    }
});

export default alovaInstance;
