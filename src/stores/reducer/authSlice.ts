import { createSelector, type PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { createAppSlice } from '@/stores/createAppSlice';

interface Auth {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
}

interface AuthSliceState {
    auth: Auth;
    accountInfo: LoginDto;
}

const initialState: AuthSliceState = {
    auth: {
        accessToken: '',
        refreshToken: '',
        expiresAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
    },
    accountInfo: {
        account: '',
        password: ''
    }
};

const selectExpiresAt = (state: AuthSliceState) => state.auth.expiresAt;

export const authSlice = createAppSlice({
    name: 'authStore',
    initialState,
    reducers: create => ({
        setAuth: create.reducer((state, action: PayloadAction<Auth>) => {
            state.auth = action.payload;
        }),
        setAccountInfo: create.reducer((state, action: PayloadAction<LoginDto>) => {
            state.accountInfo = action.payload;
        }),
        resetState: create.reducer(state => {
            state.auth = {
                accessToken: '',
                refreshToken: '',
                expiresAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
            };
            state.accountInfo = {
                account: '',
                password: ''
            };
        })
    }),
    selectors: {
        isLogin: createSelector(selectExpiresAt, expiresAt => dayjs().isBefore(dayjs(expiresAt)))
    }
});

export const { setAuth, setAccountInfo, resetState } = authSlice.actions;
export const { isLogin } = authSlice.selectors;
