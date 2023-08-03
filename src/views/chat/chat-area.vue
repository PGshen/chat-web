<!--
 * @Date: 2023-07-29 17:40:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-03 13:42:38
 * @FilePath: /ai-tool-web/src/views/chat/chat-area.vue
-->
<template>
  <div class="display-area">
    <div class="chat-box">
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
    </div>
    <div class="send-box">
      <n-input
        v-model:value="inputMsg"
        type="textarea"
        :autosize="{
          minRows: 1,
          maxRows: 5
        }" class="input-area"
      />
      <n-button strong secondary type="primary" class="btn-area" @click="sendMsg()">
        发送
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, onMounted, onUpdated, ref } from 'vue'
import { Markdown } from '@/components'
import { Chat, Message, TripQuery } from '@/types/chat'
import { common } from '@/utils'
// import { useMessage } from 'naive-ui'
import Api from '@/api'
import { AirplaneOutline } from '@vicons/ionicons5'
// import { EventSourceMessage, EventStreamContentType, fetchEventSource } from '@microsoft/fetch-event-source'

const props = defineProps({
  nowChat: {
    type: Object as PropType<Chat>,
    default: () => {}
  }
})

// const useMsg = useMessage()
const messages = ref([] as Message[])
const messageIndexMap = ref(new Map<string, number>())
const inputMsg = ref('')

const sendMsg = async () => {
  if (inputMsg.value === '') {
    return
  }
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

  const replyMsg: Message = {
    index: messages.value.length,
    id: common.genRandomString(16),
    text: '思考中...',
    isSelf: false,
    time: Date.now() / 1000
  }
  messages.value.push(replyMsg)
  messageIndexMap.value.set(replyMsg.id, replyMsg.index)
  await sendAndReceiveLlm(replyMsg.id, {
    user: props.nowChat.id,
    query: quizMsg.text
  })
}

// const sendAndReceive = async (url: string, messageId: string, param: {}) => {
//   const ctrl = new AbortController()
//   await fetchEventSource(url, {
//     method: 'POST',
//     headers: Api.getSettingWithCors(),
//     body: JSON.stringify(param),
//     signal: ctrl.signal,
//     async onopen (response: Response) {
//       console.log('open')
//       if (!response.ok || response.headers.get('content-type') !== EventStreamContentType) {
//         useMsg.error(response.statusText)
//         throw new Error('open fail')
//       }
//     },
//     onmessage (ev: EventSourceMessage) {
//       if (ev.event === 'chat') {
//         // 单独换行符
//         if (ev.data === '') {
//           ev.data = '\n'
//         }
//         const index = getMsgIndex(messageId)
//         messages.value[index].text += ev.data
//         // console.log(ev.id, ev.data);
//         scrollToEnd()
//       }
//     },
//     onclose () {
//       const index = getMsgIndex(messageId)
//       console.log(messages.value[index].text)
//       console.log('close')
//     },
//     onerror (err: any) {
//       console.log('error: ' + err)
//       throw new Error(err)
//     }
//   })
// }

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

.send-box {
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
