<!--
 * @Date: 2023-07-27 22:42:45
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-08-12 17:29:15
 * @FilePath: /ai-tool-web/src/views/login.vue
-->
<!-- Sign In -->

<template>
  <n-h1 style="--font-size: 60px; --font-weight: 100">
    Hello
  </n-h1>
  <n-card size="large" style="--padding-bottom: 30px">
    <n-h2 style="--font-weight: 400">Sign-in</n-h2>
    <n-form size="large" :rules="rules" :model="model">
      <n-form-item-row label="Username" path="username">
        <n-input v-model:value="model.username" placeholder="Input your username" />
      </n-form-item-row>
      <n-form-item-row label="Password" path="password">
        <n-input v-model:value="model.password" type="password" placeholder="Input your password" />
      </n-form-item-row>
    </n-form>
    <n-button type="primary" size="large" block :loading="loading" :disabled="disabled" @click="handleLogin">Sign in</n-button>
    <br>
  </n-card>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'

const router = useRouter()
const message = useMessage()

const rules = {
  username: {
    required: true,
    message: 'Username is required.',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: 'Password is required.',
    trigger: 'blur'
  }
}

const model = ref({
  username: 'chat',
  password: 'chat1234'
})

const loading = ref(false)

const disabled = computed<boolean>(() => model.value.username === '' || model.value.password === '')

const handleLogin = async (e: Event): Promise<void> => {
  e.preventDefault()
  loading.value = true
  try {
    const route = router.currentRoute.value
    const redirect = route.query.redirect?.toString()
    await router.replace(redirect ?? route.redirectedFrom?.fullPath ?? '/')
  } catch (e) {
    message.error(e instanceof Error ? e.message : 'unknown error')
  }
  loading.value = false
}
</script>

<style scoped>
.n-h1 {
  margin: 20vh auto 20px;
  text-align: center;
  letter-spacing: 5px;
  opacity: 0.8;
}

.n-card {
  margin: 0 auto;
  max-width: 380px;
  box-shadow: var(--box-shadow);
}
</style>
