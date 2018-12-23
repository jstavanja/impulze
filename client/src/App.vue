<template>
  <div id="app">
    <navigation />
    <router-view v-if="user" />
    <div id="login" v-else>
      <login />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navigation from './components/Navigation'
import Login from './components/Login/Login'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  components: {
    Navigation,
    Login
  },
  created () {
    axios.defaults.baseURL = 'http://localhost:3000/api/'
    const jwtToken = localStorage.getItem('user-token')
    if (jwtToken) {
      axios.defaults.headers.common['authorization'] = `Bearer ${jwtToken}`
      axios.get('/auth/info')
        .then((res) => {
          this.$store.commit('login', res.data)
        })
    }
  }
}
</script>
