// src/App.vue
<template>
  <n-layout has-sider style="height: 100%;">
    <!-- 左侧导航栏 -->
    <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="180" :collapsed="collapsed"
      show-trigger @collapse="collapsed = true" @expand="collapsed = false">
      <div class="logo">
        <n-avatar round size="large" src="/dify.jpg" />
        <span v-if="!collapsed" class="title">Dify模板</span>
      </div>
      <n-menu :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="categoryOptions"
        @update:value="handleUpdateCategory" />
    </n-layout-sider>

    <!-- 主要内容区 -->
    <n-layout style="height: 100%;">
      <n-layout-header bordered>
        <div class="header">
          <div class="search">
            <n-form label-placement="left" label-width="auto" size="small">
              <n-form-item label="搜索" style="--n-feedback-height: 5px;">
                <n-input-group>
                  <n-input v-model:value="searchDify.name" placeholder="Search" clearable>
                    <template #prefix>
                      <n-icon>
                        <Search />
                      </n-icon>
                    </template>
                  </n-input>
                  <n-button type="primary" ghost @click="fetchTemplate(1)">
                    搜索
                  </n-button>
                </n-input-group>
              </n-form-item>
              <n-form-item label="类别" style="--n-feedback-height: 5px;">
                <n-radio-group v-model:value="searchDify.appType" name="typeGroup" size="small"
                  @update:value="fetchTemplate(1)">
                  <n-radio-button label="全部" value="" />
                  <n-radio-button label="聊天助手" value="chatBot" />
                  <n-radio-button label="智能体" value="agent" />
                  <n-radio-button label="工作流" value="workflow" />
                  <n-radio-button label="文本生成" value="textCompletion" />
                </n-radio-group>
              </n-form-item>
              <n-form-item label="排序" style="--n-feedback-height: 0px;">
                <n-radio-group v-model:value="searchDify.sort" name="orderGroup" @update:value="fetchTemplate(1)">
                  <n-radio-button label="综合" value="" />
                  <n-radio-button label="最新" value="createTime" />
                  <n-radio-button label="点赞次数" value="like" />
                  <n-radio-button label="下载次数" value="download" />
                </n-radio-group>
              </n-form-item>
            </n-form>
          </div>
          <div class="share">
            <n-space>
              <n-popover trigger="hover">
                <template #trigger>
                  <n-button secondary size="small" type="primary" @click="showModal = true">
                    我要分享
                  </n-button>
                </template>
                <span>我有模板可以分享给大家</span>
              </n-popover>
              <n-popover trigger="hover">
                <template #trigger>
                  <n-button size="small" type="primary" @click="gotoGithub">
                    优质模板
                  </n-button>
                </template>
                <span>定期整理优质模板到GitHub仓库</span>
              </n-popover>
            </n-space>
            <n-modal v-model:show="showModal" :mask-closable="false" preset="card" style="width: 600px;">
              <template #header>
                <div>分享模板</div>
              </template>
              <div>
                <n-alert title="提示" type="info" closable style="margin-bottom: 15px;">
                  由于无用户登录状态，因此提交后不支持修改，尽量一次把信息填写完整🥺～
                </n-alert>
                <n-form ref="formRef" :model="newDify" :rules="newDifyRules" label-placement="left" label-width="auto"
                  require-mark-placement="right-hanging" size="small" :style="{
                    maxWidth: '640px',
                  }">
                  <n-form-item label="名称" path="name">
                    <n-input v-model:value="newDify.name" placeholder="名称" />
                  </n-form-item>
                  <n-form-item label="描述" path="description">
                    <n-input v-model:value="newDify.description" placeholder="模板描述" type="textarea" :autosize="{
                      minRows: 3,
                      maxRows: 5,
                    }" />
                  </n-form-item>
                  <n-form-item label="作者" path="author">
                    <n-input v-model:value="newDify.author" placeholder="作者" />
                  </n-form-item>
                  <n-form-item label="应用" path="appType">
                    <n-radio-group v-model:value="newDify.appType" name="appType">
                      <n-space>
                        <n-radio-button value="chatBot">
                          聊天助手
                        </n-radio-button>
                        <n-radio-button value="agent">
                          Agent
                        </n-radio-button>
                        <n-radio-button value="workflow">
                          工作流
                        </n-radio-button>
                        <n-radio-button value="textCompletion">
                          文本生成
                        </n-radio-button>
                      </n-space>
                    </n-radio-group>
                  </n-form-item>
                  <n-form-item label="分类" path="category">
                    <n-checkbox-group v-model:value="newDify.category">
                      <n-space>
                        <n-checkbox v-for="item in categoryOptions" :value="item.key">
                          {{ item.label }}
                        </n-checkbox>
                      </n-space>
                    </n-checkbox-group>
                  </n-form-item>
                  <n-form-item label="YML" path="yml">
                    <n-upload action="/api/resource/uploadyml" @finish="handleYmlFinish">
                      <n-button>上传模板文件</n-button>
                    </n-upload>
                  </n-form-item>
                  <n-form-item label="预览图" path="images">
                    <n-upload action="/api/resource/uploadimage" list-type="image-card" @finish="handleImgFinish"
                      @remove="handleRemove" />
                  </n-form-item>
                </n-form>
              </div>
              <template #footer>
                <div style="display: flex; justify-content: flex-end;">
                  <n-space>
                    <n-button type="warning" size="small" @click="showModal = false">暂时不了</n-button>
                    <n-button type="info" size="small" @click="handleShare">填好啦</n-button>
                  </n-space>
                </div>
              </template>
            </n-modal>
          </div>
        </div>
      </n-layout-header>

      <n-layout-content>
        <n-layout has-sider :native-scrollbar="false" sider-placement="right">
          <div id="content" class="content" ref="scrollRef">
            <n-grid v-if="difyTemplates.length > 0" x-gap="12" y-gap="12" cols="1 400:2 600:3 800:3 1000:4 1200:5">
              <n-grid-item v-for="template in difyTemplates" :key="template.id">
                <n-card hoverable style="--n-padding-bottom: 10px; --n-padding-left: 15px; --n-padding-right: 15px">
                  <template #cover>
                    <img style="height: 160px;" :src="template.images[0]" class="card-avatar">
                  </template>
                  <div class="card-content" @click="openDrawer(template)" style="cursor: pointer;">
                    <div class="card-header">
                      <p class="app-name">{{ template.name }}</p>
                      <p class="author">@{{ template.author }}</p>
                    </div>
                    <div style="min-height: 67px">
                      <p class="description">{{ template.description }}</p>
                    </div>
                  </div>
                  <template #footer>
                    <n-tag size="small" :bordered="false" type="info">
                      {{ getTagName(template.appType) }}
                    </n-tag>
                    <n-tag v-for="cName in template.category" size="small" :bordered="false" type="success">
                      {{ getTagName(cName) }}
                    </n-tag>
                  </template>
                  <template #action>
                    <div class="footer">
                      <n-space>
                        <n-tooltip placement="top-start" trigger="hover">
                          <template #trigger>
                            <n-button text @click="dislike(template)">
                              <n-icon>
                                <HeartDislikeOutline />
                              </n-icon>
                            </n-button>
                          </template>
                          很一般
                        </n-tooltip>
                        <n-tooltip placement="top-start" trigger="hover">
                          <template #trigger>
                            <n-button text @click="like(template)">
                              <n-icon>
                                <HeartOutline />
                              </n-icon>
                              &nbsp;{{ template.likeCnt }}
                            </n-button>
                          </template>
                          很不错
                        </n-tooltip>
                        <n-tooltip placement="top-start" trigger="hover">
                          <template #trigger>
                            <n-button text>
                              <n-icon>
                                <DownloadOutline />
                              </n-icon>
                              &nbsp;{{ template.downloadCnt }}
                            </n-button>
                          </template>
                          下载次数
                        </n-tooltip>
                      </n-space>
                    </div>
                  </template>
                </n-card>
              </n-grid-item>
            </n-grid>
            <n-empty v-else description="这里还没有模板，求分享"></n-empty>
          </div>
          <n-layout-sider :bordered="!collapsedDetail" collapse-mode="transform" :collapsed-width="0" :width="450"
            :collapsed="collapsedDetail" @collapse="collapsedDetail = true" @expand="collapsedDetail = false"
            :show-trigger="!collapsedDetail">
            <div class="template-info" v-if="selectedTemplate">
              <n-h2>{{ selectedTemplate.name }}</n-h2>
              <div class="template-tag">
                <div>
                  <n-tag :bordered="false" type="info">
                    {{ getTagName(selectedTemplate.appType) }}
                  </n-tag>
                  <n-tag v-for="cName in selectedTemplate.category" :bordered="false" type="success">
                    {{ getTagName(cName) }}
                  </n-tag>
                </div>
                <div>
                  <n-button size="small" type="info" @click="download(selectedTemplate)">
                    下载模板
                  </n-button>
                </div>
              </div>
              <p>@{{ selectedTemplate.author }}</p>
              {{ selectedTemplate.description }}
              <n-space>
                <n-image v-for="img in selectedTemplate.images" :width="430" :src="img" />
              </n-space>
            </div>
          </n-layout-sider>
        </n-layout>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch, h } from 'vue'
