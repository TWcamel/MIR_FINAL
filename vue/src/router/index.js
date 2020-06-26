/**
 * @file 路由主入口，定义路由规则
 * @author wangyisheng@baidu.com (wangyisheng)
 */

import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/Index.vue'
import Detail from '@/pages/Detail.vue'
import Login from '@/components/Login.vue';
import Home from '@/components/Home.vue';
import UserInfo from '@/components/UserInfo.vue';
import Header from '@/components/Header.vue';



Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      components: {
        default:Index,
        nav:Header
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      components: {
        default: Home,
        nav: Header
      }
    },
    {
      path: '/UserInfo',
      components: {
        default: UserInfo,
        nav: Header
      }
    },
    {
      path: '*',
      redirect: '/'
    }


  ]
})
