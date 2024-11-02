/*
 * @Date: 2023-07-27 22:35:12
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-08-13 10:48:34
 * @FilePath: /chat-web/src/api/module/chat.ts
 */
import request from '@/utils/axios'
import { DifyT, ShareReply, DifySearchReq, DifySearchReply, DifyTemplateId, EmptyReply } from '@/types/dify'
import { IResponseType } from './index'

export const shareDifyT = async (data: DifyT) => {
  return await request<IResponseType<ShareReply>>({
    url: '/api/dify/share',
    method: 'post',
    data: data
  })
}

export const searchDifyT = async (data: DifySearchReq) => {
  return await request<IResponseType<DifySearchReply>>({
    url: '/api/dify/search',
    method: 'post',
    data: data
  })
}

export const likeDifyT = async (data: DifyTemplateId) => {
  return await request<IResponseType<EmptyReply>>({
    url: '/api/dify/like',
    method: 'post',
    data: data
  })
}

export const dislikeDifyT = async (data: DifyTemplateId) => {
  return await request<IResponseType<EmptyReply>>({
    url: '/api/dify/dislike',
    method: 'post',
    data: data
  })
}

export const downloadDifyT = async (data: DifySearchReq) => {
  return await request<IResponseType<EmptyReply>>({
    url: '/api/dify/download',
    method: 'post',
    data: data
  })
}