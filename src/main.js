import Vue from 'vue'
import Vuelidate from 'vuelidate'
import ImageUploader from 'vue-image-upload-resize'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'

import PortalVue from 'portal-vue'
<<<<<<< HEAD
import {
  BootstrapVue
} from 'bootstrap-vue'

require('bootstrap')
=======
import { BootstrapVue } from 'bootstrap-vue'
import * as VeeValidate from 'vee-validate'
// import VeeValidate, { Validator } from 'vee-validate'
import pt from 'vee-validate/dist/locale/pt_PT'
>>>>>>> 045bd8745087ebcf1747763c6b5a42430ca25ae4

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(ImageUploader)

// Set libraries
moment.locale('pt_PT')
VeeValidate.localize('pt_PT', pt)
Vue.use(VeeValidate)
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
