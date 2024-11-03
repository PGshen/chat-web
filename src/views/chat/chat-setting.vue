<!--
 * @Date: 2023-07-29 15:46:16
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2024-11-03 17:18:11
 * @FilePath: /chat-web/src/views/chat/chat-setting.vue
-->
<template>
  <n-tabs
    class="card-tabs"
    default-value="advanced"
    type="line"
    animated
    pane-wrapper-style="margin: 0 -4px"
    pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
  >
    <n-tab-pane name="advanced" tab="参数设置">
      <n-form>
        <n-form-item-row label="API key">
          <n-input v-model:value="setting.apiKey" type="password" />
        </n-form-item-row>
        <n-form-item-row label="模型">
          <n-select v-model:value="setting.model" :options="modelOptions" />
        </n-form-item-row>
        <n-form-item-row label="随机性">
          <n-slider v-model:value="setting.temperature" :min="-2" :max="2" :step="0.1" />
        </n-form-item-row>
        <n-form-item-row label="话题新鲜度">
          <n-slider v-model:value="setting.presencePenalty" :min="-2" :max="2" :step="0.1" />
        </n-form-item-row>
        <n-form-item-row label="最大token数">
          <n-slider v-model:value="setting.maxToken" :min="1048" :max="16384" :step="128" />
        </n-form-item-row>
        <n-form-item-row label="携带历史消息数">
          <n-slider v-model:value="setting.hisMsgCnt" :min="0" :max="32" :step="1" />
        </n-form-item-row>
      </n-form>
      <n-button type="primary" block secondary strong @click="updateSetting()">
        保存设置
      </n-button>
    </n-tab-pane>
    <n-tab-pane name="prompt" tab="提示词">
      <n-form>
        <n-form-item-row label="System Prompt">
          <n-input type="textarea" />
        </n-form-item-row>
      </n-form>
      <n-button type="primary" block secondary strong>
        保存Prompt
      </n-button>
    </n-tab-pane>
  </n-tabs>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/store/setting'
import { Setting } from '@/types/setting'
import { onMounted, ref } from 'vue'
import { useMessage } from 'naive-ui'

const settingStore = useSettingStore()
const useMsg = useMessage()

const setting = ref({} as Setting)
const modelOptions = [
  {
    label: 'gpt-4',
    value: 'gpt-4'
  },{
    label: 'gpt-4o',
    value: 'gpt-4o'
  },{
    label: 'gpt-4o-mini',
    value: 'gpt-4o-mini'
  },{
    label: 'gpt-4-burbo',
    value: 'gpt-4-turbo'
  }
]

const updateSetting = () => {
  settingStore.updateSetting(setting.value)
  useMsg.success('update success')
}

onMounted(() => {
  setting.value = settingStore.getSetting()
})

</script>
