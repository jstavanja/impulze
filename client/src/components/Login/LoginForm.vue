<template>
  <div class="column is-half is-offset-one-quarter">
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="email" placeholder="Email" v-model="email">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="password" placeholder="Password" v-model="password">
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control">
        <button class="button is-success" @click="login">
          Login
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      axios.post('/auth/login', { email: this.email, password: this.password })
        .then((res) => {
          localStorage.setItem('user-token', res.data.token)
          axios.defaults.headers.common['authorization'] = `Bearer ${res.data.token}`
          return res.data.token
        })
        .then((token) => axios.get('/auth/info'))
        .then((res) => {
          this.$store.commit('login', res.data)
          this.$router.push({ name: 'home-app' })
        })
        .catch(() => {
          alert('Invalid username or password.')
        })
    }
  }
}
</script>
