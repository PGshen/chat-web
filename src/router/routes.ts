/*
 * @Descripttion: 
 * @version: 
 * @Date: 2023-07-27 19:40:33
 * @LastEditTime: 2023-07-27 20:25:23
 */
/* eslint-disable @typescript-eslint/promise-function-async */
import { RouteRecordRaw } from 'vue-router'

const mainRoutes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: () => import('../views/home.vue'),
    meta: {
      title: 'Home',
      requiresAuth: true
    }
  }
]

const labsRoutes: RouteRecordRaw[] = [
  {
    name: 'labs',
    path: '/labs',
    component: () => import('../views/labs.vue'),
    meta: {
      title: 'Labs'
    }
  }
]

const routes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/login.vue'),
    meta: {
      title: 'Sign In'
    }
  },
  {
    name: 'layout',
    path: '/',
    component: () => import('../layouts/index.vue'),
    children: [...mainRoutes, ...labsRoutes]
  },
  // ## not found page
  {
    name: 'not-found',
    path: '/:path*',
    component: () => import('../views/error.vue'),
    meta: {
      title: 'Oh no!'
    }
  }
]

export default routes
