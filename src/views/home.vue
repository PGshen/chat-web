<!--
 * @Descripttion: 
 * @version: 
 * @Date: 2023-07-27 19:40:33
 * @LastEditTime: 2023-08-11 19:02:26
-->
<!-- Home -->

<template>
  <n-result
    status="success"
    title="Dashboard"
    description="A dashboard scaffolding based on Vue.js 3.x created by Vite."
    size="huge"
  >
    <template #footer>
      <n-button @click="handleClick">Just So So</n-button>
    </template>
  </n-result>
</template>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'

const message = useMessage()

const handleClick = (): void => {
  message.success('Just So So')
}
</script>

<style scoped>
.n-result {
  margin: 10vh 0;
}
</style>