import {
  Search, BookmarkOutline, SchoolOutline, SpeedometerOutline,
  CodeSlashOutline, BusinessOutline, CreateOutline, ImagesOutline,
  PeopleOutline, HeartOutline, GameControllerOutline, DownloadOutline, HeartDislikeOutline, VolumeMediumOutline
} from '@vicons/ionicons5'
import type { UploadFileInfo, FormInst, MenuOption, FormRules } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { DifyT, ShareReply, DifySearchReq, DifySearchReply, DifyTemplateId, EmptyReply } from '@/types/dify'
import Api from '@/api'
import { IResponseType } from '@/api/module'


// 状态管理
const formRef = ref<FormInst | null>(null)
const collapsed = ref(true)
const collapsedDetail = ref(true)
const selectedTemplate = ref({} as DifyT)
const difyTemplates = ref([] as DifyT[])
const loading = ref(false)
const isFinish = ref(false)
const lastGetMoreTime = ref(0)  // 最后一次加载更多的时间戳，防止短时间重复请求
const message = useMessage()
const searchDify = ref({
  name: "",
  appType: "",
  category: "",
  sort: "",
  pageNum: 1
} as DifySearchReq)
const newDify = ref({
  name: '',
  description: '',
  author: '',
  appType: '',
  category: [],
  yml: '',
  images: [] as string[]
})
const newDifyRules = ref({
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入 名称'
  },
  description: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入 描述'
  },
  author: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入 作者'
  },
  appType: {
    required: true,
    trigger: 'change',
    message: '请选择 应用'
  },
  category: {
    type: 'array',
    required: true,
    trigger: 'change',
    message: '请选择 类型'
  },
  yml: {
    required: true,
    trigger: 'change',
    message: '请上传模板文件'
  }
} as FormRules)

