import Vue from 'vue'
import Router from 'vue-router'

import backOfficeRoutes from './routes/backOfficeRoutes'
import clientOfficeRoutes from './routes/clientsOfficeRoutes'

Vue.use(Router)

/*
 *  Not found
 */
const NotFound = [{
  path: '*',
  redirect: '/'
}]

/*
 *  Main router object
 */
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...backOfficeRoutes,
    ...clientOfficeRoutes,
    ...NotFound
  ]
})

/**
 * CanUserAccessThisRoute: It's an helper function that checks the path entered
 * the browser and then checks if the right user is logged in: admin or customer
 * then redirect to the righ path.
 *
 * @param {object} to
 * @param {function} next
 * @param {string} path
 * @param {string} localStorageObject
 * @param {object} redirectPath
 */
function CanUserAccessThisRoute (
  to,
  next,
  path,
  localStorageObject,
  redirectPath
) {
  if (to.matched[0].path.search(path) === 0) {
    // Check if the auth info is saved in the local storage
    if (localStorage.getItem(localStorageObject)) {
      next()
      return
    }
    next(redirectPath)
  } else {
    next()
  }
}

/*
 *  Navigation guards: All the route access and controll will be done from
 *  here, in order to prevent unauthorized access.
 */
router.beforeEach((to, from, next) => {
  // Guard Client routes
  const loginPath = {
    name: 'Login'
  }
  CanUserAccessThisRoute(to, next, '/client/c', 'app_client', loginPath)

  // Guard Admin routes
  const loginAdminPath = {
    name: 'AdminLogin'
  }
  CanUserAccessThisRoute(to, next, '/admin/l', 'app_admin', loginAdminPath)
})

export default router
