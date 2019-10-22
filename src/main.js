import Vue from 'vue'
import Vuelidate from 'vuelidate'
import ImageUploader from 'vue-image-upload-resize'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(ImageUploader)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
