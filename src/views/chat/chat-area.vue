<!--
 * @Date: 2023-07-29 17:40:22
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2024-11-03 17:12:06
 * @FilePath: /chat-web/src/views/chat/chat-area.vue
-->
<template>
  <div class="display-area">
    <div ref="containerRef" class="chat-box">
      <div v-for="(message, index) in messages" :key="index" class="message" :class="{ 'self': message.isSelf }">
        <div class="message-box">
          <div class="message-avator">
            <n-avatar
              v-if="message.isSelf"
              size="small"
              src="oopp.jpg"
            />
            <n-avatar
              v-else
              size="small"
              src="logo.png"
            />
          </div>
          <div class="message-text">
            <div v-if="message.isEditing">
              <n-space vertical>
                <n-input
                  v-model:value="message.text"
                  type="textarea"
                  autosize
                />
                <n-space>
                  <n-button type="primary" size="small" style="padding: 0px 8px;" @click="resendMsg(message.index)">
                    保存 & 提交
                  </n-button>
                  <n-button size="small" style="padding: 0px 8px;" @click="message.isEditing = false">
                    取消
                  </n-button>
                </n-space>
              </n-space>
            </div>
            <div v-else>
              <Markdown
                :text="message.text"
                :as-raw-text="false"
              />
            </div>
          </div>
          <div class="message-action">
            <n-icon v-if="message.isSelf" :size="18" :component="CreateOutline" @click="message.isEditing = true" />
            <n-icon v-else :size="18" :component="CopyOutline" @click="copyMsg(message.text)" />
          </div>
        </div>
      </div>
      <div v-if="messages && messages.length === 0" style="height: 100%; display: flex; justify-content: center; align-items: center;">
        <n-empty description="向我提问吧～">
          <template #icon>
            <n-icon>
              <AirplaneOutline />
            </n-icon>
          </template>
        </n-empty>
      </div>
    </div>
    <div class="send-area">
      <div class="send-box">
        <n-input
          v-model:value="inputMsg"
          type="textarea"
          :autosize="{
            minRows: 2,
            maxRows: 5
          }" class="input-area"
          :disabled="messages === undefined"
          placeholder="Ctrl + Enter发送消息"
          @keyup="sendByKeyUp"
        />
        <n-button strong secondary type="primary" class="btn-area" @click="sendMsg()">
          发送 &nbsp;
          <n-icon :size="18" :component="Send" />
        </n-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, onMounted, onUpdated, ref } from 'vue'
import { Markdown } from '@/components'
import { Chat, Message, OpenAiChatQuery, OpenAiChatReply, OpenAiMessage } from '@/types/chat'
import { common } from '@/utils'
import { useMessage } from 'naive-ui'
import Api from '@/api'
import { AirplaneOutline, CopyOutline, Send, CreateOutline } from '@vicons/ionicons5'
import { EventSourceMessage, EventStreamContentType, fetchEventSource } from '@microsoft/fetch-event-source'
import { useSettingStore } from '@/store/setting'
import { useChatStore } from '@/store/chat'
import { copyToClip } from '@/utils/common'

const props = defineProps({
  nowChat: {
    type: Object as PropType<Chat>,
    default: () => {}
  }
})

const emit = defineEmits(['refreshChat'])

const settingStore = useSettingStore()
const chatStore = useChatStore()
const useMsg = useMessage()
const containerRef = ref<HTMLElement>()
const messages = ref([] as Message[])
const inputMsg = ref('')

// 快捷键
const sendByKeyUp = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === 'Enter') {
    sendMsg();
  }
}

// 发送消息
const sendMsg = async () => {
  if (inputMsg.value === '') {
    return
  }
  const setting = settingStore.getSetting()
  // 提问消息
  const quizMsg: Message = {
    index: messages.value.length,
    id: common.genRandomString(16),
    text: inputMsg.value,
    isSelf: true,
    isEditing: false,
    time: Date.now() / 1000
  }
  messages.value.push(quizMsg)
  inputMsg.value = ''

  // 回答消息
  const replyMsg: Message = {
    index: messages.value.length,
    id: common.genRandomString(16),
    text: 'Thinking...',
    isSelf: false,
    isEditing: false,
    time: Date.now() / 1000
  }
  messages.value.push(replyMsg)
  // 向下滚动
  scrollToEnd()
  
  // 获取需要携带的历史消息
  const chatHistoryMessage = chatStore.getChatHistoryMessage(props.nowChat.id, setting.hisMsgCnt, 0)
  const hisMsg: OpenAiMessage[] = [];
  chatHistoryMessage.forEach((message) => {
    hisMsg.push({
      role: message.isSelf ? 'user' : 'assistant',
      content: message.text
    })
  })
  const sendMsg = hisMsg
  sendMsg.push({
    role: 'user',
    content: quizMsg.text
  })
  // 请求openAi
  await sendOpenAi('/openai/v1/chat/completions', replyMsg.index, {
    model: setting.model,
    messages: sendMsg,
    stream: true
  })
  // 对话名称总结
  if (messages.value.length == 2) {
    const tempMsg = []
    messages.value.forEach((message) => {
      tempMsg.push({
        role: message.isSelf ? 'user' : 'assistant',
        content: message.text
      })
    })
    tempMsg.push({
      'role': 'user',
      'content': '用10个字以内直接返回这句话的简要主题，不要解释、不要标点、不要语气词、不要多余文本，如果没有主题，请直接返回“闲聊'
    })
    const params: OpenAiChatQuery = {
      model: setting.model,
      messages: tempMsg,
      temperature: setting.temperature,
      max_tokens: setting.maxToken,
      presence_penalty: setting.presencePenalty,
      stream: false
    }
    Api.openAiCompletions(params)
      .then((data: OpenAiChatReply) => {
        const chatTitle = data.choices[0].message.content
        console.log(chatTitle)
        chatStore.updateChatTitle(props.nowChat.id, chatTitle)
        emit('refreshChat')
      }).catch((err: any) => {
        console.log(err)
      })
  }
}

