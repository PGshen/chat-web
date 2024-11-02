// dify模板
export interface DifyT {
  id: string
  name: string
  description: string
  author: string
  appType: string
  category: string[]
  yml: string
  images: string[]
  likeCnt: number
  downloadCnt: number
}

export interface ShareReply {

}

export interface DifySearchReq {
  name: string
  appType: string
  category: string
  sort: string
  pageNum: number
}

export interface DifySearchReply {
  list: DifyT[]
  cnt: number
}

export interface DifyTemplateId {
  templateId: string
}

export interface EmptyReply {}