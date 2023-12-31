/*
 * @Date: 2023-07-29 19:18:04
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-08-13 11:30:02
 * @FilePath: /chat-web/src/store/setting.ts
 */
import { Setting } from '@/types/setting'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore({
  id: 'setting', // id必填，且需要唯一
  state: () => {
    return {
      setting: {
        apiKey: '',
        model: 'gpt-3.5-turbo',
        temperature: 0,
        presencePenalty: 0,
        maxToken: 2048,
        hisMsgCnt: 10
      } as Setting
    }
  },
  actions: {
    updateSetting (setting: Setting): void {
      this.setting = setting
    },
    getSetting (): Setting {
      return this.setting
    },
    getSettingWithCors () {
      const headers = this.setting as unknown as Record<string, string>
      headers['Content-Type'] = 'application/json'
      headers['Sec-Fetch-Mode'] = 'cors'
      headers['Sec-Fetch-Dest'] = 'empty'
      headers['Sec-Fetch-Site'] = 'same-site'
      return headers
    }
  },
  persist: {
    paths: ['setting']
  }
})
