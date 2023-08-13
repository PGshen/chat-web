/*
 * @Descripttion: 
 * @version: 
 * @Date: 2023-08-02 13:24:13
 * @LastEditTime: 2023-08-13 10:50:52
 */
export interface IResponseType<P = {}> {
  code?: number
  msg?: string
  data?: P
}

/**
 * 获取设置
 */
export function getSettingWithCors () {
  const headers: Record<string, string> = {}
  headers['Content-Type'] = 'application/json'
  headers['Sec-Fetch-Mode'] = 'cors'
  headers['Sec-Fetch-Dest'] = 'empty'
  headers['Sec-Fetch-Site'] = 'same-site'
  return headers
}
