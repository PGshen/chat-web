<!--
 * @Date: 2023-07-28 00:17:20
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-08-03 00:34:18
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
      :bordered="!collapsed"
      :collapsed="collapsed"
      @update:collapsed="toggle"
    >
      <chat-sider
        :chat-list="chatList"
        :now-chat-id="nowChat.id"
        @new-chat="newChatModal = true"
        @open-chat="openChat"
        @refresh-chat="refreshChat"
      />
    </n-layout-sider>
    <n-layout-content>
      <div class="chat">
        <div class="chat-area">
          <chat-area
            :now-chat="nowChat"
          />
        </div>
        <div class="chat-setting">
          <chat-seting />
        </div>
      </div>
    </n-layout-content>
  </n-layout>
  <n-modal
    v-model:show="newChatModal"
    preset="dialog"
    positive-text="确认"
    @positive-click="newChat()"
  >
    <template #header>
      <div>新会话</div>
    </template>
    <n-form>
      <n-form-item-row>
        <n-input v-model:value="newChatTitle" type="textarea" placeholder="输入主题" />
      </n-form-item-row>
    </n-form>
  </n-modal>
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
const collapsed = ref(false)
const newChatModal = ref(false)
const newChatTitle = ref('')
const chatList = ref([] as Chat[])
const nowChat = ref({} as Chat)

const newChat = () => {
  if (newChatTitle.value === '') {
    return ''
  }
  const chat: Chat = {
    id: common.genRandomString(16),
    title: newChatTitle.value,
    messageList: [],
    time: Date.now() / 1000
  }
  chatStore.newChat(chat)
  newChatTitle.value = ''
  newChatModal.value = false
  console.log(chat)
  refreshChat()
  openChat(chat.id)
}

const openChat = (chatId: string) => {
  const chat = chatStore.getChat(chatId)
  console.log(chat)
  nowChat.value = chat
}

const refreshChat = () => {
  chatList.value = chatStore.getChatList()
}

const toggle = () => {
  collapsed.value = !collapsed.value
}

onMounted(() => {
  chatList.value = chatStore.getChatList()
})
</script>

<style lang="scss" scoped>
.chat {
  width: 100%;
  height: 100%;
  display: flex;
}

.chat-area {
  // flex: 1;
  width: calc(100% - 240px);
}

.chat-setting {
  width: 240px;
  padding: 0px 10px;
  border-left: 1px solid rgb(224, 224, 230);
}
</style>
