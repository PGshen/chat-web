<!--
 * @Date: 2023-07-28 09:46:28
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-07-29 16:02:17
 * @FilePath: /ai-tool-web/src/views/chat/chat-sider.vue
-->
<template>
  <div class="sider">
    <div class="new-chat">
      <n-button type="primary" block dashed>
        New Chat
      </n-button>
    </div>
    <div class="chat-list">
      <div v-for="item in chatList" :key="item.id" class="chat-item">
        <div class="close-btn">
          <n-icon :size="18" :component="CloseCircleOutline" />
        </div>
        <div>
          <n-ellipsis :line-clamp="2">
            {{ item.name }}
          </n-ellipsis>
        </div>
        <div style="font-size: 10px; text-align: end;">{{ common.formatTime(item.time) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { common } from '@/utils'
import { CloseCircleOutline } from '@vicons/ionicons5'
const chatList = [
  {
    id: 1,
    name: '聊天记录1',
    time: 1690611810
  },
  {
    id: 2,
    name: '电灯熄灭 物换星移 泥牛入海<br>黑暗好像 一颗巨石 按在胸口',
    time: 1690611810
  },
  {
    id: 3,
    name: '聊天记录4',
    time: 1690611810
  },
  {
    id: 1,
    name: '聊天记录1',
    time: 1690611810
  },
  {
    id: 2,
    name: '聊天记录2',
    time: 1690611810
  },
  {
    id: 3,
    name: '聊天记录4',
    time: 1690611810
  },
  {
    id: 1,
    name: '聊天记录1',
    time: 1690611810
  },
  {
    id: 2,
    name: '聊天记录2',
    time: 1690611810
  },
  {
    id: 3,
    name: '聊天记录4',
    time: 1690611810
  }
]
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
    color: #36ad6a;
    border: 1px solid #36ad6a;
    .close-btn {
      right: 3px;
      opacity: 1;
    }
  }
}

.close-btn {
  position: absolute;
  top: 3px;
  right: 0px;
  transition: all .3s ease;
  opacity: 0;
}
</style>
