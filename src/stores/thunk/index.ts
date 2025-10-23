import { logout, permission, refreshAccessToken } from '@/services/api/auth.ts';
import { type AppThunk, store } from '@/stores';
import { resetState, setAuth } from '@/stores/reducer/authSlice.ts';
import { setPermission } from '@/stores/reducer/permissionSlice.ts';

export const loginOut = (): AppThunk => async dispatch => {
    await logout();
    dispatch(resetState());
};

export const getPermission = (): AppThunk => async dispatch => {
    const res = await permission();
    if (res.code === ResultEnum.SUCCESS) {
        dispatch(setPermission(res.data));
    }
};

export const refresh = async () => {
    const { refreshToken } = store.getState().authStore.auth;
    const { code, data } = await refreshAccessToken({
        refreshToken: refreshToken
    });
    if (code == ResultEnum.SUCCESS) {
        store.dispatch(
            setAuth({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                expiresAt: data.expiresAt
            })
        );
        return true;
    } else {
        return false;
    }
};
