/*
 * @Descripttion:
 * @version:
 * @Date: 2023-04-29 22:27:47
 * @LastEditTime: 2023-08-13 10:45:01
 */
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { useMessage } from 'naive-ui'
import { useSettingStore } from '@/store/setting'

const service = axios.create()

// Request interceptors
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // do something
    return config
  },
  async (error: any) => {
    return await Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  async (response: AxiosResponse) => {
    // console.log(response)
    if (response.status !== 200) {
      useMessage().error('Request error!')
    }
    // const data = response.data
    // if (data.code !== 200) {
    //   useMessage().error(data.msg)
    // }

    return response.data
    // do something
  },
  async (error: any) => {
    // do something
    console.log(error)
    return await Promise.reject(error)
  }
)

export default service
