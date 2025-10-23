import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

import { authSlice } from '@/stores/reducer/authSlice';
import { permissionSlice } from '@/stores/reducer/permissionSlice';

const rootReducer = combineSlices(authSlice,permissionSlice);

const persistConfig = {
    key: 'root',
    storage,
    debug: process.env.NODE_ENV !== 'production',
    blacklist: ['_persist']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
    const store = configureStore({
        reducer: persistedReducer,
        devTools: process.env.NODE_ENV !== 'production',
        middleware: getDefaultMiddleware => {
            return getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
                }
            });
        }
    });
    setupListeners(store.dispatch);
    return store;
};

export const store = makeStore();

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
