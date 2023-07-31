/*
 * @Date: 2023-07-29 22:33:40
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-07-29 22:33:59
 * @FilePath: /ai-tool-web/src/types/chat.ts
 */
// 单个消息
export interface Message {
  index: number
  id: string
  text: string
  isSelf: boolean
  time: number
}
