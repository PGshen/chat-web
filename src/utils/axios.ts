/*
 * @Descripttion:
 * @version:
 * @Date: 2023-04-29 22:27:47
 * @LastEditTime: 2023-08-11 18:59:31
 */
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { useMessage } from 'naive-ui'
import { useSettingStore } from '@/store/setting'

const setting = useSettingStore().getSetting()

axios.defaults.headers.common.apiKey = setting.apiKey
axios.defaults.headers.common.model = setting.model
axios.defaults.headers.common.temperature = setting.temperature
axios.defaults.headers.common.presencePenalty = setting.presencePenalty
axios.defaults.headers.common.Authorization = 'Bearer ' + setting.apiKey

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
