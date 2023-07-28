<!--
 * @Date: 2023-07-27 22:35:12
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-07-27 23:25:13
 * @FilePath: /ai-tool-web/src/components/viewer.vue
-->
<template>
  <router-view />
</template>

<script lang="ts" setup>
import { useLoadingBar } from 'naive-ui'
import router from '../router'

// todo: route transtion

const loadingBar = useLoadingBar()

router.beforeEach(() => loadingBar?.start())

router.afterEach(() => loadingBar?.finish())
</script>
