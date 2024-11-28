import { store } from "@/stores"
import { setAccessToken, setDeviceId } from "@/stores/reducer/globalSlice"

//获取token
export const getAccessToken = () => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  const urlParams = Object.fromEntries(urlSearchParams.entries())
  if (urlParams.token) {
    store.dispatch(setAccessToken(urlParams.token))
  }
  if (urlParams.deviceId) {
    store.dispatch(setDeviceId(urlParams.deviceId))
  }
  const accessToken = urlParams.token ?? store.getState().global?.accessToken
  if (accessToken) {
    return accessToken
  } else {
    return ""
  }
}