const showModal = ref(false)

// 滚动相关
const scrollRef = ref(null)

const appTypeOptions = [
  {
    label: '聊天助手',
    key: 'chatBot'
  },
  {
    label: '智能体',
    key: 'agent'
  },
  {
    label: '工作流',
    key: 'workflow'
  },
  {
    label: '文本生成',
    key: 'textCompletion'
  },
]

// 菜单配置
const categoryOptions = [
  {
    label: '学习',
    key: 'learning',
    icon: () => h(SchoolOutline)
  },
  {
    label: '效率',
    key: 'efficiency',
    icon: () => h(SpeedometerOutline)
  },
  {
    label: '编程',
    key: 'programming',
    icon: () => h(CodeSlashOutline)
  },
  {
    label: '商业',
    key: 'business',
    icon: () => h(BusinessOutline)
  },
  {
    label: '写作',
    key: 'writing',
    icon: () => h(CreateOutline)
  },
  {
    label: '图像',
    key: 'image',
    icon: () => h(ImagesOutline)
  },
  {
    label: '音频',
    key: 'audio',
    icon: () => h(VolumeMediumOutline)
  },
  {
    label: '角色',
    key: 'characters',
    icon: () => h(PeopleOutline)
  },
  {
    label: '生活',
    key: 'lifestyle',
    icon: () => h(HeartOutline)
  },
  {
    label: '游戏',
    key: 'games',
    icon: () => h(GameControllerOutline)
  }
]

