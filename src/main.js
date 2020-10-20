import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
import { Settings } from 'luxon'

// import VeeValidate from 'vee-validate'
import VeeValidate, { Validator } from 'vee-validate'
import pt from 'vee-validate/dist/locale/pt_PT'

import filters from './filters'

// Set libraries
moment.locale('pt_PT')
Vue.use(VeeValidate)
Validator.localize('pt_PT', pt)
Vue.use(VueAxios, axios)

axios.defaults.baseURL = `http://127.0.0.1:8000/api`
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

Settings.defaultLocale = 'pt'

// Get Token evertime we realod the page
const token = localStorage.getItem('user_token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

// Other Configurations
Vue.config.productionTip = true
filters(Vue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
