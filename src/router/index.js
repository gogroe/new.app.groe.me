import Vue from 'vue'
import Router from 'vue-router'

import permissions from '@/routes/settings/permissions'

import notification from '@/routes/notification'

import signup from '@/routes/authentication/signup'
import verification from '@/routes/authentication/verification'
import login from '@/routes/authentication/login'
import forgot from '@/routes/authentication/forgot'

//user crm
import crm_user from '@/routes/crm/users/user/'
import crm_user_lead from '@/routes/crm/users/user/'
import crm_user_customer from '@/routes/crm/users/user/'
import crm_user_partner from '@/routes/crm/users/user/'
import crm_user_member from '@/routes/crm/users/user/'
import crm_user_leader from '@/routes/crm/users/user/'
import crm_user_stuff from '@/routes/crm/users/user/'

import crm_admin from '@/routes/crm/users/admin'
import crm_admin_supervisor from '@/routes/crm/users/admin'
import crm_admin_manager from '@/routes/crm/users/admin'
import crm_admin_editor from '@/routes/crm/users/admin'

import crm_company from '@/routes/crm/users/company'
import crm_company_lead from '@/routes/crm/users/company'
import crm_company_customer from '@/routes/crm/users/company'
import crm_company_partner from '@/routes/crm/users/company'

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
    {
      path: '/forgot',
      name: 'forgot',
      component: forgot
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

    //crm user
    {
      path: '/users/user',
      name: 'crm_user',
      component: crm_user
    },
    {
      path: '/users/user_lead',
      name: 'crm_user_lead',
      component: crm_user_lead
    },
    {
      path: '/users/user_customer',
      name: 'crm_user_customer',
      component: crm_user_customer
    },
    {
      path: '/users/user_partner',
      name: 'crm_user_partner',
      component: crm_user_partner
    },
    {
      path: '/users/user_member',
      name: 'crm_user_member',
      component: crm_user_member
    },
    {
      path: '/users/user_leader',
      name: 'crm_user_leader',
      component: crm_user_leader
    },
    {
      path: '/users/user_stuff',
      name: 'crm_user_stuff',
      component: crm_user_stuff
    },

    //crm admin
    {
      path: '/users/admin',
      name: 'crm_admin',
      component: crm_admin
    },
    {
      path: '/users/admin_supervisor',
      name: 'crm_admin_supervisor',
      component: crm_admin_supervisor
    },
    {
      path: '/users/admin_manager',
      name: 'crm_admin_manager',
      component: crm_admin_manager
    },
    {
      path: '/users/admin_editor',
      name: 'crm_admin_editor',
      component: crm_admin_editor
    },

    //crm company
    {
      path: '/users/company',
      name: 'crm_company',
      component: crm_company
    },
    {
      path: '/users/company_lead',
      name: 'crm_company_lead',
      component: crm_company_lead
    },
    {
      path: '/users/company_customer',
      name: 'crm_company_customer',
      component: crm_company_customer
    },
    {
      path: '/users/company_partner',
      name: 'crm_company_partner',
      component: crm_company_partner
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