// 更新category
const handleUpdateCategory = (key: string, item: MenuOption) => {
  searchDify.value.category = key
  fetchTemplate(1)
}

const getTagName = (key: string) => {
  for (let i = 0; i < appTypeOptions.length; i++) {
    if (appTypeOptions[i].key == key) {
      return appTypeOptions[i].label
    }
  }
  for (let i = 0; i < categoryOptions.length; i++) {
    if (categoryOptions[i].key == key) {
      return categoryOptions[i].label
    }
  }
  return key
}

// 模拟获取数据
const fetchTemplate = async (pageNum: number) => {
  if (pageNum === 1) {  // 重新加载第一页
    isFinish.value = false
  }
  loading.value = true
  searchDify.value.pageNum = pageNum  // 设置页码
  // 模拟API调用
  Api.searchDifyT(searchDify.value)
    .then((resp: IResponseType<DifySearchReply>) => {
      if (resp.code == 200 && resp.data !== undefined) {
        const data = resp.data
        if (searchDify.value.pageNum > 1) {
          if (data.list.length > 0) {
            difyTemplates.value = [...difyTemplates.value, ...data.list]
            // 加载成功，页面加一
            searchDify.value.pageNum++
          } else {
            isFinish.value = true
            message.info('全部模板都加载完啦')
          }
        } else {
          difyTemplates.value = data.list
          // 加载成功，页面加一
          searchDify.value.pageNum++
        }
      }
    }).catch((err: any) => {
      message.error(err)
    })
  loading.value = false
}

// 打开详情抽屉
const openDrawer = (agent: DifyT) => {
  const prevAgent = selectedTemplate.value
  console.log(agent.id)
  if (prevAgent != {} as DifyT) {
    console.log(prevAgent.id)
  }
  collapsedDetail.value = false
  selectedTemplate.value = agent
  if (prevAgent !== {} as DifyT && prevAgent.id == agent.id) {
    collapsedDetail.value = true
    selectedTemplate.value = {} as DifyT
  }
}

// 下载yml
const download = (dify: DifyT) => {
  const filename = dify.name + '.yml'
  const link = document.createElement('a');
  link.href = dify.yml;
  console.log(link.href)
  link.download = filename;
  link.click();
  Api.downloadDifyT({ templateId: dify.id } as DifyTemplateId)
    .then((resp: IResponseType<EmptyReply>) => {
      if (resp.code == 200) {
        message.info('下载中～')
        dify.downloadCnt++
      }
    }).catch((err: any) => {
      console.log(err)
    })
}

const gotoGithub = () => {
  window.open('https://github.com/PGshen/dify-app-template', '_blank')
}

const like = (dify: DifyT) => {
  Api.likeDifyT({ templateId: dify.id } as DifyTemplateId)
    .then((resp: IResponseType<EmptyReply>) => {
      if (resp.code == 200) {
        dify.likeCnt++
        message.success('点赞～')
      }
    }).catch((err: any) => {
      console.log(err)
    })
}

const dislike = (dify: DifyT) => {
  Api.dislikeDifyT({ templateId: dify.id } as DifyTemplateId)
    .then((resp: IResponseType<EmptyReply>) => {
      if (resp.code == 200) {
        message.success('感谢反馈！')
      }
    }).catch((err: any) => {
      console.log(err)
    })
}

const handleImgFinish = (
  option: {
    file: UploadFileInfo,
    event?: ProgressEvent
  }
): UploadFileInfo | undefined => {
  let response = JSON.parse((event?.target as XMLHttpRequest).response)
  if (response.code == 200) {
    const image = response.data.imageUrl
    option.file.name = image
    newDify.value.images.push(image)
    return option.file
  } else {
    message.warning(response.msg)
  }
}

