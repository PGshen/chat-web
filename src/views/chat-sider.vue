<!--
 * @Date: 2023-07-28 09:46:28
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-07-28 09:52:54
 * @FilePath: /ai-tool-web/src/views/chat-sider.vue
-->
<template>
  <div class="sider">
    <div class="sider-chat-history">
      chat-list
    </div>
    <div class="sider-chat-setting">
      setting
    </div>
  </div>
</template>

<style scoped>
.sider {
  display: flex;
  flex-direction: column;
}

.sider-chat-history {
  flex: 1;
}

.sider-chat-setting {
  height: 150px;
  border-top: 1px solid rgb(211, 211, 211);
}
</style>
