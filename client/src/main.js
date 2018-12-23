import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

import VueNativeNotification from 'vue-native-notification'

Vue.component('vue-ctk-date-time-picker', VueCtkDateTimePicker)

Vue.use(Buefy)
Vue.use(VueNativeNotification, { requestOnNotify: true })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
