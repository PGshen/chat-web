/*
 * @Date: 2023-07-27 22:35:12
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-08-03 00:22:23
 * @FilePath: /ai-tool-web/src/api/module/chat.ts
 */
import request from '@/utils/axios'
import { TripQuery, TripReply } from '@/types/chat'

export const tripQuery = async (data: TripQuery) => {
  return await request<TripReply>({
    url: '/ai/trip/query',
    method: 'post',
    data: data
  })
}
