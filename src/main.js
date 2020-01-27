import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueTabulator from 'vue-tabulator'
import moment from 'moment'
import { Datetime } from 'vue-datetime'
import { Settings } from 'luxon'

// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'

import PortalVue from 'portal-vue'
import { BootstrapVue } from 'bootstrap-vue'
// import VeeValidate from 'vee-validate'
import VeeValidate, { Validator } from 'vee-validate'
import pt from 'vee-validate/dist/locale/pt_PT'

import filters from './filters'

// Google Libraries
import * as VueGoogleMaps from 'vue2-google-maps'

// Set libraries
moment.locale('pt_PT')
Vue.use(VeeValidate)
Validator.localize('pt_PT', pt)
Vue.use(VueAxios, axios)
Vue.use(VueTabulator)
Vue.component('datetime', Datetime)

axios.defaults.baseURL = `https://box.nextbss.co.ao/api/`

axios.defaults.headers.post['Content-Type'] = 'application/json'

Settings.defaultLocale = 'pt'

// Get Token evertime we realod the page
const token = localStorage.getItem('user_token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

// Google Maps Authentications
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDo0o_N65ss5lDebO2GXfa-AzSWp8owV9Q',
    libraries: 'places' // necessary for places input
  }
})

// Components
Vue.use(PortalVue)
Vue.use(BootstrapVue)

// Other Configurations
Vue.config.productionTip = true
filters(Vue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
