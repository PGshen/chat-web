<!--
 * @Date: 2023-07-28 00:17:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-11 18:59:58
 * @FilePath: /ai-tool-web/src/views/chat/index.vue
-->
<template>
  <n-layout has-sider style="height: 100%;">
    <n-layout-sider
      collapse-mode="transform"
      :collapsed-width="0"
      :width="240"
      :show-collapsed-content="false"
      show-trigger="bar"
      :bordered="!chatListCollapsed"
      :collapsed="chatListCollapsed"
      @update:collapsed="toggleChatList"
    >
      <chat-sider
        :chat-list="chatList"
        :now-chat-id="nowChat.id"
        @new-chat="newChat"
        @open-chat="openChat"
        @refresh-chat="refreshChat"
      />
    </n-layout-sider>
    <n-layout has-sider sider-placement="right">
      <n-layout>
        <chat-area
          :now-chat="nowChat"
        />
      </n-layout>
      <n-layout-sider
        collapse-mode="transform"
        :collapsed-width="0"
        :width="240"
        :show-collapsed-content="false"
        show-trigger="arrow-circle"
        :bordered="!chatSettingCollapsed"
        :collapsed="chatSettingCollapsed"
        @update:collapsed="toggleChatSetting"
      >
        <div class="chat-setting">
          <chat-seting />
        </div>
      </n-layout-sider>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Chat } from '@/types/chat'
import { useChatStore } from '@/store/chat'
import { common } from '@/utils'
import ChatSider from './chat-sider.vue'
import ChatSeting from './chat-setting.vue'
import ChatArea from './chat-area.vue'

const chatStore = useChatStore()
const chatListCollapsed = ref(false)
const chatSettingCollapsed = ref(true)
const newChatModal = ref(false)
const chatList = ref([] as Chat[])
const nowChat = ref({} as Chat)

const newChat = () => {
  const chat: Chat = {
    id: common.genRandomString(16),
    title: '新的对话',
    messageList: [],
    time: Date.now() / 1000
  }
  chatStore.newChat(chat)
  newChatModal.value = false
  // console.log(chat)
  refreshChat()
  openChat(chat.id)
}

const openChat = (chatId: string) => {
  const chat = chatStore.getChat(chatId)
  // console.log(chat)
  nowChat.value = chat
}

const refreshChat = () => {
  chatList.value = chatStore.getChatList()
  if (!chatList.value.includes(nowChat.value)) {
    nowChat.value = {} as Chat
  }
}

const toggleChatList = () => {
  chatListCollapsed.value = !chatListCollapsed.value
}

const toggleChatSetting = () => {
  chatSettingCollapsed.value = !chatSettingCollapsed.value
}

onMounted(() => {
  chatList.value = chatStore.getChatList()
})
</script>

<style lang="scss" scoped>

.chat-setting {
  width: 240px;
  padding: 0px 10px;
  border-left: 1px solid rgb(224, 224, 230);
}
</style>
