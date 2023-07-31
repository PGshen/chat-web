/*
 * @Date: 2023-07-29 19:16:40
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-07-29 22:58:18
 * @FilePath: /ai-tool-web/src/types/setting.ts
 */
export interface Setting {
  apiKey: string
  model: string
  temperature: number
  presencePenalty: number
  maxToken: number
}
