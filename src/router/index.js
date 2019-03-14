import Vue from 'vue'
import Router from 'vue-router'

import settings from '@/routes/settings'

import notification from '@/routes/notification'

import signup from '@/routes/authentication/signup'
import verification from '@/routes/authentication/verification'
import login from '@/routes/authentication/login'

import crm from '@/routes/crm'

import project from '@/routes/project'

import users_account from '@/routes/user/account'
import users_vita from '@/routes/user/vita'
import users_admin from '@/routes/user/admin'

import not_found from '@/routes/not_found'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // settings
    {
      path: '/settings',
      name: 'settings',
      component: settings
    },
    {
      path: '/settings/permissions',
      name: 'settings_permissions',
      component: settings
    },
    {
      path: '/settings/users',
      name: 'settings_users',
      component: settings
    },
    {
      path: '/settings/tables',
      name: 'settings_tables',
      component: settings
    },{
      path: '/settings/lists',
      name: 'settings_lists',
      component: settings
    },

    // notification
    {
      path: '/notification',
      name: 'notification',
      component: notification
    },

    // authentication
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/verification/:token',
      name: 'verification',
      component: verification
    },

    // project
    {
      path: '/project',
      name: 'project',
      component: project
    },

    // user
    {
      path: '/user/vita',
      name: 'user_vita',
      component: users_vita
    },
    {
      path: '/user/account',
      name: 'user_account',
      component: users_account
    },
    {
      path: '/user/admin',
      name: 'user_admin',
      component: users_admin
    },

    //users
    {
      path: '/users',
      name: 'users',
      component: crm
    },
    {
      path: '/users/:id/account',
      name: 'users_account',
      component: users_account
    },
    {
      path: '/users/:id/vita',
      name: 'users_vita',
      component: users_vita
    },
    {
      path: '/users/:id/admin',
      name: 'users_admin',
      component: users_admin
    },
    // 404
    {
      path: '/404',
      name: 'not_found',
      component: not_found
    },
    {
      path: '*',
      redirect: '/404'
    },

  ]
})
