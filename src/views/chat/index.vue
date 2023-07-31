<!--
 * @Date: 2023-07-28 00:17:20
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-07-30 13:53:25
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
      <chat-sider />
    </n-layout-sider>
    <n-layout-content>
      <div class="chat">
        <div class="chat-area">
          <chat-area />
        </div>
        <div class="chat-setting">
          <chat-seting />
        </div>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ChatSider from './chat-sider.vue'
import ChatSeting from './chat-setting.vue'
import ChatArea from './chat-area.vue'

const collapsed = ref(false)

const toggle = () => {
  collapsed.value = !collapsed.value
}
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
