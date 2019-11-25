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

// Set libraries
moment.locale('pt_PT')
Vue.use(VeeValidate)
Validator.localize('pt_PT', pt)
Vue.use(VueAxios, axios)
axios.defaults.baseURL = process.env.VUE_APP_API
axios.defaults.headers.post['Content-Type'] = 'application/json'

// Get Token evertime we realod the page
const token = localStorage.getItem('user_token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

// Components
Vue.use(PortalVue)
Vue.use(BootstrapVue)

// Other Configurations
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
