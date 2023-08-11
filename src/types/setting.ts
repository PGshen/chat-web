/*
 * @Date: 2023-07-29 19:16:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-11 18:25:48
 * @FilePath: /ai-tool-web/src/types/setting.ts
 */
export interface Setting {
  apiKey: string
  model: string
  temperature: number
  presencePenalty: number
  maxToken: number
  hisMsgCnt: number
}
