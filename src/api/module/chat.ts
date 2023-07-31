/*
 * @Date: 2023-07-27 22:35:12
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-07-29 22:27:43
 * @FilePath: /ai-tool-web/src/api/module/chat.ts
 */
import request from '@/utils/axios'
import { IResponseType } from '.'

/**
 * 登录
 */
interface ILogin {
  token: string
  expires: number
}
export const login = async (username: string, password: string) => {
  return await request<IResponseType<ILogin>>({
    url: '/api/auth/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
