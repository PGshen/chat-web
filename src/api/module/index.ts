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
  headers['Content-Type'] = 'application/json'
  headers['Sec-Fetch-Mode'] = 'cors'
  headers['Sec-Fetch-Dest'] = 'empty'
  headers['Sec-Fetch-Site'] = 'same-site'
  return headers
}
