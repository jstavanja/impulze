import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    impulzes: [],
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
    setImpulzes (state, impulzes) {
      Vue.set(state, 'impulzes', impulzes)
    },
    addImpulze (state, impulze) {
      state.impulzes.push(impulze)
    },
    removeImpulze (state, impulzeId) {
      state.impulzes.splice(state.impulzes.indexOf(impulzeId), 1)
    },
    addInterval (state, payload) {
      Vue.set(state.intervals, payload.id, payload.interval)
      Vue.set(state.intervalNames, payload.id, payload.name)
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
    impulzes: state => state.impulzes,
    intervals: state => state.intervals,
    intervalNames: state => state.intervalNames,
    hasIntervalsRunning: state => state.hasIntervalsRunning
  },
  actions: {

  }
})
