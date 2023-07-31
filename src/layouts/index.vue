<!--
 * @Date: 2023-07-27 23:40:28
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-07-29 17:17:17
 * @FilePath: /ai-tool-web/src/layouts/index.vue
-->
<template>
  <div style="display: flex; flex-direction: column; height: 100vh;">
    <div class="header">
      <n-a class="logo">
        <svg viewBox="0 0 472 450">
          <defs>
            <mask id="mask" fill="#fff">
              <path d="M472 114.26L203.029 335.74H407.1L472 449.48H64.9L0 335.74l268.971-221.48H64.9L0 .52h407.1z" />
            </mask>
            <filter id="shadow" x="-12.7%" y="-13.4%" width="125.4%" height="126.7%" filterUnits="objectBoundingBox">
              <feOffset in="SourceAlpha" result="offset-outer" />
              <feGaussianBlur stdDeviation="20" in="offset-outer" result="blue-outer" />
              <feComposite in="blue-outer" in2="SourceAlpha" operator="out" result="blue-outer" />
              <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" in="blue-outer" />
            </filter>
          </defs>
          <g mask="url(#mask)">
            <path fill="currentColor" d="M0 0h472v449H0z" />
            <path d="M0 335.74l64.9 113.74L472 114.26 407.1.52z" filter="url(#shadow)" />
          </g>
        </svg>
        <span>Hello</span>
      </n-a>
      <div v-for="item in funcList" :key="item.id" class="funcBtn">
        <n-icon :size="18" :component="LogoWechat" />
        <span style="margin-left: 5px;">{{ item.title }}</span>
      </div>
    </div>
    <div style="flex: 1; overflow-y: auto;">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LogoWechat } from '@vicons/ionicons5'

const funcList = [
  {
    id: 1,
    title: '对话',
    path: 'chat'
  }
]
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
