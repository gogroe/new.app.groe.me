import Vue from 'vue'
import Router from 'vue-router'

import signup from '@/signup'
import verification from '@/signup/verification'

import users from '@/users/crm'
import users_account from '@/users/feed/account'
import users_vita from '@/users/feed/vita'
import users_admin from '@/users/feed/admin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
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
    // user
    {
      path: '/',
      name: 'user_vita',
      component: users_vita
    },
    {
      path: '/account',
      name: 'user_account',
      component: users_account
    },
    {
      path: '/admin',
      name: 'user_admin',
      component: users_admin
    },

    //users
    {
      path: '/users',
      name: 'users',
      component: users
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
    }
  ]
})
