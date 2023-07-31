/*
 * @Date: 2023-07-27 22:35:12
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-07-29 22:28:52
 * @FilePath: /ai-tool-web/src/api/index.ts
 */
import * as index from './module/index'
import * as login from './module/login'
import * as chat from './module/chat'

export default Object.assign({}, index, login, chat)
