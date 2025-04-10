import { createAppSlice } from "../createAppSlice"
import type { PayloadAction } from "@reduxjs/toolkit"
//import { RootState } from "@/stores"

export interface GlobalSliceState {
  accessToken?: string
  deviceId?: string
}

export const initialState: GlobalSliceState = {}
export const globalSlice = createAppSlice({
  name: "global",
  initialState,
  reducers: create => ({
    setAccessToken: create.reducer((state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    }),
    setDeviceId: create.reducer((state, action: PayloadAction<string>) => {
      state.deviceId = action.payload
    }),
  }),
  selectors: {
    getDeviceId: state => state.deviceId,
    getAccessToken: state => state.accessToken,
  },
})

export const { setAccessToken, setDeviceId } = globalSlice.actions
export const { getDeviceId, getAccessToken } = globalSlice.selectors
