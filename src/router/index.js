import Vue from 'vue'
import Router from 'vue-router'

import projects from '@/projects'
import projects_accounts from '@/projects/feed/accounts'
import projects_tasks from '@/projects/feed/tasks'
import projects_news from '@/projects/feed/news'
import projects_reports from '@/projects/feed/reports'


import users from '@/users'
import users_account from '@/users/feed/account'
import users_details from '@/users/feed/profile'
import users_progress from '@/users/feed/progress'
import users_vita from '@/users/feed/vita'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    //Users
    // {
    //   path: '/users/:id',
    //   name: 'users',
    //   component: users
    // },
    {
      path: '/users/:id/account',
      name: 'users_account',
      component: users_account
    },
    {
      path: '/users/:id/profile',
      name: 'users_details',
      component: users_details
    },
    {
      path: '/users/:id/progress',
      name: 'users_progress',
      component: users_progress
    },
    {
      path: '/users/:id/vita',
      name: 'users_vita',
      component: users_vita
    },

    //Projects
    // {
    //   path: '/projects/:id',
    //   name: 'projects',
    //   component: projects
    // },
    {
      path: '/projects/:id/accounts',
      name: 'projects_accounts',
      component: projects_accounts
    },
    {
      path: '/projects/:id/tasks',
      name: 'projects_tasks',
      component: projects_tasks
    },
    {
      path: '/projects/:id/news',
      name: 'projects_news',
      component: projects_news
    },
    {
      path: '/projects/:id/reports',
      name: 'projects_reports',
      component: projects_reports
    }
  ]
})
