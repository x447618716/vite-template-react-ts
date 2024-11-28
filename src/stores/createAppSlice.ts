import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"

// 'buildCreateSlice' 允许我们使用异步 thunk 创建一个切片
export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})
