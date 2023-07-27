/*
 * @Descripttion: 
 * @version: 
 * @Date: 2023-07-27 19:40:33
 * @LastEditTime: 2023-07-27 20:10:08
 */
import { RouterLink, RouterView } from 'vue-router'
import * as Naive from 'naive-ui/es/components'
// for vite inject env
import 'vite/client'

declare module 'vue' {
  // global components
  type GlobalComponents = typeof Naive & {
    RouterLink: typeof RouterLink
    RouterView: typeof RouterView
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    requiresAuth?: boolean
  }
}
