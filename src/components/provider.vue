<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <n-global-style />
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <slot />
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useOsTheme, darkTheme, GlobalThemeOverrides } from 'naive-ui'

const osTheme = useOsTheme()

const theme = computed(() => (osTheme.value === 'dark' ? darkTheme : null))

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#155eef',
    primaryColorHover: '#7e98e5',
    primaryColorPressed: '#7e98e5'
  },
  Input: {
    borderHover: '1px solid #155eef',
    borderFocus: '1px solid #155eef'
  }
}
</script>
