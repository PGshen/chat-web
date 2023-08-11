<!--
 * @Date: 2023-07-29 17:40:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-11 19:04:22
 * @FilePath: /ai-tool-web/src/views/chat/chat-area.vue
-->
<template>
  <div class="display-area">
    <div class="chat-box">
      <!-- <n-scrollbar> -->
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
              <Markdown
                :text="message.text"
                :as-raw-text="false"
              />
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
      <!-- </n-scrollbar> -->
    </div>
    <div class="send-area">
      <div class="send-box">
        <n-input
          v-model:value="inputMsg"
          type="textarea"
          :autosize="{
            minRows: 1,
            maxRows: 5
          }" class="input-area"
          :disabled="messages === undefined"
          placeholder="Ctrl + Enter发送消息"
          @keyup="sendByKeyUp"
        />
        <n-button strong secondary type="primary" class="btn-area" @click="sendMsg()">
          发送
        </n-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, onMounted, onUpdated, ref } from 'vue'
import { Markdown } from '@/components'
import { Chat, Message, OpenAiChatQuery, OpenAiMessage, TripQuery } from '@/types/chat'
import { common } from '@/utils'
import { useMessage } from 'naive-ui'
import Api from '@/api'
import { AirplaneOutline } from '@vicons/ionicons5'
import { EventSourceMessage, EventStreamContentType, fetchEventSource } from '@microsoft/fetch-event-source'
import { useSettingStore } from '@/store/setting'
import { useChatStore } from '@/store/chat'

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
const messages = ref([] as Message[])
const messageIndexMap = ref(new Map<string, number>())
const inputMsg = ref('')

const sendByKeyUp = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === 'Enter') {
    sendMsg();
  }
}

const sendMsg = async () => {
  if (inputMsg.value === '') {
    return
  }
  const setting = settingStore.getSetting()
  const quizMsg: Message = {
    index: messages.value.length,
    id: common.genRandomString(16),
    text: inputMsg.value,
    isSelf: true,
    time: Date.now() / 1000
  }
  messages.value.push(quizMsg)
  messageIndexMap.value.set(quizMsg.id, quizMsg.index)
  inputMsg.value = ''

  const url = '/ai/meeting/chat'
  const replyMsg: Message = {
    index: messages.value.length,
    id: common.genRandomString(16),
    text: '思考中...',
    isSelf: false,
    time: Date.now() / 1000
  }
  messages.value.push(replyMsg)
  messageIndexMap.value.set(replyMsg.id, replyMsg.index)
  // await sendAndReceiveLlm(replyMsg.id, {
  //   user: props.nowChat.id,
  //   query: quizMsg.text
  // })
  // await sendAndReceive(url, replyMsg.id, {
  //   message: quizMsg.text
  // })
  const chatHistoryMessage = chatStore.getChatHistoryMessage(props.nowChat.id, setting.hisMsgCnt)
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
  // 向下滚动
  scrollToEnd()
  await sendOpenAi('/openai/v1/chat/completions', replyMsg.id, {
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
      stream: false
    }
    Api.openAiCompletions(params)
      .then((data) => {
        const chatTitle = data.choices[0].message.content
        console.log(chatTitle)
        chatStore.updateChatTitle(props.nowChat.id, chatTitle)
        emit('refreshChat')
      }).catch((err) => {
        console.log(err)
      })
  }
}

const sendOpenAi = async (url: string, messageId: string, param: {}) => {
  const ctrl = new AbortController()
  await fetchEventSource(url, {
    method: 'POST',
    headers: Api.getSettingWithCors(),
    body: JSON.stringify(param),
    signal: ctrl.signal,
    async onopen (response: Response) {
      console.log('open')
      if (!response.ok || response.headers.get('content-type') !== EventStreamContentType) {
        useMsg.error(response.statusText)
        throw new Error('open fail')
      }
      const index = getMsgIndex(messageId)
        messages.value[index].text = ''
    },
    onmessage (ev: EventSourceMessage) {
        // 单独换行符
        if (ev.data === '[DONE]') {
          // ev.data = '\n'
          return
        }
        const objJson = JSON.parse(ev.data)
        const choice = objJson['choices'][0]
        if (choice['finish_reason'] === null) {
          const index = getMsgIndex(messageId)
          messages.value[index].text += choice['delta']['content']
          // console.log(ev.id, ev.data);
          scrollToEnd()
        }
    },
    onclose () {
      const index = getMsgIndex(messageId)
      console.log(messages.value[index].text)
      console.log('close')
    },
    onerror (err: any) {
      console.log('error: ' + err)
      throw new Error(err)
    }
  })
}

const sendAndReceive = async (url: string, messageId: string, param: {}) => {
  const ctrl = new AbortController()
  await fetchEventSource(url, {
    method: 'POST',
    headers: Api.getSettingWithCors(),
    body: JSON.stringify(param),
    signal: ctrl.signal,
    async onopen (response: Response) {
      console.log('open')
      if (!response.ok || response.headers.get('content-type') !== EventStreamContentType) {
        useMsg.error(response.statusText)
        throw new Error('open fail')
      }
      const index = getMsgIndex(messageId)
        messages.value[index].text = ''
    },
    onmessage (ev: EventSourceMessage) {
      if (ev.event === 'chat') {
        // 单独换行符
        if (ev.data === '') {
          ev.data = '\n'
        }
        const index = getMsgIndex(messageId)
        messages.value[index].text += ev.data
        // console.log(ev.id, ev.data);
        scrollToEnd()
      }
    },
    onclose () {
      const index = getMsgIndex(messageId)
      console.log(messages.value[index].text)
      console.log('close')
    },
    onerror (err: any) {
      console.log('error: ' + err)
      throw new Error(err)
    }
  })
}

const sendAndReceiveLlm = (messageId: string, param: TripQuery) => {
  Api.tripQuery(param)
    .then((data) => {
      console.log(data)
      const index = getMsgIndex(messageId)
      messages.value[index].text = data.message
      // console.log(ev.id, ev.data);
      scrollToEnd()
    }).catch((err) => {
      console.log(err)
    })
}

const getMsgIndex = (messageId: string): number => {
  let index = messageIndexMap.value.get(messageId)
  if (index === undefined) {
    index = messages.value.length - 1
  }
  return index
}

const scrollToEnd = () => {
  const chatArea = document.querySelector('.chat-box')!
  chatArea.scrollTop = chatArea.scrollHeight + 1200
}

onMounted(() => {
  messages.value = props.nowChat.messageList
})

onUpdated(() => {
  messages.value = props.nowChat.messageList
  scrollToEnd()
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
  background-color: rgba(24, 160, 88, 0.16);
}

.message-box {
  width: 80%;
  max-width: 800px;
  display: flex;
  align-items: flex-start;
}

.message-avator {
  width: 30px;
  margin-right: 5px;
}

.message-text {
  width: calc(100% - 35px);
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

