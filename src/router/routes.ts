/*
 * @Date: 2023-07-27 22:35:12
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-07-28 09:54:09
 * @FilePath: /ai-tool-web/src/router/routes.ts
 */
import { RouteRecordRaw } from 'vue-router'

const mainRoutes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: async () => await import('@/views/home.vue'),
    meta: {
      title: 'Home',
      requiresAuth: true
    }
  },
  {
    name: 'chat',
    path: '/chat',
    component: async () => await import('@/views/chat.vue'),
    meta: {
      title: 'Chat',
      requiresAuth: true
    }
  },
  {
    name: 'about',
    path: '/about',
    component: async () => await import('@/views/about.vue'),
    meta: {
      title: 'About',
      requiresAuth: true
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
