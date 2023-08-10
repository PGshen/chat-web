/*
 * @Descripttion: 
 * @version: 
 * @Date: 2023-08-02 13:24:13
 * @LastEditTime: 2023-08-10 18:22:47
 */
import { useSettingStore } from '@/store/setting'
export interface IResponseType<P = {}> {
  code?: number
  msg?: string
  data?: P
}

/**
 * 获取设置
 */
export function getSettingWithCors () {
  const headers = useSettingStore().getSetting() as unknown as Record<string, string>
  headers['Authorization'] = 'Bearer ' + headers['apiKey']
  headers['Content-Type'] = 'application/json'
  headers['Sec-Fetch-Mode'] = 'cors'
  headers['Sec-Fetch-Dest'] = 'empty'
  headers['Sec-Fetch-Site'] = 'same-site'
  return headers
}
