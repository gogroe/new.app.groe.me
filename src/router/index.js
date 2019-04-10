import Vue from 'vue'
import Router from 'vue-router'

import permissions from '@/routes/settings/permissions'

import notification from '@/routes/notification'

import signup from '@/routes/authentication/signup'
import verification from '@/routes/authentication/verification'
import login from '@/routes/authentication/login'

import crm_user from '@/routes/crm/users/user'
import crm_admin from '@/routes/crm/users/admin'
import crm_company from '@/routes/crm/users/company'

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
      path: 'permissions',
      name: 'permissions',
      component: permissions
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

    //crm
    {
      path: '/users/user',
      name: 'crm_user',
      component: crm_user
    },
    {
      path: '/users/admin',
      name: 'crm_admin',
      component: crm_admin
    },
    {
      path: '/users/company',
      name: 'crm_company',
      component: crm_company
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
