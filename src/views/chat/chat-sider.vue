<!--
 * @Date: 2023-07-28 09:46:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-11 18:57:53
 * @FilePath: /ai-tool-web/src/views/chat/chat-sider.vue
-->
<template>
  <div class="sider">
    <div class="new-chat">
      <n-button type="primary" block dashed @click="newChat">
        New Chat
      </n-button>
    </div>
    <n-scrollbar>
      <div class="chat-list">
        <div
          v-for="item in chatList" :key="item.id" class="chat-item" :class="{ 'selected': nowChatId == item.id }"
          @click="openChat(item.id)"
        >
          <div class="close-btn" @click.stop="delChat(item.id)">
            <n-icon :size="18" :component="CloseCircleOutline" />
          </div>
          <div>
            <n-ellipsis :line-clamp="2">
              {{ item.title }}
            </n-ellipsis>
          </div>
          <div style="font-size: 10px; text-align: end;">{{ common.formatTime(item.time) }}</div>
        </div>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { Chat } from '@/types/chat'
import { useChatStore } from '@/store/chat'
import { common } from '@/utils'
import { CloseCircleOutline } from '@vicons/ionicons5'
import { PropType } from 'vue'

defineProps({
  chatList: {
    type: Array as PropType<Chat[]>,
    default: () => []
  },
  nowChatId: String
})
const emit = defineEmits(['newChat', 'openChat', 'refreshChat'])
const chatStore = useChatStore()

const newChat = () => {
  emit('newChat')
}

const delChat = (chatId: string) => {
  chatStore.delChat(chatId)
  emit('refreshChat')
}

const openChat = (chatId: string) => {
  console.log(`openChat ${chatId}`)
  emit('openChat', chatId)
}

</script>

<style lang="scss" scoped>
.sider {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.new-chat {
  padding: 10px;
}

.chat-list {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.chat-item {
  position: relative;
  padding: 5px 14px;
  font-size: 14px;
  border-radius: 3px;
  color: rgb(118, 124, 130);
  border: 1px solid rgb(224, 224, 230);
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
    color: #4464d4;
    border: 1px solid #4464d4;
    .close-btn {
      right: 3px;
      opacity: 1;
    }
  }
}
.selected {
  color: #155eef;
  border: 1px solid #155eef;
}

.close-btn {
  position: absolute;
  top: 3px;
  right: 0px;
  transition: all .3s ease;
  opacity: 0;
}
</style>