const handleYmlFinish = (
  option: {
    file: UploadFileInfo,
    event?: ProgressEvent
  }): UploadFileInfo | undefined => {
  let response = JSON.parse((event?.target as XMLHttpRequest).response)
  if (response.code == 200) {
    const yml = response.data.ymlUrl
    option.file.name = yml
    newDify.value.yml = yml
    console.log(newDify.value.yml)
    return option.file
  } else {
    message.warning(response.msg)
  }
}

// 上传图片
const handleFinish = (
  { file, event }: {
    file: UploadFileInfo,
    event?: ProgressEvent
  }, type: string
): UploadFileInfo | undefined => {
  let response = JSON.parse((event?.target as XMLHttpRequest).response)
  if (response.code == 200) {
    if (type == 'image') {
      const image = response.data.imageUrl
      file.name = image
      newDify.value.images.push(image)
    } else if (type == 'yml') {
      const yml = response.data.ymlUrl
      file.name = yml
      newDify.value.yml = yml
      console.log(newDify.value.yml)
    }
    return file
  } else {
    message.warning(response.msg)
  }
}

// 删除图片
const handleRemove = ({ file, fileList }: { file: UploadFileInfo, fileList: Array<UploadFileInfo> }) => {
  newDify.value.images = newDify.value.images.filter(item => item != file.name)
}

// 分享
const handleShare = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      // 请求
      Api.shareDifyT(newDify.value)
        .then((res: IResponseType<ShareReply>) => {
          if (res.code == 200) {
            newDify.value = {
              name: '',
              description: '',
              author: '',
              appType: '',
              category: [],
              yml: '',
              images: [] as string[]
            }
            message.success('分享成功，感谢～')
            fetchTemplate(1)
            showModal.value = false
          } else if (res.msg !== undefined) {
            message.error(res.msg)
          }
          console.log(res.data)
        }).catch((err: any) => {
          console.log(err)
        })
    }
    else {
      console.log(errors)
      message.error('验证失败')
    }
  })
}

// 加载更多
const getMore = () => {
  const now = Math.floor(Date.now()/1000)
  if (now - lastGetMoreTime.value < 5) {
    return
  }
  const element = scrollRef.value
  if (!element || loading.value) return

  const { scrollHeight, scrollTop, clientHeight } = element
  if (scrollHeight - scrollTop - clientHeight < 50) {
    if (isFinish.value == false) {
      lastGetMoreTime.value = now // 更新一下最后获取的时间
      fetchTemplate(searchDify.value.pageNum)
    }
  }
}

// 初始化
onMounted(() => {
  fetchTemplate(1)
  // 添加滚动监听器
  const content = document.getElementById('content')
  if (content != null) {
    content.addEventListener('scroll', getMore)
  }
})

onUnmounted(() => {
  // 移除监听器
  const content = document.getElementById('content')
  if (content != null) {
    content.removeEventListener('scroll', getMore)
  }
})
</script>

<style scoped>
/* 样式部分保持不变 */
.logo {
  height: 64px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.header {
  padding: 12px 24px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.header.search {
  padding: 5px;
}

.header.share {
  padding-right: 10px;
}

.content {
  padding: 24px;
  height: calc(100vh - 125px);
  width: 100%;
  overflow-y: auto;
}

.card-avatar {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 12px 0px 3px 0px;
}

.card-header {
  margin-bottom: 10px;
}

.app-name {
  font-weight: bold;
  font-size: 20px;
}

.author {
  font-size: 12px;
}

.description {
  color: #666;
  width: 100%;
  min-height: 40px;
  font-weight: lighter;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.action {
  display: flex;
  justify-content: flex-start;
}

.footer {
  display: flex;
  justify-content: flex-end;
}

.drawer-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.template-info {
  width: 450px;
  height: calc(100vh - 125px);
  padding: 10px;
  overflow-y: auto;
}

.template-tag {
  display: flex;
  justify-content: space-between;
}

.template-info h3 {
  margin: 0;
  font-size: 18px;
}

.template-info p {
  margin: 4px 0 0;
  color: #666;
}

.drawer-content {
  padding: 16px 0;
}
</style>