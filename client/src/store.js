import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    login (state, userData) {
      state.user = userData
    },
    logout (state) {
      state.user = null
    }
  },
  getters: {
    user: state => state.user
  },
  actions: {

  }
})
