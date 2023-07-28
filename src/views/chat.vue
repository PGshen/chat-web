<!--
 * @Date: 2023-07-28 00:17:20
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-07-28 09:14:36
 * @FilePath: /ai-tool-web/src/views/chat.vue
-->
<template>
  <n-layout has-sider style="height: 100%;">
    <n-layout-sider
      collapse-mode="transform"
      :collapsed-width="15"
      :width="240"
      :show-collapsed-content="false"
      show-trigger="arrow-circle"
      content-style="padding: 24px;"
      :native-scrollbar="false"
      :bordered="!collapsed"
      :collapsed="collapsed"
      @update:collapsed="toggle"
    >
      海淀桥 海淀桥 海淀桥 海淀桥 海淀桥
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px;">
      平山道
    </n-layout-content>
  </n-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const collapsed = ref(false)

    const toggle = () => {
      collapsed.value = !collapsed.value
    }

    return {
      collapsed,
      toggle
    }
  }
})
</script>
