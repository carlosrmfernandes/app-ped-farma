/*
 *  This filters function will be accessed from the
 *  root main.js of the project to initialize it
 *  passing a the Vue instance object as an argument
 */
export default Vue => {
  /**
   * profileStatus: This filter will format the profile status
   *
   * @param {string} status
   */
  Vue.filter('profileStatus', status => {
    switch (status) {
      case 'UNDEFINED':
        return 'Indefinido'
      default:
        return 'N/A'
    }
  })
}
