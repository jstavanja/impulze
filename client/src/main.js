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

Vue.prototype.$dangerNotification = function (message) {
  this.$toast.open({
    message,
    type: 'is-danger'
  })
}

Vue.prototype.$successNotification = function (message) {
  this.$toast.open({
    message,
    type: 'is-success'
  })
}

Vue.prototype.$formatTimeString = function (millisec) {
  const seconds = (millisec / 1000).toFixed(1)
  const minutes = (millisec / (1000 * 60)).toFixed(1)
  const hours = (millisec / (1000 * 60 * 60)).toFixed(1)
  const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1)

  if (seconds < 60) {
    return seconds + ' seconds'
  } else if (minutes < 60) {
    return minutes + ' minutes'
  } else if (hours < 24) {
    return hours + ' hours'
  } else {
    return days + ' days'
  }
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
