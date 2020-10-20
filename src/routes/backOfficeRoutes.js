import AuthBaseView from '@/views/BackOffice/Auth/AuthBaseView'
import AdminBaseView from '@/views/BackOffice/AdminBaseView'
// import View from '@/views/BackOffice/View'

// Auth
import AdminLogin from '@/views/BackOffice/Auth/Login'
import AdminResetPassword from '@/views/BackOffice/Auth/AdminResetPassword'
// Dashboard
import AdminDashboard from '@/views/BackOffice/Dashboard/Dashboard'
// Companies
// import RegistCompany from '@/views/BackOffice/Companies/RegistCompany'
// import ListCompany from '@/views/BackOffice/Companies/ListCompany'
// import EditCompany from '@/views/BackOffice/Companies/EditCompany'

// Auth routes
const Auth = [{
  path: '/admin',
  redirect: AdminLogin
},
{
  path: '/admin/l',
  component: AuthBaseView,
  redirect: AdminLogin,
  children: [
    {
      path: 'login',
      name: 'AdminLogin',
      component: AdminLogin,
      meta: {
        title: 'AdminLogin'
      }
    },
    {
      path: 'reset-password',
      name: 'AdminResetPassword',
      component: AdminResetPassword,
      meta: {
        title: 'Redefinir Password'
      }
    }
  ]
}
]

// Companies routes
// const Companies = [{
//   path: '/companies',
//   name: 'ListCompany',
//   component: View,
//   meta: {
//     title: 'Listar Empresas'
//   },
//   children: [{
//     path: '/',
//     name: 'ListCompany',
//     component: ListCompany,
//     meta: {
//       title: 'Listar Empresas'
//     }
//   },
//   {
//     path: 'regist',
//     name: 'RegistCompany',
//     component: RegistCompany,
//     meta: {
//       title: 'Registar Empresa'
//     }
//   },
//   {
//     path: 'edit/:id',
//     name: 'EditCompany',
//     component: EditCompany,
//     meta: {
//       title: 'Editar Empresa'
//     },
//     props: true
//   }
//   ]
// }]

// Admin routes
const Admin = [{
  path: '/admin/a',
  component: AdminBaseView,
  redirect: AdminDashboard,
  meta: {
    title: 'Início',
    name: 'AdminDashboard'
  },
  children: [{
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: {
      title: 'Dashboard'
    }
  }
  // ,...Companies
  ]
}]

// Home page
export default [...Auth, ...Admin]
