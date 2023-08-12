/*
 * @Date: 2023-07-29 22:33:40
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-08-12 18:39:44
 * @FilePath: /ai-tool-web/src/types/chat.ts
 */
// 单个消息
export interface Message {
  index: number
  id: string
  text: string
  isSelf: boolean
  isEditing: boolean
  time: number
}

// 单个对话记录
export interface Chat {
  id: string
  title: string
  messageList: Message[]
  time: number
}

export interface TripQuery {
  user: string
  query: string
}

export interface TripReply {
  message: string
}

export interface OpenAiMessage {
  role: string
  content: string
}

export interface OpenAiChatQuery {
  model: string
  messages: OpenAiMessage[]
  temperature: number | null
  stream: boolean
}

export interface OpenAiChatReply {
  id: string
  object: string
  created: number
  model: string
  choices: OpenAiChoice[]
  usage: OpenAiUsage
}

export interface OpenAiChoice {
  index: string
  delta: OpenAiDelta
  message: OpenAiDelta
  finish_reason: string
}

export interface OpenAiDelta {
  content: string
}

export interface OpenAiUsage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}
