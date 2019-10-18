import Vue from 'vue'
import Router from 'vue-router'
import View from '@/views/View'

import Dashboard from '@/views/Dashboard/Dashboard'
import RegistOrganizer from '@/views/Organizers/RegistOrganizer'
import NewEvent from '@/views/events/NewEvent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    component: View,
    name: 'Dashboard',
    meta: {
      title: 'Pagina Inicial'
    },
    children: [{
        path: '',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          title: 'Pagina Inicial'
        }
      },
      {
        path: 'regist',
        name: 'RegistOrganizer',
        component: RegistOrganizer,
        meta: {
          title: 'Novo Organizador'
        }
      },
      {
        path: 'event',
        name: 'NewEvent',
        component: NewEvent,
        meta: {
          title: 'Novo Evento'
        }
      }
    ]
  }]
})
