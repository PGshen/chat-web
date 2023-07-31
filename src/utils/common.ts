/* eslint-disable @typescript-eslint/restrict-plus-operands */
/*
 * @Date: 2023-07-29 14:45:46
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-07-29 18:42:38
 * @FilePath: /ai-tool-web/src/utils/common.ts
 */

/**
 * @description: 随机字符串
 * @return {*}
 */
export function genRandomString (length: number) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

/**
 * @description: 时间戳格式化
 * @param {number} timestamp
 * @return {*}
 */
export function formatTime (timestamp: number): string {
  const date = new Date(timestamp * 1000)
  const Y = date.getFullYear()
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
  const D = date.getDate()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
}

export async function copyToClip (text: string) {
  return await new Promise((resolve, reject) => {
    try {
      const input: HTMLTextAreaElement = document.createElement('textarea')
      input.setAttribute('readonly', 'readonly')
      input.value = text
      document.body.appendChild(input)
      input.select()
      if (document.execCommand('copy')) { document.execCommand('copy') }
      document.body.removeChild(input)
      resolve(text)
    } catch (error) {
      reject(error)
    }
  })
}
