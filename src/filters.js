/*
 *  This filters function will be accessed from the
 *  root main.js of the project to initialize it
 *  passing a the Vue instance object as an argument
 */
export default Vue => {
  /**
   * roles
   * @param {string} role
   * @returns {string}
   */
  Vue.filter('roles', role => {
    const labels = {
      SYSTEM_ADMIN: 'Administrador de Sistema',
      SUPER_ADMIN: 'Super Administrador',
      ADMIN: 'Administrador'
    }

    return labels[role]
  })
}
