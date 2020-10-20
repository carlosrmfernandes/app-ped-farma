import Vue from 'vue'
import Vuex from 'vuex'
import Functions from './store/helpers/functions'
import Admins from './store/adminsModule'
import Clients from './store/clientsModule'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Functions,
    Admins,
    Clients
  },
  plugins: [
    createPersistedState()
  ],
  state: {},
  mutations: {},
  actions: {}
})
