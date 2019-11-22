import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'

import PortalVue from 'portal-vue'
import { BootstrapVue } from 'bootstrap-vue'
// import VeeValidate from 'vee-validate'
import VeeValidate, { Validator } from 'vee-validate'
import pt from 'vee-validate/dist/locale/pt_PT'

Vue.config.productionTip = true

// Set libraries
moment.locale('pt_PT')
Vue.use(VeeValidate)
Validator.localize('pt_PT', pt)
Vue.use(VueAxios, axios)
axios.defaults.baseURL = process.env.VUE_APP_API
axios.defaults.headers.post['Content-Type'] = 'application/json'

Vue.use(PortalVue)
Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
