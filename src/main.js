import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import PortalVue from 'portal-vue'
import { BootstrapVue } from 'bootstrap-vue'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(PortalVue)
Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
