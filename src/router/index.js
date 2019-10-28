import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import View from '@/views/View'

import Dashboard from '@/views/Dashboard/Dashboard'

import RegistOrganizer from '@/views/Organizers/RegistOrganizer'
import ListOrganizer from '@/views/Organizers/ListOrganizer'
import EditOrganizer from '@/views/Organizers/EditOrganizer'

import RegistSponsor from '@/views/Sponsors/RegistSponsor'
import ListSponsor from '@/views/Sponsors/ListSponsor'

import RegistEvent from '@/views/Events/RegistEvent'
import ListEvent from '@/views/Events/ListEvent'
import EditEvent from '@/views/Events/EditEvent'

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
        children: [{
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
        path: '/sponsor',
        name: 'ListSponsor',
        component: View,
        meta: {
          title: 'Patrocinadores'
        },
        children: [{
            path: '/',
            name: 'ListSponsor',
            component: ListSponsor,
            meta: {
              title: 'Patrocinadores'
            }
          },
          {
            path: 'regist',
            name: 'RegistSponsor',
            component: RegistSponsor,
            meta: {
              title: 'Novo Patrocinador'
            }
          }
        ]
      },
      {
        path: '/events',
        name: 'ListEvent',
        component: View,
        meta: {
          title: 'Listar Eventos'
        },
        children: [{
            path: '/',
            name: 'ListEvent',
            component: ListEvent,
            meta: {
              title: 'Listar Eventos'
            }
          },
          {
            path: 'regist',
            name: 'RegistEvent',
            component: RegistEvent,
            meta: {
              title: 'Registar Evento'
            }
          },
          {
            path: 'edit/:id',
            name: 'EditEvent',
            component: EditEvent,
            meta: {
              title: 'Editar Evento'
            }
          }
        ]
      }
    ]
  }]
})