// 重新发送
const resendMsg =async (index:number) => {
  messages.value[index].isEditing = false
  const setting = settingStore.getSetting()
  // 找到需要携带的历史消息
  const chatHistoryMessage = chatStore.getChatHistoryMessage(props.nowChat.id, setting.hisMsgCnt, index+2)
  const hisMsg: OpenAiMessage[] = [];
  chatHistoryMessage.forEach((message) => {
    hisMsg.push({
      role: message.isSelf ? 'user' : 'assistant',
      content: message.text
    })
  })
  const sendMsg = hisMsg
  sendMsg.push({
    role: 'user',
    content: messages.value[index].text
  })
  // 请求openAi并更新指定位置的气泡框
  await sendOpenAi('/openai/v1/chat/completions', index+1, {
    model: setting.model,
    messages: sendMsg,
    stream: true
  })
}

// 请求openai
const sendOpenAi = async (url: string, index: number, param: {}) => {
  console.log('index ' + index)
  const ctrl = new AbortController()
  const headers = Api.getSettingWithCors()
  const setting = settingStore.getSetting()
  headers['Authorization'] = 'Bearer ' + setting.apiKey
  await fetchEventSource(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(param),
    signal: ctrl.signal,
    async onopen (response: Response) {
      console.log('open')
      if (!response.ok || response.headers.get('content-type') !== EventStreamContentType) {
        useMsg.error(response.statusText)
        throw new Error('open fail')
      }
      messages.value[index].text = ''
    },
    onmessage (ev: EventSourceMessage) {
        // 完成了
        if (ev.data === '[DONE]') {
          return
        }
        const objJson = JSON.parse(ev.data)
        const choice = objJson['choices'][0]
        if (choice['finish_reason'] === null) {
          messages.value[index].text += choice['delta']['content']
          // console.log(ev.id, ev.data);
          scrollToEnd()
        }
    },
    onclose () {
      console.log(messages.value[index].text)
      console.log('close')
    },
    onerror (err: any) {
      console.log('error: ' + err)
      throw new Error(err)
    }
  })
}

// 复制消息
const copyMsg = (message: string) => {
  copyToClip(message).then(() => {
    useMsg.success('已复制')
  })
}

// 滚动到底部
const scrollToEnd = () => {
  const chatArea = document.querySelector('.chat-box')!
  chatArea.scrollTop = chatArea.scrollHeight + 1200
}

onMounted(() => {
  messages.value = props.nowChat.messageList
  scrollToEnd()
})

onUpdated(() => {
  messages.value = props.nowChat.messageList
})

</script>

<style lang="scss" scoped>
.display-area {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.chat-box {
  flex: 1;
  overflow-y: auto;
  padding: 0px 0px 20px 0px;
  display: flex;
  flex-direction: column;
}

.message {
  display: flex;
  justify-content: center;
  padding: 20px 0px;
}

.message.self {
  background-color: rgba(200, 215, 246, 0.23);
}

.message-box {
  width: 80%;
  max-width: 800px;
  display: flex;
  align-items: flex-start;
  &:hover {
    .message-action {
      opacity: 1;
    }
  }
}

.message-avator {
  width: 30px;
  margin-right: 5px;
}

.message-text {
  width: calc(100% - 60px);
}

.message-action {
  width: 20px;
  margin-left: 5px;
  cursor: pointer;
  opacity: 0;
}

.send-area {
  display: flex;
  justify-content: center;
}

.send-box {
  width: 80%;
  max-width: 800px;
  display: flex;
  align-items: flex-end;
  border-top: 1px solid rgb(244, 247, 247);
  padding: 10px 10px 20px 10px;
}

.input-area {
  flex: 1;
  margin-right: 10px;
}

.btn-area {
  width: 80px;
}
</style>

