<!--
 * @Date: 2023-07-27 23:40:28
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-08-13 11:35:39
 * @FilePath: /chat-web/src/layouts/index.vue
-->
<template>
  <div style="display: flex; flex-direction: column; height: 100vh;">
    <div class="header">
      <n-a class="logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" width="1em" height="1em">
          <path
            d="M29.71,13.09A8.09,8.09,0,0,0,20.34,2.68a8.08,8.08,0,0,0-13.7,2.9A8.08,8.08,0,0,0,2.3,18.9,8,8,0,0,0,3,25.45a8.08,8.08,0,0,0,8.69,3.87,8,8,0,0,0,6,2.68,8.09,8.09,0,0,0,7.7-5.61,8,8,0,0,0,5.33-3.86A8.09,8.09,0,0,0,29.71,13.09Zm-12,16.82a6,6,0,0,1-3.84-1.39l.19-.11,6.37-3.68a1,1,0,0,0,.53-.91v-9l2.69,1.56a.08.08,0,0,1,.05.07v7.44A6,6,0,0,1,17.68,29.91ZM4.8,24.41a6,6,0,0,1-.71-4l.19.11,6.37,3.68a1,1,0,0,0,1,0l7.79-4.49V22.8a.09.09,0,0,1,0,.08L13,26.6A6,6,0,0,1,4.8,24.41ZM3.12,10.53A6,6,0,0,1,6.28,7.9v7.57a1,1,0,0,0,.51.9l7.75,4.47L11.85,22.4a.14.14,0,0,1-.09,0L5.32,18.68a6,6,0,0,1-2.2-8.18Zm22.13,5.14-7.78-4.52L20.16,9.6a.08.08,0,0,1,.09,0l6.44,3.72a6,6,0,0,1-.9,10.81V16.56A1.06,1.06,0,0,0,25.25,15.67Zm2.68-4-.19-.12-6.36-3.7a1,1,0,0,0-1.05,0l-7.78,4.49V9.2a.09.09,0,0,1,0-.09L19,5.4a6,6,0,0,1,8.91,6.21ZM11.08,17.15,8.38,15.6a.14.14,0,0,1-.05-.08V8.1a6,6,0,0,1,9.84-4.61L18,3.6,11.61,7.28a1,1,0,0,0-.53.91ZM12.54,14,16,12l3.47,2v4L16,20l-3.47-2Z"
            fill="currentColor"></path>
        </svg>
        <span>Hello</span>
      </n-a>
      <div v-for="item in funcList" :key="item.id" class="funcBtn" @click="handleNav(item.path)">
        <n-icon :size="18" :component="ChatbubblesOutline" />
        <span style="margin-left: 5px;">{{ item.title }}</span>
      </div>
    </div>
    <div style="flex: 1; overflow-y: auto;">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ChatbubblesOutline } from '@vicons/ionicons5'
import { useRouter } from 'vue-router';

const router = useRouter();

const funcList = [
  {
    id: 1,
    title: '对话',
    path: 'chat'
  },
  {
    id: 2,
    title: 'Dify',
    path: 'dify'
  }
]

const handleNav = (path: string) => {
  console.log(path);
  router.push(path)
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(221, 221, 221);
}

.funcBtn {
  color: #18a058;
  font-size: 16px;
  margin: 0px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  /* border-bottom: 1px solid var(--border-color); */
  background: var(--color);
  font-size: 1.8em;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  transition: padding 0.3s var(--bezier), font-size 0.3s var(--bezier);
}

.logo svg {
  flex: 0 0 32px;
  height: 32px;
  margin-right: 12px;
  transition: margin 0.3s var(--bezier);
}
</style>
