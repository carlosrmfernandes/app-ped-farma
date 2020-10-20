import AuthBaseView from '@/views/ClientOffice/Auth/AuthBaseView'
import ClientBaseView from '@/views/ClientOffice/ClientBaseView'

import View from '@/views/ClientOffice/View'

// Auth
import Login from '@/views/ClientOffice/Auth/Login'
import ClientResetPassword from '@/views/ClientOffice/Auth/ClientResetPassword'

// Dashboard
import Dashboard from '@/views/ClientOffice/Dashboard/Dashboard'

// Products
import RegistProducts from '@/views/ClientOffice/Products/RegistProducts'
import ListProducts from '@/views/ClientOffice/Products/ListProducts'
import EditProducts from '@/views/ClientOffice/Products/EditProducts'

// Users
import RegistUsers from '@/views/ClientOffice/Users/RegistUsers'
import ListUsers from '@/views/ClientOffice/Users/ListUsers'
import EditUsers from '@/views/ClientOffice/Users/EditUsers'

// Providers
import RegistProviders from '@/views/ClientOffice/Providers/RegistProviders'
import ListProviders from '@/views/ClientOffice/Providers/ListProviders'
import EditProviders from '@/views/ClientOffice/Providers/EditProviders'

// Auth routes
const Auth = [{
  path: '/',
  redirect: Login
},
{
  path: '/',
  component: AuthBaseView,
  redirect: Login,
  children: [
    {
      path: 'login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Login'
      }
    },
    {
      path: 'reset-password',
      name: 'ClientResetPassword',
      component: ClientResetPassword,
      meta: {
        title: 'Redefinir Password'
      }
    }
  ]
}
]

// Products routes
const Products = [{
  path: '/products',
  name: 'ListProducts',
  component: View,
  children: [{
    path: '/',
    name: 'ListProducts',
    component: ListProducts,
    meta: {
      title: 'Listar Produtos'
    }
  },
  {
    path: 'regist',
    name: 'RegistProducts',
    component: RegistProducts,
    meta: {
      title: 'Registar Produtos'
    }
  },
  {
    path: 'edit/:id',
    name: 'EditProducts',
    component: EditProducts,
    meta: {
      title: 'Editar Produtos'
    },
    props: true
  }
  ]
}]

// Users routes
const Users = [{
  path: '/buyers',
  name: 'ListUsers',
  component: View,
  children: [{
    path: '/',
    name: 'ListUsers',
    component: ListUsers,
    meta: {
      title: 'Listar Compradores'
    }
  },
  {
    path: 'regist',
    name: 'RegistUsers',
    component: RegistUsers,
    meta: {
      title: 'Registar Comprador'
    }
  },
  {
    path: 'edit/:id',
    name: 'EditUsers',
    component: EditUsers,
    meta: {
      title: 'Editar Comprador'
    },
    props: true
  }
  ]
}]

// Providers routes
const Providers = [{
  path: '/providers',
  name: 'ListProviders',
  component: View,
  children: [{
    path: '/',
    name: 'ListProviders',
    component: ListProviders,
    meta: {
      title: 'Listar Fornecedores'
    }
  },
  {
    path: 'regist',
    name: 'RegistProviders',
    component: RegistProviders,
    meta: {
      title: 'Registar Fornecedores'
    }
  },
  {
    path: 'edit/:id',
    name: 'EditProviders',
    component: EditProviders,
    meta: {
      title: 'Editar Fornecedores'
    },
    props: true
  }
  ]
}]

// Client routes
const Client = [{
  path: '/client/c',
  component: ClientBaseView,
  redirect: Dashboard,
  meta: {
    title: 'Início',
    name: 'Dashboard'
  },
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard'
    }
  },
  ...Products,
  ...Users,
  ...Providers
  ]
}]

// Home page
export default [...Auth, ...Client]
