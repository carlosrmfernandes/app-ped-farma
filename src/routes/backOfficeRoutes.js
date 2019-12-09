import AuthBaseView from '@/views/BackOffice/Auth/AuthBaseView'
import AdminBaseView from '@/views/BackOffice/AdminBaseView'
import View from '@/views/BackOffice/View'

// Auth
import Login from '@/views/BackOffice/Auth/Login'
import AdminResetPassword from '@/views/BackOffice/Auth/AdminResetPassword'
// Dashboard
import Dashboard from '@/views/BackOffice/Dashboard/Dashboard'

// Organizers
import RegistOrganizer from '@/views/BackOffice/Organizers/RegistOrganizer'
import ListOrganizer from '@/views/BackOffice/Organizers/ListOrganizer'
import EditOrganizer from '@/views/BackOffice/Organizers/EditOrganizer'

// Sponsors
import RegistSponsor from '@/views/BackOffice/Sponsors/RegistSponsor'
import ListSponsor from '@/views/BackOffice/Sponsors/ListSponsor'
import EditSponsor from '@/views/BackOffice/Sponsors/EditSponsor'

// Events
import RegistEvent from '@/views/BackOffice/Events/RegistEvent'
import ListEvent from '@/views/BackOffice/Events/ListEvent'
import EditEvent from '@/views/BackOffice/Events/EditEvent'
import ShowEvent from '@/views/BackOffice/Events/ShowEvent'

// Companies
import RegistCompany from '@/views/BackOffice/Companies/RegistCompany'
import ListCompany from '@/views/BackOffice/Companies/ListCompany'
import EditCompany from '@/views/BackOffice/Companies/EditCompany'

// Contracts
import RegistContract from '@/views/BackOffice/Contracts/RegistContract'
import ListContract from '@/views/BackOffice/Contracts/ListContract'
import EditContract from '@/views/BackOffice/Contracts/EditContract'

// Payments
import ListPayment from '@/views/BackOffice/Payments/ListPayment'

// Locations
import RegistLocation from '@/views/BackOffice/Locations/RegistLocation'
import ListLocation from '@/views/BackOffice/Locations/ListLocation'
import EditLocation from '@/views/BackOffice/Locations/EditLocation'

// Products
import RegistProduct from '@/views/BackOffice/Products/RegistProduct'
import ListProduct from '@/views/BackOffice/Products/ListProduct'
import EditProduct from '@/views/BackOffice/Products/EditProduct'

// Suppliers
import RegistSupplier from '@/views/BackOffice/Suppliers/RegistSupplier'
import ListSupplier from '@/views/BackOffice/Suppliers/ListSupplier'
import EditSupplier from '@/views/BackOffice/Suppliers/EditSupplier'

// Auth routes
const Auth = [{
  path: '/',
  redirect: Login
},
{
  path: '/admin',
  component: AuthBaseView,
  redirect: Login,
  children: [{
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login'
    }
  },
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
    name: 'AdminResetPassword',
    component: AdminResetPassword,
    meta: {
      title: 'Redefinir Password'
    }
  }
  ]
}
]

// Organizers routes
const Organizers = [{
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
    },
    props: true
  }
  ]
}]

// Sponsors routes
const Sponsors = [{
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
  },
  {
    path: 'edit/:id',
    name: 'EditSponsor',
    component: EditSponsor,
    meta: {
      title: 'Editar Patrocinador'
    },
    props: true
  }
  ]
}]

// Companies routes
const Companies = [{
  path: '/companies',
  name: 'ListCompany',
  component: View,
  meta: {
    title: 'Listar Empresas'
  },
  children: [{
    path: '/',
    name: 'ListCompany',
    component: ListCompany,
    meta: {
      title: 'Listar Empresas'
    }
  },
  {
    path: 'regist',
    name: 'RegistCompany',
    component: RegistCompany,
    meta: {
      title: 'Registar Empresa'
    }
  },
  {
    path: 'edit/:id',
    name: 'EditCompany',
    component: EditCompany,
    meta: {
      title: 'Editar Empresa'
    },
    props: true
  }
  ]
}]

// Events routes
const Events = [{
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
    },
    props: true
  }
  ]
}]

// Contracts routes
const Contracts = [{
  path: '/contracts',
  name: 'ListContract',
  component: View,
  meta: {
    title: 'Listar Contratos'
  },
  children: [{
    path: '/',
    name: 'ListContract',
    component: ListContract,
    meta: {
      title: 'Listar Contratos'
    }
  },
  {
    path: 'regist',
    name: 'RegistContract',
    component: RegistContract,
    meta: {
      title: 'Registar Empresa'
    }
  },
  {
    path: 'edit/:id',
    name: 'EditContract',
    component: EditContract,
    meta: {
      title: 'Editar Contrato'
    },
    props: true
  }
  ]
}]

const Payments = [{
  path: '/payments',
  name: 'ListPayment',
  component: View,
  meta: {
    title: 'Listar Pagamentos'
  },
  children: [{
    path: '/',
    name: 'ListPayment',
    component: ListPayment,
    meta: {
      title: 'Listar Pagamentos'
    }
  }
  ]
}]

// Locations routes
const Locations = [{
  path: '/locations',
  name: 'ListLocation',
  component: View,
  meta: {
    title: 'Listar Localização'
  },
  children: [{
    path: '/',
    name: 'ListLocation',
    component: ListLocation,
    meta: {
      title: 'Listar Localização'
    }
  },
  {
    path: 'regist',
    name: 'RegistLocation',
    component: RegistLocation,
    meta: {
      title: 'Registar Localização'
    }
  },
  {
    path: 'edit/:id',
    name: 'EditLocation',
    component: EditLocation,
    meta: {
      title: 'Editar Localização'
    },
    props: true
  }
  ]
}]

// Products routes
const Products = [{
  path: '/products',
  name: 'ListProduct',
  component: View,
  meta: {
    title: 'Listar Produtos'
  },
  children: [{
    path: '/',
    name: 'ListProduct',
    component: ListProduct,
    meta: {
      title: 'Listar Produtos'
    }
  },
  {
    path: 'regist',
    name: 'RegistProduct',
    component: RegistProduct,
    meta: {
      title: 'Registar Produtos'
    }
  },
  {
    path: 'edit/:id',
    name: 'EditProduct',
    component: EditProduct,
    meta: {
      title: 'Editar Produtos'
    },
    props: true
  }
  ]
}]

// Suppliers routes
const Suppliers = [{
  path: '/supplier',
  name: 'ListSupplier',
  component: View,
  meta: {
    title: 'Listar Operadores'
  },
  children: [{
    path: '/',
    name: 'ListSupplier',
    component: ListSupplier,
    meta: {
      title: 'Listar Operadores'
    }
  },
  {
    path: 'regist',
    name: 'RegistSupplier',
    component: RegistSupplier,
    meta: {
      title: 'Registar Operador'
    }
  },
  {
    path: 'edit/:id',
    name: 'EditSupplier',
    component: EditSupplier,
    meta: {
      title: 'Editar Operador'
    },
    props: true
  }
  ]
}]

// Admin routes
const Admin = [{
  path: '/admin/all',
  component: AdminBaseView,
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
      },
      props: true
    },
    {
      path: 'show/:id',
      name: 'ShowEvent',
      component: ShowEvent,
      meta: {
        title: 'Detalhes do Evento'
      },
      props: true
    }
    ]
  },
  ...Events,
  ...Organizers,
  ...Sponsors,
  ...Companies,
  ...Contracts,
  ...Payments,
  ...Locations,
  ...Products,
  ...Suppliers
  ]
}]

// Home page
export default [...Auth, ...Admin]
