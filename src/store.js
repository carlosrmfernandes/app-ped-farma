import Vue from 'vue'
import Vuex from 'vuex'
import Functions from './store/helpers/functions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Functions
  },
  state: {
    tableDetailID: String
  },
  mutations: {

  },
  actions: {

  }
})
