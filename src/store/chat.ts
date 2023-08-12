/*
 * @Date: 2023-08-02 21:30:30
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-08-12 20:36:07
 * @FilePath: /ai-tool-web/src/store/chat.ts
 */
import { Chat, Message } from '@/types/chat'
import { defineStore } from 'pinia'

export const useChatStore = defineStore({
  id: 'chat',
  state: () => {
    return {
      myChatMap: new Map<string, Chat>()
    }
  },
  actions: {
    newChat (chat: Chat) {
      this.myChatMap.set(chat.id, chat)
    },
    delChat (chatId: string) {
      this.myChatMap.delete(chatId)
    },
    getChat (chatId: string): Chat {
      return this.myChatMap.get(chatId)!
    },
    getChatList () {
      const chatList: Chat[] = []
      if (this.myChatMap.size > 0) {
        this.myChatMap.forEach((value) => {
          chatList.push(value)
        })
      }
      return chatList
    },
    appendMessage (chatId: string, message: Message) {
      const chat = this.getChat(chatId)
      chat.messageList.push(message)
      this.myChatMap.set(chat.id, chat)
    },
    updateChatTitle (chatId: string, title: string) {
      const chat = this.getChat(chatId)
      chat.title = title
      this.myChatMap.set(chat.id, chat)
    },
    getChatHistoryMessage(chatId: string, count: number, lastIndex: number) {
      const messageList = this.getChat(chatId).messageList
      const num = count < messageList.length ? count : messageList.length
      if (lastIndex > 0) {  // 指定中间的
        const ret = messageList.slice(0, lastIndex).slice(-num-2, -2)
        // console.log(ret)
        return ret
      } else {
        const ret = messageList.slice(-num-2, -2);
        // console.log(ret)
        return ret
      }
    }
  },
  persist: {
    paths: ['myChatMap']
  }
})
