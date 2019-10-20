import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import View from '@/views/View'

import Dashboard from '@/views/Dashboard/Dashboard'

import RegistOrganizer from '@/views/Organizers/RegistOrganizer'
import ListOrganizer from '@/views/Organizers/ListOrganizer'
import EditOrganizer from '@/views/Organizers/EditOrganizer'

import NewEvent from '@/views/events/NewEvent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    component: Home,
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
      path: '/organizer',
      name: 'ListOrganizer',
      component: View,
      meta: {
        title: 'Organizadores'
      },
      children: [
        {
          path: '/',
          name: 'ListOrganizer',
          component: ListOrganizer,
          meta: {
            title: 'Organizadores'
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
          path: 'edit/:id',
          name: 'EditOrganizer',
          component: EditOrganizer,
          meta: {
            title: 'Editar Organizador'
          }
        }
      ]
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
