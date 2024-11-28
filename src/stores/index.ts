import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist"
import storage from "redux-persist/lib/storage/session"
import { counterSlice } from "@/features/counter/counterSlice"
import { quotesApiSlice } from "@/features/quotes/quotesApiSlice"
// import { globalSlice } from "@/stores/reducer/globalSlice"

const rootReducer = combineSlices(counterSlice, quotesApiSlice)

const persistConfig = {
  key: "root",
  storage,
  debug: process.env.NODE_ENV !== "production",
  blacklist: ["_persist"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(quotesApiSlice.middleware)
  },
})
setupListeners(store.dispatch)

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
