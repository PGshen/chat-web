/*
 * @Date: 2023-07-27 22:35:12
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-08-13 10:48:34
 * @FilePath: /chat-web/src/api/module/chat.ts
 */
import request from '@/utils/axios'
import { OpenAiChatQuery, OpenAiChatReply, TripQuery, TripReply } from '@/types/chat'
import { useSettingStore } from '@/store/setting'

const setting = useSettingStore().getSetting()

export const tripQuery = async (data: TripQuery) => {
  return await request<TripReply>({
    url: '/ai/trip/query',
    method: 'post',
    data: data
  })
}

export const openAiCompletions = async (params:OpenAiChatQuery) => {
  return await request<OpenAiChatReply>({
    url: '/openai/v1/chat/completions',
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + setting.apiKey
    },
    data: params
  })
}