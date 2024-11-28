import type { InternalAxiosRequestConfig } from "axios"
import axios from "axios"
import i18n from "./i18n"

/**
 * 请求内置操作
 * */
interface RequestOperate {
  /**
   * 定时器对象
   * */
  timer?: NodeJS.Timeout
  /**
   * 请求地址集
   * key:请求地址
   * value:请求时间戳
   * */
  requestMap: Map<string, number>
}

/**
 * 请求配置
 * */
interface RequestConfig extends InternalAxiosRequestConfig {
  /**
   *  是否加入请求队列 =>队列中的请求在请求完成前不可再次请求 =>请求完成移除队列
   * */
  debounce?: boolean
  /**
   * 是否过滤请求 =>过滤掉数据中值为undefined或null的字段
   * */
  filter?: boolean
}

const requestOperate: RequestOperate = {
  requestMap: new Map<string, number>(),
}

//全局配置axios
if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:8989"
} else {
  axios.defaults.baseURL = "http://localhost:8989"
}

// 添加请求拦截器
axios.interceptors.request.use(
  function (config: RequestConfig) {
    if (!config.url) {
      return config
    }
    //单请求添加取消事件
    const controller = new AbortController()
    config.signal = controller.signal
    //判断定时回收器是否存在不存在启动它
    if (!requestOperate.timer) {
      timerRecycling()
    }
    //判断当前请求是否已在请求列表中
    if (requestOperate.requestMap.has(config.url)) {
      controller.abort()
    } else {
      //判断是否加入请求集-> 默认为加入
      if (config?.debounce ?? true) {
        requestOperate.requestMap.set(config.url, new Date().getTime())
      }
    }
    return config
  },
  function (error) {
    //删除指定项
    requestOperate.requestMap.delete(error.config.url)
    return Promise.reject(error)
  },
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    if (response.config.url) {
      //删除指定项
      requestOperate.requestMap.delete(response.config.url)
    }

    return response.data
  },
  function (error) {
    //删除指定项
    requestOperate.requestMap.delete(error.config.url)
    return Promise.reject(error)
  },
)

//定时回收
const timerRecycling = () => {
  requestOperate.timer = setInterval(() => {
    //当前时间戳
    const currentTimeStamp = new Date().getTime()
    if (requestOperate.requestMap.size) {
      requestOperate.requestMap.forEach((value, key, map) => {
        //请求列中项存在时间超1分钟将其清除
        if (currentTimeStamp - value > 60000) {
          map.delete(key)
        }
      })
    } else {
      //清除定时器
      if (requestOperate.timer) {
        clearInterval(requestOperate.timer)
      }
    }
  }, 60000)

  //首次执行时清除冗余数据
  requestOperate.requestMap.forEach((value, key, map) => {
    //请求列中项存在时间超1分钟将其清除
    if (new Date().getTime() - value > 60000) {
      map.delete(key)
    }
  })
}

export default axios
