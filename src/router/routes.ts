/*
 * @Date: 2023-07-27 22:35:12
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-08-12 17:04:29
 * @FilePath: /ai-tool-web/src/router/routes.ts
 */
import { RouteRecordRaw } from 'vue-router'

const mainRoutes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/app',
    component: async () => await import('@/views/chat/index.vue'),
    meta: {
      title: 'Chat',
      requiresAuth: false
    }
  },
  {
    name: 'chat',
    path: '/app/chat',
    component: async () => await import('@/views/chat/index.vue'),
    meta: {
      title: 'Chat',
      requiresAuth: false
    }
  },
  {
    name: 'dify',
    path: '/app/dify',
    component: async () => await import('@/views/dify/index.vue'),
    meta: {
      title: 'Dify',
      requiresAuth: false
    }
  }
]

const routes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    component: async () => await import('../views/login.vue'),
    meta: {
      title: 'Sign In'
    }
  },
  {
    name: 'dify-app',
    path: '/',
    component: async () => await import('@/views/dify/index.vue'),
    meta: {
      title: 'Dify App'
    }
  },
  {
    name: 'layout',
    path: '/',
    component: async () => await import('../layouts/index.vue'),
    children: [...mainRoutes]
  },
  // ## not found page
  {
    name: 'not-found',
    path: '/:path*',
    component: async () => await import('../views/error.vue'),
    meta: {
      title: 'Oh no!'
    }
  }
]

export default routes
