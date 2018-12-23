import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    intervals: {},
    intervalNames: {},
    hasIntervalsRunning: false
  },
  mutations: {
    login (state, userData) {
      state.user = userData
    },
    logout (state) {
      state.user = null
    },
    addInterval (state, payload) {
      state.intervals[payload.id] = payload.interval
      state.intervalNames[payload.id] = payload.name
      state.hasIntervalsRunning = true
    },
    removeInterval (state, payload) {
      clearInterval(state.intervals[payload.id])
      Vue.delete(state.intervals, payload.id)
      Vue.delete(state.intervalNames, payload.id)
      if (Object.keys(state.intervals).length <= 0) {
        state.hasIntervalsRunning = false
      }
    }
  },
  getters: {
    user: state => state.user,
    intervals: state => state.intervals,
    intervalNames: state => state.intervalNames,
    hasIntervalsRunning: state => state.hasIntervalsRunning
  },
  actions: {

  }
})
