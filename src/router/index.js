import Vue from 'vue'
import Router from 'vue-router'
import projects from '@/projects'
import projects_feed from '@/projects/feed'
import users from '@/users'
import hw from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'hw',
      component: hw
    },
    {
      path: '/projects', //:id/sections',
      name: 'projects',
      component: projects
    },
    {
      path: '/projects_feed',
      name: 'projects_feed',
      component: projects_feed
    },
    {
      path: '/users',
      name: 'users',
      component: users
    }
  ]
})
