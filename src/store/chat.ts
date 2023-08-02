/*
 * @Date: 2023-08-02 21:30:30
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-08-03 00:31:56
 * @FilePath: /ai-tool-web/src/store/chat.ts
 */
import { Chat, Message } from '@/types/chat'
import { defineStore } from 'pinia'

export const useChatStore = defineStore({
  id: 'chat',
  state: () => {
    return {
      chatRecords: new Map<string, Chat>()
    }
  },
  actions: {
    newChat (chat: Chat) {
      this.chatRecords.set(chat.id, chat)
      console.log(this.chatRecords)
    },
    delChat (chatId: string) {
      this.chatRecords.delete(chatId)
    },
    getChat (chatId: string): Chat {
      return this.chatRecords.get(chatId)!
    },
    getChatList () {
      const chatList: Chat[] = []
      if (this.chatRecords.size > 0) {
        this.chatRecords.forEach((value) => {
          chatList.push(value)
        })
      }
      return chatList
    },
    appendMessage (chatId: string, message: Message) {
      const chat = this.getChat(chatId)
      chat.messageList.push(message)
      this.chatRecords.set(chat.id, chat)
    }
  },
  persist: {
    // paths: ['chatRecords']
  }
})
