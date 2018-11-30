import Vue from 'vue'
import Router from 'vue-router'

import projects from '@/projects'
import projects_activities from '@/projects/activities'
import projects_feed from '@/projects/feed'
import projects_reports from '@/projects/reports'
import projects_setup from '@/projects/setup'

import users from '@/users'
import users_account from '@/users/account'
import users_details from '@/users/details'
import users_progress from '@/users/progress'
import users_vita from '@/users/vita'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
<<<<<<< Updated upstream
      path: '/',
      name: 'hw',
      component: hw
    },
    {
      path: '/project/:pid/feed',
      name: 'hw',
      component: hw
    },
    {
      path: '/projects/:id', //:main_id/sections',
      name: 'projects',
      component: projects
    },
    {
      path: '/projects/:id/activities',
      name: 'projects_activities',
      component: projects_activities
    },
    {
      path: '/projects/news',
      name: 'projects_feed',
      component: projects_feed
    },
    {
      path: '/projects_reports',
      name: 'projects_reports',
      component: projects_reports
    },
    {
      path: '/projects_setup',
      name: 'projects_setup',
      component: projects_setup
    },

    {
      path: '/users',
=======
      path: '/users/:id',
>>>>>>> Stashed changes
      name: 'users',
      component: users
    },
    {
      path: '/users/:id/account',
      name: 'users_account',
      component: users_account
    },
    {
      path: '/users/:id/details',
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
<<<<<<< Updated upstream
    },
    
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
=======
>>>>>>> Stashed changes
    }
  ]
})
